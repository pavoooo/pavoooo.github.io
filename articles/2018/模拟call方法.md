# 模拟call方法

`javascript`的函数有三个改变函数体内`this`指向的方法，分别是`call`， `apply`和`bind`。在我们模拟之前先看一下怎么用？比如，下面是`call`的基本用法：

```js
const o1 = {
    a: 2
}
const o2 = {
    a: 3
}

function logA() {
    console.log(this.a)
}

logA() // undefined
logA.call(o1) // 2
logA.call(o2) // 3
```
上面是`call`最简单的使用方法。模拟之前，有两件事情我们必须知道：

- `call`会立即调用对应的函数，这个方法的第一个参数是函数内的this指向，如果未定义，默认为函数的定义作用域
- 后面的参数回作为调用函数的参数传入

这里，我们就需要思考一个问题。如何不借助上面的三个方法来改变函数体内的this指向呢？我们知道，javascript中函数体内的this不仅和定义的作用域有关，还和调用形式有关。比如：

```js
function a() {
    console.log(this.a)
}

const context = {
    a: 2
}

a() // undefined

context.fn = a
context.fn() // 2
```

所以，我们可以利用上面的机制来模拟`call`的功能。

```js
// call方法是挂载在函数的原型上的
Function.prototype._call = function (context, ...args) {
    // 默认设置为window
    context = context || window
    // 按照上述的方式将函数体内的this指向context
    context._fn = this
    // 执行
    const result = context._fn(...args)
    // 删除_fn
    delete context._fn
    // 返回结果
    return result
}
```

上面几行就大致的实现了call的功能，下面简单的测试一下。

```js
global.a = 2

function b() {
    console.log(this.a)
}

const context = {
    a: 3
}

b() // 2

b._call(context) // 3
```

下面再模拟一下`apply`的行为。`apply`的作用和`call`类似。唯一的不同就是传参方式的不同。明白了这一点，`apply`的行为我们也很好实现。

```js
Function.prototype._apply = function(context, ...args) {
    context = context || window
    context.fn = this

    let result
    if (args.length > 0) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
```

上面就是对`apply`方法的简单实现，测试如下：

```js
const context = {
    a: 3
}

function a(...args) {
    console.log(this.a, args)
}

a._apply(context, 1,2,3,4)
```

最后，需要实现的是对`bind`方法的实现。bind方法和call以及apply方法最大的区别就是，这个方法不会立即执行函数，而是会返回一个函数。

```js
Function.prototype._bind = function(context, ...args) {
    const _this = this

    return function F() {
        // 这里需要判断函数是不是F本身
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
```

上面就是对三个方法的一个简单模拟。