# 探探scrollIntoView

对于`scrollIntoView`这个api，相信很多前端开发者和我一样，很少使用过。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)是这样介绍它的。

::: warning
这是一个实验中的功能此功能某些浏览器尚在开发中，请参考浏览器兼容性表格以得到在不同浏览器中适合使用的前缀。由于该功能对应的标准文档可能被重新修订，所以在未来版本的浏览器中该功能的语法和行为可能随之改变。
:::

想详细了解它的兼容性，请戳[https://caniuse.com/#search=scroll](https://caniuse.com/#search=scroll)。嗯，看来很少出现在公众视野还是有原因滴。但是，它有些时候确实还挺有用。接下来，我们先看看它到底应该怎么用。

`scrollIntoView`是`HTMLElement`原型上的一个方法，文档中的任何html元素都可以调用。它主要是`让当前元素滚动到浏览器窗口的可视区内`。具体怎么滚动，滚动到什么位置，完全由我们开发者自己来确定。还有，这里的`可视区`不一定是相对于窗口而言。准确的说应该是`元素所在的滚动区`。下面这张图片就详细的解释了可视区的准区范围。

这个`api`的签名很简单，主要有以下三种调用情况：

```js
Element.scrollIntoView() // 空参数 等价于 Element.scrollIntoView(true)
Element.scrollIntoView(Boolean) // 布尔类型的参数
Element.scrollIntoView(scrollIntoViewOptions) // object类型的参数
```
当我们传递`Boolean`类型的参数的时候：

- 如果传递的参数为`true`，元素的顶端将和其所在的滚动区的顶端对齐。
- 如果传递的参数为`false`，元素的底端将和其所在的滚动区的底端对齐。

至于这个滚动区是什么范围，完全取决于我们自己的布局结构。所以大家在开发的时候，一定要事先确定好合适的布局结构。

当我们传递`object`类型的参数的时候，主要有如下可选值：

```js
{
    behavior: "auto"  | "instant" | "smooth",
    block:    "start" | "end",
}
```
当`behavior`取值为`auto`或者`instant`的时候，元素会立即滚动到可视区的特定位置。当取值为`smooth`的时候，元素会缓动的滚动到可视区的特定位置。
而`block`的`start`或者`end`则表示元素的顶部和可视区的顶部对其或者元素的底部和可视区的底部对齐。

使用十分方便，下面就是一些简单的demo演示，详细的效果可参考[探探scrollIntoView](https://jsfiddle.net/zhaosaisai/rt55u42f/)；

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>探探scrollIntoView</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            height: 100%;
            background: #fefefe;
        }
        .buttons {
            width: 100%;
            background-color: beige;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            height: 140px;
            align-content: space-around;
        }
        .buttons a{
            display: block;
            width: 30%;
            height: 30px;
            background: #3cbaff;
            color: #fff;
            text-align: center;
            line-height: 30px;
            border-radius: 100px;
            text-decoration: none;
            font-size: 14px;
        }
        .wrapper {
            width: 100%;
            height: calc(100% - 140px);
            background-color: blanchedalmond;
            overflow: scroll;
        }
        .element {
            height: 3000px;
            position: relative;
        }
        .block {
            width: 80%;
            height: 60px;
            background-color: red;
            line-height: 60px;
            text-align: center;
            font-size: 24px;
            font-weight: bolder;
            color: #fff;
            position: absolute;
            top: 1000px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="buttons">
            <a href="javascript:void(0)">1</a>
            <a href="javascript:void(0)">2</a>
            <a href="javascript:void(0)">3</a>
            <a href="javascript:void(0)">4</a>
            <a href="javascript:void(0)">5</a>
            <a href="javascript:void(0)">6</a>
            <a href="javascript:void(0)">7</a>
            <a href="javascript:void(0)">8</a>
            <a href="javascript:void(0)">true</a>
            <a href="javascript:void(0)">false</a>
        </div>
        <div class="wrapper">
            <div class="element">
                <div class="block">
                    Block
                </div>
            </div>
        </div>  
    </div>
    <script>
        const options = {
            '2': true,
            '3': {
                behavior: 'auto',
                block: 'start'
            },
            '4': {
                behavior: 'auto',
                block: 'end'
            },
            '5': {
                behavior: 'instant',
                block: 'start'
            },
            '6': {
                behavior: 'instant',
                block: 'end'
            },
            '7': {
                behavior: 'smooth',
                block: 'start'
            },
            '8': {
                behavior: 'smooth',
                block: 'end'
            }
        }
        const as = document.querySelectorAll('a')
        const block = document.querySelector('.block')
        for (let i = 0; i < as.length - 2; i++) {
            const el = as[i]
            el.addEventListener('click', function() {
                console.log(el.textContent, options[el.textContent])
                i === 0 ? block.scrollIntoView() : block.scrollIntoView(options[el.textContent])
            }, false)
        }
        for (let i = as.length - 2; i < as.length; i++) {
            const el = as[i]
            el.addEventListener('click', function() {
                console.log(JSON.parse(el.textContent))
                block.scrollIntoViewIfNeeded(JSON.parse(el.textContent));
            }, false)
        }
    </script>
</body>
</html>
```

点击页面中的`1-8`按钮，分别表示的是对`scrollIntoView`的不同的调用情况。*el就是需要显示在可视区的元素*。
- 点击`按钮1`，调用`el.scrollIntoView()`，表示以立即运动的方式将其顶部和可视区的顶部对齐。
- 点击`按钮2`，调用`el.scrollIntoView(true)`，表示以立即运动的方式将其顶部和可视区的顶部对齐。
- 点击`按钮3`，调用`el.scrollIntoView({behavior: 'auto', block: 'start'})`，表示以立即运动的方式将其顶部和可视区的顶部对齐。
- 点击`按钮4`，调用`el.scrollIntoView({behavior: 'auto', block: 'end'})`，表示以立即运动的方式将其底部和可视区的底部对齐。
- 点击`按钮5`，调用`el.scrollIntoView({behavior: 'instant', block: 'start'})`，表示以立即运动的方式将其顶部和可视区的顶部对齐。
- 点击`按钮6`，调用`el.scrollIntoView({behavior: 'instant', block: 'end'})`，表示以立即运动的方式将其底部和可视区的底部对齐。
- 点击`按钮7`，调用`el.scrollIntoView({behavior: 'smooth', block: 'start'})`，表示以缓动的方式将其顶部和可视区的顶部对齐。
- 点击`按钮8`，调用`el.scrollIntoView({behavior: 'smooth', block: 'end'})`，表示以缓动的方式将其底部和可视区的底部对齐。

具体的效果，读者可以通过上面的链接查看。

但是，`scrollIntoView`有一个很不好的地方，不管元素是否在可视区的范围内，当调用这个方法的时候，都会将元素滚动到滚动区的顶部或者底部。比如下面的这种情况。

为了避免这种情况，我们可以使用另一个`api``element.scrollIntoViewIfNeeded`来操作元素。这个`api`同样也是`HTMLElement`原型上的一个方法。据[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoViewIfNeeded)的描述，它是一个非标准的特定，尽量不要在生产环境使用它。

这个方法就是用来将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。 如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动。

这个方法的使用更加简单，其函数签名为：

```js
element.scrollIntoViewIfNeeded(); // 等同于element.scrollIntoViewIfNeeded(true) 
element.scrollIntoViewIfNeeded(true); 
element.scrollIntoViewIfNeeded(false);
```
- 如果为true，则元素将在其所在滚动区的可视区域中居中对齐。
- 如果为false，则元素将与其所在滚动区的可视区域最近的边缘对齐。 根据可见区域最靠近元素的哪个边缘，元素的顶部将与可见区域的顶部边缘对准，或者元素的底部边缘将与可见区域的底部边缘对准。

为false的情况大致就是如果元素隐藏在可视区的上方，会将元素的顶部和可视区的顶部对齐。如果元素隐藏在可视区的下方，会将元素的底部和可视区的底部对齐。
读者可以通过点击上面链接的页面里的`true`和`false`按钮来体验不同的效果。

具体的使用就叙述到这里，后面将探讨一下在什么样的业务中使用这两个api非常合适。

::: tip
注：由于这两个API的不兼容性，github上有一个不错的polyfill库: [scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)可以参考使用。
:::
