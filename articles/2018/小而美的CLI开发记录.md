# 小而美的CLI开发记录

作为一名前端开发人员，一定不会对`脚手架`感到陌生。比如`Vue`的`vue-cli`，`React`的`create-react-app`以及`angular`的`@angular/cli`等等。这些脚手架工具一般都是经过很严谨的设计，从开发到上线，都提供了开箱即来的命令。`脚手架`的本质就是一个`命令行工具`，核心也就是经过设计的`Node app`。下面就简单的介绍一下如何开发一个`麻雀虽小，五脏俱全`的`Node cli`。

> 这里会带着大家开发一个查看`github trending`的cli。

## 工程创建

任何`Node cli`都是一个`package`。首先，我们需要创建`package.json`文件和`入口文件`。你可以选择下面任何一种方式来创建`package.json`。

```js
npm init // 或
yarn init // 或
touch package.json
```
文件内容为：

```js
{
  "name": "github",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {},
  "devDependencies": {},
  "dependencies": {}
}
```
> 我们的脚手架工具的名称就是`github`

接着，需要创建我们的入口文件`index.js`:

```js
module.exports = () => {
    console.log('Welcome to the github')
}
```

接下来，我们就需要考虑一种方式来执行上面的程序，最好的是能够将其添加到系统的`path`中，这样就能够实现在任何地方执行我们的程序。为了实现这个功能，我们需要在根目录中创建一个`bin`目录，然后添加我们的可执行文件到这个目录中。


```js
mkdir bin
touch bin/github
```
> Node的命令行的bin目录是必须的。需要添加一个可执行文件到bin中作为命令行程序的入口。

下面，就需要在`bin/github`中加入我们入口。

```bash
#!/usr/bin/env node
require('../')()
```

`#!/usr/bin/env node`被称为`shebang`。它就是用来告诉操作系统`用哪一个可执行程序来执行我这个文件`。这里的`可执行程序`就是`node`。一般情况下，这个可执行文件应该尽量的小。因为它的目的就是为了执行我们的程序。程序的代码应该写在这个文件的外部，以便能够保持`模块化`和`可测试`。

为了能够直接运行这个可执行文件，我们需要给予它正确的执行权限。如果你是用的是`UNIX`系统，请执行下面的程序为这个可执行文件添加直接运行的权限。

```bash
chmod +x bin/github
```

接下来，我们需要更改我们的`package.json`文件。当我们的命令行程序被全局安装的时候能够自动的将`bin`目录添加到系统的`path`中。更改后的`package.json`文件如下：

```js
{
  "name": "github",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {},
  "devDependencies": {},
  "dependencies": {},
  "bin": {
      "github": "bin/github"
  }
}
```

如果用户全局安装之后我们的程序后，直接运行下面的命令就能够看到`Welcome to the github`的输出。

```bash
github
```

![cli](/blog/cli2.png)

为了能够方便在本地测试，直接在项目的根目录下运行`npm link`命令。它会在系统的`path`中创建一个指向我们`bin/github`的`软链接`。即使没有全局安装我们的程序，我们依然能够正确的执行上述的命令。
![cli](/blog/cli1.png)

至此，一个小的如`hello world`般的命令行程序算是成形了。但是，距离我们的要求还是远远不够。

## 命令和参数

先停下来好好的思考一下，运行一个命令行程序一般需要哪些东西？比如，我们使用`Vue`的脚手架常见一个简单的模版，可能会运行下面的这个命令。

```bash
vue init webpack my-project
```
我们可以把上面的命令进行分解一下：

- `vue`：可执行文件
- `init`：命令。告知可执行文件用来干啥
- `webpack`和`my-project`：参数。命令执行时候需要使用的。

所以，一般来说命令行程序一般需要明确两部分：

- 命令(commands)
- 参数(arguments)

其中`命令`和`参数`都可以是可选的。

`命令`一般都是在程序中预先定义的，用来告知命令行应该采取什么样的动作。

`参数`一般也是在程序中定义好的，但是传入的形式有多种，这就要求我们需要在程序中进行`统一化`的处理。比如，`--version`和`-v`，`--help`和`-h`等。**最重要的是参数在传递的时候可以不按照特定的顺序。**

为了我们程序的实用性，我们需要对传入的命令和参数进行解析。一般都会将他们转为`Object`的形式，这里我们可以借助`minimist`这个库来完成。

```bash
yarn add minimist
```

假设我们的命令运行如下：

```bash
github trend -t daily -l javascript
```

经过`minimist`解析后，结果如下：

```js
{ 
    _: [ 'trend' ], 
    t: 'daily',
    l: 'javascript' 
}
```
上面的命令其实和下面是等价的。

```bash
github tread --time daily --lang javascript
```

```bash
{ 
    _: [ 'tread' ], 
    time: 'daily', 
    lang: 'javascript' 
}
```
了解了上面的这些内容后，我们就能够开发我们的命令行程序了。关于`minimist`更多的内容请参考[https://github.com/substack/minimist](https://github.com/substack/minimist)。

## 脚手架核心

在开始核心内容的开发之前，我们先创建一个`cmds`文件夹。

```bash
mkdir cmds
```

这个文件夹就是用来保存我们各种命令的核心代码的，其中的每一个模块都被视为是一个命令。我们所开发的`github`命令行先暂定支持三个基本的命令。
- `trend`：获取github的trend中的内容
- `version`：查看我们的脚手架版本
- `help`：查看命令的使用帮助

在`cmds`中创建三个模块表示三个命令：

```bash
cd cmds
touch trend.js version.js help.js
```

下面，我们应该调整我们的入口文件为：

```js
const minimist = require('minimist')

const CMDS = {
    'version': require('./cmds/version'),
    'help': require('./cmds/help'),
    'trend': require('./cmds/trend')
}

module.exports = () => {
    const args = minimist(process.argv.slice(2))
    // 没有输入任何命令的时候表示 help 命令
    // 比如：github
    let cmd = args._[0] || 'help'
    // 查看版本
    // 比如：github -v 或者 github --version
    if (args.version || args.v) {
        cmd = 'version'
    }
    // 查看帮助
    // 比如：github -h 或者 github --help
    if (args.help || args.h) {
        cmd = 'help'
    }

    if (CMDS.hasOwnProperty(cmd)) {
        CMDS[cmd].call(null, args)
    } else {
        console.error(`"${cmd}" is not avaiable`)
    }
}
```

### version
我们先从最简单的`version`命令开始开发，这里我们直接使用`package.json`中的`version`字段表示即可。所以，我们的`version`命令如下：

```js
const { version } = require('../package.json')
module.exports = () => {
    console.log(`v${version}`)
}
```

然后，在终端运行命令

```bash
github -v # 或者
github --version
```

就能看到如下输出

![cli](/blog/cli3.png)

### help

`help`命令主要是用来给使用者提供帮助信息的。这种帮助信息主要分为两个方面。
- 命令行的帮助信息。比如：`github --help`
- 某个具体命令的帮助信息。比如：`github trend --help`

据此，我们的`help`命令的程序可能如下：

```js
const HELPS = {
    'github': `
        github [command] <options>

        trend ............. get the trend in the github
        version ........... show package version
        help .............. show help menu for command
    `,
    'trend': `
        github trend [args]

        --time/-t ........ trends in a certain period of time
        -lang/-t  ........ the trend of certain languages
    `
}

module.exports = args => {
    const subCommand = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    console.log(HELPS[subCommand] || HELPS.github)
}
```

在终端输入如下程序

```bash
github

github trend -h

github help trend
```

会看到如下输出

![cli](/blog/cli4.png)

至此，我们的`help`和`version`命令已经完成。接下来我们看一下`trend`命令怎么实现。

### trend

`trend`命令是我们最核心的命令。这个命令也接受两个参数

- `--time/-t`：查看的时间范围。可选值有`daily`，`weekly`，`monthly`

- `--lang/-l`：指定查看的语言。默认是`all`

这里，我们依靠一个开源的`github trending`请求接口来实现数据获取的功能。为了更好的体验，我们需要加入一个`loading`来展示我们的加载过程。首先，需要安装我们的依赖。

```bash
yarn add ora @huchenme/github-trending
```

接下来，就是我们核心的`trend`抓取代码了。

```js
const ora = require('ora')
const { fetchRepositories } = require('@huchenme/github-trending')
const TIMES = ['daily', 'weekly', 'monthly']

module.exports = async args => {
    const lang = args.l || args.lang || 'all'
    const time = args.t || args.time || 'daily'
    
    if (!TIMES.includes(time)) {
        console.log(`The time argument is one of the "daily" "weekly" or "monthly"`)
        process.exit(1)
    }

    const spinner = ora('正在获取...').start()

    try {
        const repositories = await fetchRepositories({
            language: lang,
            since: time
        })

        spinner.stop()
    } catch (e) {
        console.error('获取失败，稍后重试！！！')
        spinner.stop()
        process.exit(1)
    }
}
```
至此，我们的命令行工具已经完成了`90%`。最后一步，把我们的输出结果美化一下。这里，我们借助`cli-table2`包来帮助我们完成。

同样，先安装这个包

```bash
yarn add cli-table2
```

最终，我们的`trend`代码如下：

```js
const ora = require('ora')
const { fetchRepositories } = require('@huchenme/github-trending')
const Table = require('cli-table2')

const TIMES = ['daily', 'weekly', 'monthly']
const table = new Table({
    head: ['名称', '作者', 'url', 'star', 'language']
})

module.exports = async args => {
    const lang = args.l || args.lang || 'all'
    const time = args.t || args.time || 'daily'
    
    if (!TIMES.includes(time)) {
        console.log(`The time argument is one of the "daily" "weekly" or "monthly"`)
        process.exit(1)
    }

    const spinner = ora('正在获取...').start()

    try {
        const repositories = await fetchRepositories({
            language: lang,
            since: time
        })
        repositories.forEach(rep => {
            const { author, name, url, language, stars } = rep
            table.push([
                name,
                author,
                url,
                stars,
                language
            ])
        })
        spinner.stop()
        console.log(table.toString())
    } catch (e) {
        console.error('获取失败，稍后重试！！！')
        spinner.stop()
        process.exit(1)
    }
    
}
```

此时，我们在终端输入如下命令：

```bash
github trend -l javascript -t daily
```

就能看到下面很简洁的输出：

![cli](/blog/cli5.png)

到这里，我们一个很简洁的命令行程序开发完成了。如果你感觉你开发的命令行程序很有用，那就不要迟疑，分享到开源社区吧。

## 其它注意事项

在命令行程序开发完成后，我们需要对我们的`package.json`文件做一点点的修改。

- 设置`engine`字段

```js
{
    "engine": {
        "node": ">=8"
    }
}
```
`engine`字段能够确保我们的命令行运行在`node`合适的版本上。因为我们使用了`async/await`的语法，所以，我们要求`node`的版本应该`>=8`

- 设置`preferGlobal`字段

```js
{
    "preferGlobal": true
}
```

`preferGlobal`字段在用户局部安装(`yarn add github`)的时候会给予警告。

## 总结

最后简单的总结一下开发命令行工具时候的一些基本要点。

- 可执行文件作为`cli`工具的入口，应该只在其中执行主函数。
- 命令文件只在必要的时候进行`require`
- 提供`help`和`version`命令
- 尽量保持命令行文件小--因为它们的主要目的就是调用函数
- 必要的时候展示一下`loading`
- 退出的时候伴随着正确的状态码