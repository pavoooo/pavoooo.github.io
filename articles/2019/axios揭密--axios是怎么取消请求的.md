# axios揭密--axios是怎么取消请求的

`axios`可以使用`cancel token`来取消一个请求。详细的使用文档可以参考[https://github.com/axios/axios#cancellation](https://github.com/axios/axios#cancellation)。下面我们主要看一下这个功能是怎么实现的。

下面是一个使用`cancel token`取消请求的一个例子

```js
import axios from 'axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('https://www.baidu.com', {
    cancelToken: source.token
})

source.cancel()
```

所以，使用`cancel token`取消一个请求一般需要通过如下步骤

- 获取`CancelToken`函数，该函数是`axios.CancelToken`上的方法
- 调用`CancelToken`的静态方法`CancelToken.source`获取`cancel token`
- 将`source.token`设置为`axios`请求对象的`cancelToken`属性
- 在需要的时候调用`source.cancel`方法取消请求

但是，这里对请求的取消并不一定真是取消。具体的情况，我们后面会讨论。

首先我们来看`CancelToken`是怎么实现的，在`lib/cancel/CancelToken.js`文件中

```js
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }
    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
```

`CancelToken`是一个构造函数。当我们调用`CancelToken.source()`方法的时候，会在其内部初始化一个`CancelToken`对象。从`CancelToken.source()`方法中我们也可以看出来

```js
token instanceof CancelToken // true
```

`CancelToken`被调用的时候需要传递一个参数，该参数必须是一个函数。这个函数被调用的时候，也会传递一个参数，这个参数就是用来取消请求的。

所以，当调用`CancelToken.source()`方法的时候返回值`token`和`cancel`分别是`CancelToken`的实例对象和调用`CancelToken`实例化对象的时候传递给`executor`的那个参数函数。

`CancelToken`被实例化的时候会在其实例对象上创建一个`promise`属性。从`CancelToken`的代码中也能看到只有当传递给`executor`扽那个函数，即`cancel`函数被调用的时候这个`promise`才会从`pending`状态变为`resolved`状态。而且当`cancel`函数被调用的时候，也会在`token`上添加一个`reason`属性，其是`Cancel`的实例对象。我们来看看`Cancel`是怎么实现的，在`lib/cancel/Cancel.js`文件中

```js
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
```

`Cancel`构造函数的实现也很简单，`message`属性用来显示请求被`cancel`的原因。`__CANCEL__`就是用来标志这次请求是否被取消了。

上面是对`CancelToken`整个创建流程的一个简单介绍。那取消请求的流程又是什么样的呢，我们来看一下。

让我们回到之前讲过的`dispatchRequest`方法中，该方法有下面一些判断。在`lib/core/dispatchRequest.js`文件中，

```js
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // 省略一些核心代码

    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);

            // Transform response data
            if (reason && reason.response) {
                reason.response.data = transformData(
                reason.response.data,
                reason.response.headers,
                config.transformResponse
                );
            }
        }
        return Promise.reject(reason);
    })
}
```

在调用`dispatchRequest`最前面先调用`throwIfCancellationRequested`函数，这个函数内部会调用`config.cancelToken.throwIfRequested`方法，其中`config.cancelToken`就是我们自己传递的`token`，它的`throwIfRequested`方法就是判断其属性`reason`是否存在，因为只有调用了`cancel`函数，才会在`token`上添加`reason`属性。所以就可以认为这个属性如果存在的化，就认为这个请求已经被取消了。比如下面的代码

```js
const axios = require('axios')
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('https://www.baidu.com', {
    cancelToken: source.token
}).catch((msg) => {
    console.log(msg)
})

source.cancel('cancel token')
```

当`dispatchRequest`函数被调用的时候，已经调用了`source.cancel()`方法取消了请求。所以请求是不会被发送的。

> 在主线程最初执行的时候，dispatchRequest被添加到了微任务队列中，所以我们可以在通过source.cancel()在它被调用之前取消请求

那如果在这个函数调用后，`adapter`调用前我们取消了请求，又怎么处理呢？那我们就来看下`adapter`中是怎么处理的。我们就看一下浏览器端的`adapter`吧，在`lib/adapter/xhr.js`文件中。在这个文件中有下面一段代码

```js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
      // 省略一些核心代码

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
                return;
            }

            request.abort();
            reject(cancel);
            // Clean up request
            request = null;
        });
     }
    // 省略一些核心代码  
  })
```

如果我们传递了`config.cancelToken`，那么在发送请求前先判断`config.cancelToken.promise`是否已经被`resolved`了。如果被`resolved`，就说明我们已经调用了`cancel`函数取消了这次请求。那么就会走`then`回调，并调用`request.abort()`方法终止请求。

> 上面这种情况感觉你只能在transformData中取消请求了

那如果请求被发送了，我们取消了请求怎么办呢？从这段代码中也能看到

```js
module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // 省略一些核心代码

    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);

            // ...
        }
        return Promise.reject(reason);
    })
}
```

在请求被响应后其实也是会对这次请求是否被取消做判断的，如果本次请求被取消了，同样是会`throw`出取消原因的。所以，`axios`做了很严谨的兜底方案。

> 这种情况估计你只能在自己的adapter去取消请求了吧

上面是对`axios`怎么取消请求的做了一个简单的分析。你应该知道`axios`在请求被发送前是真的能取消发送请求的，一旦请求被发送，`axios`是无法终止这次连接的，它只能在请求被响应后，不会把真实的响应数据返回给你，而是把相关的取消请求信息`throw`给你。