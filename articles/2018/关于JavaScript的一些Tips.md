# 关于JavaScript的一些Tips

当我们在js中排序数组的时候，我们首先会想到的就是`sort`这个方法。`sort`不仅可以使用默认的排序规则给我们的数组进行排序，我们也可以自定义排序规则。比如：

```js
const arr = [1, 6, 3, 9, 3, 9, 1]
arr.sort((a, b) => a - b) // [1, 1, 3, 3, 6, 9, 9]
```

但是，当我们想向一个非`ASCII`编码的数组进行排序的时候，可能会得到意想不到的结果。比如：

```js
const arr =  = ['único','árbol', 'cosas', 'fútbol']
arr.sort((a, b) => a - b) // ["único", "árbol", "cosas", "fútbol"]
```

为了解决这种非`ASCII`编码的数组的排序问题，我们可以通过ECMAScript国际化API提供的[localeCompare](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)和[Intl.Collator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Collator)来解决。比如：

```js
const arr =  = ['único','árbol', 'cosas', 'fútbol']
arr.sort((a, b) => a.localeCompare(b)) // ["árbol", "cosas", "fútbol", "único"]
```
或者

```js
const arr =  = ['único','árbol', 'cosas', 'fútbol']
arr.sort(Intl.Collator().compare) // ["árbol", "cosas", "fútbol", "único"]
```

---

写一个可以接受单个参数也可以接受一个数组作为参数的函数。

以前的我，可能会这样写：

```js
function printElement(words) {
    if (typeof words === 'string') {
        console.log(words)
    } else {
        for (let i = 0; i < words.length; i++) {
            console.log(words[i])
        }
    }
}
```

或者这样做个`规范化`处理：

```js
function printElement(words) {
    const arr = typeof words === 'string' ? [words] : words

    for (let i = 0; i < arr.length; i++) {
        console.log(words[i])
    }
}
```

现在，我可能就这样写了：

```js
function printElement(words) {
    const arr = [].concat(words || [])
    for (let i = 0; i < arr.length; i++) {
        console.log(words[i])
    }   
}
```
这是因为`Array.concat`可以接受一个数组或者单个参数或者多个参数。

--- 

我们可以使用es6种的`默认参数`来强制某个函数的参数必须传入。

```js
const _err = msg => throw new Error(msg)

function aAndBIsRequired(a = _err('a是必传的'), b = _err('b是必传的')) {
    // Do something
}

aAndBIsRequired( 10 ) // throws Error, b是必传的

aAndBIsRequired( undefined, 10 ) // throws Error, a是必传的
```

---

如果我们以前 检查一个字符串是否包含某个字符，我们可能会使用`indexOf`来这样写

```js
const str = 'abcde'

if (str.indexOf('a') > -1) {
    console.log('exists')
} else {
    console.log('none exists')
}
```
现在我们可以借助`位运算符~`来更简单的写我们的代码：

```js
const str = 'abcde'

if (!!~str.indexOf('a')) {
    console.log('exists')
} else {
    console.log('none exists')
}
```
因为`~-1 === 0`；

--- 

推荐使用`闭包`而不是`bind`来向我们的回调函数传递参数。因为[闭包的性能更好](https://jsperf.com/bind-vs-closure-23)

```js
function clickFn(a, b) {
    return function click() {
        // do smoething
    }
}

document.addEventListener('click', clickFn(1, 2))
```
---

字符串拼接，我们不使用`模版字符串`来拼接字符串。以前可能会这样写：

```js
const str1 = 'a'
const str2 = 'b'
const str3 = 'c'

console.log(str1 + str2 + str3)
```
 
 现在我们应该这样写：

 ```js
const str1 = 'a'
const str2 = 'b'
const str3 = 'c'

console.log(''.concat(str1, str2, str3))
// 或者
console.log([str1, str2, str3].join(''))
 ```
 这样我们就不用将变量显示的进行字符串的转换了。

 --- 

 使用[Fisher-Yates Shuffling](https://www.wikiwand.com/en/Fisher%E2%80%93Yates_shuffle)对数组进行随机排序。

 ```js
function shuffle (arr) {
    let i, j, temp
    for (i = arr.length; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
}
 ```

 --- 

 将数字字符串转化成数字[最快的方法](https://jsperf.com/number-vs-parseint-vs-plus/29)是使用`+`

 ```js
const n = '1'
console.log(+n)
 ```

 --- 

 写一个简单的cache函数

 ```js
const cached = (fn) => {
    let caches = {}
    return (...args) => {
        const key = [...args].toString()
        return key in caches ? caches[key] : (caches[key] = fn.apply(null, args))
    }
}
 ```
 
 ---

 以前我们可能使用下面的方法对`arguments`进行操作：

 ```js
function fn() {
    const args = Array.prototype.slice.call(arguments)
    // Do something
}
 ```
 这种方法是很方便。但是但是但是，如果我们将`arguments`作为参数传递给任何的方法，`chrome`和`node`所使用的`V8`引擎都会跳过对其的优化，这会使性能变得很慢。传递`arguments`给任何方法被称为`leaking arguments`。

所以，为了我们必要的性能，我们可以借助下面的方法：

```js
function fn() {
    const args = new Array(arguments.length)

    for (let i = 0; i < args.length; i++) {
        args[i] = arguments[i]
    }
}
```
具体的请看[Optimization-killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)

---

我最喜欢的除`Set`方法之外的数组的去重的方法：

```js
function unique(arr) {
    return arr.filter((v, i, arr) => arr.indexOf(v) === i)
}
```

---

`JSON.stringify`的第二个参数，现在才知道第二个参数这么好玩。因为以前只这么玩过：

```js
const obj = {
    'a': true,
    'b': false,
    'c': true
}
// 格式化输出
console.log(JSON.stringify(obj, null, 2))

// {
//   "a": true,
//   "b": false,
//   "c": true
// }
```
我们可以给第二个参数传递一个数组，这表示只序列化我们指定的key
```js
const obj = {
    'a': true,
    'b': false,
    'c': true
}
// 格式化输出
console.log(JSON.stringify(obj, ['a', 'b'], 2))

// {
//   "a": true,
//   "b": false
// }
```
我们还可以传递一个函数，这个函数接受`key`和`value`作为参数，`key`为空字符串的时候，表示整个对象。这就给予了我们在序列化前对对象进行修改的能力。

```js
const obj = {
    'a': true,
    'b': false,
    'c': true
}
function selectedProperties(key, val) {
    // the first val will be the entire object, key is empty string
    if (!key) {
        return val;
    }

    if (key === 'a' || key === 'c') {
        return Number(val);
    }

    return;
}
// 格式化输出
console.log(JSON.stringify(obj, selectedProperties, 2))

// {
//   "a": 1,
//   "c": 1
// }
```

--- 

监听`document`已经完全加载：

```js
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        // Do something
    }
}
```

---

写一个简单的事件绑定

```js
function handleEvent(eventType, options, ctx) {
    const el = options['el'] || document.documentElement
    const callback = options['callback'] || () => {}
    const useCapture = options['capture'] || false

    function handler(event) {
        if (typeof callback === 'function') {
            return callback.call(ctx, event)
        }
    }

    el.addEventListener(eventType, handler, useCapture)

    handler.destroy = function() {
        return el.removeEventListener(eventType, handler, useCapture)
    }

    return handler
}
```

---

获取文件的后缀名

```js
function getFileExtension(filename = '') {
    return filename.slice((filename.lasIndexOf('.') - 1 >>> 0) + 2)
}
```

--- 

复制到剪贴板

```js
document.querySelector('#input').select()
document.exetCommand('copy')
```

