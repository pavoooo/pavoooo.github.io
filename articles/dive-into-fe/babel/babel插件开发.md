# babel插件开发

`babel`是一个微内核工具，它本身只提供一些核心的功能。`babel`的插件机制使得它能对各种语法进行解析，转义和生成。这篇文章我们就好好的看一下`babel`的插件是怎么实现的。在了解具体实现，希望你能对[Node和NodePath](/dive-into-fe/babel/Node和NodePath.html)有一个基本的了解。

## 插件结构

在实际学习开发插件之前，你首先需要知道的就是`babel`插件是什么？一个对象？一个函数？还是其它？因此，我们先看看平时我们常用的插件它们是怎么实现的，我们并不看具体的实现细节，只看基本结构。

- **@babel/plugin-transform-arrow-functions**

```js
export default declare((api, options) => {
    return {
        name: 'transform-arrow-functions',
        visitors: {
            ArrowFunctionExpression(path) {

            }
        }
    }
})
```

> `declare`函数是一个高阶函数。功能可以理解成`declare(callback) => callback(api, options)`

所以，`@babel/plugin-transform-arrow-functions`其实就是一个函数，这个函数返回一个对象，该对象包含一个`name`属性和`visitor`属性。

> `visitor`属性和我们在[Node和NodePath](/dive-into-fe/babel/Node和NodePath.html)中讲述的含义是一致的。

- **@babel/plugin-transform-for-of**

```js
export default declare((api, options) => {
    return {
        name: 'transform-for-of',
        visitors: {
            ForOfStatement(path) {

            }
        }
    }
})
```

`@babel/plugin-transform-for-of`和上面介绍的`@babel/plugin-transform-arrow-functions`插件的结构基本一致。其实，这两种插件的结构基本上就是`babel`插件的标准结构。**`babel`插件就是一个函数，这个函数返回一个对象，对象中的`name`属性用来设置该插件的名称。`visitor`属性是插件的核心，定义该插件需要转换的语法树节点的类型。**

> 你也可以直接返回一个没有`visitor`属性的对象，而是把`vistor`属性的内容提到这个返回的对象中。比如

```js
export default function plugin() {
    return {
        ForOfStatement(path) {

        }
    }
}
```

## 写插件
明白了插件的基本结构后，我们就能写一个插件了。其实，在[Node和NodePath](/dive-into-fe/babel/Node和NodePath.html)中我们已经写过了几个`demo`，对于这些`demo`我们做一下简单的封装就成为了一个`babel`插件了。

比如，将求幂运算符那个`demo`封装成一个插件。

```js
// plugin-transform-power
module.exports = function() {
    return {
        name: 'power',
        visitor: {
            BinaryExpression(path) {
                const node = path.node
                if (node.operator === '**') {
                const leftValue = node.left.value
                const rightValue = node.right.value
                // 也可以直接通过这种方式处理，但是不推荐
                // path.replaceWithSourceString(`Math.pow(${leftValue}, ${rightValue})`)
                path.replaceWith(
                    t.callExpression(
                    t.memberExpression(t.identifier('Math'), t.identifier('pow'), false),
                    [
                        t.numericLiteral(leftValue),
                        t.numericLiteral(rightValue)
                    ]
                    )
                )
                }
            }
        }
    }
}
```

上面就是一个简单的`babel`插件，使用方式和普通插件无异。

```js
// babel.config.js
module.exports = {
    plugins: [
        require('你的插件的路径')
    ]
}
```

## 插件选项

`babel`插件是可以接受不了参数的，那这些参数是怎么传递给我们的参数的呢？

```js
module.exports = function(api, options, dirname) {
    
}
```

`babel`插件暴露的函数接收三个参数：

- `api`：是一个对象，包含如下属性

```js
[
  'Plugin',
  'File',
  'buildExternalHelpers',
  'resolvePlugin',
  'resolvePreset',
  'version',
  'getEnv',
  'tokTypes',
  'traverse',
  'template',
  'createConfigItem',
  'loadPartialConfig',
  'loadOptions',
  'transform',
  'transformSync',
  'transformAsync',
  'transformFile',
  'transformFileSync',
  'transformFileAsync',
  'transformFromAst',
  'transformFromAstSync',
  'transformFromAstAsync',
  'parse',
  'parseSync',
  'parseAsync',
  'DEFAULT_EXTENSIONS',
  'OptionManager',
  'types',
  'cache',
  'env',
  'async',
  'caller',
  'assertVersion'
]
```

- `options`：第二个选项是一个对象，就是我们传递给这个插件的参数
- `dirname`：第三个参数表示当前插件的路径

> 你也可以在`visitor`对象的每个方法的第二个参数获取传递给插件的选项(保存在`opts`属性上)。

了解了插件的选项机制，我们就能让我们的插件更加的具有适应性。

下面我们就为上面提供的插件提供两个选项：`loose`和`pow`。其中`loose`为`true`的时候会对幂进行校验，必须为整数。`pow`为`true`的时候使用`Math.pow`计算，否则就是用相乘的方式计算。

下面是插件的具体实现

```js
module.exports = function ({ types: t }, opts = {}) {
  const { loose, pow } = Object.assign({ loose: false, pow: true }, opts)
  const isInt = (v) => parseInt(v) === parseFloat(v)

  return {
      name: 'power',
      visitor: {
          BinaryExpression(path) {
              const node = path.node
              if (node.operator === '**') {
                  const leftValue = node.left.value
                  let rightValue = node.right.value

                  if (!loose) {
                      if (!isInt(rightValue)) {
                        throw path.buildCodeFrameError('不能设置小数幂')
                      }
                  } else {
                      rightValue = parseInt(rightValue)
                  }

                  if (pow) {
                      path.replaceWith(
                          t.callExpression(
                            t.memberExpression(t.identifier('Math'), t.identifier('pow'), false),
                            [
                                t.numericLiteral(leftValue),
                                t.numericLiteral(rightValue)
                            ]
                          )
                      )
                  } else {
                      const expression = new Array(rightValue).fill(leftValue).join('*')
                      path.replaceWith(
                          t.numericLiteral(eval(expression))
                      )
                  }
              }
          }
      }
  }
}
```

插件开发好后，我们就能通过本地路径直接使用插件了。

```js
module.exports = {
  plugins: [
    [require('./plugin'), { pow: false, loose: true }]
  ]
}
```