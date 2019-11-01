# 几个关于DOM树生成问题的研究

下面是浏览器渲染的几个关键步骤

![](/blog/browser1.png)

浏览器渲染过程中涉及到不同的进程和引擎处理。比如文件的请求依赖于网络进程，`DOM`和`CSSOM`以及后续的布局和绘制则依赖于渲染进程，如果遇到`js`，那么就需要交给`javascript引擎`处理。

浏览器渲染的过程是十分复杂的，这里面也有几个有意思的问题需要我们好好的研究一下。

- `javascript`是如何影响`DOM`树生成的
- `async`和`DOMContentLoaded`是什么样的关系
- 多个`async`标识的文件之间是什么样的执行关系
- `defer`和`DOMContentLoaded`是什么样的关系
- 多个`defer`标识的文件之间是什么样的执行关系
- `css`是如何影响`DOM`树生成的

下面我们分别研究一下

## 环境介绍

- http-server
- chrome(78.0.3904.70（正式版本） （64 位）)
- charles(用来模拟弱网环境)

## `javascript`是如何影响`DOM`树生成的

先看两个简单的情况

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div>123</div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.title = 'domloaded'
        })
    </script>
    <div>456</div>
</body>
</html>
```

上面这段代码是一个很简单的`html`片段。这里我们就简单的分析一下浏览器是怎么解析这个`html`文件并生成`DOM`树的。

- `html`字节流首先通过`html解析器`进行解析，开始生成`DOM`树的节点
- 当解析遇到`script`标签的时候，将执行权交给`javascript引擎`执行`javascript`代码
- `javascript`代码执行完成后，将执行权继续交给`html解析器`完成后续`html`的解析
- `html`解析结束后，生成`DOM`树并触发`DOMContentLoaded`事件

所以，上面代码的解析执行的过程可以用如下图所示

![](/blog/browser2.png)

如果，我的代码如下，会发生什么

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div>123</div>
    <script src="./index.js"></script>
    <div>456</div>
</body>
</html>
```

分析：

- `html`字节流首先通过`html解析器`进行解析，开始生成`DOM`树的节点
- 当解析遇到`script`标签的时候，并判断此`js`文件是一个外部文件，那么渲染进程便会通知网络进程下载该文件。文件下载完成后，执行此文件中的`javascript`代码
- `javascript`代码执行完成后，将执行权继续交给`html解析器`完成后续`html`的解析
- `html`解析结束后，生成`DOM`树并触发`DOMContentLoaded`事件

所以，上面代码的解析过程如下图所示

![](/blog/browser3.png)

为了验证`javascript`文件在加载过程中会阻塞`DOM`树的生成，这里我们做一个小测试。环境如上面介绍，测试代码如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            console.log('domloaded')
        })
    </script>
</head>
<body>
    <div>hello world</div>
    <script src="http://192.168.199.132:8082/index.js"></script>
    <div>hi world</div>
</body>
</html>
```

> http://192.168.199.132:8082/index.js是一个加载很慢的文件

测试结果如下

![](/blog/browser4.png)

**JavaScript文件加载的过程中，`DOM`树并不会继续生成。所以'hi world'内容并没有显示在页面中。**

![](/blog/browser5.png)

JavaScript文件加载结束并执行后，继续`DOM`树的创建。并触发`DOMContentLoaded`事件。(因为JavaScript文件要加载很久，所以DOMContentLoaded事件经历了很长时间才触发)。

那有没有方式可以在`JavaScript`加载的过程中不阻塞`DOM`树创建呢？估计大家都知道：`async`和`defer`属性

- `async`异步加载，加载的过程中不阻塞`DOM`树的创建，加载完成后立即执行。
- `defer`异步加载，加载的过程中不阻塞`DOM`树的创建，加载完成后并不会立即执行，而是在`DOMContentLoaded`事件之前执行。

围绕这两个属性也有一些比较有意思的问题，下面来看看

## `async`和`DOMContentLoaded`是什么样的关系

同样是上面的代码片段，这次不同的是`script`标签上增加了一个`async`属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            console.log('domloaded')
        })
    </script>
</head>
<body>
    <div>hello world</div>
    <script src="http://192.168.199.132:8081/index.js" async></script>
    <div>hi world</div>
</body>
</html>
```

![](/blog/browser7.png)

从上面的输出可以看出`async`标识的文件在加载完成后立即执行。但是这个执行时机和`DOMContentLoaded`事件触发的顺序并不确定。上面图中显示的是外部JavaScript文件的执行在`DOMContentLoaded`事件之前就执行完了。

但是，如果`async`标识的文件加载很慢呢？下面我们再来研究一下。

同样是上面的代码，不过这次我们使用`charles`阻塞`index.js`的下载。同时为了方便观察，我们将`DOMContentLoaded`事件修改如下

```js
document.addEventListener('DOMContentLoaded', () => {
    document.title = 'domloaded'
})
```

![](/blog/browser8.png)

从上图中我们就能看到，即使`async`加载很缓慢，它也不会阻塞`DOM`树的创建和`DOMContentLoaded`事件的执行。

所以，我们可以总结一下含有`async`属性的script标签的时候，`DOM`树生成线如下

![](/blog/browser9.png)

## 多个`async`标识的文件之间是什么样的执行关系

明白了`async`和`DOM`树生成的关系，我们再来看看页面中的多个`async`标识的文件之间的执行顺序是怎样的？

代码如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.title = 'domloaded'
        })
    </script>
</head>
<body>
    <div>hello world</div>
    <script src="http://192.168.199.132:8081/index.js" async></script>
    <script src="http://192.168.199.132:8081/index2.js" async></script>
    <div>hi world</div>
</body>
</html>
```

输出结果如下

![](/blog/browser10.png)

如果我把`index2.js`和`index.js`代码的顺序颠倒一下呢？输出结果如下

![](/blog/browser11.png)

目前我们仍然是看不出其关系的。那如果`index.js`加载很慢，`index2.js`加载很快。那`index2.js`会不会等`index.js`加载完后再执行呢？为了演示方便，我将两个js文件中的内容分别作如下修改

```js
// index.js
document.title = 'index'

// index2.js
document.title = 'index2'
```

结果如下

![](/blog/browser12.png)

可以看出，`index2.js`并没有等待`index.js`文件加载完并执行后才执行，而是其加载完成后立即执行。所以，可以得出如下基本结论：

**async标识的JavaScript文件在加载的过程中并不会阻塞DOM树的生成，它的执行时间和DOMContentLoaded的触发时间并没有强耦合的联系。多个async标识的文件的执行顺序并不按照其在文件中的顺序执行，而是加载结束后立即执行。**

## `defer`和`DOMContentLoaded`是什么样的关系

了解了`async`之后，我们再来看下`defer`和`DOMContentLoaded`是什么样的关系？修改我们的代码如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            console.log('domloaded')
        })
    </script>
</head>
<body>
    <div>hello world</div>
    <script src="http://192.168.199.132:8081/index.js" defer></script>
    <div>hi world</div>
</body>
</html>
```

输出如下

![](/blog/browser13.png)

可以看出`index.js`在`DOMContentLoaded`事件触发之前执行。那如果`index.js`加载很慢呢?

![](/blog/browser14.png)

可以看出`defer`标识的JavaScript文件在加载过程中并不会阻塞`DOM`树的创建。

![](/blog/browser16.png)

![](/blog/browser15.png)

但是其执行仍然是在`DOMContentLoaded`事件之前。所以 **`defer`标识的JavaScript文件会阻塞`DOMContentLoaded`事件的触发。**

所以，含有`defer`标识的JavaScript文件其解析过程如下

![](/blog/browser17.png)

## 多个`defer`标识的文件之间是什么样的执行关系

同样，接下来我们来看看当页面中出现了多个`defer`标识的文件的时候，它们之间是什么样的执行关系？修改我们的代码如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            console.log('domloaded')
        })
    </script>
</head>
<body>
    <div>hello world</div>
    <script src="http://192.168.199.132:8081/index.js" defer></script>
    <script src="http://192.168.199.132:8081/index2.js" defer></script>
    <div>hi world</div>
</body>
</html>
```

![](/blog/browser18.png)

输出如上，`index.js`在`index2.js`之前执行，而且两者都是在`DOMContentLoaded`事件触发之前执行。

那如果`index.js`加载很缓慢，会发生什么样的情况呢？这里我们对`index2.js`文件的内容作如下修改

```js
// index2.js
console.log('index2')
document.title = 'index2'
```

![](/blog/browser19.png)

![](/blog/browser20.png)

你会发现，即使`index2.js`先于`index.js`之前加载完成，它仍然会等待`index.js`加载完成并执行结束后执行。同样两者都是在`DOMContentLoaded`事件触发之前执行。所以，我们可以得出如下结论：

**defer标识的JavaScript文件在加载的时候不会阻塞`DOM`树的生成。加载完成后如果`DOM`树生成完毕，则会立即执行，否则就等待`DOM`树生成完毕后执行。如果页面中有多个`defer`标识的文件，它们会按照其先后顺序依次执行，而且都会在`DOMContentLoaded`事件触发之前执行。所以`defer`标识的文件不会阻塞`DOM`树的生成，但是会阻塞`DOMContentLoaded`事件的执行。也可以理解成`DOMContentLoaded`事件在`defer`标识的文件执行完毕后才会触发。**

## `css`是如何影响`DOM`树生成的

了解了`js`是如何影响`DOM`树的生成，下面我们就来看看`css`会影响`DOM`树的生成吗。或许我们以前了解过浏览器渲染的基本过程，`DOM`树会和`CSSOM`树结合生成渲染树，之后就是一系列的合成和绘制的过程。所以`css`影响浏览器的渲染的过程这是必然的，那`css`会影响`DOM`树的生成吗？

下面是一段代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div>hello world</div>
    <link href="http://192.168.199.132:8081/index.css" rel="stylesheet" />
    <div>hi world</div>
</body>
</html>
```

如果上面的`index.css`文件加载很慢，它会阻塞`DOM`树的创建吗？结果如下

![](/blog/browser21.png)

从上图中我们可以看出，在`index.css`加载的过程中，`DOM`树会正常的创建，在`DOM`树构建完成后触发`DOMContentLoaded`事件。所以`css`的加载并不会阻塞`DOM`树的生成，以及`DOMContentLoaded`事件的触发。但是为什么页面会是空白的呢？这是因为页面的显示需要经过浏览器的合成及绘制的过程。而这两个操作是依赖渲染树的，而渲染树是`DOM`树和`CSSOM`树结合生成的，所以在`index.css`没有加载完成后，是无法进行进行渲染的过程的。这种现象也被称为“白屏现象”。

针对上面的流程，我们分析一下简单的渲染流程

- `html`字节流首先通过`html解析器`进行解析，开始生成`DOM`树的节点
- 当解析遇到`link`标签的时候，通知网络进程下载此样式文件，样式文件下载好后，开始构建`CSSOM`树，这个过程是不会阻塞`DOM`树的生成的。
- `html`解析结束后，生成`DOM`树并触发`DOMContentLoaded`事件

如果我们的代码向下面这样呢？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        setTimeout(() => {
            document.title = document.querySelector('h2').innerText
        })
        document.addEventListener('DOMContentLoaded', () => {
            document.title = 'domloaded'
        })
    </script>
</head>
<body>
    <link href="http://192.168.199.132:8082/index.css" rel="stylesheet" />
    <h1>hello world</h1>
    <h2>hi world</h2>
</body>
</html>
```

你会发现有如下输出

![](/blog/browser22.png)

![](/blog/browser23.png)

**当我们把`link`标签放在`body`的标签内，你会发现`css`文件的加载不仅会阻塞`DOMContentLoaded`事件的触发，同时也会阻塞`DOM`树的生成。**

如果代码是这样写呢？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <link href="http://192.168.199.132:8082/index.css" rel="stylesheet" />
    <script>
        setTimeout(() => {
            document.title = document.querySelector('h2').innerText
        })
        document.addEventListener('DOMContentLoaded', () => {
            document.title = 'domloaded'
        })
    </script>
</head>
<body>
    <h1>hello world</h1>
    <h2>hi world</h2>
</body>
</html>
```

![](/blog/browser24.png)

你会发现**在`css`文件加载的过程中，不仅会阻塞`DOMContentLoaded`事件的触发，同时也会阻塞`DOM`树的生成，更有甚者，其后的`script`中的代码也会等待其完全加载并执行后才会执行。** 这是为什么呢？**这是因为JavaScript不能能够操作`DOM`树也能够操作`CSSOM`树，在JavaScript执行之前，它并不知道执行的过程中会不会操作`CSSOM`树，所以，它会等已经解析的所有`link`标签所指定的`css`文件加载并执行完成后才会执行。**

如果代码是这样呢？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <link href="http://192.168.199.132:8082/index.css" rel="stylesheet" />
    <script src="http://192.168.199.132:8081/index.js"></script>
</head>
<body>
    <h1>hello world</h1>
    <h2>hi world</h2>
</body>
</html>
```

```js
// index.js
document.title = 'hello world'

document.addEventListener('DOMContentLoaded', () => {
    document.title = 'domloaded'
})
```

![](/blog/browser25.png)

你会发现 **`css`的加载并不会阻塞`javascript`文件的加载，但同样会阻塞其执行。**

如果代码是这样呢？


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <link href="http://192.168.199.132:8082/index.css" rel="stylesheet" />
    <script src="http://192.168.199.132:8081/index.js" async></script>
</head>
<body>
    <h1>hello world</h1>
    <h2>hi world</h2>
</body>
</html>
```

> index.js文件内容同上

输出如下

![](/blog/browser26.png)

你会发现**为`script`标签添加了`async`标识，JavaScript文件加载完成后同样会立即执行，且`css`的加载不会阻塞`DOM`树的生成和DOMContentLoaded事件的触发。**

如果代码是这样呢？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <link href="http://192.168.199.132:8082/index.css" rel="stylesheet" />
    <script src="http://192.168.199.132:8081/index.js" defer></script>
</head>
<body>
    <h1>hello world</h1>
    <h2>hi world</h2>
</body>
</html>
```

> index.js文件内容同上

**为`script`标签添加了`defer`标识，同样`css`的加载不会阻塞`DOM`树的生成和DOMContentLoaded事件的触发。**

基于上面的研究，我们针对`css`对`DOM`树生成的影响可以进行如下改进以提升性能：

- 将`link`标签放在`head`内不要放置在`body`内
- 如果`link`标签和`script`标签都放置在`head`内，请将`script`标签放置在`link`标签的前面
- `link`标签所加载的`css`尽量放置在cdn上，并将内容压缩以提升其传输速度
- 如果`script`标签需要放置在`link`标签的后面，可以酌情添加`async`或者`defer`标志。或者将其放置在`body`尾部。