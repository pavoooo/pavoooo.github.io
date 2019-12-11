# babel配置文件

`babel`的配置文件有两种：**项目范围的配置**和**相关文件的配置**。

## 项目范围的配置

> 项目范围的配置我们也可以称为全局配置

`babel`从`v7`版本开始引入了根目录(`root`)的概念。默认是当前的工作目录，对于项目范围的配置，`babel`会自动搜索相对于此根目录下面的`babel.config.js`文件。一般而言，项目范围的配置一般就是指`babel.config.js`。当然，你也可以通过`configFile`选项明确指定你项目范围的配置文件的路径。也可以将`configFile`选项设置为`false`来禁用项目范围的配置。

项目范围的配置对项目中任何模块都生效，包括`node_modules`中的模块。如果你的项目是一个`momorepo`项目，它同样也会对各个子仓库中的模块生效。当然，你可以通过在配置中通过`exclude`等选项将其排除。

### 相关文件的配置

> 相关文件的配置你也可以理解成局部配置，它只对某个单独的包起作用

相关文件的配置有很多种类型，这些类型在`babel6`的时候都已经被支持了。主要有如下几种：

- `.babelrc`文件和`.babelrc.js`文件
- `package.json`文件中的`babel`属性

不管哪一种相关文件的配置类型，它们的查找过程是相同的。**babel会从当前正在编译的filename所在的目录开始查找，如果当前编译的filename不在babelrcRoots的设置内，将会被跳过。一旦找到package.json文件就停止查找，因此，相对配置仅适用于单个package的项目。**

> 项目范围的配置和相关文件的配置可以同时存在。如果两者都符合`babel`的查找规则，那么两份配置文件会被合并成一份最终的配置用于`babel`的编译。

### 项目实战

下面我们通过真实的项目来看一下`babel`是怎么加载配置文件的。假设我们的项目结构如下：

```bash
├── package.json
├── package1
│   └── package.json
└── package2
    └── package.json
```

- **实验一**

首先在根目录创建一个`babel.config.js`和`index.js`，并在`package1`和`package2`中分别新建`index.js`

```bash
echo '[1, 2, 3].map(v => v + 1)' > index.js && echo '[1, 2, 3].map(v => v + 1)' > package1/index.js && echo '[1, 2, 3].map(v => v + 1)' > package2/index.js
```

三个新建的`index.js`文件内容相同，如下

```js
[1, 2, 3].map(v => v + 1)
```

`babel.config.js`配置文件内容如下

```js
module.exports = {
    plugins: [
        '@babel/plugin-transform-arrow-functions'
    ],
    exclude: 'babel.config.js',
    ignore: [
        'node_modules'
    ]
}
```

然后运行命令`babel . --ignore 'babel.config.js' --out-dir lib`进行编译。

> 在`package.json`中新增`compile`命令，`babel . --ignore 'babel.config.js' --out-dir lib`

**我们期望三个`index.js`文件中的箭头函数都能够正常编译成普通函数，从编译结果能看到，符合预期。**


- **实验二**

在`index.js`和`package1/index.js`文件中添加如下代码

```js
let a = 3
```

然后在根目录下新建`.babelrc`配置文件，配置如下

```js
{
    "plugins": [
        "@babel/plugin-transform-block-scoping"
    ]
}
```

在根目录下运行`npm run compile`进行编译

**我们期望`index.js`和`package1/index.js`文件中的`let`声明编译成`var`声明，从编译结果能看到只有`index.js`文件中的`let`声明被编译成了`var`声明，而`package1/index.js`文件中的`let`声明并没有被编译。**

根据上面这个实验，我们能得出一个结论：**`babel`在编译的时候会同时读取根目录下`babel.config.js`和`.babelrc`配置文件中的相关配置，但是并不能改变它们的作用范围，`babel.config.js`会对项目中的所有文件起作用，而`.babelrc`同样只会当前`package`起作用，并不会对子`package`起作用**。

- **实验三**

将根目录下的`.babelrc`移动到`package1`目录下

```bash
mv .babelrc ./package1
```

然后在根目录下运行`npm run compile`命令

**我们期望`package1/index.js`文件中的`let`声明被编译成`var`声明，从编译结果来看，虽然`.babelrc`文件已经在`package1`下了，但是其配置仍然没有作用域`package1/index.js`文件，这是为什么呢？**

**这是因为如果全局配置中没有配置`babelrcRoots`字段，那么`babel`默认情况下是不会加载任何子`package`中的相对配置(如`.babelrc`文件)。所以，如果你想让`babel`读取子`package`中的相对配置，请在`babelrcRoots`字段中明确配置。**

在`babel.config.js`中加入`babelrcRoots`字段的配置

```js
module.exports = {
    babelrcRoots: [
        '.', // 不要忘记添加根目录
        './package1'
    ]
}
```

> 同样的道理，如果你想让`babel`加载`package2`中的相对配置，也需要在`babelrcRoots`中明确配置

- **实验四**

进入到`package1`目录下

```bash
cd package1
```

然后执行`npx babel index.js --out-dir lib`命令。

**我们期望`package1/index.js`中的箭头函数语法和`let`声明都能被编译转换。从编译结果来看，只有`let`声明的语法被成功编译转换，而箭头函数的语法却没有被编译。转换箭头函数的`plugin`配置我们写在全局配置`babel.config.js`中。从结果来看，这段配置貌似没有对`package1/index.js`文件生效。这是为什么？**

这是因为**babel默认将当前执行的目录作为根目录，所以它会在`package1`中查找`babel.config.js`文件，如果没有找到，默认情况下它就会认为没有全局相关的配置。而在我们这个例子中，我们其实是希望`babel`能够读取到项目根目录下的`babel.config.js`文件的。幸好，`babel7`提供了`rootMode`选项，可以将它设置为`upward`，这样`babel`就会自动向上寻找配置，并确定项目根目录的位置。**

所以，将我们的编译命令修改如下`npx babel --root-mode 'upward' index.js --out-dir lib`。编译结果符合预期。

::: danger
`rootMode`不能写在`.babelrc`配置中
:::

从上面几个实验我们大概知道了`babel`加载配置文件的基本逻辑了，这里简单总结一下。

- **全局配置**
    - `babel`默认读取根目录下的`babel.config.js`文件作为全局配置，你可以通过`configFile`指定全局配置文件的路径。如果你想让`babel`加载各个子目录中的相对配置，请在全局配置中配置相应的`babelrcRoots`字段

- **相对配置**
    - `babel`会去搜索子目录中相对配置文件，前提是`babelrcRoots`已经做了相应的配置。如果你想在子目录中使用全局配置，请指定`--root-mode`。