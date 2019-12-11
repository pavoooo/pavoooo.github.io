# babel的那些模块

`babel`的编译过程大致上可以分为三个步骤：**解析** -> **转换** -> **生成**。每个步骤`babel`都提供相应的模块进行处理。

- 解析过程主要由`@babel/core`处理
- 转换过程主要由`@babel/transform`处理
- 生成过程主要由`@babel/generate`处理

每个过程也会有相应的插件辅助上面这些模块。这些前面已经叙述，这里我们主要看一下上面这几个模块的一些核心功能。

## @babel/core

首先安装这个模块

```bash
npm install @babel/core
```

`@babel/core`是`babel`的核心模块，`babel`很多功能都基于这个模块实现。当然，你也可以在自己的项目中引入这个模块，然后对代码进行解析和转换。

这个模块提供了四种功能的`api`，每种功能都有三种风格。比如`transform`，`transformSync`，`transformAsync`都是用来将源码转换成`ast`的，但是三种`api`的风格对应的分别是`异步回调风格`，`同步风格`以及`Promise风格`。

我们就以上面的这个`api`为例，看看这三种风格的`api`是怎么使用的。

```js
const babel = require('@babel/core')

const sourceCode = '[1, 2, 3].map(v => v + 1)'

// 异步回调函数风格
babel.transform(sourceCode, { ast: true }, (err, result) => {
  const { code, map, ast } = result
})

// 同步风格
const { code, map, ast } = babel.transformSync(sourceCode, { ast: true })

// promise风格
babel.transformAsync(sourceCode).then(result => {
  const { code, map, ast } = result
})
```

除了`transform`等接口外，这个模块还对外暴露了下面几个`api`，同样每种`api`都有三种不同的风格。

- **transformFile(Sync|Async)**：转换文件的内容为`ast`
- **transformFromAst(Sync|Async)**：直接从`ast`进行转换
- **parse(Sync|Async)**：将代码解析成`ast`，不会进行转换。

## @babel/traverse

`babel`编译的第二个阶段就是转换，转换其实就是将源代码的`ast`转换为目标代码的`ast`。这个过程会使用很多的转换插件，但核心还是依赖于`@babel/traverse`。这个模块的使用也很简单，下面是官网的一个例子

```js
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  }
});
```

`traverse`接收两个参数，第一个参数就是`ast`，第二个参数就是一个`visitor`对象，所谓的`visitor`对象就是由一系列`ast`节点类型方法所组成的对象，当然，也会包含`enter`或者`exit`等类似于钩子的方法。

比如下面这个例子，同样来自于官网

```js
traverse(ast, {
    FunctionDeclaration: function(path) {
             path.node.id.name = "x";
    }
})
```

当`traverse`遍历`ast`的过程中发现了函数声明的语法，则在转换的过程中就会调用我们传入的`visitor`对象的`FunctionDeclaration`方法。

## @babel/generator

`babel`的第三阶段就是根据新的`ast`生成代码的过程。生成代码主要依赖于`@babel/generator`这个模块。

```js
const babel = require('@babel/core')
const generate = require('@babel/generator').default

const sourceCode = '[1, 2, 3].map(v => v + 1)'

const { ast } = babel.transformSync(sourceCode, { ast: true })

const output = generate(ast)

console.log(output.code)
```

## @babel/parser

`@babel/parser`是`babel`官方提供的一个语法解析模块。有以下特性

- 支持最新的`ECMAScript`版本的语法，默认是`ES2017`
- 注释操作
- 支持`JSX`, `Flow`和`Typescript`
- 支持处于提案阶段的语法

这个模块的使用也很简单，直接使用其提供的`parse`方法就可以对代码进行编译了，返回的结果就是编译后的`ast`。

```js
const { parse } = require('@babel/parser')

const sourceCode = '[1, 2, 3].map(v => v + 1)'

const ast = parse(sourceCode, { /* parser options */ })

console.log(ast)
```

> 解析的选项比较简单，直接看文档即可 https://www.babeljs.cn/docs/babel-parser#options

