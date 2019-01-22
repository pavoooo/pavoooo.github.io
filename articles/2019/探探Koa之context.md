# 探探Koa之context

`Koa`应用中的`context`对象，亦被称之为“上下文对象”，它作为中间件函数的第一个参数传入。

```js
app.use(async ctx => {
  // ctx就是我们熟知的上下文对象
})
```

`context`对象就是一个普通的对象，经过`Koa`的封装变的功能十分的强大，可以说中间件中很多的业务行为都是围绕`context`对象操作的。这里，我们首先看一下`context`给我们提供了哪些功能。

```js
// context.js

const ptoto = module.exports = {
  // 提供的各种功能
}
```

```js
assert: httpAssert // require('http-assert')
```

`ctx.assert`方法其实就是`http-assert`模块在`Koa`中的实际应用。具体的细节可以参考[http-assert](https://www.npmjs.com/package/http-assert)。这里，我们需要知道的一件事就是当我们使用`ctx.assert`方法进行断言的时候，在断言失败的情况下，其内部抛出的错误会被`ctx.onerror`方法所捕获。在介绍`application`的时候曾经介绍过中间件执行过程中的错误处理

```js
handleRequest(ctx, fnMiddleware) {
  const res = ctx.res;
  res.statusCode = 404;
  const onerror = err => ctx.onerror(err);
  const handleResponse = () => respond(ctx);
  onFinished(res, onerror);
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```

在`app.handleRequest`方法中，当中间件在执行的过程中发生错误的时候，这个错误处理函数实际上就是`ctx.onerror`方法。而`ctx.assert`方法的使用时机一般也是在中间件函数中。所以，这个方法的断言错误也会导致中间件函数转为`rejected`状态进而被`ctx.onerror`方法处理。

```js
throw(...args) {
  throw createError(...args)
}
```

`ctx.throw`方法在用户需要主动抛出错误的时候被调用。所以，这里也建议大家在需要抛出错误的时候调用`ctx.throw`方法而不是直接`throw`一个错误出来。传递给这个方法的参数会被`createError`函数进行包装，`createError`是`http-errors`模块暴露出来的方法。具体细节可以参考[http-errors](https://www.npmjs.com/package/http-errors)。这里简单的说一下最基本的用法：

```js
createError([status], [message], [properties])
```

- status：错误实例的`status`属性，一般设置为对应的`statusCode`
- message：会被当作错误实例的`message`属性的值
- properties：一个对象
  - expose：是否需要将错误信息暴露
  - headers：发生错误时候的一些响应`header`，会被发送到客户端

比如，我们想抛出一个`400`的错误

```js
app.use(async ctx => {
  ctx.throw(400, '参数错误')
})
```

同样，这里抛出的错误也会被`ctx.onerror`方法进行处理。

上面是`Koa`中推荐的两种抛出错误的方式，下面我们再来看一下`Koa`是如何处理错误的。

```js
 onerror(err) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    if (null == err) return;

    if (!(err instanceof Error)) err = new Error(util.format('non-error thrown: %j', err));

    let headerSent = false;
    if (this.headerSent || !this.writable) {
      headerSent = err.headerSent = true;
    }

    // delegate
    this.app.emit('error', err, this);

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (headerSent) {
      return;
    }

    const { res } = this;
    // first unset all headers
    /* istanbul ignore else */
    if (typeof res.getHeaderNames === 'function') {
      res.getHeaderNames().forEach(name => res.removeHeader(name));
    } else {
      res._headers = {}; // Node < 7.7
    }

    // then set those specified
    // 这个地方感觉不是很合理
    // err.headers 可能为undefined
    this.set(err.headers);

    // force text/plain
    // 发生错误的时候，强制content-type 为 text
    this.type = 'text';
    
    // ENOENT support
    // 设置错误的状态码是 404
    if ('ENOENT' == err.code) err.status = 404;

    // default to 500
    // 如果 用户自己传递的错误码不符合规范，就直接设置为500
    // 也就是说我们传递给ctx.throw()的第一个参数应该是合法的状态码或者状态短语
    if ('number' != typeof err.status || !statuses[err.status]) err.status = 500;

    // respond
    const code = statuses[err.status];
    const msg = err.expose ? err.message : code;
    this.status = err.status;
    this.length = Buffer.byteLength(msg);
    res.end(msg);
  },
```

上面两行代码对参数`err`的类型进行了判断，确保`err`是`Error`的实例。然后，如果是在响应头已经发送的情况下，`ctx.onerror`方法只触发了绑定在`app`实例上的`error`事件，并不会做其它额外的事情。接着会清空所有的响应头，同时设置用户自定义的响应头为本次`http`响应的`header`，并设置`Content-Type`为`text/plain`。接着会判断`err.code`，如果`err.code === ENOENT`，设置响应状态码是`404`。因为如果发生了这个错误，可以认为服务器程序在寻找对应的目录或者文件的时候找不到，这个时候就认为用户请求的资源不存在。接着会判断状态码是否符合规范，如果状态码不符合规范，将其重置为`500`。最下面的几行代码用来确定响应体的，如果用户设置了禁止对外暴露错误信息，那么就将状态码作为响应体，否则将`err.message`属性值作为响应体。

上面就是`ctx.onerror`处理错误的基本过程，总结来看就是为了确定合适的状态码和响应体。

以上就是所有关于`Koa`中处理错误的相关内容。下面我们来看一下`ctx`是怎么操作`cookie`的。

`Koa`中`cookie`的相关操作主要是通过`ctx.cookies`属性进行的。

```js
get cookies() {
  if (!this[COOKIES]) {
    // 接收原生http请求和响应对象作为参数
    this[COOKIES] = new Cookies(this.req, this.res, {
      // 用来签名cookie的值
      // 这些处理都是在Cookies框架中进行处理的
      keys: this.app.keys,
      // cookie是否只能在https协议下安全传输
      // 主要为了防止cookie在传输过程中被监听篡改
      secure: this.request.secure
    });
  }
  return this[COOKIES];
},

set cookies(_cookies) {
  this[COOKIES] = _cookies;
}
```

`ctx.cookies`是一个`getter`和`setter`属性，`ctx.cookies`的`getter`操作主要是通过[cookies](https://www.npmjs.com/package/cookies)这个模块进行的。具体的细节可以参考上述链接，后续也想写一个关于<<Koa中cookie操作那些事>>的文章，那时候再好好分析一下这个模块的内容。当然，如果你不想使用这个模块来操作`cookie`，也可以将`ctx.cookies = 设置你自己的cookie操作对象`，总体来说`Koa`在这一块的处理还算是比较灵活。

上面就是`ctx`对象本身所具有的功能。但我们在使用的时候对`ctx`的操作远远不止这些。为了详细讲解`ctx`的其他功能是怎么来的，先给大家介绍两个东西。

- **__defineGetter__**：将一个函数绑定在当前对象的指定属性上，当那个属性的值被读取时，你所绑定的函数就会被调用。
- **__defineSetter__**：将一个函数绑定在当前对象的指定属性上，当那个属性被赋值时，你所绑定的函数就会被调用。

比如

```js
const obj = {
  a: {
    b: 1
  }
}

obj.__defineGetter__('b', function() {
  return this.a.b
})

obj.__defineSetter__('b', function(val) {
  this.a.b = val
})

obj.b = 2

console.log(obj.b) // 2
```

上面两个方法你就可以认为起到了“委托”的功能。当访问对象的某个属性时，其实访问的是其它属性时。当为某个属性设置值的时候，其实设置的也是其它属性的值。

`Koa`中也是通过这两个特性，为`ctx`代理了`request`和`response`上的方法和属性。如下：

通过`delegate`模块代理`response`对象上的方法和属性

```js
delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');
```

通过`delegate`模块代理了`request`对象上的方法和属性

```js
delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('accept')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip');
```

这里简单的给大家分析一下`delegate`模块的`method`，`access`，`getter`方法的实现

```js
Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function(){
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};
```

上面代码中可以认为`proto`就是`ctx`，`target`就是`request`或者`response`。当调用`Delegator.prototype.method`其实就是在`proto`上添加和`target`同名的属性。

比如，通过上面代码的执行，本来定义在`ctx.response`对象上的`set`属性也可以直接通过`ctx.set`进行调用。

```js
Delegator.prototype.getter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

Delegator.prototype.setter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function(val){
    return this[target][name] = val;
  });

  return this;
};
```

`Delegator.prototype.getter`和`Delegator.prototype.setter`方法的核心就是上面提到的`__defineGetter__`和`__defineSetter__`。这也就是为什么我们可以直接通过`ctx.header`来直接访问定义在`ctx.request`对象上的`header`属性。

```js
Delegator.prototype.access = function(name){
  return this.getter(name).setter(name);
};
```

`Delegator.prototype.access`方法则表示不仅可以委托该属性的获取，也可以委托该属性的设置。当我们设置`ctx.etag`的时候，其实就是设置`ctx.response.etag`的值。

更多关于`delegates`模块的内容请参考[delegates](https://github.com/tj/node-delegates/blob/master/index.js)

上面就是对`Koa`模块`context`上下文对象的全面解析，后面会介绍`Koa`中`request`对象的具体实现细节。
