# Vue源码之错误处理

`Vue`给我们提供了两种方式进行运行时的错误捕获：`全局型错误捕获`和`组件内错误捕获`。示例图如下：

`errorCaptured`是`Vue@2.5.0`新增的一个钩子函数。我们可以利用这个钩子函数进行`Vue`组件内的错误捕获。具体的使用可以参考[https://cn.vuejs.org/v2/api/#errorCaptured](https://cn.vuejs.org/v2/api/#errorCaptured)。

不管是`全局型错误捕获`还是`组件内错误捕获`，`error handler`接收的参数都是一样的。分别是：

```js
error：错误对象
vm：发生错误的Vue组件实例
info：是 Vue 特定的错误信息，比如错误所在的生命周期钩子
```

下面是`Vue`中对全局型错误捕获的实现方式。全局型的错误捕获处理函数我们需要通过`config.errorHandler`进行指定，如果我们没有指定这个选项，则使用默认的`logError`把错误输出。而`logError`是对`console.error`的一个简单的封装。具体代码如下：

```js
// Vue中默认的错误处理函数
function logError(err, vm, info) {
    if (process.env.NODE_ENV !== 'production') {
        warn(`Error in ${info}: "${err.toString()}"`, vm)
    }

    if ((inBrowser || inWeex) && typeof console !== 'undefined) {
        console.error(err)
    } else {
        throw err
    }
}
// Vue中全局错误处理函数
function globalHandleError(err, vm, info) {
    // 如果我们在创建Vue实例的时候指定了errorHandler,则使用其进行错误处理
    if (config.errorHandler) {
        try {
            return config.errorHandler.call(null, err, vm, info)
        } catch (e) {
            logError(e, null, 'config.errorHandler')
        }
    }
    logError(err, vm, info)
}
```
我们可以利用这个接口，接入`sentry`。

而组件内的错误捕获则需要我们在声明组件的时候，指定`errorCaptured`钩子函数。如果没有指定这个钩子，则会沿着组件树向上寻找`$parent`组件，直至根组件。具体的代码的实现也是十分简单的。

```js
function handleError(err, vm, info) {
    if (vm) {
        let cur = vm
        // 从该组件的父组件开始查找errorCaptured钩子函数
        while ((cur = cur.$parent)) {
            // 如果存在errorCaptured钩子函数
            const hooks = cur.$options.errorCaptured
            if (hooks) {
                // 因为选项合并的策略，钩子函数会被保存在一个数组中
                for (let i = 0; i < hooks.length; i++) {
                    try {
                        // 调用对应的钩子函数，处理错误
                        const capture = hooks[i].call(cur, err, vm, info) === false
                        // 如果某个errorCaptured钩子的返回值是false，则会阻止错误继续向上传播
                        if (capture) return
                    } catch (e) {
                        // 如果调用errorCaptured函数发生错误的时候，直接将错误发送到全局的错误处理函数
                        globalHandleError(e, cur, 'errorCaptured hook')
                    }
                }
            }
        }
    }
    // 除非明确指定错误禁止向上传播，否则都会调用全局的错误处理函数的
    globalHandleError(err, vm, info)
}
```
这个就是组件内的错误处理程序。但是，`errorCaptured`钩子函数是用来捕获**来自子孙组件的错误，而无法捕获自身的错误**。我不是很能理解为什么要这样设计，给`Vue`提了一个[issue](https://github.com/vuejs/vue/issues/8258)。希望能够被解答，知道的大大们也欢迎指出为什么这样设计。
