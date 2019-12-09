# axios揭密--拦截器的实现原理

[[toc]]

`axios`的拦截器是其非常好用且强大的特性之一。拦截器是什么？它能做什么？相信很多`axios`的使用者都会很清楚这两个问题。但在具体分析其实现之前我们还是先来看一下拦截器是什么以及它能够做什么？

`axios`的拦截器有两种，请求拦截器和响应拦截器。请求拦截器让我们能够对发送请求的config作统一的处理，比如添加公参或者添加统一的认证信息。响应拦截器能够让我们对响应的结果作统一的处理，比如响应结果的解构，对错误的响应作统一的处理等。总之，**拦截器就是用来对一些统一的操作做统一的处理。**

下面是它的一个基本使用

```js
import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 添加一些公参
    config.params = {
        ...config.params,
        user: userId,
        requestType: requestType
    }

    // 添加认证信息
    config.headers = {
        ...config.headers,
        Authorization: `encrypt ${token}`
    }

    return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
    return response.data
}, error => {
    // 按照业务自己处理错误信息
    Toast(error.response.data.message)
})
```

上面就是`axios`拦截器的基本使用。通过它，我们能够很方便的对请求中的一些统一操作进行处理。

了解了拦截器的基本使用后，我们就来看一下这么强大的功能是怎么实现的？首先让我们回到`Axios`构造函数上，在`lib/core/Axios`

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```

当我们在声明一个`Axios`实例对象的时候，会在上面添加一个`interceptors`属性。`interceptors`有两个属性`request`和`response`。其中`request`是用来管理请求拦截器的，`response`是用来管理响应拦截器的。且两者都是`InterceptorManager`的实例对象，所以二者在使用的时候是没有任何差别的。

下面我们就来看下`InterceptorManager`是怎么实现的。在`lib/core/InterceptorManager.js`文件中。

`InterceptorManager`同样是一个构造函数，实现如下

```js
function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
```

`InterceptorManager`实现也很简单。它的实例对象只有一个属性`handlers`，用来保存所有的拦截器。当我们调用`use`方法添加拦截器的时候，该方法接收两个参数，可以理解为成功的回调函数和错误的回调函数。这两种回调函数，`axios`会在内部根据实际情况进行调用。所以，拦截器一般都是成对出现的，而且能够添加多个。

假设我们给`axios`添加了如下的拦截器

```js
import axios from 'axios'

axios.interceptors.request.use(onFulfilled1, onRejected1)
axios.interceptors.request.use(onFulfilled2, onRejected2)

// 那么 axios.interceptors.request.handlers就是
[
    {
        fulfilled: onFulfilled1,
        rejected: onRejected1
    },
    {
        fulfilled: onFulfilled2,
        rejected: onRejected2
    },
]
```

多个拦截器会在发送请求前被依次调用。

从`use`方法中我们也能看到该方法是有返回值的，它在调用的时候返回新添加的拦截器在`handlers`中的索引。这个返回值有什么作用呢？它主要是给`InterceptorManager.prototype.eject`使用，我们可以通过调用这个方法并将`use`方法的返回值传入，就能从`handlers`中删除对应的拦截器。

`InterceptorManager.prototype.forEach`方法主要是在内部中使用，后面我们会讲。

上面就是拦截器的添加过程。总结一下，`axios`的拦截器由内部类`InterceptorManager`统一管理，其实例对象的属性`handlers`用来保存添加的每一个拦截器。添加的拦截器会在合适的实际通过原型方法`forEach`遍历调用。

知道了拦截器是怎么添加的，下面我们就来看一下拦截器是怎么触发。

之前我们在分析`Axios.prototype.request`方法的时候提起过拦截器。下面我们再回到那个方法中看一下，在`lib/core/Axios.js` 文件中。

```js
Axios.prototype.request = function (config) {
    // 省略了一些核心代码

  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise
}
```

当我们调用`Axios.prototype.request`方法的时候，其内部会对请求拦截器和响应拦截器进行遍历。在遍历请求拦截器的时候，会将每个拦截器的`fulfilled`和`rejected`成对的依次添加在`chain`队列的首部，而在遍历响应拦截器的时候，会将每个拦截器的`fulfilled`和`rejected`成对的依次添加在`chain`队列的尾部。执行完拦截器的遍历后，`chain`队列可能是下面这种形式

> 这里使用this.interceptors.response.forEach对拦截器进行遍历可以有效的过滤掉那些已经被eject的拦截器

```js
[
    requestFulfiled1, requestRejected1, requestFulfilled2, requestRejected2, ... // 请求拦截器
    dispatchRequest, undefined, // 真正大发送请求的函数
    responseFulfiled1, responseRejected1, responseFulfilled2, responseRejected2, ... // 响应拦截器
]
```

下面的`while`循环会创建一个`promise`的执行链。`while`循环结束后`promise`执行过程可能如下

```js
promise.
    then(requestFulfiled1, requestRejected1).
    then(requestFulfiled2, requestRejected2).
    then(dispatchRequest, undefined).
    then(responseFulfiled1, responseRejected1).
    then(responseFulfiled2, responseRejected2)
```

我们知道`dispatchRequest`是真正的发送请求的函数，这样就保证了所有的请求拦截器都会在请求发送之前被调用，所有的响应拦截器也是在请求响应之后才被调用。

上面就是关于`axios`拦截器的一些具体实现细节，后面我们会分析下`axios`是怎么取消请求的。