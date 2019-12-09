# axios揭密--axios默认配置和配置合并策略

[[toc]]


前面几篇文章主要是针对`axios`的基本架构和一些核心功能实现的基本分析。后面的几篇文章主要是对`axios`中一些细节进行探讨。这篇文章主要是来看一下`axios`内部的一些默认配置及相关配置的合并策略。

## 默认配置

当我们使用`axios`发送请求的时候，如果没有设置相关的配置项，`axios`会针对这次请求使用默认的配置项。`axios`内部有很多默认配置，下面我们一起来看一下。

`axios`的默认配置在`lib/defaults.js`文件中，基本代码如下

```js
var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
```

接下来我们就详细的看看`axios`有哪些默认配置。

```js
{
    adapter: getDefaultAdapter()
}
```

首先是`adapter`。关于`adapter`我们前面已经详细的分析过，`axios`内部提供了两种`adapter`，分别是针对于浏览器端和`Nodejs`端。

```js
{
    transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');
        if (utils.isFormData(data) ||
            utils.isArrayBuffer(data) ||
            utils.isBuffer(data) ||
            utils.isStream(data) ||
            utils.isFile(data) ||
            utils.isBlob(data)
        ) {
            return data;
        }
        if (utils.isArrayBufferView(data)) {
            return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
        }
        if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
        }
        return data;
    }],
    transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],
}
```

其次是`transformRequest`和`transformResponse`。默认情况下`transformRequest`主要是针对不同的`data`设置不同的`Content-Type`并对`data`进行相关格式的转换。`transformResponse`则尝试将接口返回的数据进行解析，返回`json`格式的数据。

```js
{
    timeout: 0
}
```

其次是`timeout`选项，这个选项主要是设置超时时间的。如果服务器在规定的时间内没有进行响应，则认为超时，并运行超时相关的逻辑。设置为`0`，则表示没有超时的判断。

```js
{
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
}
```

这两个选项主要是对`xsrf`相关的设置，关于`xsrf`我们会在后面详细讲解。这里可先跳过。

```js
{
    maxContentLength: -1
}
```

`maxContentLength`选项主要是针对`Nodejs`端的请求。它指定了`http`响应体的最大字节数。

```js
{
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    }
}
```

`validateStatus`主要是对响应状态码的判断。只有当这个方法返回`true`的时候才认为该响应是成功的。默认情况下`axios`把响应码在`[200, 300)`之间的响应认为是成功的响应。


```js

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
```

上面这些是`axios`内部默认的`header`，这些默认的`header`最终都会被合并在`headers`选项中。

上面这些是`axios`中提供的一些公共配置，不同的`adapter`也有它自己相关的配置，后面我们在分析相关`adapter`的具体实现的时候会详细讲解，这里我们就先跳过。下面我们主要看一下`axios`中的选项合并策略

## 选项合并

`axios`内部制定了一套选项合并相关的策略，主要是将我们传递的`config`和其默认的`config`进行合并以确认最后用于发送请求的`config`。选项合并方法在`lib/core/mergeConfig.js`文件中，实现比较简单，下面我们来具体看一下

```js

module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};
```

`axios`内部的配置合并就是通过上面的方法进行的。我们一点点的来看

```js
var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
];
```

首先声明了三个变量。`valueFromConfig2Keys`指定了哪些属性的值需要从`config2`(可以理解为就是我们自己传入的配置)中获取。如果`config2`中没有设置相关的值，就直接忽略了。`mergeDeepPropertiesKeys`指定了哪些属性的值可能需要深合并。`defaultToConfig2Keys`指定了哪些属性的值优先从`config2`中获取，如果`config2`没有设置就从`config1`中获取。

```js
utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
```
上面的代码就是对`valueFromConfig2Keys`指定的相关属性的合并策略

```js
utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
```

上面代码就是对`mergeDeepPropertiesKeys`指定的相关属性的合并策略。如果在`config2`中对应的value是一个对象的话，就是用深合并的方式将其合并到`config`中。否则就直接将`config`中对应的属性设置为对应的值。如果该值在`config2`中没有设置，就使用`config1`中的值将其合并到`config`中。

```js
utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
```

上面就是对`defaultToConfig2Keys`指定的相关属性的合并策略。优先使用`config2`中的值，如果没有，则使用`config1`中的值。

```js
var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
```

这段代码就是对不在`valueFromConfig2Keys`，`mergeDeepPropertiesKeys`和`defaultToConfig2Keys`三个变量中指定的属性的合并策略。

`axios`的默认配置和相关的合并策略比较简单，也很好理解，这里就没有特别深入的分析。总之就是，传入的配置优先级最高，如果没有传入相关的配置，在发送请求的时候会使用默认配置。

