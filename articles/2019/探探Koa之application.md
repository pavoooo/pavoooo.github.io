# 探探Koa之application

`Koa`启动`http`服务是十分简单的。

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello koa'
})

app.listen(8080)
```

一般来说，就如下三个主要的步骤：

- 创建`Koa`实例 —— new Koa
- 添加中间件 —— app.use()
- 启动服务 —— app.listen

## 构造函数

我们创建`Koa`服务的第一步就是创建`Koa`实例，这也就表明了`Koa`是一个类。

```js
class Application extends Emitter {
  // ...
}
```

从上述源码中可以看到，`Koa`继承自`Emitter`，所以，我们可以在`Koa`实例上监听任意我们想要监听的事件。比如

```js
const app = new Koa()

// 监听一个自定义事件
app.on('someEvent', someEventListener)

// 设置error监听器
app.on('error', yourErrorHandler)
```

这也就是为什么我们可以在`app`对象上通过监听`error`事件监听我们应用运行过程中发生的错误，一般`error`事件是不需要我们主动触发的，`Koa`会在我们的应用发生错误的时候，主动触发这个事件。我们所需要做的就是在事件回调中自定义我们的错误处理逻辑。

当我们创建`app`实例的时候，`constructor`方法会被调用。这时，会在`app`实例上添加如下属性。

```js
constructor() {
  super()
  this.proxy = false;
  this.middleware = [];
  this.subdomainOffset = 2;
  this.env = process.env.NODE_ENV || 'development';
  this.context = Object.create(context);
  this.request = Object.create(request);
  this.response = Object.create(response);
}
```

- **proxy**：这个属性主要就是用来告诉`Koa`，我们的请求是否会经过代理服务器。如果把这个属性设置为`true`，`Koa`在后续处理请求的时候，会优先处理和代理相关的特性，后续会说到。

- **middleware**：这个属性是一个内部属性，一般是不需要从外部直接访问的。它主要是用来保存我们传递给`app`实例的中间件方法的。

- **subdomainOffset**：这个属性在我们获取子域名信息的时候有用。默认为2，比如，我们的子域是`api.internal.domain.baidu.com`。则

```js
ctx.subdomains // ['api', 'internal']
```

后续会详细讲解获取过程。

- **env**：设置`Koa`服务运行时候的环境变量，和`process.env.NODE_ENV`相等。

- **context**：基于`context`文件中暴露出来的对象为原型创建一个对象，这样我们可以通过`app.context`获取`context`上的属性和方法

- **request**：含义同上

- **response**：含义同上

上面就是创建实例的过程中的一些操作。实例创建结束后，我们需要做的就是通过`app.use`方法添加我们的中间件函数。

```js
use(fn) {
  // 参数必须是函数
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
  // 如果说是generator函数，就将generator函数转化为async 函数
  if (isGeneratorFunction(fn)) {
    deprecate('Support for generators will be removed in v3. ' +
              'See the documentation for examples of how to convert old middleware ' +
              'https://github.com/koajs/koa/blob/master/docs/migration.md');
    fn = convert(fn);
  }
  debug('use %s', fn._name || fn.name || '-');
  // 将我们添加的中间件函数保存在
  // app.middleware属性中
  this.middleware.push(fn);
  // 返回当前app实例，这个返回结果保证了use方法的链式调用。
  return this;
}
```

`use`方法的实现很简单，接收一个函数作为参数。首先判断参数是不是`generator`函数，这个主要是为了兼容一些只支持`Koa@1`的中间件。`generator`形式的参数会通过`koa-convert`方法进行转换，将其转换成`Koa@2`所支持的`promise`风格的函数。之后，将这个中间件函数保存在`app.middleware`属性中。

上面就是`use`的实现过程，下面才是真正的启动`http`服务的操作。当我们调用`app.listen`方法的时候，`http`服务才会真正的启动。

```js
listen(...args) {
  debug('listen');
  const server = http.createServer(this.callback());
  return server.listen(...args);
}
```

调用`app.listen`其实就是通过`http.createServer`方法创建一个`server`实例，然后通过`server.listen`监听特定的端口。而且`app.listen`接受和`server.listen`相同的参数。这里需要注意的是`createServer`方法的参数，这个参数是调用`app.callback`方法的返回值。在了解`callback`方法的实现之前，我们也应该能猜出这个方法的返回值肯定是`(req, res) => {}`形式的函数。下面是`callback`方法的具体实现：

```js
 callback() {
    const fn = compose(this.middleware);
    // 如果我们没有注册error事件，Koa会为我们注册一个默认的error事件，并绑定默认的错误处理函数
    if (!this.listenerCount('error')) this.on('error', this.onerror);

    /**
     * 这个函数就是在创建http服务的时候被调用的函数，req和res就是我们的http请求和响应对象
     */
    const handleRequest = (req, res) => {
      // 启动服务的第一步就是通过app.createContext来创建请求上下文对象，也就是我们通常所说的ctx
      const ctx = this.createContext(req, res);
      // 这个方法其实就是设置了默认的响应状态，以及对中间件执行结果进行了相应的处理
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }
```

`callback`方法首先通过`compose`函数对传入的中间件进行组合。`compose`的具体实现可以通过[koa-compose](https://www.npmjs.com/package/koa-compose)了解。这里为了方便大家理解，就实现一个包含其核心内容的简易版本。

```js
function compose(middlewares) {
  return function (context, next) {
    let index = -1 // 当前中间件的执行索引
    function dispatch(index) {
      let fn = middlewares[i]
      if (index === middlewares.length) {
        fn = next
      }
      // 中间件执行完毕
      if (!fn) return Promise.resolve()
      
      return Promise.resolve(fn(context, dispatch.bind(null, ++index)))
    }
    // 首先执行第一个中间件
    // 如果在某个中间件的内部调用了next，其实就是调用dispatch(index + 1)
    // 表示执行下一个中间件
    return dispatch(0)
  }
 }
```

`compose`函数是一个高阶函数，接受中间件数组作为参数，返回一个函数，这个函数也是`callback`方法中声明的`fn`变量。当调用这个函数的时候，会将我们熟知的`ctx`对象作为第一个参数传递进去，然后从第一个中间件开始“递归”的调用所有的中间件。这里的“递归”只是形式上的递归，因为所有的中间件函数需要我们手动调用才会继续向下递归运行。看一下`componse`函数中`dispatch`函数的返回值

```js
return Promise.resolve(fn(context, dispatch.bind(null, ++index)))
```

这里的`fn`是对`middleware`数组中元素的引用，也就是我们的中间件函数。我们在添加中间件的时候

```js
app.use(async (ctx, next) => {

})
```

第二个参数`next`就是对`dispatch.bind(null, ++index)`函数的引用。这也就是为什么我们需要在中间件函数中调用`next`，才会执行下一个中间件函数。

组合中间件后，`Koa`会检查`app`是否注册了`error`事件。如果没有注册，则为`app`注册一个默认的`error`事件，并绑定默认的错误处理回调函数。这个回调函数的内容，后续会讲。

接着创建`handleRequest`函数并返回，这个函数就作为`http.createServer`的参数来启动服务。当有请求到来的时候，这个函数会先调用`app.createContext`方法。

```js
createContext(req, res) {
  // 基于context.js为原型，创建context对象
  const context = Object.create(this.context);
  // 基于request.js 为原型，创建request对象
  const request = context.request = Object.create(this.request);
  // 基于response.js为原型 创建response对象
  const response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = res;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  // 关系错综复杂
  // 在context和request设置原始url的属性
  // 原始的url不包含protocol和host部分
  context.originalUrl = request.originalUrl = req.url;
  // 设置ctx.state属性
  context.state = {};
  return context;
}
```

`app.createContext`方法就是用来创建我们所熟知的`ctx`对象的。这个方法的内部主要是建立了`app`，`context`，`request`，`response`，`req`，`res`等六个对象之间的关系。这六者的详细关系在[探探Koa](https://zhaosaisai.com/blog/2019/%E6%8E%A2%E6%8E%A2Koa.html#%E5%85%B3%E7%B3%BB%E5%9B%BE)中已经叙述，具体的细节请查看上文。同时，在`ctx`对象上添加了如下两个属性：

```js
ctx.originalUrl = req.url

ctx.state = {}
```

接着调用`app.handleRequest`并以上文创建的`ctx`对象和组合后的中间件函数`fn`作为参数来处理请求。*(中间件你就可以看作是操作ctx对象的过程，在这个过程中会对请求和响应进行处理)*。

```js
handleRequest(ctx, fnMiddleware) {
  // ctx.res就是对原始http请求的res的引用
  const res = ctx.res;
  // 默认的状态码是404 在没有设置响应体的情况下的状态码
  // 一旦设置了ctx.body 就会被设置为200
  res.statusCode = 404;
  // 执行中间件过程中的错误处理函数
  // 执行中间件过程，如果出现了错误，使用context上下文中的错误捕获进行处理
  const onerror = err => ctx.onerror(err);
  // 中间件之行结束后，处理响应的函数
  // 中间件其实就是对ctx对象的一些基本的操作
  const handleResponse = () => respond(ctx);
  // TODO: onFinished判断
  onFinished(res, onerror);
  // 从第1个中间件开始，依次递归执行所有的中间件。
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```

`app.handleRequest`的主要功能就是执行中间件函数并响应。首先获取到原生`http`响应对象`res`，同时设置默认的响应状态码为`404`。这里的默认状态码只是一个临时状态，当我们设置`ctx.body`属性的时候，`res.statusCode`属性会被重写。如果你在整个流程中都没有设置`ctx.body`的值，返回的状态码就是`404`。这合情合理又合法。

接着创建`onerror`和`handleResponse`函数。其中`handleResponse`是用来处理正常响应的，而`onerror`则会调用`ctx.onerror`来处理错误。这里的错误不仅包含**中间件执行过程中的错误**也包含**用户自己抛出的错误**。后面在讲解`context`的时候会讲解这个方法的实现。下面，我们看一下`respond`是怎么处理正常的响应的。

```js
function respond(ctx) {
  if (false === ctx.respond) return;

  // 获取原生的http 响应对象
  const res = ctx.res;
  if (!ctx.writable) return;

  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  // 如果状态码标识忽略响应体。则将ctx.body 设置为空，并返回一个空响应。
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  // head方法一般是不需要返回响应体的
  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      // 响应体的长度应该是字节的长度
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  // 没有设置ctx.body的情况下
  if (null == body) {
    // req.httpVersionMajor 返回 HTTP 版本的第一个整数值
    // req.httpVersionMinor 返回 HTTP 版本的第二个整数值。
    if (ctx.req.httpVersionMajor >= 2) {
      // http2
      body = String(code);
    } else {
      // http1的情况下 取ctx.message 或者 code作为默认值
      body = ctx.message || String(code);
    }
    // 没有设置body的情况下
    // 默认content-type是application/text
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  // 下面就是对body分各种形式进行响应
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    // 响应前先设置响应体的长度
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
```

这个函数接收`ctx`对象作为参数。首先判断`ctx.respond`是否为`true`，如果这个值为`true`，则说明用户不想让`Koa`来处理`http`响应，这种情况下，用户需要自己操作`res`对象来处理响应。接着会判断`ctx.writable`属性，这个属性其实是`ctx.response.writable`。后续在讲解`response`的时候会讲解这个属性的细节，这里我们只需要知道在`ctx.writable`为`false`的情况下，`Koa`是不会为我们处理响应的。

接着获取`ctx.status`，这个属性其实就是我们设置的响应状态码`res.statusCode`。

```js
if (statuses.empty(status)) {
  ctx.body = null
  res.end()
}
```

如果状态码的含义表示响应体为空，则不管我们是否设置了`ctx.body`，都会为客户端返回一个空的响应体。那哪些状态码需要响应体为空呢？这里我们需要看一下`statuses.empty`是怎么实现的。

```js
// status codes for empty bodies
status.empty = {
  204: true,
  205: true,
  304: true
}
```

`statuses`在三种状态码的情况下认为服务端应该返回一个空的响应体。这三种状态码的含义如下：

- **204（No Content）**：响应首部包含若干首部和一个状态行，但没有实体的主体部分。主要用于在浏览器不转为显示新文档的情况下，对其进行更新（比如刷新一个表单页面）
- **205（Reset Content）**：负责高速浏览器清除当前页面中的所有`HTML`表单元素。
- **304（Not Modified）**：如果客户端发起一个条件`GET`请求，而最近资源没有更改的话，就可以用这个状态码来说明资源未被修改，客户端可以直接从缓存中获取数据。

接着会判断请求是否为`HEAD`请求。如果是，则在响应头未发送的时候设置`Content-Length`的值。因为`json`类型的响应数据，服务器无法直接判断`Content-Length`的长度，需要我们明确设置。同时，返回客户端一个空的响应体。

下面是如果在`ctx.body`的属性值为`null`的情况。根据上面的描述，这种情况下，服务器响应的状态码为`404`。这里我们就需要根据客户端`http`的版本为客户端设置一个默认的响应体。在`http2`的情况下，响应体就是`statusCode`的字符串形式，在`http1.x`的版本下，则会根据响应状态码确定状态描述信息后座位响应体返回客户端。比如，默认情况下的状态码是`404`，则对应的响应体就是`Not Found`。同时设置`Content-Type`为`text/plain`响应客户端。

最后，就根据我们设置的`ctx.body`的类型进行不同形式的响应。在`Buffer`或者`String`类型的时候，通过`res.end`方法响应客户端。在`Stream`类型下，直接通过`pipe`方法将数据传递给`res`对象，因为原生的`http`响应对象也是可写流的一种。如果响应体是对象，需要先进行序列化，因为`res.end`不能以对象作为参数。同时设置`Content-Length`的长度，响应客户端。

::: warning
Content-Length表示的是字节的长度而不是字符的长度，所以设置的时候通过Buffer.byteLength方法来确定数据的字节长度
:::

最后再一起看一下`Koa`为`app`绑定的`error`事件默认的回调函数

```js
onerror(err) {
  if (!(err instanceof Error)) throw new TypeError(util.format('non-error thrown: %j', err));

  if (404 == err.status || err.expose) return;
  if (this.silent) return;

  const msg = err.stack || err.toString();
  console.error();
  console.error(msg.replace(/^/gm, '  '));
  console.error();
}
```

这个错误回调处理程序默认只是将错误信息输出到终端上。当然，为了我们程序的健壮性，我们需要设定自己的`app.on('error')`事件处理程序。

以上就是对`Koa`的`application`版块进行的解读，后面我们会接着对`Koa`的`context`对象进行解读。