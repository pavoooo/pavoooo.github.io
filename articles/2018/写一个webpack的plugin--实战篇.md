# 写一个webpack的plugin--实战篇

在[写一个webpack的plugin--理论篇](./写一个webpack的plugin--理论篇.html)中，初步的介绍了写webpack的plugin所需要了解的一点点的内容。了解了这些内容，我们就能结合自己的业务需要写一个简单的插件来供自己使用了。当然，想了解关于插件更多的细节，可以去webpack的官方网站学习。

这里我们就从自己的业务出发，写一个小插件来满足自己日常开发的需要。我们在孔明灯查错的时候通常会发现`Script error`的错误。造成这些错误的基本原因是：
> 当这些从第三方加载的JavaScript脚本执行出错，因为违背了同源策略, 为了保证用户信息不被泄露，错误信息不会显示出来，取而代之只会返回一个Script error。

解决的方法需要有两个基本的条件。
- 一是跨域脚本的服务器必须通过 Access-Controll-Allow-Origin 头信息允许当前域名可以获取错误信息
- 二是当前域名的 `script` 标签也必须指明 src 属性指定的地址是支持跨域的地址，也就是 `crossorigin` 属性。

第二个条件就需要我们在前端代码中明确指明了，这里写的这个插件就是用来替我们做这件事情的。

下面是这个插件的基本思路：当我们执行`nbm run build`的时候，`webpack`会通过`html-webpack-plugin`插件根据我们所指定的html模版来生成项目的入口文件。`html-webpack-plugin`在执行的过程中，特定的时机会派发特定的事件。所以，我们只需要监听这个插件在生成`html`之前所派发的事件，然后在这个事件中处理我们的`script`标签，处理完之后把结果传递给下一个事件即可。所以，我们需要监听的事件就是`html-webpack-plugin-before-html-processing`(这个插件会派发很多的事件，具体的可以参考文档)。这个事件就是在入口html生成前触发的。

了解了基本思路之后，下面就是详细的代码：

```js
// 匹配script标签
const scripts = /<script[^>]*>/gm
// 匹配script标签上所有的属性
const attrs = /(([^=\s>]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?|>)/mg

class AddAttrsToScript {
    constructor(options = {}) {
        this.options = options
    }

    apply(compiler) {
        // 监听compilation事件
        compiler.plugin('compilation', (compilation) => {
            // 监听 html-webpack-plugin-before-html-processing 事件
            // 这是一个异步插件
            compilation.plugin('html-webpack-plugin-before-html-processing', (data, cb) => {
                // 通过 data.html 取出内存中的html数据，并匹配所有的script标签
                const scriptMatch = data.html.match(scripts);
                if (scriptMatch) {
                    scriptMatch.forEach(script => {
                        // 匹配出所有的属性
                        const scriptSections = script.match(attrs)
                        Object.keys(this.options).forEach(attr => {
                            if (this.options[attr] === true) {
                                scriptSections.splice(scriptSections.length - 1, null, attr)
                            } else {
                                scriptSections.splice(scriptSections.length - 1, null, `${attr}="${this.options[attr]}"`)
                            }
                        })
                        // replace html 中对用的script标签
                        data.html = data.html.replace(script, Array.from(new Set(scriptSections)).join(' '))
                    })
                }
                cb(null, data)
            })
        })
    }
}

module.exports = AddAttrsToScript
```
上面就是这个插件的所有部分，使用的时候直接引入即可：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAttrsToScript = require('./AddAttrsToScript')

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // 这个插件需要在HtmlWebpackPlugin之后调用
        // 传递的参数对象就是需要添加到script标签上的属性及属性值
        new AddAttrsToScript({
            crossorigin: 'anonymous',
            async: true,
        }),
    ]
}
```

当我们在执行`nbm run build`之后，就能在生成的html文件中看到所有的script标签都自动添加上了`crossorigin="anonymous"`和`async`属性了。

这个插件主要是为了加强`webpack`插件开发的理解，业务开发中手动的添加其实也挺方便的，而且可控性也高。这个插件实际使用还是有几个缺点的，比如：没有对script的请求源判断，导致所有的script都会加上传入的属性，没有进行属性重复的判断等。这些，慢慢修吧。