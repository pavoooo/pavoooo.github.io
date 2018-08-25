# Node常见加密方法

`Node`提供了`crypto`模块用于支持对数据的加密。`crypto`是通过`openssl`库实现的，所以通过它可以实现`openssl`所支持的大部分加密算法。

这次我们主要看的是常见的`hash`加密算法的实现，比如`md5加密`，`sha1加密`以及`sha256加密`。

`crypto`模块提供了`createHash`方法用来创建`Hash`实例。`Hash`类的实例不能通过`new`关键字直接创建，只能通过这种方法创建。这个方法接收一个参数，这个参数受限于平台`openssl`所支持的算法。我们可以通过如下命令来查看我们的平台所支持的摘要算法

```bash
openssl list-cipher-algorithms
```

这个方法会返回一个`Hash`对象，这个对象可以使用我们指定的`algorithm`生成哈希摘要。

下面的例子就是如何通过`crypto`来生成一个文件的`sha256`摘要：

```js
const fs = require('fs')
const crypto = require('crypto')
const filename = process.argv[2]

const hash = crypto.createHash('sha256')
const input = fs.createReadStream(filename)

input.on('readable', () => {
    const data = input.read()
    if (data) {
        hash.update(data)
    } else {
        console.log(hash.digest('hex'))
    }
})
```
把这个文件保存到本地，命名为`createHash.js`，然后在终端运行

```bash
node createHash.js createHash.js
```
就会看到有如下输出：

```js
ea9c8e5729adb21dcf1faae8157598412e2f36cc1e5c7900f4dcccb4bcce35b4
```
这个就是我们这个文件的`sha256`摘要。

上面只是`hash`实例的一种用法，就是使用`hash.update()`和`hash.digest()`来生成`hash`数据。

其实，`hash`是一种可读写流，我们可以向操作流一样来使用它。比如，我们可以向其写入纯数据，来生成对应的hash数据：

```js
const fs = require('fs')
const crypto = require('crypto')

const filename = process.argv[2]
const hash = crypto.createHash('sha256')

hash.on('readable', () => {
    const data = hash.read() // 是一个buffer
    if (data) {
        console.log(data.toString('hex'))
    }
})

fs.createReadStream(filename).pipe(hash)

```

将上述文件保存在本地并命名为`hashStream.js`，然后在控制台中输入以下命令：

```bash
node hashStream.js createHash.js
```
也会看到和上述相同的输出：

```js
ea9c8e5729adb21dcf1faae8157598412e2f36cc1e5c7900f4dcccb4bcce35b4
```

上面就是`crypto.createHash`的简单的使用。创建`hash`实例仅仅是我们的第一步，后面我们还要调用`hash.update()`和`hash.digest()`才会生成对应的数据。下面我们就来看一下这两个方法应该怎么去使用。

### hash.update(data, [encoding])

`hash.update`接收两个参数，第一个参数就是我们需要加密的数据，可以是`字符串`或者`buffer`。第二个参数是可选的，表明我们数据的编码格式，只能为`utf8`，`binary`和`ascii`三者之一。如果省略了这个参数，当第一个参数是字符串的时候，第二个参数会被视为`binary`。如果第一个参数是一个`buffer`则会忽略第二个参数。

```js
const crypto = require('crypto')

for (let encoding of ['utf8', 'ascii', 'binary']) {
    const hash = crypto.createHash('sha256')
    hash.update('你好', encoding)
    console.log(hash.digest('hex'))
}
//670d9743542cae3ea7ebe36af56bd53648b0a1126162e78d81a32934a711302e

//0f5edd9e7bb77e385283ad29d1740d7fa4cea600cbf90a6e08048fb6858dabe9

//0f5edd9e7bb77e385283ad29d1740d7fa4cea600cbf90a6e08048fb6858dabe9
```
或者

```js
const crypto = require('crypto')

for (let encoding of ['utf8', 'ascii', 'binary']) {
    const hash = crypto.createHash('sha256')
    hash.update(Buffer.from('你好'), encoding)
    console.log(hash.digest('hex'))
}

//670d9743542cae3ea7ebe36af56bd53648b0a1126162e78d81a32934a711302e

// 670d9743542cae3ea7ebe36af56bd53648b0a1126162e78d81a32934a711302e

// 670d9743542cae3ea7ebe36af56bd53648b0a1126162e78d81a32934a711302e
```

`hash.update`是可以连续调用多次的。比如：

```js
const crypto = require('crypto')

const hash = crypto.createHash('sha256')

hash.update('hello')
hash.update('world')

console.log(hash.digest('hex'))
```
和

```js
const crypto = require('crypto')

const hash = crypto.createHash('sha256')

hash.update('helloworld')

console.log(hash.digest('hex'))
```

这两段代码具有相同的输出，所以，我们可以认为`hash.update`具有局部的数据缓存的功能。

### hash.digest([encoding])

这个方法是计算数据hash摘要的最后一步。这个方法的返回值就是数据的hash摘要。这个方法接受一个可选的参数`encoding`。这个值必须是`hex`, `binary`和`base64`其中一个。如果指定了有效的 encoding 参
数，则该方法返回一个字符串，否则返回一个 Buffer 实例。

比如：

```js
const crypto = require('crypto')

for (let encoding of ['hex', 'binary', 'base64']) {
    const hash = crypto.createHash('sha256')
    hash.update('你好')
    console.log(hash.digest(encoding))
}
//  670d9743542cae3ea7ebe36af56bd53648b0a1126162e78d81a32934a711302e
// CT,®>§ëãjõkÕ6H°¡abç£)4§0.
//  Zw2XQ1Qsrj6n6+Nq9WvVNkiwoRJhYueNgaMpNKcRMC4=
```

还有一个需要注意的地方，在 `hash.digest()` 方法执行之后，不能再重复调用 `Hash` 对象，多次调用该方
法将会抛出错误。

比如下面这样就会报错：

```js
const crypto = require('crypto')

const hash = crypto.createHash('sha256')

hash.update('hello')
hash.digest('hex')

hash.digest('hex')
```
会报错

```js
crypto.js:107
  return this._handle.digest(`${outputEncoding}`);
                      ^

Error: Digest already called
    at Hash.digest (crypto.js:107:23)
    at Object.<anonymous> (/Users/zhaosai/Documents/51s/own/articles-demos/t2d.js:9:6)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:188:16)
    at bootstrap_node.js:609:3
```

了解了上面的知识之后，我们就来看看怎么实现对数据的`md5`，`sha1`，`sha256`的加密。可以读一下[这个源码](https://github.com/node-modules/utility/blob/master/lib/crypto.js)

```js
// 实现一个加密数据的入口
function hash(method, s, format) {
    const sum = crypro.createHash(method)
    const isBuffer = Buffer.isBuffer(s)

    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(s)
    }
    sum.update(s, isBuffer ? 'binary' : 'utf8')
    return sum.digest(format || 'hex')
}

// md5算法
function md5(s, format) {
    return hash('md5', s, format);
}

// sha1算法
function sha1(s, format) {
    return hash('sha1', s, format);
}

// sha256算法
function sha256(s, format) {
    return hash('sha256', s, format);
}
```
利用上面的方法，我们就能对数据进行简单的加密了。

---
除了上面的加密算法，有时候我们还会遇见对数据进行`base64`编码的需求，在`Node`中利用`Buffer`的特性，我们也能够很简答的实现。

::: warning
因为base64编码出来的数据可能含有`+`和`/`。所以base64的`url-safe`模式就是把编码出来的`+`和`/`替换成`-`和`_`
::: 

下面是`base64`编码和解码的简单实现：

```js
// 编码
function base64encode(s, urlsafe) {
    if (!Buffer.isBuffer(s)) {
        s = Buffer.from(s)
    }
    let encode = s.toString('base64')

    if (urlsafe) {
        encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
    }

    return encode
}

// 解码
function base64decode(encodeStr, urlsafe, encoding) {
    if (urlsafe) {
        encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/')
    }
    const buf = Buffer.from(encodeStr, 'base64')

    if (encoding === 'buffer') {
        return buf
    }

    return buf.toString(encoding || 'utf8')
}
```