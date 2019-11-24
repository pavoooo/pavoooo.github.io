(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{191:function(s,t,a){"use strict";a.r(t);var n=a(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"content"},[a("h1",[s._v("大白话webpack配置")]),s._v(" "),a("ol",[a("li",[a("p",[a("code",[s._v("webpack")]),s._v("配置第一步，当然是指定入口"),a("strong",[s._v("entry")]),s._v("。它可以是一个字符串，如果你想指定多入口，你可以将它设置为一个对象。")])]),s._v(" "),a("li",[a("p",[s._v("还有一件必须要做的事就是告诉"),a("code",[s._v("webpack")]),s._v("怎么输出打包后的文件。这些都是通过"),a("strong",[s._v("output")]),s._v("属性来配置，"),a("strong",[s._v("output.path")]),s._v("告诉"),a("code",[s._v("webpack")]),s._v("把文件放在哪个目录，"),a("strong",[s._v("output.filename")]),s._v("告诉"),a("code",[s._v("webpack")]),s._v("打包后的文件名是什么。")])]),s._v(" "),a("li",[a("p",[s._v("接下来需要做什么事情是什么？当然是根据你的业务代码选择对应的"),a("strong",[s._v("loader")]),s._v("和"),a("strong",[s._v("plugins")])])])]),s._v(" "),a("ul",[a("li",[s._v("处理js，你可能会需要"),a("strong",[s._v("babel-loader")])]),s._v(" "),a("li",[s._v("处理样式，你可能会需要"),a("strong",[s._v("style-loader")]),s._v("，"),a("strong",[s._v("css-loader")]),s._v("，"),a("strong",[s._v("sass-loader")]),s._v("，"),a("strong",[s._v("postcss-loader")])]),s._v(" "),a("li",[s._v("处理静态资源，你可能会需要"),a("strong",[s._v("file-loader")]),s._v("或者是其升级版的"),a("strong",[s._v("url-loader")])]),s._v(" "),a("li",[s._v("想使用静态模版，动态生成"),a("code",[s._v("html")]),s._v("并引入"),a("code",[s._v("bundle")]),s._v("。你可能会需要"),a("strong",[s._v("html-webpack-plugin")])]),s._v(" "),a("li",[s._v("想在打包之前把上次的打包结果清除。你可能会需要"),a("strong",[s._v("clean-webpack-plugin")])]),s._v(" "),a("li",[s._v("想查看"),a("code",[s._v("bundle")]),s._v("文件和源文件的映射关系。你可能会需要"),a("strong",[s._v("webpack-manifest-plugin")])])]),s._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[a("p",[a("code",[s._v("webpack")]),s._v("的开发模式也很重要。不通的开发模式策略不同，输出也会不同。")])]),s._v(" "),a("li",[a("p",[s._v("如果你处于开发环境，请设置"),a("strong",[s._v("mode")]),s._v("为"),a("code",[s._v("development")]),s._v("。这种模式下，请设置"),a("strong",[s._v("devtool")]),s._v("，开启"),a("code",[s._v("source-map")]),s._v("。以便能准确的定位出代码中出现错误的位置。")])]),s._v(" "),a("li",[a("p",[s._v("开发模式下，必不可少的就是"),a("strong",[s._v("webpack-dev-server")]),s._v("。如果你想使用，请设置"),a("strong",[s._v("devServer")]),s._v("选项，如果你想通过"),a("code",[s._v("nodejs")]),s._v("的api来使用"),a("strong",[s._v("webpack-dev-server")]),s._v("，你可以使用"),a("strong",[s._v("webpack-dev-middleware")]),s._v("。")])]),s._v(" "),a("li",[a("p",[s._v("开发模式下，你或许想体验一下"),a("code",[s._v("HMR")]),s._v("。请开启"),a("strong",[s._v("devServer.hot = true")]),s._v("。除此，你还需要使用"),a("strong",[s._v("webpack.HotModuleReplacementPlugoin")]),s._v("。如果你想在nodejs的api中使用HMR，请使用"),a("strong",[s._v("webpack-hot-middleware")]),s._v("。")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("HMR")]),s._v("的功能还需要你在业务代码中使用"),a("strong",[s._v("module.hot.accept")]),s._v("来作相应的处理。")])]),s._v(" "),a("li",[a("p",[s._v("如果你选择使用"),a("strong",[s._v("webpack-dev-server")]),s._v("，下面的一些选项你应该知道是什么意思")])])]),s._v(" "),a("ul",[a("li",[a("code",[s._v("contentBase")]),s._v(": 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。")]),s._v(" "),a("li",[a("code",[s._v("compress")]),s._v(": 开启服务器压缩")]),s._v(" "),a("li",[a("code",[s._v("publicPath")]),s._v(": 确定应该从哪里提供 bundle")]),s._v(" "),a("li",[a("code",[s._v("host")]),s._v(": 指定使用一个 host。默认是 localhost。建议设置为0.0.0.0")]),s._v(" "),a("li",[a("code",[s._v("hot")]),s._v(": 建议设置为true，这是你体验hmr的第一步")]),s._v(" "),a("li",[s._v("open：可以自动的给你打开浏览器")]),s._v(" "),a("li",[a("code",[s._v("openPage")]),s._v(": 指定打开浏览器时的导航页面。")]),s._v(" "),a("li",[a("code",[s._v("overlay")]),s._v(": 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。")]),s._v(" "),a("li",[a("code",[s._v("port")]),s._v(": 指定要监听请求的端口号")]),s._v(" "),a("li",[a("code",[s._v("progress")]),s._v(": 将运行进度输出到控制台。")]),s._v(" "),a("li",[a("code",[s._v("useLocalIp")]),s._v(": 此选项允许浏览器使用本地 IP 打开。")]),s._v(" "),a("li",[a("code",[s._v("watchContentBase")]),s._v(": 告知 dev-server，serve(服务) devServer.contentBase 选项下的文件。开启此选项后，在文件修改之后，会触发一次完整的页面重载。")])]),s._v(" "),a("ol",{attrs:{start:"10"}},[a("li",[a("p",[s._v("如果你想对样式开始HMR的功能怎么办。使用"),a("strong",[s._v("style-loader")]),s._v("，它内部使用了"),a("strong",[s._v("module.hot.accept")]),s._v("。在css依赖发生变化的时候，他会更新patch到style中。")])]),s._v(" "),a("li",[a("p",[s._v("如果你想要对即将部署到生产环境的项目进行构建，请将"),a("strong",[s._v("mod")]),s._v("设置为"),a("strong",[s._v("production")]),s._v("。")])]),s._v(" "),a("li",[a("p",[s._v("压缩代码是生产环境中不可少的一部分，你可以在"),a("strong",[s._v("optimization.minimizer")]),s._v("中配置你的压缩规则。你也可以直接将"),a("strong",[s._v("optimization.minimize")]),s._v("设置为"),a("strong",[s._v("true")]),s._v("，webpack会采用默认的压缩策略压缩你的代卖")])]),s._v(" "),a("li",[a("p",[s._v("如果你仍然想在生产环境中使用"),a("strong",[s._v("source-map")]),s._v("，建议你设置"),a("strong",[s._v("devtool = 'source-map'")]),s._v("。不要使用inline-**或者eval- **，它们会增加bundle的体积，增加整体的性能。")])]),s._v(" "),a("li",[a("p",[s._v("代码分离也是生产环境中不可少的一部分。这个特性能够把代码分离到不同的bundle中，以实现按需加载和并行加载。如果你想实现代码分离的功能，请从下面三种方法中选取最适合你的方法。")])])]),s._v(" "),a("ul",[a("li",[s._v("你可以从入口出发，从entry配置手动地分离代码")]),s._v(" "),a("li",[s._v("你也可以使用动态导入的方式，借助模块中的内联函数分离代码")]),s._v(" "),a("li",[s._v("推荐你使用"),a("strong",[s._v("SplitChunksPlugin")]),s._v("去重和分离重复的chunk")])]),s._v(" "),a("ol",{attrs:{start:"15"}},[a("li",[a("p",[s._v("如果你想把css从主应用程序中分离，你可以考虑使用"),a("strong",[s._v("mini-css-extract-plugin")]),s._v("插件")])]),s._v(" "),a("li",[a("p",[s._v("如果你想使用动态导入(懒加载)的方式，这里有两个方案你可以选择")])])]),s._v(" "),a("ul",[a("li",[s._v("使用ECMAScript提案的import语法来实现动态导入，如果你选择这种方案，请不要忘记配置**@babel/plugin-syntax-dynamic-import**插件")]),s._v(" "),a("li",[s._v("使用webpack特定的"),a("strong",[s._v("require.ensure")]),s._v("来实现动态导入")])]),s._v(" "),a("p",[s._v("同时请记住，配置上面两种方案的时候，不要忘记配置"),a("strong",[s._v("output.chunkFilename")]),s._v("。")]),s._v(" "),a("ol",{attrs:{start:"18"}},[a("li",[s._v("如果你也想对生成的chunk进行preload或者prefetch操作，import语法同样可以满足你。")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[s._v("import")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token comment"}},[s._v("/* webpackPrefetch: true */")]),a("span",{attrs:{class:"token string"}},[s._v("'lodash'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{attrs:{class:"token comment"}},[s._v('// -> <link rel="prefetch" href="lodash.bundle.js">')]),s._v("\n"),a("span",{attrs:{class:"token keyword"}},[s._v("import")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token comment"}},[s._v("/* webpackPreload: true */")]),a("span",{attrs:{class:"token string"}},[s._v("'lodash'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{attrs:{class:"token comment"}},[s._v('// -> <link rel="preload" href="lodash.bundle.js">')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("ol",{attrs:{start:"19"}},[a("li",[s._v("如果你想借助客户端的缓存能力来提升网站的加载性能，可以考虑使用**[contenthash]/[hash]**来生成你的静态文件的名称。")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("output"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  filename"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'[name].[hash].js'")]),s._v(" "),a("span",{attrs:{class:"token comment"}},[s._v("// [name].[contenthash].js")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ol",{attrs:{start:"20"}},[a("li",[s._v("有时候你想把一些第三方的包打包到一个统一的vendor中，那么，推荐你使用"),a("strong",[s._v("SplitChunkPlugin")]),s._v("提供的"),a("strong",[s._v("cacheGroups")]),s._v("选项。对于这种规则，你可以设置多个")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("optimization"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  splitChunks"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    cacheGroups"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      vendor"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        test"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token regex"}},[s._v("/[\\\\/]node_modules[\\\\/]/")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        name"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'vendors'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        chunks"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'all'")]),s._v("\n      "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("ol",{attrs:{start:"21"}},[a("li",[s._v("如果你不想chunk的contenthash受chunk编译的顺序的影响，你可以使用如下两个插件")])]),s._v(" "),a("ul",[a("li",[s._v("开发环境下，你可以尝试"),a("strong",[s._v("NamedModulesPlugin")])]),s._v(" "),a("li",[s._v("生产环境下，你可以尝试"),a("strong",[s._v("webpack.HashedModuleIdsPlugin")])])]),s._v(" "),a("ol",{attrs:{start:"22"}},[a("li",[s._v("如果你正在开发一个Javascript Library，仍然可以借助"),a("code",[s._v("webpack")]),s._v("。前提需要知道，对于一个library，项目中可能会存在几种形式的调用：")])]),s._v(" "),a("ul",[a("li",[s._v("ES2015 module import")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{attrs:{class:"token keyword"}},[s._v("as")]),s._v(" library "),a("span",{attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'your-library'")]),s._v("\n\nlibrary"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("method")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ul",[a("li",[s._v("commonjs module require")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[s._v("const")]),s._v(" library "),a("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{attrs:{class:"token function"}},[s._v("require")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token string"}},[s._v("'your-library'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nlibrary"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("method")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ul",[a("li",[s._v("AMD module require")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token function"}},[s._v("require")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{attrs:{class:"token string"}},[s._v("'your-library'")]),a("span",{attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{attrs:{class:"token keyword"}},[s._v("function")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("library"),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  library"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("method")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ul",[a("li",[s._v("script")])]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),s._v(" "),a("span",{attrs:{class:"token attr-name"}},[s._v("src")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{attrs:{class:"token punctuation"}},[s._v('"')]),s._v("your-library.js"),a("span",{attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{attrs:{class:"token script language-javascript"}}),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),a("span",{attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),a("span",{attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{attrs:{class:"token script language-javascript"}},[s._v("\n  library"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("method")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),a("span",{attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("为了能够同时支持上面的几种方式访问我们的library，配置的时候你还需要注意以下几点")]),s._v(" "),a("ul",[a("li",[s._v("你所依赖的library应该作为peerDependency，而不应该打包到你的library中。所以你需要配置相应的externals")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("externals"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  lodash"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    commonjs"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'lodash'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    commonjs2"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'lodash'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    amd"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'lodash'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    root"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'_'")]),s._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("当然，它也允许你排除多个外部依赖")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("externals"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n  "),a("span",{attrs:{class:"token string"}},[s._v("'library/one'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{attrs:{class:"token string"}},[s._v("'library/two'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{attrs:{class:"token string"}},[s._v("'...'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{attrs:{class:"token regex"}},[s._v("/^library\\/.+$/")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("ol",{attrs:{start:"23"}},[a("li",[s._v("为了能够让你的library在各种环境中使用，你还需要配置"),a("strong",[s._v("output.library")]),s._v("属性，它指定了你的library的名称。配置"),a("strong",[s._v("output.libraryTarget")]),s._v("，它指定了你的library打包方式。")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("output"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  filename"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'library.js'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  library"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'library'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  libraryTarget"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'umd'")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("ol",{attrs:{start:"24"}},[a("li",[s._v("开发中，你可能会遇到一些不符合规范的模块，比如jQuery，它会创建全局变量$，lodash它也会创建全局变量_。这种情况，你可能需要将依赖预置(shim)，全局变量预置你可能需要使用"),a("strong",[s._v("ProvidePlugin")]),s._v("插件，它能够在 webpack 编译的每个模块中，通过访问一个变量来获取一个 package。如果 webpack 看到模块中用到这个变量，它将在最终 bundle 中引入给定的 package")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("plugins"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n  "),a("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{attrs:{class:"token class-name"}},[s._v("webpack"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ProvidePlugin")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    _"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'lodash'")]),s._v(" "),a("span",{attrs:{class:"token comment"}},[s._v("// join: ['lodash', 'join']")]),s._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("ol",{attrs:{start:"25"}},[a("li",[a("p",[s._v("如果你想更改文件中this的全局指向，你可以选择"),a("strong",[s._v("imports-loader")])])]),s._v(" "),a("li",[a("p",[s._v("如果你想将某个文件中的全局变量作为模块属性导出,你可以选择"),a("strong",[s._v("exports-loader")])])]),s._v(" "),a("li",[a("p",[s._v("如果你在项目中引入了一些polyfill，推荐你将各种polyfill打包到一个单独的bundle中。这样做，你可以通过判断运行环境判断是否需要加载polyfill文件。")])])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token operator"}},[s._v("<")]),s._v("script"),a("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),a("span",{attrs:{class:"token keyword"}},[s._v("var")]),s._v(" modernBrowser "),a("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    "),a("span",{attrs:{class:"token string"}},[s._v("'fetch'")]),s._v(" "),a("span",{attrs:{class:"token keyword"}},[s._v("in")]),s._v(" window "),a("span",{attrs:{class:"token operator"}},[s._v("&&")]),s._v("\n    "),a("span",{attrs:{class:"token string"}},[s._v("'assign'")]),s._v(" "),a("span",{attrs:{class:"token keyword"}},[s._v("in")]),s._v(" Object\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n   "),a("span",{attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{attrs:{class:"token operator"}},[s._v("!")]),s._v("modernBrowser "),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{attrs:{class:"token keyword"}},[s._v("var")]),s._v(" scriptElement "),a("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("createElement")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{attrs:{class:"token string"}},[s._v("'script'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n     scriptElement"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token keyword"}},[s._v("async")]),s._v(" "),a("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{attrs:{class:"token boolean"}},[s._v("false")]),a("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    scriptElement"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("src "),a("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'/polyfills.bundle.js'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    document"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("head"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("appendChild")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("scriptElement"),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{attrs:{class:"token operator"}},[s._v("<")]),a("span",{attrs:{class:"token operator"}},[s._v("/")]),s._v("script"),a("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("ol",{attrs:{start:"28"}},[a("li",[a("p",[s._v("如果你的项目使用了typescript，你需要使用"),a("strong",[s._v("ts-loader")]),s._v("来转换你的code。")])]),s._v(" "),a("li",[a("p",[s._v("webpack.config.js开可以导出一个函数，其参数就是运行webpack的时候所传递的环境变量对象")])])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[s._v("exports")]),s._v(" "),a("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" env "),a("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token function"}},[s._v("log")]),a("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("env"),a("span",{attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{attrs:{class:"token constant"}},[s._v("NODE_ENV")]),a("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n  "),a("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    entry"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'/...'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{attrs:{class:"token comment"}},[s._v("//...")]),s._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("ol",{attrs:{start:"30"}},[a("li",[s._v("如果你想提升构建性能，可以考虑从以下几个方面改进：")])]),s._v(" "),a("ul",[a("li",[s._v("总是对loader使用"),a("strong",[s._v("include")]),s._v("来包含实际需要转换的模块路径。或者使用"),a("strong",[s._v("exclude")]),s._v("来排出不需要转换的模块的路径")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  test"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token regex"}},[s._v("/\\.js$/")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  include"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token string"}},[s._v("'./src'")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  exclude"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token regex"}},[s._v("/node_modules/")]),a("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  use"),a("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{attrs:{class:"token string"}},[s._v("'babel-loader'")]),s._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("ul",[a("li",[a("p",[s._v("使用"),a("code",[s._v("thread-loader")]),s._v("将非常消耗资源的loader分配给一个worker pool")])]),s._v(" "),a("li",[a("p",[s._v("使用"),a("code",[s._v("cache-loader")]),s._v("启用持久化缓存")])]),s._v(" "),a("li",[a("p",[s._v("多页面打包，使用"),a("code",[s._v("CommonsChunkPlugin")]),s._v("，并开启"),a("code",[s._v("async")]),s._v("模式")])])]),s._v(" "),a("ol",{attrs:{start:"31"}},[a("li",[a("p",[s._v("如果你不想在build的文件中生成文件路径相关信息，请设置"),a("strong",[s._v("output.pathinfo")]),s._v("为"),a("strong",[s._v("false")])])]),s._v(" "),a("li",[a("p",[s._v("你可以通过"),a("code",[s._v("publicPath")]),s._v("来配置应用程序中所有静态资源的基础路径，当构建文件放置在cdn上的时候，它十分有用。")])]),s._v(" "),a("li",[a("p",[s._v("建议你将生产环境和开发环境的配置分开，并将公用配置提取出来。下面是一种不错的选择")])])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("webapck.common.js\nwebpack.development.js\nwebpack.production.js\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("这种配置分离的情况下，你可能会借助"),a("strong",[s._v("webpack-merge")]),s._v("来进行配置合并。")])])}],!1,null,null,null);e.options.__file="大白话webpack配置.md";t.default=e.exports}}]);