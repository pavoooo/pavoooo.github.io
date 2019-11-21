# webpack是怎么加载异步资源的

在使用`webpack`打包的项目中，我们可以使用`import()`函数异步加载资源。下面是一个很简单的demo。

```js
// index.js
import a from './lib/a'

a()

import(/* webpackChunkName: 'c' */ './lib/c').then(c => {
    console.log(c)
})

// a.js
export default function a() {
    console.log('this is a module')
}

// c.js
export default function c() {
    console.log('this is c')
}
```

具体的webpack配置如下

```js
module.exports = {
    entry: {
        index: './index.js',
    },
    mode: 'development',
    resolve: {
        extensions: ['.js']
    },
}
```

当我们在终端执行`npx webpack`的时候，`webpack`就会执行相应的打包流程，打包结束后会在`dist`目录下生成`index.js`和`c.js`文件。其中`c.js`就是一个被异步加载的资源。下面我们来看一个这个异步资源是怎么被加载进来的。

首先来看一下`webpack`打包生成的`index.js`文件。下面是这个文件的大致结构

> 为了更直观的查看打包后的文件，对生成的代码做了部分格式化

```js
(function(modules) {
    // 关于模块加载的一些方法和相关变量
    return __webpack_require__(__webpack_require__.s = "./index.js")
})({
    "./index.js": (function(module, __webpack_exports__, __webpack_require__) {
        eval(`
        __webpack_require__.r(__webpack_exports__);
        var _lib_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./lib/a.js\");
        Object(_lib_a__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()
        __webpack_require__.e(\"c\").then(__webpack_require__.bind(null,  \"./lib/c.js\")).then(c => {
            console.log(c)
        })`)
    }),
    "./lib/a.js": (function(/* ... */) { /* ... */ })
})
```

当我们执行`index.js`的时候，首先会调用`__webpack_require__`函数执行`modules['./index.js']`方法。这个方法执行的时候，我们重点查看下面这段代码

```js
__webpack_require__.e(\"c\").then(__webpack_require__.bind(null,  \"./lib/c.js\")).then(c => {
    console.log(c)
})
```

上面这段代码是加载`c.js`的起点。在这里我们大致能够猜想一下它的加载流程：首先通过`__webpack_require__.e`方法加载`c.js`文件，这个方法返回一个`Promise`，`c.js`文件加载成功后同样通过`__webpack_require__`函数执行，并将其返回值`resolve`。那`__webpack_require__.e`是怎么加载`c.js`文件的呢？我们可以在打包后的代码中找到其实现，如下：

```js
__webpack_require__.e = function requireEnsure(chunkId) {
	var promises = [];
	// JSONP chunk loading for javascript
	var installedChunkData = installedChunks[chunkId];
	if(installedChunkData !== 0) { // 0 means "already installed".
		// a Promise means "currently loading".
		if(installedChunkData) {
			promises.push(installedChunkData[2]);
		} else {
			// setup Promise in chunk cache
			var promise = new Promise(function(resolve, reject) {
				installedChunkData = installedChunks[chunkId] = [resolve, reject];
			});
			promises.push(installedChunkData[2] = promise);
			// start chunk loading
			var script = document.createElement('script');
			var onScriptComplete;
			script.charset = 'utf-8';
			script.timeout = 120;
			if (__webpack_require__.nc) {
				script.setAttribute("nonce", __webpack_require__.nc);
			}
			script.src = jsonpScriptSrc(chunkId);
			// create error before stack unwound to get useful stacktrace later
			var error = new Error();
			onScriptComplete = function (event) {
				// avoid mem leaks in IE.
				script.onerror = script.onload = null;
				clearTimeout(timeout);
				var chunk = installedChunks[chunkId];
				if(chunk !== 0) {
					if(chunk) {
						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
						var realSrc = event && event.target && event.target.src;
						error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
						error.name = 'ChunkLoadError';
						error.type = errorType;
						error.request = realSrc;
						chunk[1](error);
					}
					installedChunks[chunkId] = undefined;
				}
			};
			var timeout = setTimeout(function(){
				onScriptComplete({ type: 'timeout', target: script });
			}, 120000);
			script.onerror = script.onload = onScriptComplete;
			document.head.appendChild(script);
		}
	}
	return Promise.all(promises);
};
```

下面我们分析其它的具体实现。这个方法接收一个`chunkId`作为参数，在这里我们在调用`import()`函数的时候指定了`chunkName`为`c`。所以在调用这个方法的时候传递的参数就是`c`。接着从`installedChunks`对象中判断是否已经加载过该`chunk`。`installedChunks`是一个全局对象，里面保存了`webpack`在打包过程中生成的所有`chunk`的加载状态。如果为`0`表示该`chunk`已经加载过，`undefined`表示该`chunk`未被加载过，如果值是`Promise`则表示该`chunk`正在被加载，`null`则表示该`chunk`通过`preloaded/prefetched`的方式进行加载。这里对应的`installedChunks[chunkId]`，即`installedChunks['c']`的值是`undefined`，所以会走到`else`流程中。

在`else`分支中，首先会创建一个`promise`对象，并将其`resolve`和`reject`方法作为数组的两个元素保存在`installedChunks`中。所以，这里`installedChunks['c']`如下

```js
installedChunks['c'] equal [resolve, reject, promise]
```

创建好`promise`实例后，接下来的流程会创建一个`script`标签并设置相关的属性。这里我们主要看一下`script.src`是什么

```js
script.src = jsonpScriptSrc(chunkId)
```

创建的`script`标签的`src`属性是`jsonpScriptSrc`函数的返回值，这个函数的实现也比较简单

```js
function jsonpScriptSrc(chunkId) {
	return __webpack_require__.p + "" + ({"c":"c"}[chunkId]||chunkId) + ".js"
}
```

其中`__webpack_require__.p`是我们设置的`publicPath`。因为我们没有设置，这里就是`""`

```js
// __webpack_public_path__
__webpack_require__.p = "";
```

所以`script.src`属性在这里就是`c.js`。

之后会为`script`添加`onerror`，`onload`和相应的超时处理。但其回掉函数是相同的，即`onScriptComplete`。其实现逻辑也比较容易理解，但是仔细观察会发现它只处理了未被加载成功的场景。所以，这里就有两个问题。第一，`installedChunks['c']`什么时候会设置为`0`，即表示加载成功的状态。第二，上面创建的`promise`对象什么时候被`resolved`。带着这两个问题，我们先来想一下。如果`c.js`被成功加载会发生什么？事情很简单，加载成功后，就是执行。据此，我们先来看看`c.js`打包之后的内容。

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["c"],{
    "./lib/c.js": (function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return c; });\nfunction c() {\n    console.log('this is c')\n}\n\n//# sourceURL=webpack:///./lib/c.js?");
    })
}]);
```

生成的代码也很简单，就是对`window["webpackJsonp"].push`的调用。那`window["webpackJsonp"]`又是什么呢？这里我们重新回到打包后的`index.js`文件中。你会发现有这么一段代码

```js
var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
jsonpArray.push = webpackJsonpCallback;
jsonpArray = jsonpArray.slice();
for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
var parentJsonpFunction = oldJsonpFunction;
```

这段代码做了很多事情，但是有两个点我们必须要知道。首先`window['webpackJsonp']`是一个数组。其次，它的`push`方法被重写为了`webpackJsonpCallback`。所以，当`c.js`加载成功并执行后，其实就是调用的`webpackJsonpCallback`函数。那这个函数是怎么实现的？如下：

```js
function webpackJsonpCallback(data) {
	var chunkIds = data[0];
	var moreModules = data[1];
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId, chunkId, i = 0, resolves = [];
	for(;i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
			resolves.push(installedChunks[chunkId][0]);
		}
		installedChunks[chunkId] = 0;
	}
	for(moduleId in moreModules) {
		if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
			modules[moduleId] = moreModules[moduleId];
		}
	}
	if(parentJsonpFunction) parentJsonpFunction(data);
	while(resolves.length) {
		resolves.shift()();
	}
};
```

`webpackJsonpCallback`接收一个参数，参数的形式就是我们在`c.js`文件中调用`push`方法的时候传递的参数。所以这里`chunkIds`就是`['c']`，`moreModules`就是`{'./lib/c.js': (function() {...})}`。然后就遍历`chunkIds`数组，判断每个chunk的状态。这里的`chunkIds`只有一个值，所以`chunkId`就是`c`。在`__webpack_require__.e`执行后，`installedChunks['c']`的值为`[resolve, reject, promise]`。所以，首先会讲`resolve`保存在`resolves`数组中。接着将`installedChunks[chunkId]`设置为`0`，即表示该资源已经被成功加载，这里就表示`c.js`文件被成功加载了。然后将`moreModules`中的每一个文件都添加到初始的`modules`对象中。最后会执行`resolves`数组中保存的每一个`resolve`函数。当这些`resolve`函数被调用后，则在`__webpack_reqire__.e`中创建的`promise`都被`resolved`了。同时，也表示`__webpack_require__.e`也被`resolve`了。接着就是将异步加载的模块的`module.exports`返回给`import()`的`then`方法。所以。我们原始文件

```js
import(/* webpackChunkName: 'c' */ './lib/c').then(c => {
    console.log(c)
})
```

就会打印出

```js
// Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"}
```

至此，关于`webpack`怎么加载异步资源的基本上分析完毕。简单的总结如下：

1. 通过`jsonp`的方式加载异步文件
2. 异步文件加载成功后执行，并设置其全局加载状态
3. 将异步文件的模块对象添加到全局的modules中
4. 执行异步文件模块函数，并将其module.exports返回给业务中的then回掉。