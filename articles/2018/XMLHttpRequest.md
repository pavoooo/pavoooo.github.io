# XMLHttpRequest

超文本传输协议(HTTP)是客户端和服务器进行通信的基础。`HTTP`包含`请求(Request)`和`响应(Response)`两部分。

一个`HTTP`请求由**4**部分组成：

- `HTTP`的请求方法
- 请求`url`
- 请求头
- 请求体

一个`HTTP`响应由**3**部分组成：

- 响应状态(状态码和文本描述)，用来显示请求的成功和失败
- 响应头部
- 响应体

`Ajax`是浏览器向服务器发送请求的主要方式之一，这种请求方式的核心就是`XMLHttpRequest`。`XMLHttpReqtest`类的每个实例都是一个`请求/响应`对。下面就会对这个类进行`HTTP`通信的主要方式进行全面介绍。

> 接下来的介绍中 `xhr` 就表示 `XMLHttpRequest`

使用这个`HTTP API`第一件事就是需要实力化`xhr`对象：

```js
const xhr = new XMLHttpRequest()
```

这里需要事先说明一个注意点。我们应该对每个`http`请求实力化一个`xhr`对象。当然，你也可以复用已有的`xhr`进行`http`通信。但是，这会终止之前通过该`xhr`对象挂起的任何请求。

除此，也需要对`xhr`有一个清晰的定位。`xhr`是浏览器级别的API而不是`HTTP`级别的API。`xhr`只关心请求和响应，而浏览器则需要考虑cookie，重定向，缓存和代理等因素。

所以，`xhr`所做的事情也很简单，就是**发出请求**和**获取响应**。

首先，我们先看一下怎么通过`xhr`发出`HTTP请求`？

## xhr发送请求

**1.** 发起`HTTP`请求的第一步就是通过`xhr.open`方法指定**请求的方法**和**请求的URL**

```js
xhr.open('GET', '你的请求地址') // 创建一个 GET 请求
```

`open()`方法的第一个参数就是指定请求方法。常见的如`GET`/`POST`/`PUT`/`HEAD`/`OPTIONS`都可以作为第一个参数传入。

第二个参数就是我们所请求的`url`地址，可以是相对地址也可以是绝对的请求地址。因为浏览器**同源策略**的存在，跨域的请求通常被禁止。如果需要进行跨域请求，需要事先设置好相应的配置。

第三个参数是一个`Boolean`值。表示这个请求是同步请求(false)还是异步请求(true)。默认是`true`--即异步请求。

第四个和第五个参数经常成对出现，主要是用来指定服务器认证相关的信息。当然，我们也可以通过`Authorization`头部来进行指定。

上面就是通过`xhr`请求的第一步。主要是设置进行`http`请求的一些必要条件。

**2.** 进行`http`请求的第二步对于`xhr`而言是一个可选的步骤。这一步主要是设置一些请求头，如果我们不需要自行设置请求头，则可以忽略这一步。

设置请求头主要是通过`xhe.setRequestHeader`方法进行

```js
xhr.setRequestHeader('请求头名称', '请求头值')
```

比如，为`POST`请求设置`Content-Type`的`MIME`类型为`json`：

```js
xhr.setRequestHeader('Content-Type', 'application/json')
```

这个方法在使用的时候有几个注意事项：

- 如果对相同的请求头多次调用`xhr.setRequestHeader`，**新值是不会取代旧值的**。相反，`HTTP`请求会包含这个头部的多个副本或者这个头将指定多个值。

比如：

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', './test1.js')
xhr.setRequestHeader('Content-Type', 'text/html')
xhr.setRequestHeader('Content-Type', 'text/plain')
xhr.send()
```

当运行上述代码的时候，我们会看到请求头如下：

![xhr](/blog/xhr1.png)

- 有些浏览器自动添加的头部我们是不能设置的。比如，我们不能通过这个方法设置`Content-Length`，`User-Agent`等头部的内容。

**3.** 发送请求的第三步也是最后一个步骤--就是通过`xhr.send()`方法指定请求主体，并将其发送到服务器上。

```js
xhr.send(null) // 请求主体为空
xhr.send(JSON.stringify({ "name": "saisai" })) // 发送具体的请求主体
```

上面就是通过`xhr`发送请求的基本过程。过程很简单，但是我们需要知道一个重要的注意事项就是，`HTTP`请求的各部分是有指定顺序的：**请求方法和url首先到达，然后是请求头，最后是请求体。**所以，我们在使用`xhr`发送请求的时候，也要严格的遵循上面的顺序。比如`setRequestHeader()`方法的调用需要在`open()`之后`send()`之前，否则会抛出异常。

![xhr](/blog/xhr2.png)

了解了通过`xhr`发送请求的基本过程后，我们需要了解怎么通过`xhr`接收`http`响应的内容。

## xhr接收响应

一个完整的`http`响应由`状态码`，`响应头集合`和`响应主体`组成。这些我们可以通过`xhr`对象上的属性和方法来获得：

- `status`和`statusText`属性用来获取`http`响应的状态码和描述文本的

- `getResponseHeader()`和`getAllResponseHeaders()`用来获取`http`响应的响应头信息

- `responseText`属性可以用来获取响应主体。(`responseXML`也可以用来获取特定响应格式下的响应主体。这种前后端数据交流方式平时开发很少见，不再赘述。)

`xhr`在进行`http`操作的整个过程中(`请求`和`响应`)具有不同的状态。每次状态变更，都会触发`xhr`的`readystatechange`事件。所以，我们可以通过监听这个事件，并通过`xhr.readyState`获取当前`xhr`所处于的状态。总的来说，`xhr`在整个通信的过程中会发生取下几种状态的变更：

- **0 -- open()尚未调用**
- **1 -- open()已经调用**
- **2 -- 接收到响应头信息**
- **3 -- 接收到响应主体**
- **4 -- 响应完成**

为了能够监听`readyState`的状态变化，我们需要为`xhr`的`readystatechange`事件设置事件监听程序。比如：

```js
xhr.onreadystatechange = function() { // 定义事件处理程序
  // 下面的状态代表请求完成，而且请求是成功的
  if (this.readyState === 4 && this.status === 200) {
    // 对请求成功的结果进行处理
  }
}
```

在响应成功后我们需要通过`xhr.responseText`获取服务器响应的内容。`xhr.responseText`属性只能够用于文本，不能够处理二进制响应，`xhr2`定义了处理二进制响应的方法，后续会看到。

服务器响应的正常解码的前提是服务器为这个响应发送了`Content-Type`和正确的`MIME`类型。一旦服务器设置了错误的响应类型，客户端在接收到响应的时候并不能正确的识别。从而会使用错误的响应类型来解析响应。`xhr2`定义了一种客户端可以覆盖掉服务器端响应的`MIME type`的方式，即：`overrideMimeType()` 方法。这个方法需要在`send()`方法调用之前被调用。

```js
xhr.overrideMimeType('text/plain; charset=utf-8')
xhr.send()
```

## XMLHttpRequest2

`xhr2`可以看作是`xhr`的升级版本，这个版本可以实现很多`xhr`所不能实现的功能。比如我们是无法依靠`xhr`来实现文件上传功能的，因为`xhr`的`send()`方法只能发送普通的文本。同样，我们也不能通过`xhr`来接收服务器传送过来的二进制数据流。

在`xhr2`中，`send()`方法是可以传入一个`File`对象。我们可以利用这个特性来实现文件上传的功能。

当我们通过`<input type="file" />`选取文本文件的时候，这个元素拥有一个`files`属性。这个属性是一个类数组对象，每个元素都是一个`File`对象。我们可以将这个对象传入`send()`方法并通过`POST`方式传递给我们的服务器。下面是通过`xhr2`来实现文件上传的例子：

```js
const input = document.getElementById('file')

input.addEventListener('change', function(ev) {
  const file = this.files[0]
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '服务器地址')
  xhr.send(file) // 将File对象作为send方法的参数发送
})
```

上面就是通过`xhr2`进行文件上传的一个简单例子。其实`xhr2`允许向`send()`方法传入任何的`Blob`对象。如果没有设置`Content-Type`头部，这个`Blob`对象的`type`属性就是默认的`Content-Type`。


除了能够进行文件上传，`xhr2`还能够发送更为复杂的`multipart/form-data`请求。我们知道，当我们使用html表单同时上传文件和其他元素的时候，浏览器是不能使用普通的表单编码而必须使用`multipart/form-data`这种特殊的`Content-Type`用`POST`来提交表单。这种编码会使用长“边界”字符串把请求分为多个部分。`xhr2`也定义了新的`FormData`数据类型，它能够很容易的实现多部分请求主体。

首先使用`FormData`构造函数创建`FormData`对象。

然后按需多次调用这个对象的`append`方法把个体部分（可以是字符串，File或者Blob对象）添加到请求中

最后，把`FormData`对象传递给`send`方法。`send`方法会将请求定义合适的边界字符串和设置`Content-Type`头。

```js
const xhr = new XMLHttpRequest()
xhr.open('POST', 'url地址')
xhr.onreadystatechange = function() {

}

const formData = new FormData()
formData.append(name, value)

// 将 formData 对象传入send方法。xhr会自动设置请求的 Content-Type 的头
xhr.send(formData)
```

上面简单的介绍了`xhr2`的一些很常用且在`xhr`中无法实现的特性。除此之外，`xhr2`还增加了很多其他的特性。比如，在`xhr`中，我们在发送`http`请求的时候，使用`readystatechange`并结合`readyState`来探测`xhr`的状态。`xhr2`规范定义了很多有用的事件集，即`xhr`对象在请求的不同阶段会触发不同类型的事件，所以我们不需要检查`readyState`属性就能获取到`xhr`的状态。

在`xhr2`中这些新事件可能会向下面这样触发：

- 当调用`send()`时，会触发`loadstart`事件
- 当在加载服务器的响应的过程中，`xhr`对象会触发`progress`事件。这个事件通常每隔`50ms`左右触发一次，我们可以基于这个事件为用户带来响应过程中的实时反馈。
- 当响应完成的时候，会触发`load`事件。我们可以在这个事件中检查响应的状态码来确定响应成功与否。

当然，响应并不会100%成功。`xhr2`针对失败的响应也会根据失败的原因触发不同类型的事件：

- 如果请求超时，会触发`timeout`事件
- 如果请求终止，会触发`abort`事件
- 如果请求因为网络等原因发生了错误，会触发`error`事件
- 不管请求或响应成功与否，在结束的时候，`xhr`就会触发`loadend`事件

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', './test1.js')

xhr.onloadstart = function() {
  console.log('开始请求')
}

xhr.onloadend = function() {
  console.log('xhr结束')
}

xhr.onload = function() {
  console.log('响应结束')
  console.log(xhr.status)
  console.log(xhr.responseText)
}

xhr.onerror = function() {
  console.log('xhr出错')
}

xhr.send(null)
```

对应结果如下：

![xhr](/blog/xhr3.png)

`xhr2`规范中对`progress`事件作了很多的规范。进度事件在`xhr2`中主要分为两种：`响应进度事件`和`请求(上传)进度事件`。进度事件的事件对象中，除了常规的`type`和`timestamp`这样的对象属性外，还有与`progress`事件相关联的三个比较有用的属性：

- **loaded**：表示已经传输的字节数值
- **total**：表示传输数据的整体长度
- **lengthComputable**：如果知道内容长度则为true，否则为false

响应进度事件，我们可以通过监听`xhr`的`onprogress`事件来处理

```js
xhr.onprogress = function(event) {

}
```

对于请求(上传)进度事件，我们不能直接通过`xhr`来监听对应的事件。`xhr2`中为`xhr`对象增加了`upload`属性，这个属性是一个对象，可以通过这个对象来监听请求上传的进度事件。比如在上面图片上传的例子中，我们就可以通过`xhr.upload.onprogress`来监听上传进度

```js
const input = document.getElementById('file')

input.addEventListener('change', function(ev) {
  const file = this.files[0]
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '服务器地址')
  xhr.send(file) // 将File对象作为send方法的参数发送

  // 监听上传进度
  xhr.upload.onprogress = function(ev) {
    const { loaded, total } = ev
    console.log(`已经上传${loaded}/${total}`)
  }
})
```

`xhr2`除了增加了上述实用的事件外，还增加了手动停止请求和处理超时等功能。我们可以通过调用`xhr.abort()`方法来取消正在进行的请求。一旦取消成功，`onabort`事件就会触发：

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', './test1.js')

xhr.onabort = function() {
  console.log('请求aborted')
}
xhr.send(null)
xhr.abort()
```

![xhr](/blog/xhr4.png)

对于超时，`xhr2`定义了`timeout`属性来指定请求自动终止的毫秒数。一旦请求自动终止，`ontimeout`事件就会触发：

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', './test1.js')

xhr.ontimeout = function() {
  console.log('请求aborted')
}
xhr.timeout = 0
xhr.send(null)
```

上面简单了介绍了关于`XMLHttpRequest`的一些相关特性。目前比较主流浏览器对于`XMLHttpRequest Level 2`基本上都实现了支持。兼容性详情可以参考[https://caniuse.com/#search=XMLHttpRequest](https://caniuse.com/#search=XMLHttpRequest)。最后，关于`XMLHttpRequest`有一个很重要的事情需要说明--就是：跨域问题。对于这种问题的解决方案可以参考[跨域解决方案](/2018/跨域解决方案.html)