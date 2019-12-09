# axios揭密--axios是什么

[[toc]]


`axios`是一个适用于浏览器和`Nodejs`端的网络请求库。功能强大，简单易用。在负责过的很多项目中都使用过它，一直想找机会研究下它很多好用的特性是怎么实现的。正好这几天有点时间，就让我们一起来解密`axios`。

## 使用

下面是`axios`最简单的使用方法

```js
const axios = require('axios')

axios('/api/something')
```

当然你也可以这样用

```js
axios.request({
    url: '/api/something'
})
```

或者这样用

```js
axios.get('/api/something')
```

甚至这样用

```js
axios.create()('api/something')
```

嗯，用法真不少。那你有没有认真思考过，`axios`这么多变的用法是怎么来的？内部是怎样的设计能够让`axios`如此灵活多变？下面我们就一起看下`axios`是什么？

## 准备工作

了解一个工具背后的原理，当然是从源码入手。所以，我们先从`github`上`clone`其源码到本地

```bash
git clone --depth=1 https://github.com/axios/axios.git
```

为了能够运行测试用例，你可能还需要安装相关的依赖

```bash
npm install
```

`axios`的入口文件在`package.json`文件的`main`字段中指定，即`index.js`，这个文件直接`exports`出来的是`lib/axios`。我们可以认为入口文件就是`lib/axios.js`。那我们先来看看这个文件做了什么。

在`lib/axios.js`文件中有如下代码

```js
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

module.exports = axios;
```

从上面这段代码我们知道`axios`是内部函数`createInstance`的返回值，在这个函数内部声明了一个局部变量`instance`并作为该函数的返回值，因此`axios === instance`。而`instance`又是`bind(Axios.prototype.request, context)`函数的返回值，其中`context`是`Axios`的实例对象。这里，我们需要先知道两个东西。

- `Axios`是什么
- `bind`又是什么

我们先来看`Axios`是什么，同样是在`lib/axios.js`文件中

```js
const Axios = require('./core/Axios')
```

所以，`Axios`是从`./core/Axios`文件中暴露出来的。下面我们就先来看一下这个文件，具体的东西先不看，先来看一下这个文件的基本结构

```js
// 一些模块的引入

function Axios(instanceConfig) {
    // 内部实现
}

Axios.prototype.request = function() {}

Axios.prototype.getUri = function() {}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
```

所以，`Axios`就是一个构造函数，在这个构造函数的原型上有如下方法：

```js
Axios.prototype.request
Axios.prototype.getUri

Axios.prototype.delete/get/head/options/put/post/patch
```

其中`Axios`上的`http`的请求方法都是`Axios.prototype.request`的语法糖而已。

那`bind`又是什么，同样在`lib/axios.js`中找到`bind`从何处来。

```js
var bind = require('./helpers/bind');
```

下面的代码是`helpers/bind`的全部内容

```js
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
```

`bind`是一个闭包，实现也很简单。功能和`Function.prototype.bind`类似，比如

```js
const obj = {
    name: 'hello world'
}

function sayName() {
    console.log(this.name)
}

const fn = bind(sayName, obj)

fn() // hello world
```

在了解完`Axios`和`bind`之后，我们在回过头来看看`axios`。上面我们说过`axios`其实就是`createInstance`函数的返回值

```js
function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig)
    const instance = bind(Axios.prototype.request, context)

    return instance
}
```

所以下面的过程是相等的

```js
axios() ===> instance() ===> bind(Axios.prototype.request, context)()
```

到这里我们就需要明白一件事了--当我们在调用`axios`的时候，其实就相当于直接调用`Axios.protype.request`方法，而且这个方法中的`this`指向`context`。

我们再接着往下看，调用完`bind`方法后，还有两行代码

```js
// Copy axios.prototype to instance
utils.extend(instance, Axios.prototype, context);

// Copy context to instance
utils.extend(instance, context);
```

想弄明白这两行代码做什么的，关键是要知道`utils.extend`做了什么处理。这个方法在`lib/utils.js`中

```js
function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
```

`extend`方法的实现也很简单。做的事情也不多，就是将一个对象上的属性和方法添加到另一个对象上。当我们调用`utils.extend(instance, Axios.prototype, context)`后，会把`Axios.prototype`上的属性和方法添加到`instance`上。到底添加了哪些东西呢？上面我们也提过，在`Axios.prototype`上主要有如下方法：

```js
Axios.prototype.request
Axios.prototype.getUri

Axios.prototype.delete/get/head/options/put/post/patch
```

当`utils.extend(instance, Axios.prototype, context)`运行结束后，上面这些方法都被添加到`instance`上，也就是`axios`上。目前`axios`上就具有了如下的方法

```js
axios.request
axios.getUri

axios.delete/get/head/options/put/post/patch
```

上面这个方法也有一个共同点，就是直接调用的时候实际上都是在调用`Axios.prototype`上的同名方法，且内部的`this`都指向`context`。

当执行`utils.extend(instance, context)`之后又在`instance`上添加了什么属性。我们先看一下`Axios`的构造函数声明

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```

所以，每一个`Axios`实例对象，比如`context`都有两个实例属性`defaults`和`interceptors`。这两个属性主要用来干啥，这里我们先不说。执行`utils.extend(instance, context)`，其实就是在`instance`上添加这两个属性。至此，`axios`上应该有如下属性和方法

```js
{
  request: [Function: wrap],
  getUri: [Function: wrap],
  delete: [Function: wrap],
  get: [Function: wrap],
  head: [Function: wrap],
  options: [Function: wrap],
  post: [Function: wrap],
  put: [Function: wrap],
  patch: [Function: wrap],
  defaults: { /* 默认配置 */ },
  interceptors: {
    request: InterceptorManager { handlers: [] },
    response: InterceptorManager { handlers: [] } }
}
```

或许有人会疑惑，`context`被创建后，它肯定会继承`Axios.prototype`上的方法。这样会不会存在重复在`axios`上添加方法的情况。不会，原因是`forEach`的实现中有这么一段代码

```js
for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
    }
}
```

然后，自己体会😂

到这里，我们先做个小小的总结。同样回到最初`axios`的几种调用方式上

```js
axios('/api/something')

axios.request({
    url: '/api/something'
})

axios.get('/api/something')
```

现在你应该明白它们实际调用的是谁

```js
axios('/api/something') // 实际调用的是 Axios.prototype.request

axios.request({
    url: '/api/something'
}) // 实际调用的是 Axios.prototype.request

axios.get('/api/something') // 实际调用的是 Axios.prototype.get
```

下面我们再来看看

```js
axios.create()('/api/somthing')
```

是怎么实现的。同样在`lib/axios.js`文件中有这么一段代码

```js
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```

是不是很简单，`axios.craete()`和`axios()`最本质的区别就是调用`axios`一切都是默认配置，我们必须在调用的时候每次都要传递自己的配置。而调用`axios.create()`的时候，我们可以预先传递一些配置，这些配置会在其返回的`instance`方法中都生效。而且，`axios.create()`的返回值同样具有上面提到的`axios`上所有的方法和属性。同时，我们就可以这样认为`axios`等价于`axios.create()`。

至此，关于`axios`是什么，为什么会有这么多变的使用应该有一个挺清晰的认知了。下面我们来看一下`axios`是怎么实现同时支持浏览器和`Nodejs`的。