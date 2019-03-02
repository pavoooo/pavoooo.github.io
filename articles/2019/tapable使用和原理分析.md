# tapable的使用和原理分析

`webpack`本质上是一种事件流的机制。它的工作流程就是将各个插件串联起来，而实现这一切的核心就是`Tapable`。`Tapable`有点类似于`nodejs`中的`events`模块，其核心原理也是依赖于发布订阅模式。

```js
export class SyncHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
export class SyncBailHook <T1 = any, T2 = any, T3 = any>extends Hook<T1, T2, T3> {}
export class SyncLoopHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
export class SyncWaterfallHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}

export class AsyncParallelHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
export class AsyncParallelBailHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
export class AsyncSeriesHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
export class AsyncSeriesBailHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
export class AsyncSeriesWaterfallHook<T1 = any, T2 = any, T3 = any> extends Hook<T1, T2, T3> {}
```

```js
const {
  SyncHook,
  SyncBailHook,
  SyncLoopHook,
  SyncWaterfallHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable')
```

> `Sync`前缀的钩子是同步钩子，`Async`前缀的钩子为异步钩子

`tapable`是一个单独的包，我们可以使用`npm`来单独安装使用。

```bash
npm install tapable
```

下面是对`tapable`模块的一个简单使用。

## SyncHook

`SyncHook`用来注册同步串行的钩子，它会将注册的钩子全部执行。

```js
const { SyncHook } = require('tapable')

class Person {
  constructor() {
    // 定义Person对象的各种钩子(行为)
    this.hooks = {
      // 通过这个钩子注册的监听函数接受一个参数
      sayName: new SyncHook(['arg']),
      sayAge: new SyncHook(['arg'])
    }
  }

  introduce() {
    // 调用传参
    this.hooks.sayName.call('saisai')
    this.hooks.sayAge.call(24)
  }

  // 这个方法主要是用来注册监听函数的
  tap() {
    // 注册一个监听
    this.hooks.sayName.tap('name', function(name) {
      console.log(`My name is ${name}`)
    })
    // 注册另一个监听
    this.hooks.sayAge.tap('age', function(age) {
      console.log(`I am ${age} years old`)
    })
  }
}

// 首先创建一个Person实例对象
const person = new Person

// 然后注册钩子监听
person.tap()

// 调用introduce方法开始自我介绍
person.introduce()
```

上面使用`SyncHook`的大致步骤就是：**创建钩子对象->为这个钩子对象注册监听->触发监听并传参**。理解了基本的流程后，我们就能对其核心原理进行简单的实现：

```js
class SyncHook {
  constructor(args) {
    // args ===> ['args']
    this.tasks = [

    ]
  }

  // 绑定钩子对应的事件
  tap(name, callback) {
    this.tasks.push(callback)
  }

  // 调用这个对象上所有的钩子，并传入参数
  call(...args) {
    this.tasks.forEach((task) => task.apply(this, args))
  }
}

module.exports = SyncHook
```

## SyncBailHook

`SyncBailHook`也是用来注册同步串行的钩子，如果一个监听函数的返回值不是`undefined`，则后续的监听函数都不会被执行。

```js
const { SyncBailHook } = require('tapable')

const syncBailHook = new SyncBailHook(['arg'])

syncBailHook.tap('name', (name) => {
  console.log(`my name is ${name}`)
  return name
})

syncBailHook.tap('name', (name) => {
  console.log(`my name2 is ${name}`)
  return name
})

syncBailHook.call('saisai')

// 只会输出 my name is saisai
```

基本实现如下

```js
class SyncBailHook {
  constructor(args) {
    // args ===> ['args']
    this.tasks = [

    ]
  }

  // 绑定钩子对应的事件
  tap(name, callback) {
    this.tasks.push(callback)
  }

  // 调用这个对象上所有的钩子，并传入参数
  call(...args) {
    for (let i = 0; i < this.tasks.length; i++) {
      const result = this.tasks[i].apply(this, args)
      if (result !== undefined) {
        return
      }
    }
  }
}

module.exports = SyncBailHook
```

## SyncWaterFallHook

`SyncWaterfallHook`也是用来注册同步串行的钩子。使用上述方式注册的钩子，上一个监听函数的返回值可以传给下一个监听函数。

```js
const { SyncWaterfallHook } = require('tapable')

const syncWaterfallHook = new SyncWaterfallHook(['arg'])

syncWaterfallHook.tap('name', (name) => {
  console.log(`my name is ${name}`)
  return `zhao${name}`
})

syncWaterfallHook.tap('name', (name) => {
  console.log(`my name2 is ${name}`)
})

syncWaterfallHook.call('saisai')

// 依次打印出：saisai, zhaosaisai
```

基本的实现如下

```js
class SyncWaterfallHook {
  constructor(args) {
    // args ===> ['args']
    this.tasks = [

    ]
  }

  // 绑定钩子对应的事件
  tap(name, callback) {
    this.tasks.push(callback)
  }

  // 调用这个对象上所有的钩子，并传入参数
  call(...args) {
    this.tasks.reduce((prev, next) => {
      return next.apply(this, ([].concat(prev)))
    }, args)
  }
}

module.exports = SyncWaterfallHook
```

## SyncLoopHook

`SyncLoopHook`用来注册同步循环的钩子，当一个监听函数被触发的时候，如果这个函数的返回值不为`undefined`的话，则继续执行这个监听函数。如果返回`undefined`，退出循环，继续执行后续的监听函数。

```js
const { SyncLoopHook } = require('tapable')

const syncLoopHook = new SyncLoopHook(['arg'])

let index = 1

// 这个监听函数会连续执行三次
syncLoopHook.tap('name', (name) => {
  console.log(`my name is ${name}`)
  return index++ >= 3 ? undefined : true
})

syncLoopHook.tap('name', (name) => {
  console.log(`my name2 is ${name}`)
})

syncLoopHook.call('saisai')
```

实现原理如下

```js
class SyncLoopHook {
  constructor(args) {
    // args ===> ['args']
    this.tasks = [

    ]
  }

  // 绑定钩子对应的事件
  tap(name, callback) {
    this.tasks.push(callback)
  }

  // 调用这个对象上所有的钩子，并传入参数
  call(...args) {
    for (let i = 0; i < this.tasks.length; i++) {
      const result = this.tasks[i].apply(this, args)
      if (result !== undefined) {
        i--
      }
    }
  }
}

module.exports = SyncLoopHook
```

上面就是`tapable`中涉及到的一些同步钩子，除此，`tapable`也提供了一些异步钩子。

`tapable`中的异步钩子分为两类：

- 异步串行：按照顺序依次执行各个异步钩子
- 异步并行：同时执行多个异步钩子，所有异步钩子执行结束后会触发回调

一般来说，异步钩子的事件监听函数中都会执行异步的操作。注册的异步事件的监听函数需要使用`tapAsync`，注册的异步事件的监听函数的执行，也需要调用`callAsync`。

```js
// 传递给tapAsync的callback接收一个函数作为第二个参数，在异步执行结束的时候，我们必须手动调用这个函数来告诉`tapable`当前
// 的事件监听函数执行结束
asyncHook.tapAsync(name, callback) 
asyncHook.callAsync(args, callback)
```

## AsyncParallelHook

`AsyncParallelHook`是一个异步并行的钩子。它不关心监听函数的返回值。

```js
const { AsyncParallelHook } = require('tapable')

const asyncParallelHook = new AsyncParallelHook(['arg'])

// 下面两个事件监听函数的`cb`必须调用。否则`callAsync`的回调函数永远也不会执行
asyncParallelHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name is ${name}`)
    cb()
  }, 1000)
})

asyncParallelHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name2 is ${name}`)
    cb()
  }, 1000)
})

asyncParallelHook.callAsync('saisai', () => {
  console.log('All async hooks excuted')
})
```

实现原理如下

```js
class AsyncParallelHook {
  constructor(...args) {
    this.tasks = []
    this.index = 0
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    this._callback = args.pop()

    this.tasks.forEach(task => {
      task.call(this, ...args, this._cb.bind(this))
    })
  }

  _cb() {
    this.index++

    if (this.index === this.tasks.length) {
      this._callback()
    }
  }
}

module.exports = AsyncParallelHook
```

上面的例子是通过`tapAsync`注册的异步监听函数，我们也可以使用`tapPromise`来注册异步事件监听函数，不过这个时候需要要求监听函数返回一个`Promise`。在异步事件执行结束的时候，我们就需要手动调用`resolve`。触发事件监听函数的执行，我们也需要使用`promise()`方法。

```js
const { AsyncParallelHook } = require('tapable')

const asyncParallelHook = new AsyncParallelHook(['arg'])

// 第二个参数接收一个函数即可，并不需要第二个参数来表示异步操作执行结束
// 当我们调用resolve的时候，就表示这个事件监听函数中的异步操作执行结束
asyncParallelHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name is ${name}`)
      resolve()
    }, 1000)
  })
})

asyncParallelHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name2 is ${name}`)
      resolve()
    }, 1000)
  })
})

// 使用promise方法来触发事件
asyncParallelHook.promise('saisai').then(() => {
  console.log('All async hooks excuted')
})
```

实现的基本原理如下

```js
class AsyncParallelHook {
  constructor(...args) {
    this.tasks = []
    this.index = 0
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    return new Promise((resolve, reject) => {
      this.tasks.forEach(task => {
        task.call(this, ...args).then(() => {
          this.index++

          if (this.index === this.tasks.length) {
            resolve()
          }
        })
      })
    })
  }
}

module.exports = AsyncParallelHook
```

## AsyncParallelBailHook

`AsyncParallelHook`是一个异步并行的钩子。如果我们在某个事件监听函数中给`cb`传递了非`falsy`的参数，则会忽略后续所有监听函数的执行，直接执行`callAsync`函数的第二个参数对应的回调函数。

```js
const { AsyncParallelBailHook } = require('tapable')

const asyncParallelBailHook = new AsyncParallelBailHook(['arg'])

asyncParallelBailHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name is ${name}`)
    cb(true)
  }, 1000)
})

asyncParallelBailHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name2 is ${name}`)
    cb()
  }, 2000)
})

asyncParallelBailHook.callAsync('saisai', () => {
  console.log('All async hooks excuted')
})

// my name is saisai
// All async hooks excuted
// my name2 is saisai
```

实现原理如下

```js
class AsyncParallelBailHook {
  constructor(...args) {
    this.tasks = []
    this.index = 0
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    this._callback = args.pop()

    this.tasks.forEach(task => {
      task.call(this, ...args, this._cb.bind(this))
    })
  }

  _cb(arg) {
    this.index++
    // 如果arg的值不是undefined，就直接执行总的回调函数
    if (this.index === this.tasks.length || arg) {
      this._callback()
    }
  }
}

module.exports = AsyncParallelBailHook
```

当然，`AsyncParallelBailHook`也有使用`Promise`实现。比如

```js
const { AsyncParallelBailHook } = require('tapable')

const asyncParallelBailHook = new AsyncParallelBailHook(['arg'])

asyncParallelBailHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name is ${name}`)
      // resolve传递一个非falsy的值，就会直接将promise()方法返回的promise设置为`resolved`
      resolve(true)
    }, 1000)
  })
})

asyncParallelBailHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name2 is ${name}`)
      resolve()
    }, 2000)
  })
})

asyncParallelBailHook.promise('saisai').then(() => {
  console.log('All async hooks excuted')
})
```

实现的原理如下

```js
class AsyncParallelBailHook {
  constructor(...args) {
    this.tasks = []
    this.index = 0
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    return new Promise((resolve, reject) => {
      this.tasks.forEach(task => {
        // 和AsyncParallelHook相比只是在value参数为truth的时候，直接
        // 将这个返回的promise设为resolved状态
        task.call(this, ...args).then((value) => {
          this.index++

          if (this.index === this.tasks.length || value) {
            resolve()
          }
        })
      })
    })
  }
}

module.exports = AsyncParallelBailHook
```

## AsyncSeriesHook

`AsyncSeriesHook`是用来绑定异步串行的钩子。绑定的所有事件回调，按照顺序依次执行。

```js
const { AsyncSeriesHook } = require('tapable')
const asyncSeriesHook = new AsyncSeriesHook(['arg'])

asyncSeriesHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name is ${name}`)
    cb()
  }, 1000)
})

asyncSeriesHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name2 is ${name}`)
    cb()
  }, 500)
})

asyncSeriesHook.callAsync('saisai', () => {
  console.log('All async hooks excuted')
})

// my name is saisai
// my name2 is saisai
// All async hooks excuted
```

实现原理如下

```js
class AsyncParallelHook {
  constructor(...args) {
    this.tasks = []
    this.index = 0
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const self = this
    this._callback = args.pop()

    function cb() {
      if (self.index === self.tasks.length) {
        self._callback()
      } else {
        const task = self.tasks[self.index]
        task.call(self, ...args, cb)
        self.index++
      }
    }

    cb()
  }
}

module.exports = AsyncParallelHook
```

同样，`AsyncParallelHook`也有对应的`Promise`的实现

```js
const { AsyncSeriesHook } = require('tapable')
const asyncSeriesHook = new AsyncSeriesHook(['arg'])

asyncSeriesHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name is ${name}`)
      resolve(true)
    }, 1000)
  })
})

asyncSeriesHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name2 is ${name}`)
      resolve()
    }, 2000)
  })
})

asyncSeriesHook.promise('saisai').then(() => {
  console.log('All async hooks excuted')
})

// 执行完上述流程大概需要3s的时间
```

实现的原理如下

```js
class AsyncParallelHook {
  constructor(...args) {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    return this.tasks.reduce((p1, p2) => {
      return p1.then(() => p2.call(this, ...args))
    }, Promise.resolve())
  }
}

module.exports = AsyncParallelHook
```

## AsyncSeriesWaterfallHook

`AsyncSeriesWaterfallHook`也是用来绑定异步串行钩子。它会将上一个监听函数中的`cb(error, args)`中的第二个参数传递给下一个事件监听函数。

```js
const { AsyncSeriesWaterfallHook } = require('tapable')

const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['arg'])

asyncSeriesWaterfallHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name is ${name}`)
    cb(null, `zhao${name}`)
  }, 1000)
})

asyncSeriesWaterfallHook.tapAsync('name', (name, cb) => {
  setTimeout(() => {
    console.log(`my name2 is ${name}`)
    cb()
  }, 500)
})

asyncSeriesWaterfallHook.callAsync('saisai', () => {
  console.log('All async hooks excuted')
})

// 输出结果
// my name is saisai
// my name2 is zhaosaisai
// All async hooks excuted
```

实现原理如下

```js
class AsyncSeriesWaterfallHook {
  constructor(...args) {
    this.tasks = []
    this.index = 0
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const self = this
    this._callback = args.pop()

    function cb(error, ...params) {
      if (self.index === self.tasks.length || error) {
        self._callback()
      } else {
        const task = self.tasks[self.index]
        task.call(self, ...params, cb)
        self.index++
      }
    }

    cb(null, ...args)
  }
}

module.exports = AsyncSeriesWaterfallHook
```

`AsyncSeriesWaterfallHook`返回`promise`的使用方法如下

```js
const { AsyncSeriesWaterfallHook } = require('tapable')

const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['arg'])

asyncSeriesWaterfallHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name is ${name}`)
      resolve(`zhao${name}`)
    }, 1000)
  })
})

asyncSeriesWaterfallHook.tapPromise('name', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`my name2 is ${name}`)
      resolve()
    }, 2000)
  })
})

asyncSeriesWaterfallHook.promise('saisai').then(() => {
  console.log('All async hooks excuted')
})
```

实现原理如下

```js
class AsyncSeriesWaterfallHook {
  constructor(...args) {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    return this.tasks.reduce((p1, p2) => {
      return p1.then((params) => p2.call(this, params))
    }, Promise.resolve(...args))
  }
}

module.exports = AsyncSeriesWaterfallHook
```