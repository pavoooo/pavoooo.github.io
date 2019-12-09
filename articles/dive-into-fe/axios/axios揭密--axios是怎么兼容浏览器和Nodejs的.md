# axios揭密--axios是怎么兼容浏览器和Nodejs的

[[toc]]


`axios`一个比较好的特性就是同时支持浏览器和`Nodejs`端。所以，下面的代码在浏览器和`Nodejs`端都适用。

```js
const axios = require('axios')

axios.get('http://www.baidu.com')
```

在前面我们也提过，`axios`的`http`请求方法都是`Axios.prototype.request`方法的语法糖。所有的调用背后调用的都是`Axios.prototype.request`，知道这一点，我们就可以从`Axios.prototype.request`方法着手研究`axios`是怎么兼容浏览器和`Nodejs`端的。

`Axios.prototype.request`在`lib/core/Axios.js`文件中。代码如下

```js
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
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

  return promise;
};
```

上面就是`Axios.prototype.request`方法的实现细节。这个方法首先对传入的参数`config`的类型进行判断，如果`config`是一个字符串，表示我们传入的就是请求的url。这种情况下首先将`config`转为一个对象，然后将传入的字符串参数作为此对象的`url`属性。

接着会将`config`和`axios`默认的请求配置对象进行合并(ps: 关于默认的配置对象和合并操作后面我们会详细讲述这里只需要知道`axios`会将我们传入的配置和其默认配置进行合并得到最终的请求配置即可)。然后是对请求方法的判断，优先取我们传入的`method`。如果没有设置就取`this.defaults.method`，前面我们也提过，当`axios.create`方法的时候，传入的`config`会和`context.defaults`进行合并。所以，这种场景下的`config`的优先级是高于默认配置的。如果同样没有设置，就默认请求方法是`get`。

接着是对`interceptors`的调用，`axios`的拦截器也是其非常有用的特性之一，估计很多人都使用过，后面我们也会分析其实现细节。这里我们只需要知道

```js
this.interceptors.request // []
this.interceptors.response // []
```

所以，在这种情况下，`chain`的值仍然是`[dispatchRequest, undefined]`。接着是一个`while`循环，会依次将`chain`中两个彼此相邻的元素作为`promise`的`onResolved`和`onRejected`回调传入。因此，这里的`while`可以简写成如下

```js
promise = promise.then(dispatchRequest, undefined)
```

而`promise`默认就是`Promise.resolve(config)`。所以，接下来的流程会进入`dispatchRequest`函数中，且会将`config`作为参数传入。

`dispatchRequest`函数是`Axios.prototype.request`方法中真正触发请求的函数。`dispatchRequest`的实现在`lib/core/dispatchRequest.js`文件中，下面我们来看一下它的具体实现。

```js
module.exports = function dispatchRequest(config) {
   // 省略了一些代码
  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    // 省略了一些代码
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    // 省略了部分核心代码
    return Promise.reject(reason);
  });
};
```

`dispatchRequest`的实现分为两部分。首先是对`headers`和`data`的处理，接着就是发送请求及对响应数据的处理。

关于`headers`的处理比较好理解，就是将一些公用的`header`，某些请求特有的`header`以及我们调用时传入的`header`合并到一个对象中作为请求的`header`数据。

对`data`的处理，我们可以认为是对请求体的处理。这也是`axios`一个比较好用的特性，我们可以在指定`config`中设置`transformRequest`属性在请求被发送之前对`headers`和请求`data`做最后的处理。同时也可以指定`transformResponse`属性对响应数据在传给`then`回调之前进行处理。这部分的实现也很简单，我们先来瞅一瞅。

对请求和响应的处理都是通过调用`transformData`函数进行的，这个函数在`lib/core/transformData.js`中。实现如下

```js
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};
```

这个函数接收三个参数，如果我们是对请求数据进行转换，则这三个参数依次是`请求体(data)`，`请求头(header)`，以及请求转换函数`transformRequest`。如果我们是对响应数据进行转换，则这三个参数依次是`响应体(data)`，`响应头(header)`以及响应转换函数`transformResponse`。这个方法会依次调用每一个转换函数，对`data`进行转换，当然，你也可以在转换的过程中操作`header`，并将最后一个函数的返回值作为请求或响应的`data`。比如

```js
// 下面是我们的调用

axios({
    transformRequest: function(data, headers) {
        data.userId = 'saisai'
        headers.userId = 'saisai'

        return data
    },
    headers: {
        userId: 'zhao'
    },
    data: {
        name: 'saisai'
    }
})
```
请求发出去的实际`data`和`header`分别是

```js
data: {
    name: 'saisai',
    userId: 'saisai'
}

headers: {
    userId: 'saisai'
}
```

这块内容比较好理解，下面我们继续往下看。代码运行到这里，基本上所有的合并操作，转换操作都已经完成了。下面就是实实在在调用方法发送请求的操作了。

下面是`dispatchRequest`函数的代码片段

```js
module.exports = function dispatchRequest(config) {
    // ....

    return adapter(config).then(function onAdapterResolution() {

    }).catch(function onAdapterRejection() {

    })
}
```

`dispatchRequest`真正发送请求的方法是`adapter`。那`adapter`又是什么呢？分析其实现前，我们先做一个简单的解释。`adapter`直译过来就是适配器。它是`axios`非常好用的特性之一，`axios`能够同时支持浏览器和`Nodejs`端就是通过`adapter`实现的。它的强大之处就在于你可以自定义自己的`adapter`，自己来决定发送请求的细节。这就让我们在任意支持`javascript`的平台上使用`axios`成为可能。比如`weex`，我们完全可以根据`weex`网络请求方法实现自己的`adapter`。发送请求之前的事情`axios`帮你做，请求响应后的事情`axios`也帮你做，而你只需要做的事情就是基于平台实现自己的`adapter`，且能完全利用`axios`的所有特性。

`axios`内部提供了两种`adapter`，分别是浏览器端和`Nodejs`端的。这两种`adapter`的实现细节我们后面会分析，这里我们先看一下实现`adapter`需要遵循哪些约定。

下面是`axios`实现的浏览器端的`adapter`，在`lib/adapters/xhr.js`中。 下面的代码省略了一些核心实现，

```js
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        // ...
        request.onreadystatechange = function handleLoad() {
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            settle(resolve, reject, response);
        }

        request.onabort = function handleAbort() {
            // ...
            reject(createError('Request aborted', config, 'ECONNABORTED', request));
        }

        request.onerror = function handleError() {
            // ...
            reject(createError('Network Error', config, null, request));
        }

        request.ontimeout = function handleTimeout() {
            // ...
            reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
        }

        // ...
    })
}
```

- 首先，`adapter`应该返回一个`Promise`。当请求成功，在`promise`的状态变成`resolved`的时候，`resolve`的数据格式应该和`axios`的保持一致，即至少应该包含下面的一些信息

```js
response = {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config: config,
    request: request
};
```

官方也建议我们不要直接`resolve`响应的数据，而是交给内部方法`settle`进行处理。那`settle`又是什么？`settle`定义在`lib/core/settle.js`文件中。代码如下

```js
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};
```

`settle`函数主要是对响应的状态码进行判断。如果符合我们验证，则认为响应是成功的，然后`resolve`我们的数据。否则就认为响应是失败的，然后`reject`。

- 其次，当请求出错的时候，比如网络错误，响应超时，响应被取消等错误发生的时候，仍然建议使用内部方法`createError`对错误信息进行包装后`reject`。

下面是`createError`的实现细节，在`lib/core/createError.js`文件中

```js
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
}
```

五个参数的含义分别是

- message: 错误信息。可根据错误场景自定义
- config: 请求配置
- code：错误码。比如 ECONNABORTED
- request：发送请求的对象。浏览器端是`XMLHttpRequest`实例对象。`Nodejs`端是`http.request`
- response：响应对象

这个函数依赖的`enhanceError`函数定义在`lib/core/enhanceError.js`中，实现如下

```js

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};
```

这个函数主要是对传入的`error`对象进行增强，增加了一些额外的错误信息。同时对`toJSON`方法进行重写，所以你可以通过调用`error.toJSON`来获取更详细的错误信息。

上面就是实现`adapter`一些注意事项。`Nodejs`端的`adapter`实现和这相似。这里我们就不多介绍，后面再分析其实现的时候会详细介绍。

至此，我们就明白了`axios`是如何同时支持浏览器和`Nodejs`端的了吧。下面我们就看一下`axios`的拦截器是怎么实现的。