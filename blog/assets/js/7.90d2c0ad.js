(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{203:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("ul",[a("li",[t._v("第一篇--"),a("router-link",{attrs:{to:"./react-start到co源码系列一.html"}},[t._v("快速搭建一个"),a("code",[t._v("react")]),t._v("开发环境。")])],1),t._v(" "),a("li",[t._v("第二篇--"),a("router-link",{attrs:{to:"./react-start到co源码系列二.html"}},[t._v("快速开发一个"),a("code",[t._v("react")]),t._v("开发环境脚手架工具")]),t._v("。有了这个工具，在任何地方都能够一键生成环境。")],1),t._v(" "),a("li",[t._v("第三篇--"),a("router-link",{attrs:{to:"./react-start到co源码系列三.html"}},[t._v("脚手架依赖的核心库"),a("code",[t._v("co")]),t._v("的源码解析。")])],1)]),t._v(" "),a("hr"),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._m(18),t._v(" "),t._m(19),t._v(" "),t._m(20),t._m(21),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),t._m(24),a("p",[t._v("这个预设主要包含了如下两个插件：")]),t._v(" "),t._m(25),t._v(" "),t._m(26),t._v(" "),t._m(27),t._m(28),t._v(" "),t._m(29),t._v(" "),t._m(30),a("p",[t._v("以上就是"),a("code",[t._v("react")]),t._v("简单的环境搭建,后面会推出后续的文章。喜欢的同学欢迎关注,并可以从我的"),a("code",[t._v("github")]),t._v("--"),a("a",{attrs:{href:"https://github.com/pavoooo/template",target:"_blank",rel:"noopener noreferrer"}},[t._v("github"),a("OutboundLink")],1),t._v("上获得文章中的所有代码。")])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"react-start到co源码系列一"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-start到co源码系列一","aria-hidden":"true"}},[this._v("#")]),this._v(" react-start到co源码系列一")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("react作为当前十分流行的前端框架，相信很多前端er都有蠢蠢欲动的学习它的想法。工欲善其事，必先利其器。这篇文章就简单的给大家介绍一下如何我快速的搭建一个"),s("code",[this._v("react")]),this._v("前端开发环境。主要针对于"),s("code",[this._v("react")]),this._v("小白，大神不喜勿喷。\n从标题可以看出，这里不会仅仅只介绍一下"),s("code",[this._v("react")]),this._v("的开发环境如何搭建。我将这个系列分成三篇介绍:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("接下来就开始介绍"),a("code",[t._v("react")]),t._v("开发环境的基本搭建。"),a("code",[t._v("react")]),t._v("需要通过"),a("code",[t._v("webpack")]),t._v("进行打包，所以请确保自己的机器上安装了"),a("code",[t._v("webpack")]),t._v("和"),a("code",[t._v("nodejs")]),t._v("。无安装的请自行谷歌。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"安装babel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装babel","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装"),s("code",[this._v("babel")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[a("code",[t._v("react")]),t._v("使用"),a("code",[t._v("jsx")]),t._v("的语法，这种语法形式浏览器是不能识别的。所以需要借助"),a("code",[t._v("babel")]),t._v("编译器对我们的文件进行编译。简单的说这里的"),a("code",[t._v("babel")]),t._v("就有两个作用：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[t._v("一是编译一些基本的"),a("code",[t._v("react")]),t._v("特性")]),t._v(" "),a("li",[t._v("二是让我们能够使用"),a("code",[t._v("es6")]),t._v("等语法形式\n接下来通过如下方式安装和配置对应的"),a("code",[t._v("loader")]),t._v("。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"安装babel-loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装babel-loader","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装"),s("code",[this._v("babel-loader")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("// 安装 babel-core 和 babel-loader\n"),a("span",{attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v(" babel-core babel-loader --save-dev\n// 安装babel的es6和react支持\n"),a("span",{attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v(" babel-preset-es2015 babel-preset-react --save-dev\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("blockquote",[a("p",[a("code",[t._v("babel-preset-es2015")]),t._v(":将"),a("code",[t._v("es6")]),t._v("语法解析成浏览器支持的"),a("code",[t._v("es5")]),t._v("语法\n"),a("code",[t._v("babel-preset-react")]),t._v(":用于"),a("code",[t._v("react")]),t._v("语法的解析和优化")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"配置-babelrc文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-babelrc文件","aria-hidden":"true"}},[this._v("#")]),this._v(" 配置"),s("code",[this._v(".babelrc")]),this._v("文件")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"presets"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v('"es2015"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("  "),a("span",{attrs:{class:"token comment"}},[t._v("// 告诉babel解析js语法的时候需要使用这两个preset")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("上面就是我们对"),s("code",[this._v("babel-loader")]),this._v("的基本配置, 为了保持"),s("code",[this._v("js")]),this._v("语法的一致性和严谨性,我们还需要安装和配置"),s("code",[this._v("eslint")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"安装eslint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装eslint","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装"),s("code",[this._v("eslint")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"安装eslint-loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装eslint-loader","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装"),s("code",[this._v("eslint-loader")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" eslint eslint-loader --save-dev\n")])]),this._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[this._v("1")]),s("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("安装好"),s("code",[this._v("eslint-loader")]),this._v("之后  我们还需要安装一个第三方配置好的格式插件 这里我们将使用"),s("code",[this._v("eslint-config-standard-react")]),this._v("这个插件。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"安装eslint-config-standard-react"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装eslint-config-standard-react","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装"),s("code",[this._v("eslint-config-standard-react")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" eslint-config-standard eslint-config-standard-react eslint-plugin-promise eslint-plugin-react eslint-plugin-standard --save-dev \n")])]),this._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[this._v("1")]),s("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"配置-eslintrc文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-eslintrc文件","aria-hidden":"true"}},[this._v("#")]),this._v(" 配置"),s("code",[this._v(".eslintrc")]),this._v("文件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在根目录下建立一个"),s("code",[this._v(".eslintrc")]),this._v("文件, 同时写入如下代码：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"extends"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v('"standard"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"standard-react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"添加hmr功能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#添加hmr功能","aria-hidden":"true"}},[this._v("#")]),this._v(" 添加"),s("code",[this._v("HMR")]),this._v("功能")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[a("code",[t._v("HMR(Hot Module Replacement)")]),t._v("功能就是通常所说的热加载功能, "),a("code",[t._v("babel")]),t._v("提供了一个预设"),a("code",[t._v("babel-preset-react-hmre")]),t._v("可以很好的帮助我们完成"),a("code",[t._v("react")]),t._v("组件的热加载功能。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"安装babel-preset-react-hmre"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装babel-preset-react-hmre","aria-hidden":"true"}},[this._v("#")]),this._v(" 安装"),s("code",[this._v("babel-preset-react-hmre")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token function"}},[this._v("npm")]),this._v(" "),s("span",{attrs:{class:"token function"}},[this._v("install")]),this._v(" babel-preset-react-hmre  --save-dev\n")])]),this._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[this._v("1")]),s("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("code",[this._v("react-transform-hmr")]),this._v(":实现热加载")]),this._v(" "),s("li",[s("code",[this._v("react-transform-catch-errors")]),this._v(":捕获"),s("code",[this._v("render")]),this._v("中的方法并展现在界面上")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"修改上述的-babelrc文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修改上述的-babelrc文件","aria-hidden":"true"}},[this._v("#")]),this._v(" 修改上述的"),s("code",[this._v(".babelrc")]),this._v("文件")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"presets"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v('"react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"es2015"')]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"env"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token string"}},[t._v('"development"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{attrs:{class:"token string"}},[t._v('"presets"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v('"react-hmre"')]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"webpack-config-js文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-config-js文件","aria-hidden":"true"}},[this._v("#")]),this._v(" "),s("code",[this._v("webpack.config.js")]),this._v("文件")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("通过上面的几个步骤,我们就大致完成了"),s("code",[this._v("react")]),this._v("开发环境的基本搭建。下面就是我们完整的"),s("code",[this._v("webpack.config.js")]),this._v("文件。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'path'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" HtmlWebpackPlugin "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'html-webpack-plugin'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" OpenBrowserPlugin "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'open-browser-webpack-plugin'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("ROOT_PATH")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("resolve")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("SRC_PATH")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("resolve")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'src'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("BUILD_PATH")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("resolve")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'build'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" webpackOptions "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  devtool"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'#source-map'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  entry"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    app"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("resolve")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token constant"}},[t._v("SRC_PATH")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'index.jsx'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  output"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    path"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("BUILD_PATH")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'bundle.js'")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  module"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("//eslint应该在preLoaders中进行")]),t._v("\n    preLoaders"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        test"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/\\.jsx?$/")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        loader"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'eslint'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        exclude"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/node_modules/")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("//配置loaders")]),t._v("\n    loaders"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        test"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/\\.jsx?$/")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        loader"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'babel'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        exclude"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token regex"}},[t._v("/node_modules/")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        test"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("  "),a("span",{attrs:{class:"token regex"}},[t._v("/\\.css?$/")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        loader"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'style!css!stylus'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        include"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("SRC_PATH")]),t._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  plugins"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("HtmlWebpackPlugin")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      title"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'react-start'")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("OpenBrowserPlugin")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" url"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'http://localhost:8080'")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  resolve"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    extensions"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v("''")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'.js'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'.jsx'")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  devServer"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    historyApiFallback"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    hot"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    inline"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    progress"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nmodule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" webpackOptions\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br"),a("span",{staticClass:"line-number"},[t._v("38")]),a("br"),a("span",{staticClass:"line-number"},[t._v("39")]),a("br"),a("span",{staticClass:"line-number"},[t._v("40")]),a("br"),a("span",{staticClass:"line-number"},[t._v("41")]),a("br"),a("span",{staticClass:"line-number"},[t._v("42")]),a("br"),a("span",{staticClass:"line-number"},[t._v("43")]),a("br"),a("span",{staticClass:"line-number"},[t._v("44")]),a("br"),a("span",{staticClass:"line-number"},[t._v("45")]),a("br"),a("span",{staticClass:"line-number"},[t._v("46")]),a("br"),a("span",{staticClass:"line-number"},[t._v("47")]),a("br"),a("span",{staticClass:"line-number"},[t._v("48")]),a("br"),a("span",{staticClass:"line-number"},[t._v("49")]),a("br"),a("span",{staticClass:"line-number"},[t._v("50")]),a("br"),a("span",{staticClass:"line-number"},[t._v("51")]),a("br"),a("span",{staticClass:"line-number"},[t._v("52")]),a("br"),a("span",{staticClass:"line-number"},[t._v("53")]),a("br"),a("span",{staticClass:"line-number"},[t._v("54")]),a("br"),a("span",{staticClass:"line-number"},[t._v("55")]),a("br"),a("span",{staticClass:"line-number"},[t._v("56")]),a("br"),a("span",{staticClass:"line-number"},[t._v("57")]),a("br")])])}],!1,null,null,null);e.options.__file="react-start到co源码系列一.md";s.default=e.exports}}]);