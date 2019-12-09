# Babel是什么

[[toc]]


## Babel简介

`Babel`是一个`Javascript`编译器。`Babel`也是一个工具链，主要用于将新特性语法`Ecmascript2015+`版本的代码转换为向后兼容的`Javascript`语法，以便能够在低版本的浏览器或其它环境中运行。

`Babel`主要为我们做如下三件事情：

- 语法转换
  - 将新特性语法转换为目标环境支持的语法

- 通过`Polyfill`的方式引入目标环境中缺少的特性
  - 通过`@babel/polyfill`模块添加目标环境中缺少的特性。主要是一些高版本的`Ecmascript`提供的新特性`api`

- 源码转换
  - 通过插件对源码中的某些特性进行转换，源码转换是一个很泛的事情，不光能转换新的语法，你可以随心所欲的转换你任意想进行转换的东西。

现在我们用一个简单的例子来看一下`babel`的语法转换。下面的例子我们在`map`的回调中使用了箭头函数，但箭头函数并不能在所有的浏览器中直接使用，所以我们需要借助`babel`将其转换为普通函数的形式。

```js
// index.js
[1, 2, 3].map(v => v + 1)
```

然后在终端中运行`babel index.js --out-dir lib`，这个命令的含义就是使用`babel`编译`index.js`文件，并将编译后的文件保存在`lib`文件夹下面。然后你会发现编译后的文件如下

```js
// lib/index.js
[1, 2, 3].map(v => v + 1);
```

奇怪，编译后的文件和源文件并没有什么不同，难道是`babel`没起作用？不是的，这种情况是使用`babel`的时候首先需要注意的。**`babel`是构建在插件之上的，每一种语法的转换都是通过插件进行转换的。默认情况下，babel并不会编译文件，因为它不知道怎么去编译。如果你想编译特定的语法，你就需要明确的告诉`babel`。**那怎么告诉呢？插件--`babel`为新特性的语法都有提供对应的转换插件，当我们想转换这些语法的时候直接在配置中声明所使用到的插件就行了。这里我们想转换箭头函数，转换箭头函数的插件是`@babel/plugin-transform-arrow-functions`。所以，我们直接在`babel`的配置文件中指明就行了。

> 关于babel的配置文件我们后面会详细讲述

```js
// .babel.config.js
{
  "plugins": [
    "@babel/plugin-transform-arrow-functions"
  ]
}
```

然后运行上面的编译命令，此时`lib/index.js`文件如下

```js
[1, 2, 3].map(function (v) {
  return v + 1;
});
```

这就说明`babel`已经准确的将箭头函数编译成了普通函数的形式。

## Babel使用

`Babel`有三种基本的使用方式

- 通过配置文件的方式使用(常用，可以很方便的和其他工具集成)
- 以`Node.js`的`package`使用
- 命令行

下面我们同样以上面那个简单的例子来看一下这三种使用方式的一些基本步骤。

### 配置文件

通过配置文件的方式使用`babel`是其最常用的使用方式，这种方式能很方便的和其它工具集成，比如`webpack`，`rollup`等。下面是一些基本步骤

- 安装所需的包

> 这里面的包后面也会详细讲述

```bash
npm install @babel/core @babel/preset-env @babel/cli
```

- 在项目的根目录下面创建一个名为`babel.config.js`的配置文件，内容如下

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

- 将`index.js`文件编译到`lib/index.js`文件中

```bash
babel index.js --out-dir lib
```

### 以`Node.js`的`package`使用

我们在使用`babel`的时候，所需要的所有的`babel`模块都是作为独立的`npm`包发布的，这种模块化的设计能够让每种工具都针对特定使用情况进行设计。我们能够在我们的项目中直接将这些模块作为依赖集成到我们的开发流程中。

- 将`index.js`修改如下

```js
// index.js
const babel = require("@babel/core")

const source = `[1, 2, 3].map(v => v + 1);`

const { code } = babel.transform(source, {
  babelrc: false,
  presets: [
    ["@babel/preset-env", { targets: '> 1%', useBuiltIns: 'usage', corejs: 2 }]
  ]
})

console.log(code)
```

- 在终端中执行`node index.js`，会得到如下输出

```js
"use strict";

[1, 2, 3].map(function (v) {
  return v + 1;
});
```

### 命令行

`babel`提供了两个命令行：`@babel/cli`和`@babel/node`。

- `@babel/cli`适合安装在项目中并在`script`脚本中直接使用`babel`命令编译文件。
- `@babel/node`适合全局安装。可以直接通过`babel-node`命令编译文件。

我们重点关注下`@babel/cli`的使用，`@babel/cli`有很多选项，可以通过`--help`命令来查看命令行工具所支持的参数列表。我们最常用的莫过于`--plugins`和`--presets`选项，分别用来设置插件和预设。

比如，我们编译`index.js`文件可以直接在命令行中运行如下命令

```bash
./node_modules/.bin/babel index.js --out-dir lib --presets '@babel/preset-env'
```

或者

```bash
npx babel index.js --out-dir lib --presets '@babel/preset-env'
```

> `@babel/cli`并不是很常用，大家了解即可


上面就是`babel`使用的基本方式，下面我们学习下`babel`两个非常重要的概念`插件`和`预设`。
