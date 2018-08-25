# MessageChannel那些事

好吧，我承认，这阶段一直在研究异步，恨不得把浏览器中所有的异步实现方案给了解一下。顺其自然，今天要看的这个`window.MessageChannel`也是浏览器提供的一个异步操作的API。

从`MessageChannel`名称上我们就能对其含义知晓个大概。`消息通道`-的确，这个接口允许我们创建一个新的消息通道，并通过它的两个`messagePort`属性发送数据。

直白的说，这个api会创建一个管道，管道的两端分别代表一个`messagePort`，都能够通过`portMessage`向对方发送数据，通过`onmessage`来接受对方发送过来的数据。

下面用一个简单的例子来加深一下印象：

```js
const ch = new MessageChannel()
const port1 = ch.port1
const port2 = ch.port2

port1.onmessage = function(d) {
    console.log(`port1接收的消息是：${d.data}`)
}

port2.onmessage = function(d) {
    console.log(`port2接收的消息是：${d.data}`)
}

// 发送消息
port1.portMessage('port1发送的消息')
port2.portMessage('port2发送的消息')
```

上面这个简单的例子就是`MessageChannel`的大致使用过程了。概括来说就是使用`MessageChannel`这个构造函数开创建一个消息管道对象。这个对象实例有两个**只读**属性`port1`和`port2`。我们可以通过其`postMessage`来发送数据，`onmessage`来接收数据。

理解了上面的过程，我们就能把`MessageChannel`应用到我们自己的项目中了。

`MessageChannel`是可以在`Web Worker`中使用的。我们可以利用这个特性在两个`web worker`中通信。

- main.js
```js
const w1 = new Worker('./w1.js')
const w2 = new Worker('./w2.js')
const ch = new MessageChannel()

w1.postMessage('from outernal', [ch.port1])
w2.postMessage('from outernal', [ch.port2])
w2.onmessage = function(e) {
    console.log(e.data)
}
```

- w1.js

```js
onmessage = function(e) {
    if(e.data === 'from outernal') {
        setTimeout(function() {
            e.ports[0].portMessage('向worker2发送的数据')
        })
    }
}
```

- w2.js

```js
onmessage = function(e) {
    if (e.data === 'from outernal') {
        e.ports[0].onmessage = function(e) {
            portMessage(e.data)
        }
    }
}
```

上面就是利用`MessageChannel`来实现两个`worker`之间的通信的过程。大致流程就是`worker1 -> port1 -> port2 -> worker2`

另外，利用`MessageChannel`我们还可以实现一个比较有意思的事情，比如对象的`深拷贝`:

```js
function structuralClone(obj) {
    return new Promise(resolve => {
        const {port1, port2} = new MessageChannel()
        port2.onmessage = ev => resolve(ev.data)
        port1.postMessage(obj)
    })
}

async function test() {
    const obj = {a: {b: 1}}
    const clonedObj = await structuralClone(obj)
    obj['a']['b'] = 2
    console.log(clonedObj['a']['b'])  // 1 
}
```

另外值得一提的就是，`MessageChannel`也是`Vue.nextTick`方法实现方法之一。所以，来个彩蛋吧：

```js
function asyncCallByMutationObserver(callback) {
    const div = document.createElement('div')
    let count = 0
    const observer = new MutationObserver(() => {
        callback && typeof callback === 'function' && callback.call(null)
    })

    observer.observe(div, { attributes: true })
    div.setAttribute('count', ++count);
}

function asyncCallByMessageChannel(callback) {
    const ch = new MessageChannel()
    ch.port1.onmessage = callback
    ch.port2.postMessage(1)
}
```

所以，下面的结果会输出什么？？？

```js
setTimeout(() => {
    console.log(1)
}, 0)

new Promise((resolve) => {
    console.log(2)
    for(let i = 0; i < 100000; i++) {
        (i === 99999) && resolve()
    }
    console.log(3)
}).then(() => {
    console.log(4)
})

console.log(5)

asyncCallByMessageChannel(() => {
    console.log(8)
})

asyncCallByMutationObserver(() => {
    console.log(6)
})

console.log(7)
```