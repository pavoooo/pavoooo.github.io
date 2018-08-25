# Vue源码之工具函数

工欲善其事，必先利其器。每一个成熟的框架都有其核心的工具方法，所以，下面就和大家一起看一下`Vue`中所使用的那些工具方法。
`Vue`的工具方法可以分为两种：`全局型工具方法`和`实例型工具方法`。`全局型工具方法`在`src/shared/util.js`文件中，作为整个项目的辅助方法。而`实例型工具方法`是在创建实例的时候所使用的，主要是增强实例功能的。这些方法会伴随着源码的分析一点点讲解。今天主要看一下`全局型工具方法`有哪些。

::: tip
注：下面所有的方法都去掉了flow的声明
:::

---

```js
const emptyObject = Object.freeze({})
```
这个方法用于创建一个空对象。我们平时创建一个空对象一般会选择下面的两种形式：
```js
const emptyObject = {}
// 或
const emptyObject = Object.create(null)
```
但是`Vue`采用了`Object.freeze`方法来创建一个空对象。所以我们先来了解一下`Object.freeze`方法有什么作用。
`Object.freeze`方法可以冻结一个对象。所谓的冻结就是指我们不能给这个对象添加属性，删除属性，或者修改已有属性的值。甚至我们不能能改对象的可枚举性，可配置性以及可写性。也就是说这个对象是不可变的。`Vue`采用这种形式来创建对象，笔者认为主要有两方面原因：一个是这个对象是作为某些变量的默认值而存在的，另一方面可以提升一些性能。

---

下面是一些对类型的判断，用法很简单。但下面的这些方式有利于js引擎解析。

```js
// 变量是否未定义
function isUndef(v) {
    return v === undefined || v === null
}
// 变量是否定义
function isDef(v) {
    return v === undefined || v === null
}
// 变量的值是true
function isTrue(v) {
    return v === true
}
// 变量的值是false
function isFalse(v) {
    return v === false
}
```
---

下面是检查一个变量是不是基本类型的值(原始值)。`javascript`中有`6`中基本类型的值。分别是`undefined`, `null`, `string`, `boolean`, `number`, `symbol`。
下面这个方法是对非`undefined`和`null`值的类型的检查。

```js
function isPrimitive(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' || 
        typeof value === 'boolean' ||
        typeof value === 'symbol'
    )
}
```

---

判断一个变量是不是`object`类型

```js
function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}
```

--- 
下面主要是获取一个对象的类型的字符串表示形式。如`Object`类型的数据的类型的字符串为`[object Object]`

```js
const _toString = Object.prototype.toString

function toRawType(value) {
    return _toString.call(value).slice(8, -1)
}
```

--- 

利用上述的`toRawType`来判断一个对象是不是`plain object`或者是`正则对象`

```js
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
}

function isRegExp(v) {
    return _toString.call(v) === '[object RegExp]'
}
```

--- 

判断一个数字是不是合法的数组索引，其实也是判断一个数字是否是正数且可数的。

```js
function isValidArrayIndex(val) {
    const n = parseFloat(val)
    return n >= 0 && Math.floor(n) === n && isFinite(n)
}
```

--- 
讲一个变量转化为字符串。如果变量是`Object`类型的，则使用`JSON.stringify`进行转化

```js
function toString(val) {
    return val == null 
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
}
```
---

将一个变量转化成数字

```js
function toNumber(val) {
    const n = parseFloat(val)
    return isNaN(n) ? val : n
}
```
---

判断一个key是否在某个字符串中。这种方法的查询效率比`String.prototype.indexOf`快很多。

```js
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null)
    const list = str.split(',')

    for(let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }

    return expectsLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}
```

--- 
从数组中删除一个元素

```js
function remove(arr, item) {
    if(arr.length) {
        const index = arr.indexOf(item) 
        if(index > -1) {
            return arr.splice(index, 1)
        }
    }
}
```

--- 
判断某个对象自身是否具有某个属性

```js
const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}
```

--- 
创建一个具有缓存功能的函数

```js
function cached(fn) {
    const cache = Object.create(null)
    return (function cacheFn(str) {
        const hit = cache[str]
        return (hit || (cache[str] = fn(str)))
    })
}
```

---
下面是对字符串进行操作的三个方法

```js
// 将连字符字符串转化成驼峰字符串：hello-world -> helloWorld
const camelizeRE = /-(\w)/g
const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

// 将字符串的首字母变成大写: helloWorld -> HelloWorld
const capitalize = cached((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
})

// 将驼峰字符串转化成连字符字符串： helloWorld -> hello-world
const hyphenateRE = /\B([A-Z])/g
const hyphenate = cached((str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```

--- 
原生`Function.prototype.bind`方法的一个简单的polyfill

```js
function polyFillBind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length
        return l 
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx)
    }
    boundFn._length = fn.length
    return boundFn
}
```
---
将一个类数组对象转化成数组

```js
function toArray(list, start) {
    start = start || 0
    const i = list.length - start
    const ret = new Array(i)
    while(i--) {
        ret[i] = list[i + start]
    }
    return ret
}
```

--- 
下面是两个对象操作方法

```js
// 一个简单的继承
function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}

// 将对象数组转化成一个单对象
function toObject(arr) {
    const ret = {}
    for(let i = 0; i < arr.length; i++) {
        if(arr[i]) {
            extend(ret, arr[i])
        }
    }
    return ret
}
```

--- 
对对象的浅相等进行判断
> 前阶段面试有赞的时候的一道手写代码题，一个朋友在面试头条的时候也遇到过这个题目

```js
function looseEqual(a, b) {
    if (a === b) return true
    const isObjectA = isObject(a)
    const isObjectB = isObject(b)
    if(isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a)
            const isArrayB = Array.isArray(b)
            if(isArrayA && isArrayB) {
                return a.length === b.length && a.every((e, i) => {
                    return looseEqual(e, b[i])
                })
            }else if(!isArrayA && !isArrayB) {
                const keysA = Object.keys(a)
                const keysB = Object.keys(b)
                return keysA.length === keysB.length && keys.every(key => {
                    return looseEqual(a[key], b[key])
                })
            }else {
                return false
            }
        } catch(e) {
            return false
        }
    }else if(!isObjectA && !isObjectB) {
        return String(a) === String(b)
    }else {
        return false
    }
}
```

--- 
确保函数只会之行一次

```js
function once(fn) {
    let called = false
    return function () {
        if(!called) {
            called = true
            return fn.call(this, arguments)
        }
    }
}
```
