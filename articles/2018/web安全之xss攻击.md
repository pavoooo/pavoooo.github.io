# web安全之xss攻击

**跨站脚本攻击**又被称为`xss`。`xss`属于客户端攻击，攻击者在我们的网页中嵌入恶意脚本，当用户使用浏览器浏览这些被嵌入恶意脚本的网页的时候，脚本就会在我们的浏览器中执行。xss攻击的核心方式是`脚本`。这些脚本通常是`javascript脚本`，从这个层面来说javascript能做的事情，xss攻击一般都能做到。比如：
- 获取页面内容
- 盗取用户cookie
- 劫持前端逻辑
- 发送非法请求
- 盗取页面数据
- url跳转

## xss分类
我们一般把xss分为三类：`反射型xss`，`存储型xss`，`DOM型xss`

### 反射型xss

`反射型xss`又被称为`非持久型xss`。当用户访问一个带有xss攻击代码的url请求的时候，向服务器发送请求，服务器接受请求后处理，并把客户端发送的xss攻击代码返回给客户端，客户端解析这段代码的时候，就有可能遭受xss攻击。

下面是一个典型的反射型xss攻击示例：

用户浏览某个网站A，攻击者在这个网站中嵌入了恶意的脚本用于盗取用户的cookie等信息
攻击者诱导用户触发xss攻击（比如诱导用户点击非法链接），当用户触发了xss攻击的时候就会将自己的用户信息发送给攻击者
攻击者在获取用户的cookie后，就有可能盗用用户的身份信息进行非法操作。

### 存储型xss

`存储型xss`又被称为`持久化的xss`.也是最危险的xss攻击方式。一旦攻击成功，就有可能造成大规模的xss攻击，也就是我们通常所说的xss蠕虫。

存储型xss攻击的一般原理是，客户端将带有xss攻击的数据发送给服务器，服务器接收并存储在数据库。当用户下次再访问这个页面的时候，服务器会读取数据库并将之前的xss代码取出发送给浏览器。浏览器解析这段数据的时候，就会遭受xss攻击。

所以，反射型xss攻击一般需要用户手动触发，而存储型xss攻击却是能够自动触发的。一般来说，反射型xss攻击的危害要比存储型xss攻击的危害要小的多。

### DOM型xss
我们可以通过JavaScript来操作dom树，所以，xss攻击也是能够做到这一点的。dom型xss攻击最大的危害就是改变我们网页的布局。这种类型的xss是不需要和服务器进行交互的，只发生在客户端处理阶段。比如一段xss攻击的代码是：

```js
const div = document.createElement('div')
div.innerText = 'xss攻击的代码'
document.body.appendChild(div)
```

**xss攻击点**

知道了xss的基本类型后我们就要了解xss的攻击点一般在哪里？可以这样说，有输入和输出的地方就有可能遭受xss攻击。所以，我们一定要对客户端的输入和服务端的输出做严格的校验，但是这种校验往往是比较复杂的，因为xss攻击的变法太多太多了。下面几个点是需要我们格外注意的。

- **html节点的内容**：如果一个节点的内容是动态生成的，里面包含了用户的输入信息就有可能遭受xss攻击。

```html
<div>
 #{content}
</div>
```

上面的content有可能会携带xss攻击，比如：

```html
<div>
  <script>alert(123)</script>
</div>
```

- **html属性**：某个节点的属性是通过用户的输入生成的，那这些输入就有可能包含xss攻击的代码。

```html
<img src="#{src}" />
```

src的内容可能是：

```html
#" onerror="alert(123)
```

会造成html的内容如下：

```html
<img src="#" onerror="alert(123)" />
```

- **javascript代码**：JavaScript代码中存在后台注入的变量，或者包含用户输入的信息

```html
const content = '#{content}'
```

content的内容可能是：**';alert(123);'**

- **富文本**：富文本一般是需要保留html的。这些html就有可能造成xss攻击。

## xss防御

明确了xss的切入点后，我们就可以针对不同的切入点进行不同的防御了。其实浏览器内部是有自己的xss防御策略的。
浏览器自动防御
浏览器是可以自动防御某些xss攻击，但是这种防御一般都是比较有限。只能防御部分反射型xss攻击。而且是不会拦截出现在js中的脚本的。比如
比如我们的url是：

```html
http://www.a.com?content=<script>alert(123)</script>
```

我们的html中有:**#{content}**

这个html中的content是后端通过获取我们的查询字符串后重新渲染到页面上的。如果我们此时访问页面，就会被浏览器拦截掉
我们可以通过在响应头中添加`X-XSS-Protection: 0`来关闭浏览器的自动防御

### html节点内容的防御

对于html节点内容，我们能够通过转义的手段来防御xss攻击。这里我们并不需要转义太多的东西。因为html中识别的是标签，所以，我们通过把'<'和'>'进行转义，就能很好的防御这部分的xss攻击。

```js
const escapeHtml = str => str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
```

### 转义html的属性

转义html属性的内容的时候，我们需要知道什么字符能够分离html属性？其实我们所常见的html属性的表示方法一般有如下三种：

```html
id = "app"
id = 'app'
id = app
```

所以，在对这部分内容进行转义的时候可以把"，'，和空格全给转义了。

```js
const escapeAttr = str => str.replace(/"|'/g, '&quto;').replace(/\s/g, '&#32')
```
但是，这里的转义只能防御部分xss攻击的情况，比如下面这种就束手无策了。

```html
<a href="javascript:alert(0)">链接</a>
```

对于这中形式的防御，我们就需要使用下面防御富文本xss攻击的手段来阻止。

### javascript代码防御
对于js中的内容的防御，只需要将引号转义（不是转义成实体，而是使用转义符\）或者将待输入的内容序列化。

```js
const escapeJs = str => str.replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/\\/g, '\\\\')
```

上面只能保证大部分情况的安全，最保险的是对数据进行一次序列化；

```js
JSON.stringify(str)
```

### 富文本防御

富文本其实就是一大段的html，这些html中会包含大量的格式和html标签。对于富文本的防御，我们不能使用转义的方式，因为html我们要原样保留。因此，我们需要使用过滤的方式来防御富文本的xss攻击。
过滤的方式有两种：
- 按照黑名单进行过滤--过滤掉我们认为不安全的btml属性和标签。
- 按照白名单过滤--只允许我们定义好的标签和属性存在。

这两种方式，黑名单的实现比较简单，但是稍不留神就可能留下漏洞。白名单实现比较麻烦，需要将html进行完全的解析，然后过滤，再组装成html。

```js
// 黑名单的方式
const xssFilter = html => {
    // 黑名单的方式过滤
    // 过滤script标签
    html = html.replace(/<\s*\/?script\s*>/g, '')
    // 过滤属性值javascript:开头
    html = html.replace(/javascript:[^'"]*/g, '')
    // 过滤onerror属性
    html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]/g, '')
    // ...其他很多需要过滤的属性，xss的变种太多了
    // 这个时候可以使用白名单进行过滤
}

// 白名单的方式过滤
// 首先需要将html解析成一个树状结构，然后针对这个树遍历元素，判断标签或者属性是否在白名单中，如果不在
// 直接干掉。
// 可以直接在node端使用cheerio实现上述功能
const xssFilter = html => {
    const cheerio = require('cheerio')
    const $ = cheerio.load(html)
    const whiteList = {
        // 可以添加更多的规则
        'img': ['src'],
    }

    $('*').each((index, element) => {
        // 不在白名单中 
        if (!whiteList[element.name]) {
            $(element).remove()
            return;
        }
        // 在白名单中，处理属性
        for (let attr in element.attribs) {
            if (whiteList[element.name].indexOf(attr) === -1) {
                // 不在白名单中的属性，移除
                $(element).attr(attr, null)
            }
        }
    })
    return $.html()
}
```

上面所做的一系列措施都是从开发的角度去做的。然是xss攻击千变万化，要想彻底的杜绝他们，仅仅依靠编程的hack方法是十分麻烦的。所以，浏览器就提出了一个从根本上解决xss攻击的方法：`CSP`。

csp的全称是内容安全策略。是`Content Security Policy`的简称。

csp的策略和上面我们提到的白名单策略比较相似，开发者要明确的告诉客户端哪些脚本可以被执行。它的解析和执行都是由客户端决定的，而开发者所需要做的就是告诉浏览器可执行的脚本规则即可。

为了启用csp，我们可以从两个方面进行设置：

- **服务端**，设置`Content-Security-Policy`响应头
- **客户端**，设置meta标签
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

csp的限制策略一般是如下格式：`限制选项 选项值`。

csp提供了很多的限制选项，其实就是设置了加载资源的时候需要采取的策略。对于csp，其加载策略主要有如下几种：

- `script-src`：加载脚本的时候采取的策略
- `style-src`：加载样式表的时候采取的策略
- `img-src`：加载图像的时候采取的策略
- `media-src`：加载媒体文件（音频和视频）采取的策略
- `font-src`：加载字体采取的策略
- `object-src`：加载插件（如flash）采取的策略
- `child-src`：加载框架采取的策略
- `frame-ancestors`：嵌入的外部资源
```html
（比如<frame>、<iframe>、<embed>和<applet>）
```
采取的策略
- `connect-src`：进行http连接时候的限制策略（通过 XHR、WebSockets、EventSource等）
- `worker-src`：加载worker脚本的时候采取的策略
- `manifest-src`：加载manifest文件时候采取的策略。
上面的限制选项几乎涉及了浏览器加载资源的方方面面，除了上述限制，还有一个`default-src`限制。这个限制是用来设置上面各个选项的默认值的。比如：

```html
Content-Security-Policy: default-src 'self'
```
上面的这个请求头限制了所有的外部资源必须和当前域名同域。

明确了限制选项，我们可以设置如下限制选项值。这些值其实就是我们对浏览器设置的白名单。

- 我们可以明确资源加载的域名，如：`example.org`，`https://example.com`
- 我们可以明确资源加载的路径，如：`example.org/resources/js`
- 我们可以通过通配符来设置限制，如：`*.example.org`，表示任意的子域名都是可以的
- 我们可以明确加载的协议，http或者https
- 我们可以通过关键字self指定，表示当前域名

我们可以通过关键字none指定，表示禁止加载任何的外部资源
上面的这些选项值可以同时指定多个，需要使用空格分开。

```html
Content-Security-Policy: script-src 'self' 
https://apis.google.com
```

对于xss的防御，我们可以通过设置`script-src`和`object-src`来限制，同时`script-src`也包含了一些特殊的选项值。

- `unsafe-inline`：允许执行页面内嵌的script和事件监听函数
- `unsafe-eval`：允许将字符串代码执行，比如使用`eval`、`setTimeout`、`setInterval`和`Function`等函数。
- `nonce`值：每次http响应都会给客户端发送一个token，页面内嵌的脚本必须有这个token才会被允许执行
比如：`Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'`

```html
// 只有明确了这个nonce值才会被执行
<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
  // some code
</script>
```

- `hash`值：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。

```html
// 指定hash值
Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='
```

只有script标签中内容的hash和指定的相同时才会执行
所以，只要我们能设置好csp的安全规则，就能从根本上避免xss攻击。

更多的关于csp介绍可以看到阮老师的文章：`csp详解`