# 探探Koa之response

`Koa`中的`response`模块是对原生`http`响应对象的封装。同样会按照之前梳理的顺序一一讲解。

![response](https://zhaosaisai.com/blog/response.svg)

## 属性

### socket

`response.socket`属性指向底层`socket`连接

```js
get socket() {
  return this.res.socket;
}
```

### headers

`response.headers`属性用于获取响应头部信息。在`Node7.7`以上的版本中通过`res.getHeaders`方法获取，在其以下的版本通过`res._headers`方法获取。`reponse.header`是这个属性的别名。

```js
get header() {
  const { res } = this;
  return typeof res.getHeaders === 'function'
    ? res.getHeaders()
    : res._headers || {};  // Node < 7.7
}
```

### headerSent

`response.headerSent`属性用来判断响应头是否已经被写入socket

```js
get headerSent() {
  return this.res.headersSent;
}
```

### status

`response.status`属性用来获取和设置响应状态码

```js
get status() {
  return this.res.statusCode;
}

set status(code) {
  // 这个属性的设置必须在响应头发送之前
  if (this.headerSent) return;

  // 对设置的状态码的规范进行检查
  assert('number' == typeof code, 'status code must be a number');
  assert(statuses[code], `invalid status code: ${code}`);

  this._explicitStatus = true;
  // 将设置的状态码设置在res对象的statusCode属性上
  this.res.statusCode = code;
  // http1.x的版本下，同时设置statusMessage信息
  if (this.req.httpVersionMajor < 2) this.res.statusMessage = statuses[code];
  // 如果期望响应体是空，则清空响应体
  // 比如 304 Not Modified
  // 204 No Content等
  if (this.body && statuses.empty[code]) this.body = null;
}
```

当使用`response.status`设置状态码的时候，首先对状态码的类型进行了判断，接着把`this._explicitStatus`属性设置为`true`。`this._explicitStatus`主要用来标识用户是否已经手动设置了状态码，如果用户没有手动设置状态码，则在设置`response.body`时，将状态码设置为`200`。因为有些状态码明确表示响应体可以为空，比如`304`，`204`等，对于这部分状态码，无论用户是否设置了响应体，都会将响应体清空。

### message

`reponse.message`属性用于获取和设置响应状态描述信息

```js
get message() {
  return this.res.statusMessage || statuses[this.status];
}

set message(msg) {
  this.res.statusMessage = msg;
}
```

### body

`response.body`属性用于设置和获取响应体

```js
get body() {
  return this._body;
}

set body(val) {
  const original = this._body;
  this._body = val;

  // no content
  if (null == val) {
    // 强制将其状态码设置为204
    if (!statuses.empty[this.status]) this.status = 204;
    // 没有响应体的情况下，下面几个响应头也不是必须的
    this.remove('Content-Type');
    this.remove('Content-Length');
    this.remove('Transfer-Encoding');
    return;
  }

  // set the status
  // 在没有自定义状态码的情况下，默认是200
  if (!this._explicitStatus) this.status = 200;

  // set the content-type only if not yet set
  // 如果响应头没有设置 Content-Type 响应头
  const setType = !this.header['content-type'];

  // string
  if ('string' == typeof val) {
    // 这个判断html的格式 太简单了吧
    // 也就是说， 如果你设置的文本是以 <开头的 那么就会设置默认的Content-Type 为html类型
    // ctx.body = '<1234' 也会将content-type设置为html
    if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
    // Content-Length 其实是字节的长度
    this.length = Buffer.byteLength(val);
    return;
  }

  // buffer
  if (Buffer.isBuffer(val)) {
    // 没有设置content-type 就设置为 bin
    // buffer的响应Content-Type是application/octet-stream
    if (setType) this.type = 'bin';
    this.length = val.length;
    return;
  }

  // stream
  // 如果设置的响应体是流
  // 判断流的方式
  if ('function' == typeof val.pipe) {
    // 流传输结束后，销毁
    // 大多数情况下和 stream.destroy() 等价
    onFinish(this.res, destroy.bind(null, val));
    // 确保在没有为这个响应流设置错误监听的情况下
    // 设置一个默认的错误监听函数
    ensureErrorHandler(val, err => this.ctx.onerror(err));

    // overwriting
    if (null != original && original != val) this.remove('Content-Length');

    // 流的响应Content-Type是application/octet-stream
    if (setType) this.type = 'bin';
    return;
  }

  // json
  // json形式的响应先移除Content-Length 
  // application 中 respond会设置content-length
  this.remove('Content-Length');
  this.type = 'json';
}
```

`response.body`设置响应体算是最核心的内容了。当把`response.body`设置为`null`的时候，如果`response.status`表示的含义不允许响应体为空，则会把`response.status`设置为`204`。同时从响应头部中移除`Content-Type`，`Content-Length`，`Transfer-Encoding`。因为这几个响应头都是表示响应体的特性，既然响应体为`null`，这几个属性表示的含义也没有太多意义。如果响应体不为空，接着就会在用户没有设置状态码的情况下将状态码设置为`200`。接着是对响应体的格式进行判断，如果响应体是一个字符串，则根据字符串的内容将响应类型设置为`html`或者`text`。 如果响应体是一个`Buffer`，则会将响应类型设置为`bin`，即`Content-Type`设置为`application/octet-stream`。如果响应体是一个`Stream`实例，如果和之前设置的响应体不相同，则移除`Content-Length`头，因为这种类型下，服务器是无法明确判断出响应体的长度的，之后将响应类型同样设置为`bin`。最后就是响应体是`json`的情况，首先会移除在`app`中设置的`Content-Length`头部，然后将响应类型设置为`json`。  

### length

`response.length`用来获取和设置响应体的长度。

```js
get length() {
  const len = this.header['content-length'];
  const body = this.body;

  // 在没有设置content-length的情况下才会通过body的长度确定响应体的长度
  if (null == len) {
    if (!body) return;
    if ('string' == typeof body) return Buffer.byteLength(body);
    if (Buffer.isBuffer(body)) return body.length;
    if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body));
    return;
  }

  return Math.trunc(len) || 0;
}
set length(n) {
  this.set('Content-Length', n);
}
```

注意，响应体的长度是字节的长度，所以需要使用`Buffer.byteLength`获取数据的字节长度。

### lastModified

`response.lastModified`属性用于获取和设置资源最后的编辑时间。其实就是获取和设置`Last-Modified`的值。

```js
get lastModified() {
  const date = this.get('last-modified');
  if (date) return new Date(date);
}

set lastModified(val) {
  if ('string' == typeof val) val = new Date(val);
  this.set('Last-Modified', val.toUTCString());
}
```

### etag

`response.etag`属性用于获取和设置资源的`etag`标识。

```js
set etag(val) {
  if (!/^(W\/)?"/.test(val)) val = `"${val}"`;
  this.set('ETag', val);
}

get etag() {
  return this.get('ETag');
}
```

### type

`response.type`属性用来设置资源的响应类型。

```js
get type() {
  const type = this.get('Content-Type');
  if (!type) return '';
  return type.split(';', 1)[0];
}
```

### writable

`response.writable`属性主要是用来判断响应对象是否可写。

```js
get writable() {
  // can't write any more after response finished
  //  返回一个布尔值，表示响应是否已完成。 默认为 false。 执行 response.end() 之后，该值会变为 true。
  if (this.res.finished) return false;
  // 获取底层的socket连接，这个连接以流的形式存在
  // writable表示流的可写性
  const socket = this.res.socket;
  // There are already pending outgoing res, but still writable
  // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
  if (!socket) return true;
  return socket.writable;
}
```

## 方法

### vary

`response.vary`方法是用来设置响应头`vary`字段的值

```js
vary(field) {
  if (this.headerSent) return;

  vary(this.res, field);
}
```

对于`vary`这个字段，在`http`协议中有着特殊的含义。`vary`主要是源服务器告知下游代理服务器，如何对以后请求的协议头进行匹配，以决定是否可以使用已缓存的请求而不是重新从源服务器获取内容。根本的原因是因为`http`协议中内容协商的存在，对于同一份资源，服务器可能会存在不同的版本。如果这些资源的不同版本都被代理服务器进行了缓存，那代理服务器再次收到请求的时候应该怎么判断响应给客户端合适的资源呢，这就需要通过`vary`字段设定的值进行判断了。所以，`vary`字段的值就是请求中的某些请求头的名称，多个值之间用`,`分隔。缓存服务器进行某接口的网络请求结果数据缓存时，会将Vary一起缓存，方便后续对请求的资源的判断。

### redirect

`response.redirect`方法用于作请求的重定向。

```js
redirect(url, alt) {
  // location
  // 设置Location 表示重定向的地址
  if ('back' == url) url = this.ctx.get('Referrer') || alt || '/';
  this.set('Location', url);

  // status
  // 调用这个方法的时候，确保状态码是重定向状态码
  if (!statuses.redirect[this.status]) this.status = 302;

  // html
  if (this.ctx.accepts('html')) {
    // 对url进行转义
    url = escape(url);
    this.type = 'text/html; charset=utf-8';
    this.body = `Redirecting to <a href="${url}">${url}</a>.`;
    return;
  }

  // text
  this.type = 'text/plain; charset=utf-8';
  this.body = `Redirecting to ${url}.`;
}
```

首先会判断是否重定向到上一步请求，接着会判断状态码是否表示重定向的状态码，最后会根据内容协商机制对客户端进行响应。重定向有两个必要的地方需要设置

- 设置合适的重定向状态码
- 将需要重定向的地址设置在响应头部`Location`字段中。

`http`中规定了以下状态码表示`重定向`状态码

- **300(Multiple Choices)**: 客户端实际请求一个指向多个资源的`url`时会返回这个状态码，比如服务器上有某个`html`文档的英语和法语的版本。返回这个状态码会带有一个选项列表；这样用户就可以选择他希望使用的那一项了。服务器可以在`Location`首部中包含首选的`url`;
- **301(Moved Permanently)**: 在请求的`url`被移除的时候使用。响应的`Location`首部中应该包含资源现在所处的位置。这个状态码表示永久性重定向。
- **302(Found)**: 临时性重定向。`Location`字段表示的`url`只表示临时定位资源。
- **303(See Other)**: 告知客户端应该用另一个`url`来获取资源。新的`url`位于响应报文的`Location`首部。其主要目的就是允许`POST`请求的响应将客户端定向到某个资源上去。
- **305(Use Proxy)**: 说明需要通过代理来访问资源，代理的位置由`Location`字段标出。
- **307(Temporary Redirect)**: 与`301`状态码类似，客户端应该使用`Location`给出的`url`来临时定位资源。将来的请求应该使用老的`url`。

其中`302`, `303`, `307`表示重定向的时候有一些区别：

- 在`HTTP/1.0`中客户端发起了一个`POST`请求，在响应中收到了`302`的状态码，它会接受`Location`首部重定向的`url`，并向那个`url`发起一个`GET`请求。

- 在`HTTP/1.1`中使用`303`来表示相同的行为

- 而且`HTTP/1.1`的规范中也指出了使用`307`状态码来表示临时重定向。

### attachment

`response.attachment`方法用来设置`Content-Disposition`响应头，告诉客户端下载文件，接收一个参数，表示客户端下载的文件的名称。

```js
attachment(filename, options) {
  // 根据文件的后缀设置Content-Type
  if (filename) this.type = extname(filename);
  // 设置 Content-Disposition 的值
  this.set('Content-Disposition', contentDisposition(filename, options));
}
```

### is

`response.is`方法用来判断响应头部`Content-Type`的值是否是给定集合中的一种

```js
is(types) {
  const type = this.type;
  if (!types) return type || false;
  if (!Array.isArray(types)) types = [].slice.call(arguments);
  return typeis(type, types);
}
```

### get

`response.get`方法用于获取响应头部中的某个字段的值

```js
get(field) {
  return this.header[field.toLowerCase()] || '';
}
```

### set

`response.set`用于向响应头中添加响应头

```js
set(field, val) {
  if (this.headerSent) return;

  if (2 == arguments.length) {
    if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v));
    else if (typeof val !== 'string') val = String(val);
    this.res.setHeader(field, val);
  } else {
    for (const key in field) {
      this.set(key, field[key]);
    }
  }
}
```

### append

`response.append`方法用于设置响应头中某个字段的信息。如果设置的响应头已经存在，则会将`val`和现有值进行合并，否则就是创建一个新的响应头

```js
append(field, val) {
  const prev = this.get(field);

  if (prev) {
    val = Array.isArray(prev)
      ? prev.concat(val)
      : [prev].concat(val);
  }

  return this.set(field, val);
}
```

### remove

`response.remove`用于移除某个已经存在的响应头

```js
remove(field) {
  if (this.headerSent) return;

  this.res.removeHeader(field);
}
```

上面就是对`Koa`的`response`模块的解析。至此，关于`Koa`源码中涉及的重要的模块已经全部解析完毕，后续会根据特定的知识点进行梳理。