# 大白话webpack配置

1. `webpack`配置第一步，当然是指定入口**entry**。它可以是一个字符串，如果你想指定多入口，你可以将它设置为一个对象。

2. 还有一件必须要做的事就是告诉`webpack`怎么输出打包后的文件。这些都是通过**output**属性来配置，**output.path**告诉`webpack`把文件放在哪个目录，**output.filename**告诉`webpack`打包后的文件名是什么。

3. 接下来需要做什么事情是什么？当然是根据你的业务代码选择对应的**loader**和**plugins**

- 处理js，你可能会需要**babel-loader**
- 处理样式，你可能会需要**style-loader**，**css-loader**，**sass-loader**，**postcss-loader**
- 处理静态资源，你可能会需要**file-loader**或者是其升级版的**url-loader**
- 想使用静态模版，动态生成`html`并引入`bundle`。你可能会需要**html-webpack-plugin**
- 想在打包之前把上次的打包结果清除。你可能会需要**clean-webpack-plugin**
- 想查看`bundle`文件和源文件的映射关系。你可能会需要**webpack-manifest-plugin**


4. `webpack`的开发模式也很重要。不通的开发模式策略不同，输出也会不同。

5. 如果你处于开发环境，请设置**mode**为`development`。这种模式下，请设置**devtool**，开启`source-map`。以便能准确的定位出代码中出现错误的位置。

6. 开发模式下，必不可少的就是**webpack-dev-server**。如果你想使用，请设置**devServer**选项，如果你想通过`nodejs`的api来使用**webpack-dev-server**，你可以使用**webpack-dev-middleware**。

7. 开发模式下，你或许想体验一下`HMR`。请开启**devServer.hot = true**。除此，你还需要使用**webpack.HotModuleReplacementPlugoin**。如果你想在nodejs的api中使用HMR，请使用**webpack-hot-middleware**。

8. `HMR`的功能还需要你在业务代码中使用**module.hot.accept**来作相应的处理。

9. 如果你选择使用**webpack-dev-server**，下面的一些选项你应该知道是什么意思

- `contentBase`: 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
- `compress`: 开启服务器压缩
- `publicPath`: 确定应该从哪里提供 bundle
- `host`: 指定使用一个 host。默认是 localhost。建议设置为0.0.0.0
- `hot`: 建议设置为true，这是你体验hmr的第一步
- open：可以自动的给你打开浏览器
- `openPage`: 指定打开浏览器时的导航页面。
- `overlay`: 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。
- `port`: 指定要监听请求的端口号
- `progress`: 将运行进度输出到控制台。
- `useLocalIp`: 此选项允许浏览器使用本地 IP 打开。
- `watchContentBase`: 告知 dev-server，serve(服务) devServer.contentBase 选项下的文件。开启此选项后，在文件修改之后，会触发一次完整的页面重载。

10. 如果你想对样式开始HMR的功能怎么办。使用**style-loader**，它内部使用了**module.hot.accept**。在css依赖发生变化的时候，他会更新patch到style中。

11. 如果你想要对即将部署到生产环境的项目进行构建，请将**mod**设置为**production**。

12. 压缩代码是生产环境中不可少的一部分，你可以在**optimization.minimizer**中配置你的压缩规则。你也可以直接将**optimization.minimize**设置为**true**，webpack会采用默认的压缩策略压缩你的代卖

13. 如果你仍然想在生产环境中使用**source-map**，建议你设置**devtool = 'source-map'**。不要使用inline-**或者eval- **，它们会增加bundle的体积，增加整体的性能。


14. 代码分离也是生产环境中不可少的一部分。这个特性能够把代码分离到不同的bundle中，以实现按需加载和并行加载。如果你想实现代码分离的功能，请从下面三种方法中选取最适合你的方法。

- 你可以从入口出发，从entry配置手动地分离代码
- 你也可以使用动态导入的方式，借助模块中的内联函数分离代码
- 推荐你使用**SplitChunksPlugin**去重和分离重复的chunk

15. 如果你想把css从主应用程序中分离，你可以考虑使用**mini-css-extract-plugin**插件

16. 如果你想使用动态导入(懒加载)的方式，这里有两个方案你可以选择
  - 使用ECMAScript提案的import语法来实现动态导入，如果你选择这种方案，请不要忘记配置**@babel/plugin-syntax-dynamic-import**插件
  - 使用webpack特定的**require.ensure**来实现动态导入

同时请记住，配置上面两种方案的时候，不要忘记配置**output.chunkFilename**。

18. 如果你也想对生成的chunk进行preload或者prefetch操作，import语法同样可以满足你。

```js
import(/* webpackPrefetch: true */'lodash') // -> <link rel="prefetch" href="lodash.bundle.js">
import(/* webpackPreload: true */'lodash') // -> <link rel="preload" href="lodash.bundle.js">
```

19. 如果你想借助客户端的缓存能力来提升网站的加载性能，可以考虑使用**[contenthash]/[hash]**来生成你的静态文件的名称。

```js
output: {
  filename: '[name].[hash].js' // [name].[contenthash].js
}
```

20. 有时候你想把一些第三方的包打包到一个统一的vendor中，那么，推荐你使用**SplitChunkPlugin**提供的**cacheGroups**选项。对于这种规则，你可以设置多个

```js
optimization: {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
}
```

21. 如果你不想chunk的contenthash受chunk编译的顺序的影响，你可以使用如下两个插件
- 开发环境下，你可以尝试**NamedModulesPlugin**
- 生产环境下，你可以尝试**webpack.HashedModuleIdsPlugin**

22. 如果你正在开发一个Javascript Library，仍然可以借助`webpack`。前提需要知道，对于一个library，项目中可能会存在几种形式的调用：

- ES2015 module import

```js
import * as library from 'your-library'

library.method()
```

- commonjs module require

```js
const library = require('your-library')

library.method()
```

- AMD module require

```js
require(['your-library'], function(library) {
  library.method()
})
```

- script

```html
<script src="your-library.js"></script>
<script>
  library.method()
</script>
```

为了能够同时支持上面的几种方式访问我们的library，配置的时候你还需要注意以下几点

- 你所依赖的library应该作为peerDependency，而不应该打包到你的library中。所以你需要配置相应的externals

```js
externals: {
  lodash: {
    commonjs: 'lodash',
    commonjs2: 'lodash',
    amd: 'lodash',
    root: '_'
  }
}
```

当然，它也允许你排除多个外部依赖

```js
externals: [
  'library/one',
  'library/two',
  '...',
  /^library\/.+$/
]
```

23. 为了能够让你的library在各种环境中使用，你还需要配置**output.library**属性，它指定了你的library的名称。配置**output.libraryTarget**，它指定了你的library打包方式。

```js
output: {
  filename: 'library.js',
  library: 'library',
  libraryTarget: 'umd'
}
```


24. 开发中，你可能会遇到一些不符合规范的模块，比如jQuery，它会创建全局变量$，lodash它也会创建全局变量_。这种情况，你可能需要将依赖预置(shim)，全局变量预置你可能需要使用**ProvidePlugin**插件，它能够在 webpack 编译的每个模块中，通过访问一个变量来获取一个 package。如果 webpack 看到模块中用到这个变量，它将在最终 bundle 中引入给定的 package

```js
plugins: [
  new webpack.ProvidePlugin({
    _: 'lodash' // join: ['lodash', 'join']
  })
]
```

25. 如果你想更改文件中this的全局指向，你可以选择**imports-loader**

26. 如果你想将某个文件中的全局变量作为模块属性导出,你可以选择**exports-loader**


27. 如果你在项目中引入了一些polyfill，推荐你将各种polyfill打包到一个单独的bundle中。这样做，你可以通过判断运行环境判断是否需要加载polyfill文件。

```js
<script>
  var modernBrowser = (
    'fetch' in window &&
    'assign' in Object
  );

   if ( !modernBrowser ) {
    var scriptElement = document.createElement('script');

     scriptElement.async = false;
    scriptElement.src = '/polyfills.bundle.js';
    document.head.appendChild(scriptElement);
  }
</script>
```

28. 如果你的项目使用了typescript，你需要使用**ts-loader**来转换你的code。

29. webpack.config.js开可以导出一个函数，其参数就是运行webpack的时候所传递的环境变量对象

```js
module.exports = env => {
  console.log(env.NODE_ENV)

  return {
    entry: '/...',
    //...
  }
}
```

30. 如果你想提升构建性能，可以考虑从以下几个方面改进：

- 总是对loader使用**include**来包含实际需要转换的模块路径。或者使用**exclude**来排出不需要转换的模块的路径

```js
{
  test: /\.js$/,
  include: './src',
  exclude: /node_modules/,
  use: [
    'babel-loader'
  ]
}
```

- 使用`thread-loader`将非常消耗资源的loader分配给一个worker pool
- 使用`cache-loader`启用持久化缓存

- 多页面打包，使用`CommonsChunkPlugin`，并开启`async`模式


31. 如果你不想在build的文件中生成文件路径相关信息，请设置**output.pathinfo**为**false**

32. 你可以通过`publicPath`来配置应用程序中所有静态资源的基础路径，当构建文件放置在cdn上的时候，它十分有用。

33. 建议你将生产环境和开发环境的配置分开，并将公用配置提取出来。下面是一种不错的选择

```bash
webapck.common.js
webpack.development.js
webpack.production.js
```

这种配置分离的情况下，你可能会借助**webpack-merge**来进行配置合并。