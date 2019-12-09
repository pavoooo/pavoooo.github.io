# babel常用的那些插件和预设

[[toc]]


`babel`官方提供了很多的插件和预设来编译`javascript`。下面我们就来看一些在日常的开发中比较常用的那些插件和预设。

## @babel/preset-env

`@babel/preset-env`是`babel`最常用的预设之一。它包含所有的用来编译`javascript`最新语法(`ES2015+的语法`)的`babel`插件。注意：这个预设只包含`ES2015+`标准语法的转换插件，并不包含处于`stage-x`阶段的语法插件。

### 安装

使用这个预设之前需要安装

```bash
npm install @babel/preset-env -D
```

使用的时候我们只需要在`babel`的配置文件中指定即可

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env'
  ]
}
```

`@babel/preset-env`进行语法转换的时候，默认是将所有的新特性进行转换。你可以在使用的时候进行配置，`@babel/preset-env`会根据你的配置决定哪些语法需要转换哪些语法不需要转换。

### browserslist

[browserslist](https://github.com/browserslist/browserslist)也是一个开源项目，它主要是用来配置目标环境的。默认情况下`babel`会读取它的配置来判断生成代码所支持的目标环境。如果你的项目是运行在浏览器或者`electron`中，建议你配置`browserslist`来明确目标环境。`babel`在编译的时候会自动判断新特性是否已经在目标环境支持，如果支持，`babel`不会编译此特性，反之，`babel`会将这种特性编译成目标环境所支持的语法。

在项目的根目录下创建`.browserslistrc`文件，写入如下配置

```
last 2 Chrome versions
```

这个配置表明我们编译后的代码所需要支持的目标环境是`chrome`浏览器最新的两个版本。如果我们对下面的代码进行编译

```js
[1, 2, 3].map(v => v + 1)
```

编译后的代码如下

```js
"use strict";

[1, 2, 3].map(v => v + 1);
```

即使已经配置了`@babel/preset-env`预设，编译后的代码和源代码并无不同。这是因为我们期望的目标环境是`chrome`浏览器最新的两个版本，在这两个版本中，`chrome`是支持箭头函数的语法的，在目标环境支持的情况下`babel`是不会给我们编译相关语法的。

如果我们把`.browserslistrc`文件的内容改为如下

```
ie <= 8
```

这个配置表明我们期望编译后的代码支持`IE8`及以下的浏览器，在这些浏览器中显然是不支持箭头函数的语法的，所以，`babel`会将箭头函数的语法编译成普通函数

```js
"use strict";

[1, 2, 3].map(function (v) {
  return v + 1;
});
```

除了使用`.browserslistrc`来声明目标环境外，我们也可以在`@babel/preset-env`的`target`配置中来声明目标环境，关于这个选项，后面我们会详解。这里你只需要知道这个选项的优先级是高于`.browserslistrc`文件的配置。

当然，你也可以明确指定`babel`不要去读取`.browserslistrc`相关的配置。你只需要将`@babel/preset-env`选项`ignoreBrowserslistConfig`设置为`true`即可

将`.browserslistrc`设置为`last 2 Chrome versions`，同时将`@babel/preset-env`选项`ignoreBrowserslistConfig`设置为`true`，你会发现箭头函数的语法仍然被转换了。

### 选项

`@babel/preset-env`提供了很多选项，下面我们就一起来看一下这些选项有什么用。

#### targets

格式：`string | Array<string> | { [string]: string }`

这个选项用来声明编译后的代码所支持的目标环境。它的优先级比`.browserslistrc`高，而且和`.browserslistrc`有一个很大的不同就是不光可以用它来声明浏览器项目所支持的目标环境，也能用它来声明`Nodejs`项目所支持的目标环境。默认值是`{}`。

比如将`targets`选项设置如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 chrome version'
      }
    ]
  ]
}
```

效果和上面使用`.browserslistrc`文件声明的目标环境是一致的。

`targets`经常声明为对象的形式，在这种形势下我们可以使用如下属性来精确的配置需要支持的各种目标环境。

- `chrome`
- `opera`
- `edge`
- `firefox`
- `safari`
- `ie`
- `ios`
- `android`
- `node`
- `electron`

> 上面这些选项的值我们需要设置特定的版本，这个版本就是所支持的目标浏览器的最低版本。`node`选项你也可以设置为`true`或者`current`。设置为这两个值，`babel`会自动获取`process.versions.node`，即当前运行`babel`的`Nodejs`版本。

比如，我们配置`targets`的值如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '72',
          ie: '8'
        }
      }
    ]
  ]
}
```

同样针对上面的箭头函数的例子进行转换，转换后的文件如下

```js
"use strict";

[1, 2, 3].map(function (v) {
  return v + 1;
});

```

在配置中我们期望的目标环境是`chrome72`和`ie8`。在这两个目标浏览器中，`chrome72`是支持箭头函数的语法的，而`ie8`并不支持箭头函数的语法。转换后的代码箭头函数被转换成了普通函数，所以，`@babel/preset-env`在转换代码的时会使编译后的代码同时支持你所设置的目标环境。

同样我们也可以指定所支持的`node`版本，比如

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '0.1'
        }
      }
    ]
  ]
}
```
`node@0.1`同样是不支持箭头函数的，所以经过`babel`编译后箭头函数会被转为普通函数。

- **targets.esmodules**

类型：`boolean`

我们可以使用这个选项设置目标环境为那些支持`ES Modules`的浏览器。当设置了这个选项为`true`的时候，`targets.browsers`选项会被忽略。

> 指定了`targets.esmodules`为`true`，`targets.browsers`会被重写成`edge 16, firefox 60, chrome 61, safari 10.1, opera 48, ios_saf 10.3, and_chr 71, and_ff 64`

比如我们的配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ]
  ]
}
```

> 这个选项其实是对目标环境是支持`ES Modules`的那些浏览器的一种便捷的设置方式

- **targets.browsers**

类型：`string | Array<string>`

基于`browserlist`的语法形式声明目标浏览器环境和版本。比如`last 2 version, > 5%, safari tp`。这个选项的配置会被`targets`中明确指定的目标浏览器选项覆盖。比如

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: 'last 2 chrome versions',
          chrome: '30'
        }
      }
    ]
  ]
}
```

我们在`browsers`中指定了目标环境是`last 2 chrome versions`，同时又设置了目标`chrome`的版本号为`30`。这个选项会覆盖`browsers`字段中声明的关于`chrome`的配置，而采用`chrome: 30`。

::: danger
注意：这个选项在后续的版本中可能会被移除
:::


- **targets.node**

类型：`string | "current" | true`

声明编译的代码所支持的`Nodejs`的版本，设置为`current`或者`true`，会采用`process.versions.node`作为目标环境。


- **targets.safari**

类型：`string | "tp"`

如果你想兼容`safari`浏览器的`technology preview`模式，可以将`safari`设置为`tp`。


#### spec

类型：`boolean`，默认是`false`

如果设置为`true`，那么会尽可能的将编译后的代码贴近标准，但是会使编译过程变慢。这个预设中的任意的插件都支持这个选项。

假设我们的代码如下

```js
[1, 2, 3].map(v => v + 1)
```

在默认情况下，编译后的代码如下

```js
"use strict";

[1, 2, 3].map(function (v) {
  return v + 1;
});
```

如果我们设置了`spec`为`true`

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        spec: true
      }
    ]
  ]
}

```

编译后的代码如下

```js
"use strict";

var _this = void 0;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

[1, 2, 3].map(function (v) {
  _newArrowCheck(this, _this);

  return v + 1;
}.bind(void 0));
```

你会发现，这种情况下`babel`编译后的代码会根据不同的语法增加了很多判断，只是为了将编译后的代码更佳符合标准。

#### loose

类型：`boolean`，默认是`false`

`babel`的许多插件都有两种模式

- 标准模式下编译后的代码会尽可能的贴近`ECMAScript 6`的语义
- `loose`模式下会输出更加简洁的代码

建议不要使用`loose`模式

> 关于`loose`的更多内容请看：https://2ality.com/2015/12/babel6-loose-mode.html

#### modules

类型：`amd | umd | systemjs | commonjs | cjs | auto | false`，默认是`auto`

将`ES Module`语法转换为另一种模块类型。如果设置为`false`，就禁止`babel`转义模块相关的语法。`cjs`只是`commonjs`的一个别名，两者的输出形式相同。

> 当`babel`和模块加载器，比如`webpack`，`rollup`等结合在一起使用的时候通常设置`modules`为`false`。这主要是为了将`ES Module`的语法交给模块加载器去处理。因为模块加载器的很多优化特性，比如`Tree shaking`，`Scope hosting`等都是依赖于`ES Module`语法。

假设我们的`index.js`内容为

```js
export default 'esModule'
```

下面是`modules`的各种设置对应的输出。

- **auto**

```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = 'esModule';
exports.default = _default;
```

- **amd**

```js
define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'esModule';
  _exports.default = _default;
});
```

- **umd**

```js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = 'esModule';
  _exports.default = _default;
});
```

- **systemjs**

```js
System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", 'esModule');
    }
  };
});
```

- **commonjs**

```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = 'esModule';
exports.default = _default;
```

- **cjs**

```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = 'esModule';
exports.default = _default;
```

- **false**

```js
export default 'esModule';
```

::: tip
注意：`import()`语法只能被转换为`amd`, `commonjs` 或者 `systemjs`
:::


#### debug

类型：`boolean`，默认是`false`

开启`debug`模式。编译过程会打印`Using targets`，`Using modules transform`，`Using plugins`等版本信息。

#### include

类型：`Array<string|Regexp>`，默认是`[]`

明确的指出总是需要包含的插件。

数组的元素可以是下面的任一种形式：

- `Babel plugins`：比如插件名称`@babel/plugin-transform-spread`或者没有插件前缀`plugin-transform-spread`
- `Built-ins`：比如`es6.map`，`es6.set`或者`es6.object.assign`等

当然，你也可以使用正则表达式来指定需要包含的插件的名称。一般来说，插件名称有如下三种形式：

- 全名：字符串，比如`es6.math.sign`
- 部分名称：字符串，比如`es6.math.*`，会被解析成所有以`es6.math`开头的插件
- 正则表达式：比如`/^transform-.*$/`或者`new RegExp("^transform-modules-.*")`

这个选项在某些场景是比较有用的，比如`Node 4`支持原生的`class`写法，但是不支持`spread`语法。如果`super`被传递了`spread`语法参数，那你就需要明确包含`@babel/plugin-transform-classes`插件了，否则它就没法转换带有`super`的`spread`参数了。

假设我们的代码如下

```js
// index.js
class Person {}

class Male extends Person {
  constructor(...args) {
    super(...args)
  }
}
```

我们的配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        node: '5'
      }
    ]
  ]
}
```

编译后的代码如下

```js
"use strict";

class Person {}

class Male extends Person {
  constructor() {
    super(...arguments);
  }

}
```

如果我们明确指定`include`包含`@babel/plugin-transform-classes`插件

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '5'
        },
        debug: true,
        include: ['@babel/plugin-transform-classes']
      }
    ]
  ]
}
```

编译后的代码如下

```js
"use strict";

function _possibleConstructorReturn(self, call) { }

function _assertThisInitialized(self) { }

function _getPrototypeOf(o) { }

function _inherits(subClass, superClass) { }

function _setPrototypeOf(o, p) {}

function _classCallCheck(instance, Constructor) { }

var Person = function Person() {
  _classCallCheck(this, Person);
};

var Male =
/*#__PURE__*/
function (_Person) {
  _inherits(Male, _Person);

  function Male() {
    _classCallCheck(this, Male);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(Male).call(this, ...args));
  }

  return Male;
}(Person);
```

从编译的结果就能看出，即使目标环境已经支持了相应的语法，如果我们明确指定了某个插件，这个插件也会将相应的语法进行转换。

#### exclude

类型：`Array<string|Regexp>`，默认是`[]`

和`include`选项的作用正好相反，它明确指出不需要包含的插件。如果我们明确支持需要移除的插件，即使目标环境不支持这种语法也不会被编译。

假设我们的代码如下

```js
// index.js
[1, 2, 3].map(v => v + 1)
```

配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '8'
        },
        exclude: ['@babel/plugin-transform-arrow-functions']
      }
    ]
  ]
}
```

编译后的代码如下

```js
"use strict";

[1, 2, 3].map(v => v + 1);
```

虽然我们设置的目标环境是需要支持`ie8`浏览器的，但是我们明确指定了不要包含`@babel/plugin-transform-arrow-functions`插件，所以箭头函数的语法是不会被编译的。

::: tip
注意：`include`和`exclude`选项只能指定包含在`@babel/preset-env`预设中插件的名称。例如，你在`include`选项中设置了`@babel/plugin-proposal-do-expressions`或者在`exclude`选项中设置了`@babel/plugin-proposal-function-bind`，编译的过程中会抛出错误。如果你需要使用不包含在预设中的插件，直接在配置文件的`plugins`选项中指定就行了。
:::


#### useBuiltIns

类型：`usage | entry | false`，默认是`false`

这个选项是用来告诉`@babel/preset-env`怎么处理`polyfills`的。默认情况下，`babel`只对源码语法层面进行编译，对于某些新特性的`API`，比如`Array.protoytype.includes`，`String.prototype.startsWith`等是无法进行编译的，即使目标环境不支持这些`API`。为了能够让编译后的代码在目标环境上运行，以前的做法就是我们需要手动的引入相应的`polyfill`，即`@babel/polyfill`，关于这个包的使用后面我们会说。但是这种做法有一些很不好的地方。首先，我们整包引入`@babel/polyfill`会造成我们的项目体积变大，我们更希望的是我们用到那些`api`，就只引入哪些`api`，对于没有使用到的`api`就不需要引入了。其次，`@babel/polyfill`会修改原型上的方法，如果我们的项目被别人依赖，可能会对别人的项目造成影响。

- **usage**

当我们将`useBuiltIns`选项设置为`usage`的时候，`babel`会根据我们设置的目标环境自动判断目标环境是否支持新特性`api`，如果支持，就不会帮我们引入相应的`polyfill`，如果不支持，就会自动帮我们引入相应的`polyfill`。所以，对于这个选项值我们就不需要自己在文件中`import @babel/polyfill`了。

比如我们有如下代码

```js
// index.js
Promise.resolve('hello world')
```

配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        targets: {
          ie: 8
        }
      }
    ]
  ]
}
```

编译后的代码如下

```js
"use strict";

require("core-js/modules/es6.promise.js");

require("core-js/modules/es6.object.to-string.js");

// index.js
Promise.resolve('hello world');
```

你会发现，`babel`判断出目标环境不支持相应`api`的情况下会自动的引入相应的`polyfill`。

> `babel`自动引入`polyfill`是从`core-js`包中引入的，所以一定要确保你的项目中安装了这个包。默认情况下`babel`会使用`core-js@2`版本。你可以通过`corejs`选项明确指出需要使用的`core-js`的版本，默认是`2`，如果我们设置为`3`，那么`babel`就会从`core-js@3`下引入相应的`polyfill`。不管使用哪个版本一定要确保自己的项目中安装了这个依赖

将配置文件修改为

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          ie: 8
        }
      }
    ]
  ]
}
```

> 明确指定所使用的`core-js`的版本是为了防止后面`babel`依赖的默认的`core-js`的版本改变

::: warning
为了防止你主动引入了`@babel/polyfill`，`babel`在`useBuiltIns`为`usage`的时候会进行判断。如果发现你主动引入了，会给予如下提示：When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
  Please remove the direct import of `core-js` or use `useBuiltIns: 'entry'` instead.
:::

- **entry**

将`useBuiltIns`选项设置为`entry`后，`babel`在编译的时候会根据设置的目标环境进行判断这种环境不支持哪些新特性`api`，然后将`polyfills`拆分引入，仅引入目标环境不支持的`polyfill`，而不管你的项目中是否用到了。

假设我们的代码如下

```js
// index.js
import '@babel/polyfill'

[1, 2, 3].includes(1)
```

配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          ie: 8
        }
      }
    ]
  ]
}
```

编译后的输出代码

```js
"use strict";

require("core-js/modules/es6.array.copy-within.js");

// ...省略了很多polyfill的引入

require("regenerator-runtime/runtime.js");

[1, 2, 3].includes(1);
```

::: warning
注意：对于`core-js`模块和`regenerator-runtime`模块需要独立安装
:::

- **false**

将`useBuiltIns`设置为`false`就禁止`@babel/preset-env`去处理`polyfill`。这种情况你就需要手动引入`@babel/polyfill`。


#### forceAllTransforms

类型：`boolean`，默认是`false`

默认情况下，`@babel/preset-env`会根据配置的目标环境进行相应的转换。如果将`forceAllTransforms`设置为`true`。`@babel/preset-env`会运行所有的转换插件进行转换。如果你的目标环境只支持`ES5`的语法，或者你想使用`uglifyjs`对编译后的代码进行压缩。将这个选项设置为`true`是一个不错的选择。

> 之前的`UglifyJS`只能识别`ES5`的语法，不能压缩`ES6`的语法

#### configPath

类型：`string`，默认是`process.cwd()`

`browserslist`配置文件的路径，默认是`babel`运行目录，如果没有找到会逐级向上查找，直到系统根目录。

#### ignoreBrowserslistConfig

类型：`boolean`，默认是`false`

是否忽略`browserslist`相关的配置，默认是不忽略。


## @babel/preset-react

这个预设为`react`提供，能够识别并转义`react`的`jsx`的语法。这个预设包含如下插件

- `@babel/plugin-syntax-jsx`
- `@babel/plugin-transform-react-jsx`
- `@babel/plugin-transform-react-display-name`

如果`development`选项为`true`的话，还会开启另外两个插件

- `@babel/plugin-transform-react-jsx-self`
- `@babel/plugin-transform-react-jsx-source`

预设的使用和其它预设无异，这里我们主要看一下这个预设有哪些实用的选项。

假设我们的代码如下

```js
function render() {
  return (
    <div>JSX</div>
  )
}
```

配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-react'
  ]
}
```

编译后的代码如下

```js
function render() {
  return React.createElement("div", null, "JSX");
}
```

### 选项

#### pragma

`string`类型，默认值是`React.createElement`。编译`JSX`表达式时被转换后的函数。

这个函数名称我们可以自定义，比如我们指定为`createElement`方法

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        pragma: 'createElement'
      }
    ]
  ]
}
```

编译后的代码为

```js
function render() {
  return createElement("div", null, "JSX");
}
```


#### pragmaFrag

`string`类型，默认是`React.Fragment`。编译`JSX`片段的时候所使用的替换组件。

假设我们的代码如下

```js
function render() {
  return (
    <>
      <div>123</div>
    </>
  )
}
```

编译后的代码如下

```js
function render() {
  return React.createElement(React.Fragment, null, React.createElement("div", null, "123"));
}
```

如果我们想使用自己自定义的片段函数，我们可以在`pragmaFrag`中指定。比如

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        pragmaFrag: 'React.CustomFragment'
      }
    ]
  ]
}
```

编译后的代码如下

```js
function render() {
  return React.createElement(React.CustomFragment, null, React.createElement("div", null, "123"));
}
```

#### useBuiltIns

这个选项的含义和`@babel/preset-env`选项的`useBuiltIns`含义基本相同。都是在插件需要某项功能的时候，使用这个参数来确定使用内置功能还是通过`polyfill`来实现。

#### development

`boolean`类型，默认值是`false`。用于确定是否开启辅助开发的插件。

#### throwIfNamespace

`boolean`类型，默认值是`true`

如果使用了`XML`命名空间标签，此参数用于设置是否抛出错误。

假设我们的代码如下

```js
function render() {
  return (
    <div>
      <f:image />
    </div>
  )
}
```

上面的代码在使用`babel`编译的时候就会报错。

>  Namespace tags are not supported by default. React's JSX doesn't support namespace tags. You can turn on the 'throwIfNamespace' flag to bypass this warning

如果我们将`throwIfNamespace`设置为`false`就能顺利编译。

## @babel/plugin-transform-runtime

这个插件是`babel`官方提供的一个非常重要的插件了。在说明它的用途之前，我们先看一个简单的例子。

新建两个文件`index.js`和`home.js`，内容分别如下

```js
// index.js
class Index {

}
```

```js
// home.js
class Home {

}
```

我们`babel`配置如下

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env'
  ]
}
```

运行`babel`命令编译上面的文件，编译后的代码如下：

```js
// index.js
"use strict";

function _classCallCheck(instance, Constructor) { }

var Index = function Index() {
  _classCallCheck(this, Index);
};
```


```js
// home.js
"use strict";

function _classCallCheck(instance, Constructor) {  }

var Home = function Home() {
  _classCallCheck(this, Home);
};
```

从编译结果来看，`babel`在进行某些语法编译的时候，可能会需要一些辅助函数。正如上面的代码，`babel`在编译`class`语法的时候，会用到`_classCallCheck`辅助函数。默认情况下，`babel`会将其用到的辅助函数添加到每个文件的顶部，比如上面编译后的`index.js`和`home.js`文件顶部都有`_classCallCheck`函数。这种情况显然是不合理的，如果我们的文件很多，每个文件都有这种辅助函数，这无疑会给我们的项目引入很多重复的代码，增加我们项目的体积。

为了解决这种问题，我们就可以利用`@babel/plugin-transform-runtime`插件了，我们现在我们的配置文件中引入这个插件，看一下编译之后的文件。

```js
module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
```

使用上面的配置，编译后的文件如下

```js
// index.js
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Index = function Index() {
  (0, _classCallCheck2.default)(this, Index);
};
```

```js
// home.js
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Home = function Home() {
  (0, _classCallCheck2.default)(this, Home);
};
```

从编译结果可以看出，辅助函数并没有在每个文件的顶部生成，而是直接从`@babel/runtime`包中引入。这就是`@babel/plugin-transform-runtime`插件帮我们做的一件很重要的事情了。**这个插件会将每一个辅助函数都从`@babel/runtime`这个包中引入，所以使用这个插件的时候需要同时安装`@babel/runtime`包并将其保存在dependencies中。**

除了上面的功能外，`@babel/plugin-transform-runtime`还提供了一个重要的功能就是处理`polyfill`。上面我们讲`@babel/preset-env`的时候也说过，将这个预设的`useBuiltIns`设置为`usage`，这个预设会自动的帮我们引入相应的`polyfill`。但是`@babel/preset-env`处理`polyfill`的时候有一个缺陷——会污染全局作用域。

比如下面的代码

```js
// index.js
Promise.resolve('Babel')
```

配置文件如下

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage'
      }
    ]
  ]
}
```

编译后的代码如下

```js
"use strict";

require("core-js/modules/es6.promise.js");

require("core-js/modules/es6.object.to-string.js");

Promise.resolve('Babel');
```

所以`core-js/modules/es6.promise.js`这个模块实际上会重写全局作用域下的`Promise`，进而污染全局环境。

这种情况我们同样可以使用`@babel/plugin-transform-runtime`插件来解决。做法很简单，只需要将这个插件的`corejs`选项设置为你想使用的`corejs`版本即可。

所以，将我们的配置修改如下

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2
      }
    ]
  ]
}
```

> 这个插件处理polyfill的优先级比`@babel/preset-env`高，因为插件在预设之前执行。

编译后的代码如下

```js
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

_promise.default.resolve('Babel');
```

从编译结果来看，`@babel/plugin-transform-runtime`并没有重写全局的`Promise`，而是将我们使用的`Promise`转换成本地的一个`_promise`。

> 注意：注意上面的编译结果，编译后用到的的辅助函数都是从`@babel/runtime-corejs2`包中引入的。所以，当你使用`@babel/plugin-transform-runtime`处理`polyfill`的时候，请一定要把`@babel/runtime-corejs2`(版本根据你在corejs选项中设置的而定)安装到`dependencies`中。

上面就是`@babel/plugin-transform-runtime`的一些核心功能了。`@babel/plugin-transform-runtime`插件大概做了三件事情：

- 当我们使用`async/generator`函数的时候，它会自动帮我们引入`@babel/runtime/regenerator`模块。当然你可以通过将`regenerator`选项设置为`false`来关闭

- 如果判断出用户使用的新特性`API`在目标环境中不被支持的时候，会自动的从`core-js`模块中将相应的`ployfill`引入

- 从`@babel/runtime`中引入辅助函数，且自动移除内联的`babel`辅助函数

> 使用`@babel/plugin-transform-runtime`插件处理`polyfill`非常适用于那些你需要发布且被别人依赖的库中。

> 上面就是`babel`几个比较常用的预设和插件了。虽然官方还提供了很多的插件和预设，但是有些插件和预设的功能是完全有其他工具可以替代的，比如`@babel/preset-minify`，`@babel/preset-typescript`等，我们可以借助于`webpack`等构建工具来实现
