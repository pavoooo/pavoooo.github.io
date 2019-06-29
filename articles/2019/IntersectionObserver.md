# IntersectionObserver

`IntersectionObserver`是浏览器给我们提供的一个高级浏览器之一。它主要用来在两个元素发生交集的时候，我们能够做些事情。这两个元素一个可以被称为`target`，另一个可以被称为`root`。`target`需要我们手动去指定，`root`则在我们创建`IntersectionObserver`实例的时候可以通过传参的方式来指定。

`IntersectionObserver`也被称为**交集检测器**，即当`target(被监测元素)`出现在`root(target的祖先元素，默认是document)`的视窗中，我们能感知。

![](/blog/intersectionObserver1.png)

`IntersectionObserver`的使用非常简单，因为它涉及到的`api`很少，常用的也就那两三个。但在某些特殊的业务场景下，其功能却是十分强大的。比如，曝光监测、懒加载，无限滚动加载等场景的应用十分合适，后面我们会详细讲解。

## 使用

使用`IntersectionObserver`大致分为三个步骤：

- 确定被监测元素
- 创建`IntersectionObserver`实例
- 调用其实例的`observe`方法监测元素

下面是一个例子，演示了`IntersectionObserver`的基本使用

#### 单个元素监测

```js
const target = document.querySelector('.cube')

const observer = new IntersectionObserver(() => {
  console.log('交集状态发生了一次变化')
})

observer.observe(target)
```

当`target`和`document`的交集状态发生变化的时候，就会触发我们传给`IntersectionObserver`的回调函数，所以，我们能在这个函数中做任何我们想做的事情。

> [单个元素监测]('https://zhaosaisai.github.io/blog/intersectionObserver/observe.html')

#### 多个元素监测

如果你想同时监测多个元素，你需要多次调用`observe`方法

```js
const targets = document.querySelectorAll('.cube')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target.innerHTML)
    }
  })
})

Array.from(targets).forEach(target => observer.observe(target))
```

> [多个元素监测]('https://zhaosaisai.github.io/blog/intersectionObserver/multiple-observe.html')

#### 取消对元素的监测

我们可能会有这种业务场景：在元素第一次曝光的时候，发送曝光埋点，后续的曝光都不需要发送曝光埋点了。还有图片的懒加载，我们只需要在图片第一次出现的时候加载图片，后续图片再次出现的时候是不需要再次加载图片的。

`IntersectionObserver`的实例上有一个`unobserve`方法，它可以取消对一个元素的监测。对于上面的场景，我们只需要在元素第一次出现的时候调用`unobserve`取消对元素的监测即可

```js
const target = document.querySelector('.cube')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('出现在了视窗中')
      observer.unobserve(target)
    }
  })
})

observer.observe(target)
```

> [取消对元素监测]('https://zhaosaisai.github.io/blog/intersectionObserver/unobserve.html')

#### 取消对所有元素监测

`IntersectionObserver`实例的`disconnect`方法可以取消对实例上所有元素的监测

```js
const targets = document.querySelectorAll('.cube')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target.innerHTML)
      observer.disconnect()
    }
  })
})

Array.from(targets).forEach(target => observer.observe(target))
```

> [取消对所有元素监测]('https://zhaosaisai.github.io/blog/intersectionObserver/multiple-unobserve.html')


### 组件选项

在讲述组件选项之前，我们先了解关于`IntersectionObserver`的几个术语

- 相交区域(intersectionRect)

相交区域就是指`target`元素和`root`元素相交区域的大小

- 是否相交(isInterecting)

相交区域是否大于0

- 相交比(intersectionRatio)

相交区域的大小占`target`大小的比值。`0 <= intersectionRatio <= 1`

创建`IntersectionObserver`实例的时候，我们可以传递一个对象作为第二个参数。这个对象可以指定如下属性

```js
{
  root: Element,
  rootMargin: string | string[],
  threshold: number | number[]
}
```

- `root`：手动设置`root`元素，默认是`document`。这个元素必须是`target`元素的祖先元素
- `rootMargin`：类似于`css margin`，用来扩展`root`元素区域的大小
- `threshold`：一个数值或者是由数值组成的数组。用来表示`target`和`root`元素相交比达到多少的时候，执行回调。

#### root

`root`指定如下

```js
const root = document.querySelector('#ancestor');
const observer = new IntersectionObserver((changes) => {

}, {
    root: root
});
```

#### rootMargin

`rootMargin`用来扩展`root`区域大小的。这个扩展后的区域的大小，只用来计算和`target`元素的交集，`root`元素真实的大小并不会改变。

`rootMargin`有一个计算方法

```js
var newRect = {
  top: rect.top - margins[0],
  right: rect.right + margins[1],
  bottom: rect.bottom + margins[2],
  left: rect.left - margins[3]
};

newRect.width = newRect.right - newRect.left;
newRect.height = newRect.bottom - newRect.top;
```

其中`newRect`就是计算后的`root`区域的大小

![](/blog/intersectionObserver3.png)

```js
const target = document.querySelector('.cube')

const observer = new IntersectionObserver(() => {
  console.log('交集状态发生了一次变化')
}, {
  rootMargin: '50px'
})

observer.observe(target)
```

> [root-margin]('https://zhaosaisai.github.io/blog/intersectionObserver/root-margin.html')

#### threshold

下面很清晰的表示了`threshold`的作用

![](/blog/intersectionObserver2.png)

```js
const target = document.querySelector('.cube')

const observer = new IntersectionObserver(() => {
  console.log('交集状态发生了一次变化')
}, {
  threshold: 0.8
})

observer.observe(target)
```

> [threshold]('https://zhaosaisai.github.io/blog/intersectionObserver/threshold.html')

`threshold`的默认值是0，表示一旦`target`和`root`元素发生交集就会执行回调函数

### callback

我们创建`IntersectionObserver`实例的时候，传递了一个回调函数作为第一个参数。这个函数在`target`和`root`元素的交集状态发生变化的时候会被调用。这个函数的参数是一个由`IntersectionObserverEntry`实例组成的数组。`IntersectionObserverEntry`实例有如下的属性

![](/blog/intersectionObserver4.png)

其中`isIntersecting`是我们最常使用的几个属性

## 例子

### 曝光监测

```js
const target = document.querySelector('.cube')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('出现在了视窗中')
    }
  })
})

observer.observe(target)
```

### 图片懒加载

```js
function createElements(count = 100) {
  const images = []
  for (let i = 0; i < count; i++) {
    const image = document.createElement('img')
    image.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561789387199&di=8d461bfb01c9267e92490cf14c9c46a6&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7592eee7b36fe55c2fda6a5699657d023155d957220f6-ez33zZ_fw658'
    image.setAttribute('data-src', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562384129&di=87d9be6c8c1f32841ba2f94cdbaf405c&imgtype=jpg&er=1&src=http%3A%2F%2Fpics1.baidu.com%2Ffeed%2F0df431adcbef76098583c4a31fe9aec97cd99e3f.jpeg%3Ftoken%3D443cf2d9398fc61144ea9f029eee79b8%26amp%3Bs%3D3DB8539102534FCA0405BCD5030050F3')
    image.style.width = '100%'
    image.style.height = '200px'
    document.body.appendChild(image)
    images.push(image)
  }
  return Promise.resolve(images)
}

createElements().then(images => {
  for(let i = 0; i < images.length; i++) {
    const observe = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.getAttribute('data-src')
          observe.unobserve(entry.target)
        }
      })
    })
    observe.observe(images[i])
  }
})
```

> [图片懒加载]('https://zhaosaisai.github.io/blog/intersectionObserver/lazy.html')

### 无限滚动

```js
const app = document.querySelector('.app')

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    createElements()
  }
})

function createElements(count = 30) {
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div')
    div.innerText = i
    div.setAttribute('class', 'item')
    app.appendChild(div)
  }
}

observer.observe(document.querySelector('.load-more'))
createElements(100)
```

> [无限滚动](https://zhaosaisai.github.io/blog/intersectionObserver/scroll.html)

## 兼容性

`IntersectionObserver`的兼容性并不是很好，目前大概只有`78%`的浏览器支持。

![](/blog/intersectionObserver5.png)

当然，好用的东西一般不能直接使用。为了能够在大多数的浏览器中使用，我们一般会引入其`polyfill`。后面会写一个对其`polyfill`源码进行解读的文章。

