# web安全之点击劫持

`点击劫持`也是比较常见的客户端攻击之一。`点击劫持`是一种视觉上的欺骗，常见的手段就是使用一个透明的，不可见的iframe，覆盖一个网页上。然后诱使用户在网页上进行操作，此时用户在不知情的情况下在iframe上操作。我们可以通过调整iframe的位置，诱使用户对iframe上具有功能性的按钮进行点击。

如果我们想防御点击劫持，我们也应该从这这个角度出发考虑解决之道。如果我们的目标网站不能被其它网站内嵌，点击劫持就能够防御住。

一般主要有如下三种方式：

- **通过javascript来控制我们的网页不能被内嵌到iframe中**

当我们的网站是直接访问的时候，`window.top`对象就是我们的`window`对象。但是，当我们的网站通过iframe进行内嵌的时候，我们的网站的`top`对象就不是当前的`window`对象了。也就是说，我们可以通过`window.top`和`window`对象是否相同来判断我们的网站是运行在iframe中还是直接运行的。

一般我们会有可以通过如下的判断：

```js
if (top.location !== window.location) {
    top.location = window.location
}
```

但是，如果攻击者的网站禁止了我们网站的脚本，上述就不起任何作用了。比如通过iframe的`snadbox`属性限制。

```js
// 我们可以通过明确指定iframe的snadbox属性来限制iframe的行为
<iframe snadbox="allow-forms"></iframe>
```

- **X-FRAME-OPTIONS**

我们也可以通过`X-FRAME-OPTIONS`禁止我们的网页内嵌在iframe中。这个是一个http响应头。

```js
X-FRAME-OPTIONS: DENY/SAMEORIGIN/ALLOW-FROM
```

- **DENY**：表示禁止`iframe`内嵌我们的网页
- **SAMEORIGIN**：只有在同源的网站中内嵌我们的网页
- **ALLOW-FROM**：明确指定我们的网页可以被哪些域名下的页面内嵌
