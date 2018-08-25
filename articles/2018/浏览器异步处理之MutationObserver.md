# 浏览器异步处理之MutationObserver

::: warning
文末有彩蛋
:::

当我们手动的在浏览器中做异步处理的时候，我们大多数情况会这样写：

```js
setTimeout(function() {
    // Do something
}, 0)
```
当浏览器支持了`Promise`的时候，我们对于异步处理又多了一种选择。所以，我们也可能会这样写：

```js
Promise.resolve().then(() => {
    // Do something
})
```

其实，我们还有其他的选择，可以说更优雅的选择。比如，我们今天要聊聊的`MutationObserver`。

初识`MutationObserver`是在了解`Vue`的`nextTick`的实现方式的时候。那时候就能大概的了解到这个应该是浏览器所提供的一个异步接口。相信了解`Event loop`的同学应该会听过这个`API`。这里简单的说一下，`Event loop`在运行的时候会维护多个`Task queue`和一个`microtask queue`，在我们的浏览器中，只有少数的几个`task`是会被添加到`mocrotask queue`中的。一个就是我们很熟悉的`Promise task`，另一个就是`MutationObserver`。从这里我们就可以知道，使用它来实现异步，比`setTimeout`更优雅更适合。

`MutationObserver`是浏览器给开发者提供的在某个范围内对`DOM`树的变化进行检测并作出适当处理的一个方案。

使用的方式十分的简单，`MutationObserver`是一个构造函数。这个构造函数接受一个`callback`作为参数。这个`callback`会在监听的`DOM`对应的特性变化的时候被调用。

`callback`也会接收两个参数，第一个参数包含了若干个`MutationRecord`对象的数组,第二个参数则是这个观察者对象本身。

::: tip
MutationRecord：可以理解成一系列变化的特性的对象。
:::

```js
const observer = new MutationObserver((mutationRecords, observer) => {
    
})
```

在这里我们可以想一下，对于一个`DOM`节点，可以有哪些方面的变化。对于标签节点可能会有属性和包含元素的变化，而对于文本类型的节点可能只会涉及到文本内容的变化。

对于这几种的变化形式，`MutationObserver`都提供了准确的监听。下面，我们就来看一下怎么去监听我们的`DOM`的变化。

当我们调用`MutationObserver`创建了一个对象实例的时候，这个创建出来的对象实例就可以被认为是一个观察者。接下来，我们就要告诉这个观察者我们需要监听谁，监听哪些方面的内容。这就依靠这个观察者自身的一个方法：

```js
observer.observe(target, options)
```
这个方法就是给当前观察者对象注册需要观察的目标节点，在目标节点(还可以同时观察其后代节点)发生DOM变化时收到通知。所以两个参数的含义是：

- target: 要监听的dom对象
- options: 设置观察对象需要监听的特性。

下面我们就需要好好的了解下，对于一个节点。有哪些方面的特性是我们可以观察的。

### 1. childList

如果我们需要观察目标节点的子节点(不包含孙子节点)的变化，将这个选项设置为`true`。比如：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #container {
            width: 300px;
            height: 300px;
            background-color: aquamarine;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .child {
            width: 100px;
            height: 100px;
            background-color: coral;
            font-size: 26px;
        }
        button {
            width: 300px;
            height: 40px;
            text-align: center;
            border: none;
            background-color: bisque;
            outline: none;
        }
    </style>
</head>
<body>
    <div id="container">
        <div class="child"></div>
    </div>
    <button id="update">
        Update
    </button>
    <script>
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        const container = document.getElementById('container')
        const button = document.getElementById('update')
        const options = {
            childList: true, // 表示当前元素的childNodes发生变化的时候才会触发回调函数
        }
        // 创建MutationObserver实例，返回一个观察者对象
        const mutation = new MutationObserver(function(mutationRecoards, observer) {
            console.log(mutationRecoards)
            console.log(observer)
        })
        // 对观察者添加需要观察的元素，并设置需要观察元素的哪些方面
        mutation.observe(container, options);

        // 对container进行操作
        button.addEventListener('click', function() {
            container.appendChild(document.createElement('div'))
        })
    </script>
</body>
</html>
```
当我们点击`Update`按钮的时候，可以在控制台中看到输出，表明`MutationObserver`监听到了目标节点添加了一个子节点。同时，我们还可以看到` console.log(mutationRecoards)`会打印一个数组，这个数组就是我们上面提到的`mutationRecords`。至于数组中元素的每一项含义，我们会在下面叙述。

*下面所有的例子都是以上面的例子为模板，只改变其中必要的js的部分*

然而，更多的时候我们是需要监听一个节点下面所有的子孙节点的变化的，这个时候我们就需要依赖另一个选项：

### 2. subtree

把这个选项设置为`true`，表示除了目标节点,还会观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化)。

:::tip
三种节点指的就是childList, attributes, characterData。
:::

```html
<div id="container">
    <div class="child"></div>
</div>
<button id="update">
    Update
</button>
<script>
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const container = document.getElementById('container')
    const button = document.getElementById('update')
    const options = {
        childList: true, // 表示当前元素的childNodes发生变化的时候才会触发回调函数
        subtree: true,
    }
    // 创建MutationObserver实例，返回一个观察者对象
    const mutation = new MutationObserver(function(mutationRecoards, observer) {
        console.log(mutationRecoards)
        console.log(observer)
    })
    // 对观察者添加需要观察的元素，并设置需要观察元素的哪些方面
    mutation.observe(container, options);

    button.addEventListener('click', function() {
        // 操作第一个子元素
        container.children[0].textContent = 'HI'
    })
</script>
```

那么，如果我们想观察一个节点的属性的变化，`MutationObserver`也给我们提供了一个选项：

### 3. attributes

当我们把这个选项设置为`true`的时候，表示需要观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化)。比如：

```html
<div id="container">
    <div class="child"></div>
</div>
<button id="update">
    Update
</button>
<script>
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const container = document.getElementById('container')
    const button = document.getElementById('update')
    const options = {
        attributes: true,
    }
    // 创建MutationObserver实例，返回一个观察者对象
    const mutation = new MutationObserver(function(mutationRecoards, observer) {
        console.log(mutationRecoards)
        console.log(observer)
    })
    // 对观察者添加需要观察的元素，并设置需要观察元素的哪些方面
    mutation.observe(container, options);

    button.addEventListener('click', function() {
        // 设置一个新的属性
        container.setAttribute('random', Math.random())
    })
</script>
```

上面的方法会监听一个节点上的所有的属性，但是，如果我们只想监听某些特定的属性，我们应该怎么做？为了做到这种效果，我们可以指定如下的这个选项：

### 4. attributeFilter

这个选项是一个属性名数组(不需要指定命名空间)，只有该数组中包含的属性名发生变化时才会被观察到，其他名称的属性发生变化后会被忽略。

```html
<div id="container" name="saisai" age="24">
    <div class="child"></div>
</div>
<button id="update">
    Update
</button>
<script>
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const container = document.getElementById('container')
    const button = document.getElementById('update')
    const options = {
        attributes: true, // 表示当前元素的childNodes发生变化的时候才会触发回调函数
        attributeOldValue: true,
        attributeFilter: ['name']
    }
    // 创建MutationObserver实例，返回一个观察者对象
    const mutation = new MutationObserver(function(mutationRecoards, observer) {
        console.log(mutationRecoards)
        console.log(observer)
    })
    // 对观察者添加需要观察的元素，并设置需要观察元素的哪些方面
    mutation.observe(container, options);

    // 对container进行操作
    button.addEventListener('click', function() {
        container.setAttribute('age', '23')
    })
</script>
```
这个时候当我们按下`Update`的时候，在控制台中是不会有任何的输出的。

和属性有关的还有一个选项就是：

### 5. attributeOldValue

这个选项起作用的前提是`attributes`设置为true。如果需要将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true。

```html
<div id="container">
    <div class="child"></div>
</div>
<button id="update">
    Update
</button>
<script>
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const container = document.getElementById('container')
    const button = document.getElementById('update')
    const options = {
        attributes: true,
        attributeOldValue: true
    }
    // 创建MutationObserver实例，返回一个观察者对象
    const mutation = new MutationObserver(function(mutationRecoards, observer) {
        console.log(mutationRecoards)
        console.log(observer)
    })
    // 对观察者添加需要观察的元素，并设置需要观察元素的哪些方面
    mutation.observe(container, options);

    button.addEventListener('click', function() {
        container.setAttribute('random', Math.random())
    })
</script>
```
多点几次按钮，就可以在控制台中看到`console.log(mutationRecoards)`输出的对象数组中对应元素的`oldValue`的值为变化之前的值。

除此之外，还有两个配置是针对`文本节点`,`注释节点`,以及`处理指令节点`等。就是：

### 6. characterData

设置为`true`，观察该节点的文本内容是否发生变化。

### 7. characterDataOldValue

在`characterData`属性已经设为`true`的前提下,如果需要将发生变化的`characterData`节点之前的文本内容记录下来(记录到下面`MutationRecord`对象的`oldValue`属性中),则设置为`true`.

比如：

```html
<div id="container">
    你好
</div>
<button id="update">
    Update
</button>
<script>
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const container = document.getElementById('container')
    const button = document.getElementById('update')
    const options = {
        characterData: true,
        characterDataOldValue: true
    }
    // 创建MutationObserver实例，返回一个观察者对象
    const mutation = new MutationObserver(function(mutationRecoards, observer) {
        console.log(mutationRecoards)
        console.log(observer)
    })
    // 对观察者添加需要观察的元素，并设置需要观察元素的哪些方面
    mutation.observe(container.childNodes[0], options);

    button.addEventListener('click', function() {
        container.childNodes[0].textContent = String(Math.random()).slice(-6)
    })
</script>
```
当我们点击按钮的时候，就可以在控制台中看到对应的输出了。

上面就是我们在设置观察一个`DOM`对象变化的时候所有的选项配置。有一个地方需要注意的就是**childList, attributes, 或者characterData三个属性中必须至少有一个为true.否则,会抛出异常"An invalid or illegal string was specified".**


下面，我们就来看一下`MutationRecord`对象有哪些属性。我们知道`MutationRecord`会作为第一个函数传递给观察者对象包含的回调函数。这个对象主要有一下的几个属性：


如果值为`空`或者`null`，则表示默认值。

观察者还有一个`disconnect`方法，这个方法就是让该观察者对象停止观察指定目标的DOM变化.直到再次调用其observe()方法,该观察者对象包含的回调函数都不会再被调用。

```js
observer.disconnect()
```

熟悉了`MutationObserver`我们可以写一个我们自己的处理异步的函数：

```js
function asyncCall(callback) {
    const div = document.createElement('div')
    let count = 0
    const observer = new MutationObserver(() => {
        callback && typeof callback === 'function' && callback.call(null)
    })

    observer.observe(div, { attributes: true })
    div.setAttribute('count', ++count);
}
```

熟悉了上面的内容，我们看一个彩蛋：

```js
setTimeout(() => {
    console.log(1)
}, 0)

new Promise((resolve) => {
    console.log(2)
    for(let i = 0; i < 100000; i++) {
        (i === 99999) && resolve()
    }
    console.log(3)
}).then(() => {
    console.log(4)
})

console.log(5)

asyncCall(() => {
    console.log(6)
})

cosnole.log(7)
```

答案是多少呢？<button onclick="alert('答案是：2, 3, 5, 4, 6, 1。答对了吗？')">点我看答案</button>
