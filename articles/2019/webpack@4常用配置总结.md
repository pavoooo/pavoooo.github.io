# webpack@4常用配置总结

## webpack

`webpack`是一个模块打包器。对于`webpack`而言，任何资源都会被看作是一个模块。它会从入口出发递归解析出每个文件的依赖，然后将这些依赖进行转换和打包，最终输出。

### what can do

- 代码转换
- 文件优化
- 代码分割
- 模块合并
- 自动刷新(热加载)
- 代码校验
- 自动发布

### 安装

本地安装`webpack`即可

```bash
npm install webpack@4 webpack-cli -D
```

将`npm script`中添加`webpack`。

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

打包的时候直接运行

```bash
npm run build

# 或者
npx webpack
```

> 上述执行webpack命令的时候，如果你没有对webpack进行任何的配置，则会通过webpack默认配置对文件进行打包。

## webpack.config.js

`webpack.config.js`是`webpack`默认的配置文件。下面是`webpack.config.js`的一些基本配置。

1. **mode**

用于指定`webpack`的运行环境。可以设置为`development`，`production`或者`none`。

- **development**：webpack运行环境是开发环境
- **production**：webpack运行环境是生产环境
- **none**：禁止webpack对环境的判断

2. **entry**

指定项目入口。可以设置为`string`，`array`，`object`。

3. **output**

配置项目输出的相关特性。

- **filename**：设置打包后文件的名称
- **path**：设置打包后文件的输出目录。必须是绝对路径

4. **plugins**

配置所使用的插件

5. **module**

配置处理资源的`loader`

5. **devtool**

配置`sourceMap`

6. **externals**

定义全局引入的变量

7. **devServer**

定义开发服务器


下面是一段简单的`webpack`配置文件。

```js
module.exports = {
  mode: 'development', // webpack运行环境。可以设置为development, production或者none
  entry: './src/index.js', // 配置项目入口
  output: { // 配置项目输出相关的内容
    filename: 'bundle.js', // 打包后的文件名称
    path: path.resolve(__dirname, './dist'), // 打包文件输出目录。必须是绝对路径
  }
}
```

## webpack-dev-server

```js
module.exports = {
  // 配置webpack-dev-server
  devServer: {
    port: 3000, // 服务端口号
    progress: true, // 显示打包过程中的进度条
    contentBase: './build', // 指定服务根目录
    open: true, // 服务启动后自动打开浏览器
    compress: true, // 开启gzip压缩
  }
}
```

## 处理html

```bash
npm install html-webpack-plugin -D
```

然后创建一个`html`模版

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin)

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 设置模版的地址
      template: './index.html',
      // 设置生成后的html文件的名称
      filename: 'index.html',
      // 对引入的静态文件添加一个hash
      hash: true,
      // 设置标题
      title: '标题',
      // 压缩html
      minify: {
        // 删除属性的双引号
        removeAttributeQuotes: true,
        // 删除空行
        collapseWhiteSpace: true,
      }
    })
  ]
}
```

## 处理样式

处理样式需要使用对应的`loader`，`loader`的相关配置需要在`module`上下文中声明。处理样式一般会涉及到以下几个`loader`

- `css-loader`：解析`@import`这种语法
- `style-loader`：将生成的`css`插入到`head`标签中

> loader可以是字符串，也可以是数组(多个loader)，loader执行顺序是从右向左，从下往上执行。如果需要对loader传参，可以直接使用查询字符串或者以对象的形式使用loader，通过options选项传递参数

```bash
npm install style-loader css-loader -D
```

```js
module.exports = {
  module: {
    // 用来配置各种loader规则
    rules: [
      // 处理css文件，需要使用css-loader, style-loader
      { 
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // 可以传递loader需要的参数
              // style标签插入的位置
              insertAt: 'top'
            }
          }, 
          'css-loader'
        ]
      }
    ]
  }
}
```

### 处理less

处理`less`依赖于`less-loader`。

> 处理sass, 依赖于sass-loader。如果需要处理css预处理文件，需要安装对应的loader。

```bash
npm install less-loader less -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

### 抽离样式

可以使用`mini-css-extract-plugin`将`loader`产生的`css`抽离到一个单独的文件中

```bash
npm install mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: [
          // 在这里设置将css抽离到一个单独的文件中，可以替代style-loader
          Mini.CssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          Mini.CssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 多次使用可以将对应负责的css抽离到多个文件中
    new MiniCssExtractPlugin({
      // 抽离出的文件的名称
      filename: 'main.css'
      // 
    })
  ]
}
```

### 使用postcss

`postcss`允许我们使用高级的`css`特性。它的作用类似于`javascript`界中的`babel`。

```bash
npm install postcss-loader autoprefixer -D
```

在根目录下创建一个`postcss.config.js`文件，用来配置我们的`postcss`。当然，你可以通过`loader`的参数的形式将配置传入。

```js
// postcss.config.js

module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}

```

```js
module.exports = {
  module: {
    rules: [
      'style-loader',
      'css-loader',
      // 在css-loader之前用postcss进行处理
      'postcss-loader',
      'less-loader'
    ]
  }
}
```

### 压缩css

压缩`css`依赖于`optimize-css-asserts-webpack-plugin`

```bash
npm install optimize-css-asserts-webpack-plugin uglifyjs-webpack-plugin -D
```

```js
const OptimizeCssAssertsWebpackPlugin = require('optimize-css-asserts-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // 在这里设置具体的优化点
  // 比如压缩css，js等
  // 如果只声明了css压缩配置，js就不能被压缩了。
  // 所以，如果需要同时压缩css，js则两个优化点都需要写上
  optimization: {
    minimizer: [
      new OptimizeCssAssertsWebpackPlugin(),
      new UglifyjsWebpackPlugin({
        // 是否使用缓存
        cache: true,
        // 开启并行压缩
        parallel: true,
        // 开启sourceMap
        sourceMap: true
      })
    ]
  },
  // ...
  plugins: [
    // 多次使用可以将对应负责的css抽离到多个文件中
    new MiniCssExtractPlugin({
      // 抽离出的文件的名称
      filename: 'main.css'
      // 
    })
  ]
}
```

## 处理javascript

处理`javascript`我们一般会使用`babel`，结合`webpack`，我们会使用`babel-loader`来处理`javascript`。

```js
npm install babel-loader @babel/core @babel/preset-env -D
```

> babel@7对babel的各个核心组件都挂载到了`@babel`域下

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // babel编译选项建议写在babel.config.js中
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
}
``

创建一个`babel.config.js`文件来替代`babel-loader`的`options`选项

```js
module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
}
```

## 全局变量引入问题

`webpack`在打包我们的模块的时候，会将我们模块封装在一个闭包中。这样，对于我们在模块中引入的第三方包，我们是无法直接通过`window`来获取的，只能在当前模块中使用。

比如，安装一下`jquery`

```bash
npm install jquery
```

我们的模块文件

```js
import $ from 'jquery'

console.log($) // Jquery函数
console.log(window.$) // undefined
```

如果你希望模块中的某个变量暴露给`window`，比如这个模块中的`$`，可以通过下面几种方式来处理

### expose-loader

这个`loader`就是用来暴露全局的`loader`。这个`loader`可以使用`内联loader`的方式配置，即我们可以直接在项目代码中使用。

```bash
npm install expose-loader -D
```


然后在我们的模块文件中使用

```js
import $ from 'expose-loader?$!jquery'

console.log($) // Jquery函数
console.log(window.$) // Jquery函数
```

当然，也可以在配置文件中直接配置，这个时候，我们就不能使用文件后缀进行匹配了，而是直接使用文件路径进行匹配。

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
      }
    ]
  }
}
```

### 全局变量注入模块

我们可以使用`webpack`自带的插件`webpack.ProvidePlugin`将第三方包暴露出的变量直接注入到每个模块中，这样就不需要在每个模块中引入对应的模块了。

```js
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      // 变量名称: 模块名称
      $: 'jquery'
    })
  ]
}
```

### externals

在某些情况下我们使用`script`标签引入了某些第三方的包，在我们的模块中也使用`import`对这个第三方的包进行了引入。`webpack`在默认情况下会对我们引入的模块进行打包，即使我们已经全局引入了。这时，我们就可以通过`externals`来告诉`webpack`我们已经在全局中引入了对应的变量，模块中引入的这个模块就不用打包了。

```js
module.exports = {
  externals: {
    jquery: '$'
  }
}
```

## 处理图片

项目中引入图片大概有以下几种

- `html`中通过`img`标签引入
- `css`通过`background-img`等属性引入
- `javascript`中通过脚本动态创建图片

上面几种使用图片的方式，`webpack`是都能处理的。

`webpack`处理图片的`loader`是`file-loader`。它的作用就是在内部生成一张图片到构建目录下，然后将生成的图片的地址返回。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}
```


```js
// 会被file-loader处理
import logo from './logo.png'

console.log(logo) // 是一段字符串

const image = new Image()
image.src = logo

document.body.appendChild(image)
```

> 在javascript中使用图片需要使用模块化的语法。css中引入的图片`css-loader`会对其转换成模块化的引入。如果想操作html中的标签引入的图片，可以使用`html-withimg-loader`。

```bash
npm install html-withimg-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html?$/,
        use: 'html-withimg-loader'
      }
    ]
  }
}
```

虽然`file-loader`能够为我们处理图片，但其所做的事情也是挺简单的。有的时候我们需要直接将小图片转为`base64`格式，减少`http` 的请求。这种情况下，我们可以使用`url-loader`。

```bash
npm install url-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            //  图片小于200k的情况下将图片转为base64
            // 否则使用file-loader进行处理
            limit: 200 * 1024,
            // 我们也可以将打包的图片统一放在指定的目录下
            outputPath: 'img/'
          }
        }
      }
    ]
  }
}
```

## 静态资源分类

`静态资源分类`一般是指将编译后的静态文件分目录进行存放，比如将图片统一放在`img`目录下，将`css`统一放在`css`目录下。

### 图片分类

只需要在`url-loader`中指定`outputPath`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          // 设置放置的路径即可
          outputPath: 'img/'
        }
      }
    ]
  }
}
```

### css分类

只需要在`MiniCssExtractPlugin`中设置`filename`的时候使用`/`即可

```js
module.exports = {
  new MiniCssExtractPlugin({
    // 抽离出的文件的名称
    filename: 'css/main.css'
    // 
  })
}
```

### publicPath

如果线上的静态文件放置在`cdn`上，需要将`output.publicPath`设置成对应的`cdn`地址即可

```js
module.exports = {
  output: {
    publicPath: 'cdn地址'
  }
}
```

上面所有路径的`resolve`工具会自动帮我们完成。但是如果我们在`output`中设置了`publicPath`则所有的静态资源都会以这个`cdn`地址进行请求。如果我们只想将图片放在这个`cdn`上，则可以只指定图片的`publicPath`。

```js
module.exports = {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        // 设置放置的路径即可
        outputPath: 'img/',
        // 图片的cdn地址
        publicPath: 'cdn地址'
      }
    }
  ]
}
```

## 多页应用

`多页应用`的关键就是在指定入口的时候以对象的形式指定多个入口(打包入口)。设置输出的时候，注意文件名的设置，一般都使用`[name]``[hash]`等来指定文件的输出。还需要注意的是要生成多个`html`文件作为访问入口。

```js
module.exports = {
  // 多入口配置
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // 生成各个js文件
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  // 需要多次调用HtmlWebpackPlugin来生成页面
  plugins: ['home', 'other'].map(name => {
    return new HtmlWebpackPlugin({
      template: './index.html',
      filename: `${home}.html`,
      // 指定html中需要引入的代码块名称
      // 不设置的话每个生成的html文件都会把打包生成的所有js都引入进去
      // chunks是一个数组，可以指定多个chunk的名称
      chunks: [name]
    })
  })
}
```

## sourceMap

`sourceMap`可以让我们在调试的时候直接定位到源文件中具体的位置，开启`sourceMap`的功能是`webpack`自带的，我们可以直接通过配置来指定。

```js
module.exports = {
  // 开启sourceMap功能的属性
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/presets-env'
            ]
          }
        }
      }
    ]
  }
}
```

`webpack`通过配置文件中`devtool`来配置`sourceMap`。

- **source-map**：单独生成一个`sourceMap`文件，特点是大而全
- **eval-source-map**：不会生成一个单独的文件，而是将`sourceMap`的内容嵌入到项目代码中
- **cheap-module-source-map**：不会包含列信息，但是会产生一个单独的文件，并不会和我们的代码关联。
- **cheap-module-eval-source-map**：不会产生文件，集成在打包后的文件中，也不会产生列信息

## watch

`webpack`启动的时候可以指定`watch`参数，在代码变化的时候自动编译打包

```bash
webpack --watch
```

当然，你也可以在`webpack.config.js`中进行配置

```js
module.exports = {
  watch: true
}
```

也可以指定`watch`的参数

```js
module.exports = {
  watch: true,
  watchOptions: {
    // 轮询时间
    poll: 1000,
    // 防抖，下面的参数就表示如果在文件变化后，500ms内没有新的变化，就进行打包
    aggreateTimeout: 500,
    // 指定忽略的文件
    ignored: /node_modules/
  }
}
```

## 常用小插件

### clean-webpack-plugin

这个插件主要是用来在打包文件前将之前的输出目录进行删除

```bash
npm install clean-webpack-plugin -D
```

使用如下

```js
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    // 可以传入一个字符串或者一个数组，表示需要进行删除的目录
    new CleanWebpackPlugin('./dist')
  ]
}
```

### copy-webpack-plugin

这个插件用来将某个目录或者文件拷贝到特定的目录下

```bash
npm install copy-webpack-plugin -D
```

使用如下

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      // from 表示源目录
      // to 表示拷贝到的目录
      {
        from: './docs',
        to: './'
      }
    ])
  ]
}
```

### bannerPlugin

这是`webpack`内置的插件，可以用来在输出文件的头和尾的地方添加内容。

```js
const { BannerPlugin } = require('webpack')

module.exports = {
  plugins: [
    new BannerPlugin(`Created at ${new Date().toLocaleString()}`)
  ]
}
```

### definePlugin

这是`webpack`内置插件，可以用来定义文件中的一些变量的值

比如，我们在前端项目中使用`process.env.NODE_ENV`来判断运行环境。前端是没有`process.env.NODE_ENV`变量的，我们就可以通过这个插件获取当前运行环境的环境变量，然后替代掉我们项目中的`process.env.NODE_ENV`。 

```js
if (process.env.NODE_ENV === 'development') {
  console.log('开发环境')
} else if(process.env.NODE_ENV === 'production') {
  console.log('生产环境')
}
```

```js
module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 这里的process.env.NODE_ENV是通过nodejs获取当前运行环境
      }
    })
  ]
}
```

如果我们设置的环境变量`NODE_ENV`的值是`development`

```bash
export NODE_ENV='development'
```

则我们的项目中的代码就是

```js
if ('development' === 'development') {
  console.log('开发环境')
} else if(process.env.NODE_ENV === 'production') {
  console.log('生产环境')
}
```

生产环境也是此方式替代。

## webpack处理跨域

`webpack`可以在配置文件中指定需要代理的接口，可以解决开发环境下接口跨域的问题。

```js
module.exports = {
  // 用来配置代理服务器的，其实就是配置webpack-dev-server
  devServer: {
    // 用来配置需要代理的接口，详情可看http-proxy-middleware模块
    proxy: {
      // 所有以api开头的请求，通过代理服务器，将请求转发到localhost:3000服务上
      '/api': {
        target: 'http://localhost/3000',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
```

上面的配置是通过代理请求后端的服务，这种场景一般用在产品联调的阶段。在开发阶段，后端的接口可能还在开发中，这时候，前端就需要依靠自己的能力来mock数据。同样，我们也可以直接使用`webpack`，因为`webpack-dev-server`在启动的时候就已经启动了一个`express`服务，我们可以直接利用这个服务来`mock`接口和数据。

```js
module.exports = {
  devServer: {
    // 启动的钩子，启动前会调用，接收的参数就是内部创建的express实例
    before(app) {
      // 使用app的任何属性和方法来创建服务
      app.get('/user', (req, res) => {
        res.json({name: 'saisai'})
      })
    }
  }
}
```

这种方式前后端启动在同一个域名和端口下，所以也就不存在跨域的问题了。

当然，你也可以自己编写`node`脚本来同时启动前端和后端服务

```js
const express = require('express')
const webpack = require('webpack')

const app = express()

const middle = require('webpack-dev-middle')
const config = require('./webpack.config.js')

const compile = webpack(config)

// 启动webpack
app.use(middle(compile))

// 后端服务接口
app.get('/user', (req, res) => {
  res.json({
    name: 'saisai'
  })
})
app.listen(3000)
```

这种情况下也是同时启动前后端的一种方式，所以也是不会存在跨域的问题。这种场景一般出现在后端是`node`服务，那么我们就可以通过这种方式，将开发阶段的前后端启动在同一个服务下面。

## resolve

`resolve`主要用来设置解析模块时候的一些相关功能。

```js
module.exports = {
  resolve: {
    // 这个属性主要用来设置第三方模块的查找路径
    // 默认的就是commonjs的规则，从当前目录的node_modules出发，一级一级的向上查找
    // 我们可以在这里显示设置这个查找规则
    modules: [
      // 这个规则就告诉webpack只需要在当前目录下的node_modules查找即可
      path.resolve('node_modules')
    ],

    // 这个属性主要用来设置第三方包的别名
    alias: {
      // 下面这个属性表示，当引入vue的时候，实际上引入vue包中的vue/dist/vue.esm.js
      // import 'vue' --> import 'vue/dist/vue.esm.js'
      'vue$': 'vue/dist/vue.esm.js'
    },

    // 这个规则和package.json中main字段的作用类似
    mainFields: ['main', 'next'],

    // 这个规则用来设置匹配文件时候的后缀
    // 匹配顺序就是 .js -> .ts -> .jsx
    extensions: ['.js', '.ts', '.jsx']
  }
}
```

## 懒加载

`懒加载`让我们只有在用到某个模块的时候才会去真正的加载它。懒加载主要是用`import()`函数，使用这个函数需要使用`@babel/plugin-syntax-dynamic-import`插件。

```js
module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import'
  ]
}
```

```js
import(文件路径).then(...)
```

## hot reload

`webpack-dev-server`给我们提供了热加载的功能，可以让我们在不刷新页面的情况下，网页中显示出变化的内容。

```js
module.exports = {
  devServer: {
    // 需要把这个选项设置为true
    hot: true
  },
  plugins: [
    // 开启热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 告诉我们哪个模块更新了
    // 打印出更新的模块路径
    new webpack.NamedModulesPlugin()
  ]
}
```

上面只是`webpack`关于热更新的相关配置，下面我们还需要在项目代码中开启热加载的功能。

```js
if (module.hot) {
  module.hot.accept();
}
```


## webpack中的优化

### noParse

这个规则是用来告诉`webpack`，不需要对哪些模块进行依赖检测，直接打包即可。

```js
module.exports = {
  // 这个配置就是告诉webpack不要去解析jquery中的依赖
  noParse: /jquery/,
}
```

### IgnorePlugin

这个插件允许`webpack`在打包的时候忽略某些内容。

```js
new webpack.IgnorePlugin(
  requestRegExp, // 路径正则表达式
  contextRegExp // 资源上下文(正则表达式)
)
```


比如，我们可以在引入`moment`的时候，使用 IgnorePlugin 在打包时忽略本地化内容。

```js
module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
```

### DllPlugin

`DllPlugin`和`DllReferencePlugin`插件可以结合在一起使用，对产出的bundle文件进行拆包，加快`webpack`的打包速度，提升构建性能。

一般的做法就是将不需要经常改变的包，比如第三方库等使用`DllPlugin`单独打包。然后在进行项目代码打包的时候使用`DllReferencePlugin`将打包后的第三方包引入进来。

`DllPlugin`就是用来打包出一个个单独的动态链接库文件。`DllReferencePlugin`用来在主要的配置文件中引入`DllPlugin`插件打包好的动态链接库文件。

所以，一般我们会创建两个配置文件，一个用于打包动态链接库的配置`webpack.dll.config.js`，另一个就是用来打包项目代码的`webpack.config.js`。

所以，我们可以对`webpack.dll.config.js`进行如下配置

```js
module.exports = {
  // 指定需要打包到动态链接库中的模块
  entry: {
    react: ['react', 'react-dom'],
    axios: 'axios'
  },

  output: {
    // 输出的动态链接库的名称
    filename: '[name].dll.js',
    path: path.resolve('dist'),

    // 这一步很关键，这里就是用来设置存放动态链接库的 全局变量的名称 
    // 对于上面entry指定的react来说 打包后的全局变量的名称就是 _dll_react

    // 这里也就默认了 libraryTarget 是 var
    library: '_dll_[name]'
  },

  plugins: [
    // 然后就是接入动态链接库插件
    new DllPlugin({
      // 指定动态链接库中全局变量的名称
      // 一定要和output.library 中指定的值相同
      // 这个字段也是输出的manifest.json中name字段的值
      name: '_dll_[name]',
      // 指定动态链接库manifest.json文件输出时候的文件的名称
      path: path.resolve(__dirname, 'dist', '[name].manifest.json')
    })
  ]
}
```

上面就是对输出动态链接库的一个大概配置，运行

```bash
webpack --config webpack.dll.config.js
```

就会生成动态链接库文件和一份动态链接库描述文件

下面我们就需要对我们的项目配置文件`webpack.config.js`进行配置，引入上面生成的动态链接库，这里就主要依靠`DllReferencePlugin`。

```js
module.exports = {
  plugins: [
    // 有多个需要引入多次
    new webpack.DllReferencePlugin({
      // 上面生成的manifest.json文件
      manifest: path.resolve(__dirname, 'dist', 'react.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      // 上面生成的manifest.json文件
      manifest: path.resolve(__dirname, 'dist', 'axios.manifest.json')
    }),
  ]
}
```

关于`DllPlugin`插件使用的一些注意事项

`DllPlugin`插件中的`name`属性的值必须和`output.library`中的值一致，因为`DllPlugin`插件中的`name`会影响输出的`manifest.json`文件中的`name`字段的值，而在进行项目打包的时候`DllReferencePlugin`会使用这个字段查找同名的全局变量来使用。

### happypack

`webpack`的打包操作需要对大量的文件进行解析和处理，当文件的数量变得很多后，`webpack`的构建是十分缓慢的。因为`Nodejs`是单线程的执行，所以不管有多少文件和任务，`webpack`也只能一个个的去处理。`happypack`能够让`webpack`同一时刻处理多个任务，发挥了多核`CPU`的作用。它会把多个任务拆分成一个个的子任务并分解给多个子进程去执行，子进程处理完后，再将结果发送给主进程。

`happypack`的核心主要是`任务分解`和`进程管理`。这两部分工作其内部已经处理，所以我们在使用的时候只需要接入`happypack`即可。

```bash
npm install happypack -D
```

```js
const HappyPack = require('happypack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 使用happypack内部的loader
        // id参数就是在插件中定义的
        use: 'happypack/loader?id=js'
      }
    ]
  },
  plugins: [
    new HappyPack({
      // 使用loader的时候指定的参数
      id: 'js'
    })
  ]
}
```

### tree-shaking

`tree-shaking`可以用来剔除`javascript`中没有用到的代码。它依赖于`es6`的模块化语法，即通过`import`和`export`导入和导出。

`tree-shaking`的使用有两个前提

- javascript代码必须使用`es6`的模块化语法，因为`es6`的模块化语法是静态的，可以让`webpack`分析出哪些export被import了。
- 关闭`@babel/presets-env`的模块转换功能

```js
module.exports = {
  presets: [
    [
      '@babel/presets-env', 
      {
        module: false
      }
    ]
  ]
}
```

配置了上述文件中，比如我们的`a.js`代码如下

```js
export function sum(a, b) {
  return a + b
}

export function minus(a, b) {
  return a - b
}
```

我们的`index.js`的代码如下

```js
import { sum } from './a'

console.log(sum(1, 2))
```

我们只在`index.js`文件中使用了`sum`函数，在生产模式下进行编译的时候`webpack`会自动的为我们剔除`minus`相关的代码。

### scope hosting

`scope hosting`被称为作用域提升，它能让我们打包后的代码体积更小。它的原理就是分析模块之间的关系，尽可能的将被打散的模块合并到一个函数中。`scope hosting`会分析模块之间的依赖关系，因此源码也必须采用`es6`的模块化语句。

比如

```js
const a = 1;
const b = 2;
const c = 3;

console.log(a+b+c)
```

打包后的代码为

```js
console.log(6)
```

> `tree shaking`和`scope hosting`在`webpack@4`中自动集成了，不需要我们做其它额外的配置。


## 抽离公共代码

抽离公共代码可以把多个模块引入的相同模块抽离出来进行打包，也可以减少打包后的文件的体积。抽离公共代码的功能一般在多页应用使用。抽离公共代码的配置同样是在`optimization`中配置

```js
module.exports = {
  optimization: {
    // 分割代码块
    splitChunks: {
      // 缓存组
      cacheGroups: {
        // 抽离项目中的模块
        // 将公共代码抽离到一个文件中
        common: {
          // 公用的代码的体积
          miniSize: 0,
          // 公共代码被引用了多少次
          // 一般配置>=2
          miniChunks: 2,
          // 从哪里开始提取代码
          chunks: 'initial'
        },
        // 抽离第三方模块
        vendor: {
          test: /node_modules/,
          miniSize: 0,
          miniChunks: 2,
          chunks: 'initial',
          // 设置优先级，这样就能保证先抽离第三方模块然后再抽离业务中的公共模块
          priority: 1
        }
      }
    }
  }
}
```
