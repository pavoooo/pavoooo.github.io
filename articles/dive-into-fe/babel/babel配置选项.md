# babel配置选项

[[toc]]

`babel`提供了很多配置选项，这些选项可以在不同的配置方式中使用。当你以编程式的方式使用`babel`，这些选项可以以对象的形式传递给`babel`。当然，你也可以在`babel`的配置文件中直接使用这些配置选项，或者在`babel`命令行中以参数的形式进行使用。

`babel`的配置选项分为很多类别，每一个类别都有不同使用场景，我们分别来看。

## Primary options

这一类的选项只允许在以编程式的方式使用`babel`的时候使用。所以，他们通常用在依赖`babel`而创建的编译工具里，或者直接调用`babel.transform`的时候使用。对于已经集成了`babel`的工具，比如`babel-loader`，`@babel/register`等是不能使用这些选项的。

### cwd

类型：`string`
默认: `process.cwd()`

`babel`从版本`7`开始引入了`根目录`的概念。默认的根目录就是你运行`babel`命令的目录，`根目录`可以通过下面介绍的`root`选项进行配置。但是，`root`选项的默认值就是`cwd`，如果我们声明了`cwd`而没有声明`root`。这其实就表示我们间接的声明了`root`选项。`cwd`会影响相对于工作目录进行解析的那些路径的结果。

假设我们有如下代码

```js
// index.js
const babel = require('@babel/core')

const code = `[1, 2, 3].map(v => v + 1)`

console.log(
    babel.transform(code)
)
```

然后在`index.js`的同级目录下新建`config/babel.config.js`，内容如下

```js
module.exports = {
    presets: [
        '@babel/preset-env'
    ]
}
```

然后运行`node index.js`，你会发现输出的`code`是没有被编译的。

```
code: '[1, 2, 3].map(v => v + 1);',
```

如果我们把`index.js`修改如下

```js
// index.js
// ...
console.log(
    babel.transform(code, {
        cwd: path.resolve('./config')
    })
)
```

运行`node index.js`，源码会正常被编译

```
code: '"use strict";\n\n[1, 2, 3].map(function (v) {\n  return v + 1;\n});',
```

`cwd`会改变工作目录(行为上改变)，所以那些相对于工作目录解析的路径都会跟着改变。

### caller

类型：`Object`，需要有一个字符串类型的`name`属性。

我们可以基于`babel`封装我们自己的编译工具，对于这些工具我们可以通过`caller`选项`name`属性设置我们的标识。同时我们也可以通过其它选项来控制`babel`的编译行为。比如我们想实现一个工具，这个工具可以自己处理`ES Modules`的语法，所以在使用`babel`编译源码的时候就不需要编译`ES Modules`相关的语法了，我们就可以这样写

```js
// index.js
const babel = require('@babel/core')

const code = 'export default "esModule"'

console.log(
    babel.transform(code, {
        caller: {
            name: 'without-compile-es-module',
            supportsStaticESM: true
        }
    })
)
```

编译后的`code`如下

```js
code: 'export default "esModule";'
```

`caller`选项就是用来告诉`babel`我是谁，我能做什么。同时自己能做的东西`babel`在编译的时候会直接跳过的。

### filename

类型：`string`

如果设置了`filename`，它会和当前编译的代码关联在一起。如果`filename`是未知的，并不能保证`babel`所有的功能都可用，因为有些`babel`的配置是依赖`filename`的。

- `filename`会被传递给插件。因为有的插件的`filename`是必需的。
- 有些选项，比如`test`，`exclude`和`ignore`是需要`filename`是一个`string`或者`Regexp`
- `.babelrc`被加载的时候是相对于当前被编译的文件的。如果这个选项被省略了，就相当于设置了`babelrc: false`一样，`babel`是不会去加载`.babelrc`文件的。

我们举一个例子，假设我们的代码如下

```js
// index.js
const babel = require('@babel/core')

const code = '[1, 2, 3].map(v => v + 1)'

console.log(
    babel.transform(code, {

    })
)
```

在`index.js`同级目录下新建`.babelrc`文件，内容如下

```js
{
  "presets": [
      "@babel/preset-env"
  ]
}
```

运行`node index.js`命令，输出的`code`如下

```
code: '[1, 2, 3].map(v => v + 1);',
```

源码并没有被编译，如果我们修改`index.js`文件如下

```js
// index.js
const babel = require('@babel/core')

const code = '[1, 2, 3].map(v => v + 1)'

console.log(
    babel.transform(code, {
        filename: 'index.js'
    })
)
```

编译结果的`code`如下

```js
code: '"use strict";\n\n[1, 2, 3].map(function (v) {\n  return v + 1;\n});',
```

这是因为我们将`filename`设置为了`index.js`，`babel`在编译的时候会通过它找到`.babelrc`文件的路径并加载。

### filenameRelative

类型：`字符串`

如果`filename`选项被设置了，这个选项的默认值是`path.relative(opts.cwd, opts.filename)`。

> 编程式使用的时候用法未知

### code

类型：`boolean`

默认是`true`

是否在`babel`的转换结果中输出`code`。如果设置为`false`，将相当于跳过了`babel`的生成步骤。

### ast

类型: `boolean`

默认是`false`

是否输出转换后的`ast`，如果设置为`true`，`babel.transform`的返回值中会包含一个`ast`选项，内容是编译过程中转换后的`ast`。这个选项默认是是`false`，因为很多用户是不关心中间过程的`ast`的，如果你想自己基于`ast`进行改造，可以将这个选项设置为`true`。

## Config Loading options

`babel`有很多种类型的配置文件，这就使得配置文件的加载逻辑变得有点复杂。关于`babel`各种类型的配置文件后面我们会详细介绍，这里我们先看一下在以编程式的方式使用`babel`的时候和其有关的几个选项。

### root

类型：`string`
默认是`opts.cwd`

> 这个选项只能在以编程式的风格使用`babel`的时候使用

上面我们说过`babel`在版本`7`中引入了`根目录`的概念。这个选项的默认值是`opts.cwd`，如果设置了`rootMode`，则它的初始值是由`rootMode`决定的。总之，按照`rootMode`的设置，最先找到`babel.config.js`文件的路径就是根路径，也就是`root`。

假设我们有如下代码

```js
// sub/index.js
const babel = require('@babel/core')

const code = '[1, 2, 3].map(v => v + 1); export default "esmodule"'

console.log(
    babel.transform(code, {
      
    })
)
```

进入到`sub`目录下，运行`node index.js`。输出的`cwd`和`root`分别是

```js
{
    cwd: '/Users/zhaosai/Documents/51s/own/ideas/前端攻坚战/babel-deep/document/sub',
    root: '/Users/zhaosai/Documents/51s/own/ideas/前端攻坚战/babel-deep/document/sub'
}
```

修改`sub/index.js`文件如下，并在`sub`同级目录下新建`babel.config.js`文件

```js
const babel = require('@babel/core')

const code = '[1, 2, 3].map(v => v + 1); export default "esmodule"'

console.log(
    babel.transform(code, {
      rootMode: 'upward'
    })
)
```

进入到`sub`目录下，运行`node index.js`。输出的`cwd`和`root`分别是

```js
{
    cwd: '/Users/zhaosai/Documents/51s/own/ideas/前端攻坚战/babel-deep/document/sub',
    root: '/Users/zhaosai/Documents/51s/own/ideas/前端攻坚战/babel-deep/document'
}
```

所以，`root`是根据`rootMode`指定的查找策略确定根目录的。

### rootMode

类型：`root`, `upward`和`upward-optional`。
默认：`root`

> 这个选项只能在以编程式的风格使用`babel`的时候使用

这个选项是和`root`的值息息相关的，它决定了`babel`怎么选择它的根目录。不同的查找模式最终可能会得到不同的`root`值。

- `root`：采用默认的设置策略，如果设置了`root`的值，就以这个值作为`root`最终值。否则就以`opts.cwd`作为`root`的最终值。

- `upward`：从`root`出发，逐级向上查找`babel.config.js`，如果在某个目录下找到了`babel.config.js`文件，就将这个目录作为`root`的最终值，如果没有找到，抛出错误。

- `upward-optional`：：从`root`出发，逐级向上查找`babel.config.js`，如果在某个目录下找到了`babel.config.js`文件，就将这个目录作为`root`的最终值，如果没有找到，就以默认的`root`作为`root`的最终值。

将`root`作为默认值是为了避免意外的加载了在当前项目外的`babel.config.js`文件。如果你将其设置为了`upward-optional`，一定要清楚的是`babel`将逐级的向上查找`babel.config.js`文件，直到文件系统的根目录。如果某些用户忘记了在他们的家目录下存在一个`babel.config.js`文件，可能会给你的构建造成意想不到的结果。

如果你的项目是一个`monorepo`项目，并且在项目的根目录下有一个`babel.config.js`文件。如果你在每个`monorepo`的子目录中没有将`rootMode`设置为`upward`，当你在子目录中运行`babel`的时候，`babel`是不会去加载项目根目录下的`babel.config.js`文件，同样可能会造成意想不到的编译结果，也有可能会编译失败。

### envName

类型：`string`

默认值是`process.env.BABEL_ENV || process.env.NODE_ENV || "development"`。

> 这个选项只能在以编程式的风格使用`babel`的时候使用

设置`babel`的运行环境。`babel`也会根据这个选项设置的值去读取`opts.env`中相关的关于环境的编译设置。如果你的配置文件是一个`js`文件，你也可以通过`api.env()`函数获取到这个选项的值。

### configFile

类型：`string | boolean`

默认是：如果`path.resolve(opts.root, "babel.config.js")`存在就是其值，否则就是`false`。

> 这个选项只能在以编程式的风格使用`babel`的时候使用

`babel`默会查找`babel.config.js`文件，但是你可以明确的在这个选项中设置一个`js`或者`json`文件的路径，让`babel`明确去查找这个文件。

::: warning
注意：这个选项是不会影响`.babelrc`文件的加载逻辑的，不推荐将这个选项的值指向一个`.babelrc`文件的路径。因为，如果你设置的这个值也符合`.babelrc`文件的加载策略，那么这个文件就会被加载两次。所以，推荐将这个选项的值指向的文件设置成一个和`babelrc`无关的名称。
:::

### babelrc

类型：`boolean`

默认情况下，如果设置了`filename`选项，它的值就是`true`。

> 可以在`babel`的编程式语法中使用，也可以在`configFile`所指向的配置文件中使用。编程式语法中的配置会覆盖配置文件中的同样的配置。

如果将这个选项设置为`true`，`babel`会根据`filename`的设置查找相对的配置文件。

> 注意：只有当`filename`设置的文件路径包含在该项目中，且其路径和`babelrcRoots`中的任一项匹配。`babel`才回去加载`.babelrc`文件。

### babelrcRoots

类型：`boolean | MatchPattern | Array<MatchPattern>`

默认：`opts.root`

> 可以在`babel`的编程式语法中使用，也可以在`configFile`所指向的配置文件中使用。编程式语法中的配置会覆盖配置文件中的同样的配置。

默认情况下，`babel`只在`root`路径中查找`.babelrc`文件。因为除此之外，`babel`很那确定其它`.babelrc`文件应该被加载，或者它所配置的插件和预设已经被安装了。这个选项就是用来告诉`babel`哪些路径下的`.babelrc`可以被加载。比如，假设我们的代码如下

```js
// packages/index.js
const babel = require('@babel/core')

const code = '[1, 2, 3].map(v => v + 1)'

console.log(
    babel.transform(code, {
        filename: 'packages/index.js'
    })
)
```

然后在`packages`目录下新建`.babelrc`文件，内容如下

```js
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

然后运行`node packages/index.js`，发现输出的`code`并没有被编译。这种情况下你就需要在根目录下的`babel.config.js`中添加如下配置

```js
{
    babelrcRoots: ['.', './packages']
}
```

然后运行`node packages/index.js`，输出的`code`已经被编译。

::: danger
理解还没有很透彻，需要加深理解。
:::

## Plugin and Preset options

### plugins

类型：`Array<PluginEntry | Plugin>` 

默认：`[]`

指定`babel`编译文件的时候所使用的插件。

### presets

类型：`Array<PresetEntry>`

默认：`[]`

指定`babel`编译文件的时候所使用的预设

## Config Merging options

### extends

类型：`string`

> 这个选项不能在预设内部使用

使用这个文件可以让一份配置文件继承另一份配置文件中的配置，两份配置文件中相同的选项会进行合并。

假设我们有如下代码

```js
const babel = require('@babel/core')

const code = '[1, 2, 3].map(v => v + 1)'

console.log(
    babel.transform(code)
)
```

同级目录下有两个文件，`babel.config.js`和`babel.extend.js`文件。内容如下

```js
// babel.config.js
module.exports = {
    extends: './babel.extend.js'
}
```

```js
// babel.extend.js
module.exports = {
    presets: [
        '@babel/preset-env'
    ]
}
```

运行`node index.js`，输出的`code`被正常编译。

### env

类型：`{ [envKey: string]: Options }`

> 不要在`env`选项中再使用`env`

允许我们为不同的环境添加不同的配置，其中`envKey`和`opts.envName`对应。两者相同的时候会在编译的时候将`env`中设置的配置和顶级配置进行合并。

比如我们的配置如下

```js
// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    env: {
        development: {
            plugins: ['@babel/plugin-development']
        },
        production: {
            plugins: ['@babel/plugin-production']
        }
    }
}
```

在开发环境下和生产环境下的最终配置分别是

```js
module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: ['@babel/plugin-development']
}
```

```js
module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: ['@babel/plugin-production']
}
```

### overrides

类型：`Array<Options>`

> 不要在`env`选项或者`overrides`选项中使用`overrides`

允许用户提供一组选项，这组配置会和顶级的配置文件进行合并成最终的配置。在`overrides`中指定的配置一般和`test`，`include`，`exclude`等搭配使用。允许我们为某些特定的编译文件指定特殊的编译设置。比如我们有如下配置

```js
overrides: [{
  test: "./vendor/large.min.js",
  compact: true,
}],
```

上面的配置对`./vendor/large.min.js`使用了`compact`为`true`的设置，而其它文件在编译的时候仍然采用顶层的`compact`的配置。

### test

类型：`MatchPattern | Array<MatchPattern>`

指定哪些文件需要被编译，只有路径和`test`的设置匹配的文件才会在编译的时候使用对应的配置。这个选项通常和`overrides`一起使用。但是它可以使用在任何地方，如果没有任何文件匹配其设置的规则，`babel`就会认为这份配置是无效的，并忽略其中的配置。

### include

和`test`选项功能相同

### exclude

指定编译过程中需要排除的文件。

### ignore

是一系列需要忽略的文件组成的数组。如果某个目录和这个数组中的某个元素匹配，`babel`会立即停止对整个目录的构建。假设我们有如下配置

```js
ignore: [
    './lib'
]
```

这个配置就表明禁止`babel`编译`lib`目录下的文件。

### only

同样是一个数组，功能和`ignore`相反。它指定了`babel`需要编译哪些目录下的文件。假设我们有如下配置

```js
only: [
  "./src",
]
```

它表示只让`babel`编译`src`目录下的文件，而忽略其它目录下的文件。

## Misc options

### sourceType

类型：`script`, `module`, `unambiguous`

默认是`module`

- `script`：以`ECMAScript Script`的语法来解析文件。文件中是不允许出现`import/export`语法的，编译后的文件也不会以严格模式运行。

- `module`：以`ECMAScript Module`的语法来解析文件。文件中允许出现`import/export`语法，编译后的文件运行在严格模式下。 

- `unambiguous`: 如果文件中含有`import/export`语法就认为是`module`，否则就认为是`script`。

这个选项是非常重要的，因为当前文件的类型会影响文件的解析，并且会影响转换过程中对`import/require`使用的判断。例如，`@babel/plugin-transform-runtime`会依赖当前文件的类型来判断使用`import`声明还是`require()`调用。当我们把`@babel/preset-env`的`useUbiltIns`设置为`usage`的时候，它也会做同样的判断。因为`babel`默认情况下把文件当做`ES Module`，在这种情况下，上面的这些插件和预设会在文件中插入`insert`声明的语句。所以，设置正确的`sourceType`是十分重要的，因为错误的类型会导致`babel`在文件中插入`import`语句，即使这个文件是`commonjs`类型的。这对于编译`node_modules`下的依赖十分重要，因为插入的`import`语句可能会导致`webpack`和其它构建工具将文件看作是一个`ES Module`，破坏了原本正常运行的`commonjs`文件。

> 注意：这个选项是不会影响`.mjs`类型的文字，对于这种文件，`babel`会始终将其作为一个`module`进行解析。

### highlightCode

是否高亮错误。将这个选项设置为`true`，会在终端输出高亮的错误提示，使错误信息更加易读。

假设我们有如下代码

```js
const babel = require('@babel/core')

const code = 'export default "esModule"'

console.log(
    babel.transform(code, {
        // 设置一个错误的sourceType
        sourceType: 'script'
    })
)
```

默认情况下输出的错误提示

![](/blog/babel1.png)

将`highlightCode`设置为false

```js
const babel = require('@babel/core')

const code = 'export default "esModule"'

console.log(
    babel.transform(code, {
        // 设置一个错误的sourceType
        sourceType: 'script',
        highlightCode: false
    })
)
```

错误提示如下

![](/blog/babel2.png)

### wrapPluginVisitorMethod

这个选项是一个函数，允许我们对每一个`visitor`添加一个包装函数。接收的三个参数分别是：

- `key`：当前正在执行的插件的标识
- `nodeType`：当前正在遍历的`ast`节点的类型
- `fn`：遍历器函数

我们可以使用这个选项来分析遍历器的调用过程及每个调用器的执行时长。用法如下

```js
wrapPluginVisitorMethod(key, nodeType, fn) {
    const self = this
    return function () {
        fn.apply(self, arguments)
    }
}
```

### parserOpts

解析过程中用到的选项。具体的可以参考[https://www.babeljs.cn/docs/babel-parser#options](https://www.babeljs.cn/docs/babel-parser#options)

### generatorOpts

生成代码的过程中用到的选项。具体的可以参考[https://www.babeljs.cn/docs/babel-generator#options](https://www.babeljs.cn/docs/babel-generator#options)

## Code Generator options

### retainLines

如果将这个选项设置为`true`，`babel`将尽可能的输出代码中每一行位置和其在原始文件中的位置保持相等。`babel`只是尽力而为，并不能保证所有的插件都能做到。

假设我们有如下代码

```js
[1, 2, 3].map(v => v + 1)
```

配置文件如下

```js
module.exports = {
    presets: [
        '@babel/preset-env'
    ]
}
```

输出代码如下

```js
"use strict";

[1, 2, 3].map(function (v) {
  return v + 1;
});
```

如果我们将`retainLines`选项设置为`true`。输出代码如下

```js
"use strict";[1, 2, 3].map(function (v) {return v + 1;});
```

### compact

可以将这个选项设置为`boolean`或`auto`，如果将这个值设置为`auto`，当`code.length > 50000`的时候输出代码为紧凑模式。紧凑模式下输出的代码，换行符和空白符都会被省略。

### minified

将这个选项设置为`true`的时候，会自动将`compact`设置为`true`。同时可能会省略`new Foo()`等语法后面的`()`。

### auxiliaryCommentBefore

在`babel`生成的代码前面添加注释

### auxiliaryCommentAfter

在`babel`生成的代码后面添加注释

> 利用上面两个功能你就能在生成的代码中看出哪些代码是`babel`自己生成的了

### comments

编译后的代码是否包含注释。默认包含

### shouldPrintComment

一个函数，参数是每一个注释结点。使这个函数返回`true`的注释会被保留，否则就删除。


## AMD / UMD / SystemJS module options

下面的这些选项只有在输出代码的格式为`amd`，`umd`或者`system`的时候才起作用。

### moduleIds

是否开启模块id的创建功能。默认是`!!opts.moduleId`

### moduleId

一个硬编码的模块id，不能与`getModuleId`一起使用。

假设我们有如下的代码

```js
// index.js
export default 'index module'
```

```js
// index2.js
export default 'index2 module'
```

配置文件如下

```js
// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', { modules: 'amd' }]
    ],
    moduleIds: true
}
```

编译后的文件输出如下

```js
// index.js
define("/Users/zhaosai/Documents/51s/own/ideas/\u524D\u7AEF\u653B\u575A\u6218/babel-deep/document/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'index module';
  _exports.default = _default;
});
```

```js
// index2.js
define("/Users/zhaosai/Documents/51s/own/ideas/\u524D\u7AEF\u653B\u575A\u6218/babel-deep/document/index2", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'index2 module';
  _exports.default = _default;
});
```

默认就以文件的路径作为模块的id，将配置文件改为

```js
// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', { modules: 'amd' }]
    ],
    moduleId: '@zsee/index'
}
```

编译后的文件如下

```js
// index.js
define("@zsee/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'index module';
  _exports.default = _default;
});
```

```js
// index2.js
define("@zsee/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'index2 module';
  _exports.default = _default;
});
```

从编译结果可以看出`babel`将`moduleId`硬编码为各个模块的`id`

### getModuleId

这个选项是一个函数，参数就是上面`babel`自己生成的模块id。如果这个函数返回的值为`falsy`，就还以参数作为模块id，否则就以这个函数的返回值作为模块id。

同样是上面的代码，将配置文件修改如下

```js
// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', { modules: 'amd' }]
    ],
    moduleIds: true,
    getModuleId(str) {
        return str.split('/').pop()
    }
}
```

编译后的文件如下

```js
define("index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'index module';
  _exports.default = _default;
});
```

```js
define("index2", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'index module';
  _exports.default = _default;
});
```

### moduleRoot

这个选项会在`babel`自动创建模块名称的时候将其作为创建的名称的一部分。

## 选项合并策略

`babel`的配置文件有很多种，我们也可以使用`env`或者`overrides`等选项在一个配置文件中声明多种配置。这些不同的配置`babel`在编译的时候会将其进行合并，作为最终使用的配置。合并策略基本如下：`parserOpts`和`generatorOpts`被合并而非替换，`plugins`和`presets`被替换而非合并，替换的时候会以插件和预设的标识作为参考。

假设我们有如下配置

```js
plugins: [
  './other',
  ['./plug', { thing: true, field1: true }]
],
overrides: [{
  plugins: [
    ['./plug', { thing: false, field2: true }],
  ]
}]
```

`overrides`将会和顶层的配置进行合并。`plugins`合并的时候并不是直接替换，而是把同名的插件进行替换。所以，上面配置的最终配置就是

```js
plugins: [
  './other',
  ['./plug', { thing: false, field2: true }],
],
```

所以，对于下面两种配置，后面的总是会把前面一个进行覆盖

```js
plugins: [
  './plug',
  './plug',
]

plugins: [
  ['./plug', {one: true}],
  ['./plug', {two: true}]
]
```

如果你想同时保留两个插件，你就需要给每一个插件设置一个唯一的标识。比如

```js
plugins: [
  ['./plug', {one: true}, "first-instance-name"],
  ['./plug', {two: true}, "second-instance-name"]
]
```

这样在最终配置中两个插件都会被保留，且都会被调用。