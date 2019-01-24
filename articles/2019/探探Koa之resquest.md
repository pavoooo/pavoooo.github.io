# 探探Koa之resquest

`Koa`中`request`模块是对原生`http`请求`req`对象的包装和增强。下面会按照先前梳理的顺序为大家一一介绍各个属性和方法的具体实现细节。

![request](https://zhaosaisai.com/blog/request.svg)

## 属性

### headers和header

`request`对象的`headers`和`header`属性是用来获取和设置请求头的。其中`request.headers`是`request.header`的别名。

```js
get header() {
  return this.req.headers
}

set header(val) {
  this.req.headers = val
}
```

### method
`request.method`用来获取或设置请求方法

```js
get method() {
  return this.req.method;
}

set method(val) {
  this.req.method = val;
}
```

### url
`request.url`用来获取或设置请求`url`

```js
get url() {
  return this.req.url;
}

set url(val) {
  this.req.url = val;
}
```

### path

`request.path`用来获取或设置请求路径

```js
get path() {
  return parse(this.req).pathname;
}

set path(path) {
  const url = parse(this.req);
  if (url.pathname === path) return;

  url.pathname = path;
  url.path = null;

  this.url = stringify(url);
}
```

> 设置`path`的时候会保留原来的查询字符串等数据，同时也会对`url`进行更新。

### query

`request.query`用来获取或设置请求的查询字符串对象

```js
get query() {
  const str = this.querystring;
  const c = this._querycache = this._querycache || {};
  // 会把query进行缓存
  return c[str] || (c[str] = qs.parse(str));
}

set query(obj) {
  this.querystring = qs.stringify(obj);
}
```

> 设置`request.query`本质上改变的是查询字符串，所以会重置`request.querystring`属性。

### querystring

`request.querystring`获取或设置请求的查询字符串。

```js
get querystring() {
  if (!this.req) return '';
  return parse(this.req).query || '';
}
set querystring(str) {
  const url = parse(this.req);
  if (url.search === `?${str}`) return;
  url.search = str;
  url.path = null;

  this.url = stringify(url);
}
```

设置`request.querystring`也会导致`request.url`的改变。

### search

`request.search`获取或设置请求的查询字符串。其结果会包含前置的`?`。

```js
get search() {
  if (!this.querystring) return '';
  return `?${this.querystring}`;
}

set search(str) {
  this.querystring = str;
}
```

::: warning
`request.path`，`request.query`，`request.querystring`，`request.search`的改变都会导致`request.url`的改变。
:::

### ips

`request.ips`用来获取客户端的ip地址列表。如果在开启了代理模式，这个属性也会包含所有经过的代理服务器的`ip`地址。

```js
get ips() {
  const proxy = this.app.proxy;
  const val = this.get('X-Forwarded-For');
  return proxy && val
    ? val.split(/\s*,\s*/)
    : [];
}
```

`Koa`判断是否在代理模式下，是通过`app.proxy`属性判断。在获取`ip`地址的时候，会通过一个特殊的请求头`X-Forwarded-For`字段来获取所有经过的代理服务器的`ip`地址。这里先看一下这个字段是什么含义。

`X-Forwarded-For`是一个`HTTP`扩展头部，用来表示`HTTP`请求真实的`IP`。目前已经成为标准，被广大`HTTP`代理，负载均衡服务广泛使用。`X-Forwarded-For`请求头的格式如下：

```bash
X-Forwarded-For: client, proxy1, proxy2...
```

`XFF`的内容由`[英文逗号 + 空格]`进行分隔，最开始的部分是离用户最远的设备的`ip`，然后是每一级代理的`ip`。

比如，一个`HTTP`请求在到达服务器之前经历了三个代理`Proxy1`，`Proxy2`，`Proxy3`，`IP`地址分别是`IP1`，`IP2`，`IP3`，用户真实的`IP`地址为`IP0`，则根据标准，`X-Forwarded-For`的值就是`IP0, IP1, IP2`。因为`Proxy3`是直连服务器的，所以在列表中并不会出现`IP3`，`IP3`在服务端可以通过`Remote Address`进行获取。因为`HTTP`是基于`TCP`的连接，`Remote Address`来自`TCP`连接，表示与服务端建立连接的那个设备的`IP`。这个例子中就是`IP3`。而且这个`IP`地址是无法伪造的，在`Node.js`中我们可以通过`req.connection.remoteAddress`来获取。关于`X-Forwarded-For`更多的信息请参考[https://imququ.com/post/x-forwarded-for-header-in-http.html](https://imququ.com/post/x-forwarded-for-header-in-http.html)。

明白了`X-Forwarded-For`字段的含义后，对于怎么获取`ips`的值就一目了然了。首先会判断如果在代理模式下，将`X-Forwarded-For`的值进行`split`后返回，否则就返回一个空数组。

### ip

`request.ip`属性默认以`request.ips`的第一个元素作为用户的`ip`地址，在这个值不存在的情况下，以`request.socket.remoteAddress`的值作为用户的`ip`地址。`request.socket`属性后面会讲到。

```js
get ip() {
  if (!this[IP]) {
    this[IP] = this.ips[0] || this.socket.remoteAddress || '';
  }
  return this[IP];
},

set ip(_ip) {
  this[IP] = _ip;
},
```

### accepts内容协商属性

“内容协商”是`http`提供的一种机制，可以让服务器决定哪些资源最适合客户端。内容协商主要涉及到如下四个首部：

- `Accept`：告知服务器发送何种媒体类型
- `Accept-Language`：告知服务器发送何种语言
- `Accept-Charset`：告知服务器发送何种字符集
- `Accept-Encoding`：告知服务器采用何种编码

服务器进行响应的时候，也会通过`响应头`明确表明资源的特性。上面四种协商首部对应的响应首部是`Content-Type`，`Content-Language`，`Content-Type`，`Content-Encoding`。

`Koa`中内容协商是通过[accepts](https://www.npmjs.com/package/accepts)库进行判断的，针对上面四种内容协商头部都有对应的判断方法。

```js
get accept() {
  return this._accept || (this._accept = accepts(this.req));
}
set accept(obj) {
  return this._accept = obj;
}

accepts(...args) {
  return this.accept.types(...args);
}

acceptsEncodings(...args) {
  return this.accept.encodings(...args);
}

acceptsCharsets(...args) {
  return this.accept.charsets(...args);
}

acceptsLanguages(...args) {
  return this.accept.languages(...args);
}
```

其中`request.accepts`是对`Accept`头部的判断，`request.acceptsEncodings`是对`Accept-Encoding`头部的判断`request.acceptsCharsets`是对`Accept-Charset`头部的判断`request.acceptsLanguages`是对`Accept-Language`头部的判。

### origin

`request.origin`用于获取`url`的来源，包含`protocol`和`host`

```js
get origin() {
  return `${this.protocol}://${this.host}`;
}
```

### href

`request.href`用于获取请求完整的`url`

```js
get href() {
  // support: `GET http://example.com/foo`
  if (/^https?:\/\//i.test(this.originalUrl)) return this.originalUrl;
  return this.origin + this.originalUrl;
}
```

### host

`request.host`用于获取当前主机。当 `app.proxy` 是 `true` 时支持 `X-Forwarded-Host`，否则使用 `Host`。

获取`host`面临着和获取`ips`同样的情况，就是客户端并不是直连我们的服务器应用，可能会经过各种代理服务器。我们并不能直接通过`host`请求头获取客户端主机信息，同样会通过一个特殊的请求头`X-Forwarded-Host`获取客户端和代理服务器的`host`信息。

`X-Forwarded-Host`的含义就是`the original host requested by the client in the Host HTTP request header`。其实就是保存着客户端请求最原始的`host`信息。

```js
get host() {
  // 如果配置了app.proxy
  // 就会从request header中获取X-Forwarded-Host解析host
  const proxy = this.app.proxy;
  let host = proxy && this.get('X-Forwarded-Host');
  if (!host) {
    // http2 从:authority中获取
    if (this.req.httpVersionMajor >= 2) host = this.get(':authority');
    // 最后才会从 request Host这个header中获取
    if (!host) host = this.get('Host');
  }
  if (!host) return '';
  // 如果配置了多个，则取第一个
  return host.split(/\s*,\s*/, 1)[0];
}
```

> `host`包含域名和端口号

### hostname

`request.hostname`用于获取请求的域名，不包含端口。

```js
get hostname() {
  const host = this.host;
  if (!host) return '';
  if ('[' == host[0]) return this.URL.hostname || ''; // IPv6
  // hostname不包含端口
  return host.split(':', 1)[0];
}
```

### URL

`request.URL`用于获取以`WHATWG parsed URL`方式解析的`url`。并把解析结果缓存在`request.memoizedURL`属性中。

```js
get URL() {
  /* istanbul ignore else */
  if (!this.memoizedURL) {
    const protocol = this.protocol;
    const host = this.host;
    const originalUrl = this.originalUrl || ''; // avoid undefined in template string
    try {
      this.memoizedURL = new URL(`${protocol}://${host}${originalUrl}`);
    } catch (err) {
      // 为什么不解析一下呢
      this.memoizedURL = Object.create(null);
    }
  }
  return this.memoizedURL;
}
```

### fresh

`request.fresh`属性用于判断请求的内容是否有效。其实就是用来判断客户端缓存是否可用。这个方法主要是对协商缓存请求的判断，依赖请求头中的`If-None-Match`和`If-Modified-Since`。

```js
get fresh() {
  const method = this.method;
  const s = this.ctx.status;

  /**
   * 检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 If-None-Match / ETag, 
   * 和 If-Modified-Since 和 Last-Modified 之间的缓存协商。 
   * 在设置一个或多个这些响应头后应该引用它。
   */
  // GET or HEAD for weak freshness validation only
  if ('GET' != method && 'HEAD' != method) return false;

  // 2xx or 304 as per rfc2616 14.26
  // 响应成功的时候才会去判断请求是否新鲜
  if ((s >= 200 && s < 300) || 304 == s) {
    // 通过对请求头和响应头的比较
    // 判断客户端缓存是否可用
    return fresh(this.header, this.response.header);
  }

  return false;
}
```

具体是怎么判断请求是否“新鲜”，主要是通过[fresh](https://www.npmjs.com/package/fresh)库检验的，后续会对这个库进行解析。

### stale

`request.fresh`相反的含义

```js
get stale() {
  return !this.fresh;
}
```

### idempotent

`request.idempotent`属性主要是用来判断请求方法是否是幂等的。`http`的幂等方法是指无论调用多少次都不会有不同结果的`http`方法。它无论是调用一次还是调用十次，结果都是一样的。`http`中幂等方法有`options`，`get`，`head`，`put`，`delete`，`trace`。

```js
get idempotent() {
  const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
  return !!~methods.indexOf(this.method);
}
```

### socket

`request.socket`获取底层请求的`socket`连接。

```js
get socket() {
  return this.req.socket;
}
```

### charset

`request.charset`获请求头`Content-Type`中设置的`charset`。主要是通过[content-type](https://www.npmjs.com/package/content-type)库进行解析。

```js
get charset() {
  try {
    const { parameters } = contentType.parse(this.req);
    return parameters.charset || '';
  } catch (e) {
    return '';
  }
}
```

### length

`request.length`主要用于获取请求体的长度，其实就是获取请求头部`Content-Length`的值。

```js
get length() {
  const len = this.get('Content-Length');
  if (len == '') return;
  return ~~len;
}
```

### protocol

`request.protocol`用于获取客户端请求所使用的协议。`Koa`在获取请求所使用协议的时候，在某些情况下也会通过一个特殊的请求头`X-Forwarded-Proto`来判断。这个字段就是用来获取客户端和代理服务器以及负载均衡服务器之间的连接所采用的协议。

```js
get protocol() {
  // 如果是https协议的请求，这个属性是true
  if (this.socket.encrypted) return 'https';
  // 否则，在没有代理的情况下，直接返回http协议
  if (!this.app.proxy) return 'http';

  // 有代理的情况下再通过X-Forwarded-Proto字段获取请求的协议
  // X-Forwarded-Proto: https
  const proto = this.get('X-Forwarded-Proto');
  return proto ? proto.split(/\s*,\s*/, 1)[0] : 'http';
}
```

### secure

`request.secure`用来判断请求是否采用了安全传输，其实就是请求协议是否是`https`。

```js
get secure() {
  return 'https' == this.protocol;
}
```

### subdomains

`request.subdomains`属性主要是用来获取子域名数组。

```js
get subdomains() {
  // 设置需要获取的子域的偏移量
  const offset = this.app.subdomainOffset;
  const hostname = this.hostname;
  // 测试 input 是否是 IP 地址。无效的字符串则返回 0，IPv4 地址则返回 4，IPv6的地址则返回 6。
  // 如果你的hostname是 192.168.22.214这种情况，是无法判断子域的
  // 直接返回一个空数组
  if (net.isIP(hostname)) return [];
  return hostname
    .split('.')
    .reverse()
    .slice(offset);
}
```

### type

`request.type`用于判断请求的资源类型

```js
get type() {
  const type = this.get('Content-Type');
  if (!type) return '';
  return type.split(';')[0];
}
```

## 方法

`request`提供了便捷的方法`is`和`get`。

### is

`request.is`方法主要用于判断请求的`Content-Type`是否是给定类型中的一种。

```js
is(types) {
  if (!types) return typeis(this.req);
  if (!Array.isArray(types)) types = [].slice.call(arguments);
  return typeis(this.req, types);
}
```

### get

`request.get`方法主要是用来获取请求头中某个字段的值。

```js
get(field) {
  const req = this.req;
  switch (field = field.toLowerCase()) {
    case 'referer':
    case 'referrer':
      return req.headers.referrer || req.headers.referer || '';
    default:
      return req.headers[field] || '';
  }
}
```

上面就是对`request`模块内容的全解析，后面我们会继续对`response`所提供的那些功能的探索。