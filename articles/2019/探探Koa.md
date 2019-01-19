# 探探Koa

熟悉`Nodejs`web开发的同学对`Koa`一定不会陌生。引一段`Koa`官方介绍

> Koa是一个全新的`web`开发框架。通过利用`async`函数，提供了一套优雅的方法，帮助您快速和高效的开发`web`应用程序。

的确，`Koa`不像`Express`那样庞大，`Koa`只是实现了中间件机制，但并没有为我们引入任何功能性的中间件。相比于`Express`，`Koa`更小，更轻量。这给予了开发者更多可拓展的机会。比如，国内著名的`MVC`框架[egg](https://eggjs.org/)就是基于`Koa`的二次开发，在其提供底层能力的基础上拓展了很多方便且实用的功能。

本文并不会对`Koa`的使用作过多的介绍，如果你想了解具体用法，请参考[Koa](https://koajs.com/)

下面代码使用`Koa`创建了一个`web`服务

```js
const Koa = require('koa')

const app = new Koa

app.use(async ctx => {
  ctx.response.status = 200
  ctx.body = ctx.request.header
})

app.listen(8080, () => {
  console.log(`Your application serve on 8080`)
})
```

上面的代码基本使用了`Koa`的大部分功能。为了能从本质上去理解`Koa`是怎么运行的，这里带大家先来熟悉下`Koa`的基本架构以及每个核心到底具有哪些功能。

## 关系图

`Koa`在应用的整个生命周期中主要有如下几个核心：

- **application**：`Koa`实例，也就是上面代码中所创建的`app`
- **context**：`Koa`上下文对象。一般我们都是通过上下文对象来操作`请求`和`响应`的
- **request**：`Koa`对原生`http`请求对象的封装。提供了一系列便捷的方法来操作请求对象。
- **response**：`Koa`对原生`http`响应对象的封装。同样提供了一系列便捷的方法来操作响应对象。
- **req**：原生`http`请求对象
- **res**：原生`http`响应对象

理解了上面六个核心，你就理解了`Koa`90%的功能，剩下的10%就是我们所熟知的中间件设计。这六个核心对象理解起来很容易，想彻底的记住的话还真得花一点时间。这六个核心对象有着千丝万缕的联系，下面，我们来好好的捋一捋。

> 为了方便表达，后续`application`对象使用`app`标识来表示。`context`对象使用`ctx`标识来表示。

1. `app`和`ctx`，`request`，`response`的关系

```js
app.context.__proto__ === context
app.request.__proto__ === request
app.response.__proto__ === response
```

2. `ctx`和`app`，`request`，`response`，`req`，`res`的关系

```js
ctx.__proto__ === app.context
ctx.request.__proto__ === request
ctx.response.__proto__ === response
ctx.app === app
ctx.req === req
ctx.res === res
```

3. `request`和`app`，`ctx`，`response`，`req`，`res`的关系

```js
request.app === app
request.ctx === ctx
request.req === req
request.res === res
request.response === response
```

4. `response`和`app`，`ctx`，`request`，`req`，`res`的关系

```js
response.app === app
response.ctx === ctx
response.req === req
response.res === res
response.request === request
```

为了更好的梳理他们之间的关系，画了一个简单的图来帮助大家理解。


其实，上面六个核心对象之间的引用关系可以用如下共识公式来大致说明。

```bash
[核心对象(不包含req, res)].属性名称 === 同属性名对象 # response.app === app
```

理解了上面六个核心对象之间的关系后，下面我们就来看一下这些对象到底实现了哪些功能来帮助我们快速和高效的开发`web`应用程序。

> 下面只是梳理，具体的用法请移步官网查阅。
## application

下面是`application`对象上所实现的一些属性和方法

![node](/blog/app1.png)

## context

![node](/blog/app2.png)

图片中的属性和方法是直接挂载到`context`上下文对象上的。除此之外，`Koa`还直接代理了`request`和`response`对象上很多的属性和方法。后面我们会详细讨论和分析这些方法是怎么通过`context`对象进行分发的。

## request

`request`和`response`上很多属性都是可读可写的。读--其实就是对属性的`get`，写--其实就是对属性的`set`。所以，`Koa`中对这些可读写的属性都是通过`getter`和`setter`的方式处理的。比如：

```js
const result = {
  get header() {
    return this.req.headers
  },
  set header(val) {
    this.req.headers = val
  }
}
```

当我们获取`request.header`的时候，返回的其实是`request.req.headers`。同样，当我们设置`request.header`的时候，其实设置的是`request.req.headers`，也就是原生`http`请求的请求头。

下面就是`Koa`给我们提供的操作`http`请求头的一些方法。

![node](/blog/request.svg)

## response

`response`中的很多属性也是通过`getter`和`setter`的方式实现的。

![node](/blog/response.svg)

上面就是对`Koa`中所涉及到的一些内容的梳理，后续我们会针对每一块的内容看一下具体实现。