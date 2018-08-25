# Vue源码之nextTick

`Vue.nextTick`是`Vue`中提供的一个异步接口。这个方法的第一个参数是一个可选的回调函数，这个函数会在`DOM`更新之后被调用。如果我们在修改数据之后立即调用这个方法，就能在方法中获取更新后的`DOM`。

`Vue.netTick`算是`Vue`中重构的比较彻底的一个方法，在`2.x`早期的版本中。这个方法的实现主要依赖的是`microtask`机制，但是在某些场景下`microtask`的优先级比较高，会造成事件触发之前数据已经更新。比如([#4521](https://github.com/vuejs/vue/issues/4521), [#6690](https://github.com/vuejs/vue/issues/6690), [#6566](https://github.com/vuejs/vue/issues/6566))。然而，如果使用`macrotask`来实现这个方法，当状态在重绘之前改变的时候也会造成一些微妙的问题([#6813](https://github.com/vuejs/vue/issues/6813))。所以，现在的`nextTick`的实现方式就是：默认使用`microtask`机制，对外暴露出一个强制使用`macrotask`机制的接口。当调用这个接口的时候，我们就会在`macrotask`队列中处理状态的变化，这种机制主要用在`v-on`的事件回调中。

`nextTick`的实现我们可以抽象成三个基本的过程：创建任务，保存任务，运行任务。在运行任务的时候，我们就需要确定使用何种机制来运行我们的任务队列。

`nextTick`方法将一次事件循环中添加的任务都保存在一个`callbacks`变量中。源码如下：

```js
const callbacks = []
let pending = false

function nextTick (cb, ctx) {
    let _resolve
    // 将所有添加的任务保存到callbacks数组中
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }   
    })

    // 如果不是在执行的状态，运行任务
    if (!pending) {
        pending = true
        // 决定使用`microtask`还是`macrotask`运行我们的任务队列
        if (useMacroTask) {
            macroTimerFunc()
        } else {
            microTimerFunc()
        }
    }

    // 如果我们在调用nextTick的时候没有传递回调函数，这个方法会返回一个promise，这就是这个方法的第二种用途：
    /*
        Vue.nextTick().then(() => {
            // DOM更新了
        })
    */
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise((resolve) => {
            _resolve = resolve
        })
    }
}
```
上面就是添加任务的基本过程，下面我们来看一下任务是怎么运行的？源码如下：

```js
// 这个函数其实是事件循环中任务队列的回调函数
function flushCallbacks() {
    // 将状态置为等待任务添加的状态
    pending = false
    // 保存一个副本
    // 这样做的原因就是，如果我们在nextTick的回调函数中调用了nextTick方法，那么这个时候添加的方法会放在下一个任务队列中执行，而不是在当前队列中执行
    const copies = callbacks.slice(0)
    // 清空队列
    callbacks.length = 0
    // 执行回调函数(任务)
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}
```

上面就是执行任务的方法，最主要的就是不同事件循环中的任务不要彼此干扰。

下面我们来看一下`nextTick`的核心的部分，就是使用什么样的机制来执行我们的任务。源码如下：

```js
// 保存宏任务的回调
let macroTimerFunc
// 保存微任务的回调
let microTimerFunc

// 如果原生支持setImmediate方法，直接通过这个方法将我们的任务队列添加到事件循环的`macrotask queue`中
// 这个方法只有IE浏览器支持
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
    // 如果不支持`setImmediate` 方法，降级到`MessageChannel`方法，将我们的任务队列添加到`macrotask queue`中执行

    // 关于这个方法的介绍可以参考[记录：window.MessageChannel那些事](https://zhuanlan.zhihu.com/p/37589777)

  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
    //  最后就直接降级为setTimeout，将我们的任务队列添加到`macrotask queue`中执行
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 下面是用来判断用何种方法将我们的任务队列添加到事件循环的`microtask`事件队列中

// Promise可以将我们的回调添加到事件循环的微任务队列中
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    // 这个是一个hack的手段
    // 因为在IOS的webview中，Promise.then的回调函数会被推入到`microtask`的任务队列，但是队列却不会被刷新。知道浏览器做其他工作的时候才会刷新这个队列，所以，我们可以通过添加一个空的定时器来"强制"微任务队列被刷新
    if (isIOS) setTimeout(noop)
  }
} else {
  // 如果不支持Promise的话，就抛弃`microtask`，直接降级到`macrotask`
  microTimerFunc = macroTimerFunc
}
```
上面就是判断运行任务的机制。最开始我们也提到，`nextTick`暴露了一个强制使用`macrotask`的一个方法，下面就是这个方法的具体实现：

```js
// 是否使用`macrotask` 的标志
let useMacroTask = false

function withMacroTask(fn) {
    return fn._withTask || (fn._withTask = function() {
        useMacroTask = true
        const res = fn.apply(null, arguments)
        useMacroTask = false
        return res
    })
}
```
那这个方法怎么使用的呢，我们可以在编辑器中全局搜索一下这个方法，发现只在`event.js`的`add`方法中使用。

即使我们没有分析过这段代码，我们也能猜出来它是干嘛的，用来绑定事件的。所以，我们在`Vue`中的绑定的原生事件的回调函数所造成的状态的变化，都会被强制的在`macrotask`队列中被执行。

> 关于`Event loop`的知识比较绕，笔者也没有理解的很透彻，上面也是我根据自己掌握的东西的一点理解。欢迎理解十分透彻的大神们讲述。