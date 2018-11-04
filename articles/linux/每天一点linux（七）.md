# 每天一点linux（七）

在最初的时候曾介绍过`shell`是系统跟计算机硬件交互时使用的中间介质，它只是系统的一个工具。用户把指令告诉`shell`，然后`shell`再传输给系统内核，接着内核就会支配计算机硬件去执行各种操作。那`shell`在系统中是怎么存在的呢？很简单，打开你的终端，那个黑框框就是`shell`

![](/blog/linux-imgs/shell1.png)

在`shell`中，我们不仅能够通过命令来操作计算机，还能够利用`shell`提供的便捷功能更方便的工作。

## 历史记录

我们在`shell`中执行过的每一条命令都会被操作系统记录下来。默认的情况下，操作系统会记录`1000`条历史命令。这些命令会保存在用户家目录下面的`.bash_history`(这个文件会由操作系统自动创建)。比如

![](/blog/linux-imgs/shell2.png)

> 只有正常的退出当前`shell`的时候，在当前`shell`中运行的命令才会保存在`.bash_history`文件中

![](/blog/linux-imgs/shell3.png)

## !

`!`是和历史命令有关的一个特殊字符。这个字符常用的功能有如下三个：

- **!!**：`!!`表示执行上一条指令

![](/blog/linux-imgs/shell4.png)

- **!n**：`!n`表示执行历史命令中的第几条指令

- **!字符串**：表示执行历史命令中最近一次以 字符串 开头的命令。比如执行最后一次以`l`开头的命令

![](/blog/linux-imgs/shell6.png)

## 别名alias

别名机制主要是为了方便我们执行一些很长又具有特殊功能的命令。通过`alias`命令，我们可以查看系统中所有的别名命令。

![](/blog/linux-imgs/shell7.png)

当然，我们也可以通过`alias`命令来设置别名。比如设置`lll`命令就是`clear`的功能。

```bash
alias lll=clear
```

![](/blog/linux-imgs/shell8.png)

这是在终端中输入`lll`就相当于执行了`clear`命令。如果，我们不想使用这个别名命令了，那么我们可以通过`unalias`进行卸载。

```bash
unalias lll
```

![](/blog/linux-imgs/shell9.png)

## 通配符

在`shell`下，我们可以通过`*`来匹配零个或者多个字符，使用`?`来匹配一个字符。

```bash
ll i* # 列出所有以i开头的文件
ll inde?.js ## 列出以 inde开头且文件名长度为5的文件
```

![](/blog/linux-imgs/shell10.png)

## 重定向

`linux`系统重定向的方式主要分为两种：`输入重定向`和`输出重定向`。

- `输入重定向`主要用于改变命令的输入，使用`<`字符表示

- `输出重定向`主要用于改变命令的输出，使用`>`字符表示

```bash
head -n 1 /etc/group > 1.txt # 将head命令的输出重定向到1.txt文件中
wc -l < 1.txt # 将 users的输出重定向到wc命令
```

![](/blog/linux-imgs/shell11.png)

![](/blog/linux-imgs/shell12.png)

`linux`还提供了另外两种重定向：`2>`错误输出重定向，`>>`追加重定向

```bash
echo '1' > 1.txt
echo '1' >> 1.txt
```

![](/blog/linux-imgs/shell13.png)

```bash
ll i.txt # 查看一个不存在的文件信息
ll i.txt 2> err.txt # 将错误信息同步到err.txt中
```

![](/blog/linux-imgs/shell14.png)

## 管道符
`linux`提供了管道符`|`操作。它主要是用于将一个命令的输出作为另一个命令的输入。

```bash
head -n 5 /etc/passwd | wc -l
```

![](/blog/linux-imgs/shell15.png)

## 变量
`linux`系统中提供了很多变量。变量就是使用一个简单的字符串来代替某些具有特殊意义的设定及数据。比如系统的环境变量`PATH`。我们可以在`shell`中直接使用系统提供的各种变量。获取变量的格式就是`$变量名`。比如：

![](/blog/linux-imgs/shell16.png)

上面的`$HOME`和`$PATH`都是`linux`系统预设的环境变量。`linux`其实预设了很多的环境变量，我们可以通过`env`命令开查看系统预设的所有的环境变量。

```bash
env
```

![](/blog/linux-imgs/shell17.png)

这个变量的输出，我们都可以在终端中使用`echo $变量名`的方式来查看。

> `env`命令只是用来显示系统预设的环境变量。可以通过`set`命令显示系统预设的所有变量

![](/blog/linux-imgs/shell18.png)

![](/blog/linux-imgs/shell19.png)

`set`命令除了可以显示系统预设的变量外，也可以显示用户自己的变量。

```bash
nn=saisai
echo $nn
set | grep nn
```
这种设置变量的方式只会在当前`shell`中起作用，一旦退出当前`shell`或者新建一个`shell`，创建的这个变量就会消失。

为了能够让自己设置的环境变量始终有效，这里提供两种方式。第一种是针对所有登录到当前系统的用户都有效。第二种是只针对当前用户有效。

- **允许所有登录到当前系统的用户都能使用该变量**。在`/etc/profile`文件中添加`export nn=saisai`，然后运行`source /etc/profile`即可

![](/blog/linux-imgs/shell20.png)

- **仅对当前用户使用该变量**。在家目录下新建`.bashrc`文件(后面会讲)，然后加入`export nnn=zss`，运行`source ~/.bashrc`即可

![](/blog/linux-imgs/shell21.png)

上述过程中我们使用了一个`export`命令。这个命令就是用来声明一个变量的。如果我们直接使用`export`变量，后面不加任何变量名，则它会列出所有已经声明的变量。

![](/blog/linux-imgs/shell22.png)

设置了变量之后可以使用`unset`删除一个变量，当然也是只对当前`shell`起作用。

```bash
unset nn
```

![](/blog/linux-imgs/shell23.png)

## shell中的引号

`shell`中有三种类型的引号

- **单引号('')**：原样输出某个字符串，特殊字符也会全部失去本身的意义。
- **双引号("")**：不会取消双引号中特殊字符的含义，但是不会执行代表命令的字符串
- **反引号(``)**：用于执行命令

![](/blog/linux-imgs/shell24.png)

![](/blog/linux-imgs/shell25.png)

## 配置文件
和系统变量有关的文件分为两种：**系统级别**和**用户级别**。

系统级别的配置文件有两个：

- **/etc/profile**：这个文件预设了一些重要的变量。可以通过`cat /etc/profile`来查看
- **/etc/bashrc**：这个文件主要预设`unmask`和`PS1`。通过`cat /etc/profile`来查看

::: tip
`PS1`就是在我们输入命令的时候前面的那串字符。`PS1`中有几个特殊字符

- `\u`：指用户名
- `\h`：指主机名
- `-W`：指当前目录
- `\$`：指身份字符（超级管理员显示为`#`，普通用户显示为`$`）
:::

![](/blog/linux-imgs/shell26.png)

这两个就是系统级别的配置文件，对登录这个系统的每一个用户都会起作用。与此对应的是用户级别的配置文件，这些配置文件是存放在用户家目录下面的一些隐藏文件，主要是针对此用户做一些特殊的配置。

![](/blog/linux-imgs/shell27.png)


- **.bash_profile**：这个文件定义了用户的个人路径和环境变量的文件名称。这个文件会在用户登录的时候，仅仅执行一次
- **.bashrc**：包含用户专属的`bash`信息。每次登录或者打开新的`shell`的时候，这个文件都会被读取
- **.bash_history**：记录当前用户历史命令的文件
- **.bash_logout**：当用户退出`shell`的时候，就会执行这个文件。

对于上面的几个配置文件，执行顺序是

::: tip
登录Linux ---> /etc/profile ---> $HOME/{.bash_profile | .bash_login | .profile}  ---> $HOME/.bashrc ---> /etc/bashrc
:::

下面我们看一下这些配置文件在读取变量时候的优先级

![](/blog/linux-imgs/shell28.png)

## 特殊符号

`linux`系统提供了很多的特殊符号，这些符号我们可以结合在一起在`shell`中使用来实现一些特殊的功能。

有几个特殊字符前面已经见过，就是`*`代表零个或多个字符，`?`代表一个字符，以及`#`在`shell`表示注释，还有管道符`|`。

除了这几个，`linux`还提供了几个特殊字符

- **~**：表示用户的家目录

```bash
cd ~ # 切换到用户的家目录
ll ~/.bashrc # 查看家目录下的.bashrc 文件
```

- **&**：把命令放入后台执行

```bash
node index.js & 
jobs # 来查看后台任务
```

- **;和&&和||**：并行执行命令

```bash
cmd1; cmd2 # cmd1成功与否都会执行cmd2
cmd1 && cmd2 # cmd1成功的情况下才执行cmd2
cmd1 || cmd2 # cmd1失败的情况下才执行cmd2
```

![](/blog/linux-imgs/shell48.png)

下面再介绍几个在`shell`中使用的特殊命令。

### cut
这个命令主要是用于截取某一个字段。其格式是：

```bash
cut -d '分隔字符' [-cf] n
```

- **-d**：后面跟的是分隔字符，用于指定片段切割的依据
- **-c**：表示获取的是字符
- **-f**：表示获取的是片段

下面以`/etc/passwd`文件来演示`cut`命令的基本用法

```bash
cp /etc/passwd . # 获取一个副本
head -n 5 | cut -d ':' -f 1 # 以 : 进行分隔，并获取分隔后的第一个字段
```

![](/blog/linux-imgs/shell29.png)

那这第一个片段是怎么来的。比如，下面的字符串

```bash
root:x:0:0:root:/root:/bin/zsh
```
根据`:`进行分隔后如下：

```bash
root x 0 0 root /root /bin/zsh # 分隔为7个字段，第一个字段就是 root
```

那获取第6个字段或者第一个字符呢

![](/blog/linux-imgs/shell30.png)

我们获取字符的时候不能通过`-d`进行分隔，只能从源字符串中获取。除此，`-c`选项也是可以通过区间来获取字符

![](/blog/linux-imgs/shell31.png)

### sort
`sort`命令主要是用于排序。格式如下

```bash
sort [-t 分隔符] [-kn1, n2] [-nru]
```

- **-t**：后面跟上分隔符，作用和`cut`命令的`-d`参数类似
- **-n**：表示使用纯数字排序
- **-r**：表示反向排序
- **-u**：表示去重排序
- **-kn1,n2**：表示对`n1`和`n2`区域内的数据进行排序

先构建测试文件
```bash
head -n 4 passwd > passwd 
head -n 4 passwd >> passwd 
```

第一：`sort`不加任何选项，则按照**首字符**升序输出

![](/blog/linux-imgs/shell32.png)

第二：输出逆向排序

![](/blog/linux-imgs/shell33.png)

第三：对输出的结果逆向排序并去重

![](/blog/linux-imgs/shell34.png)

第四：按照`uid`字段排序。这里需要把`-k`和`-t`结合在一起使用

![](/blog/linux-imgs/shell35.png)

第五：使用纯数字进行排序。（指按照每一行记录中出现的数字进行排序，不是数字的忽略）

![](/blog/linux-imgs/shell36.png)

### wc

这个命令主要用于统计。

- **-l**：统计行数
- **-m**：统计字符数
- **-w**：统计词数

![](/blog/linux-imgs/shell37.png)

### uniq
这个命令主要是用来删除重复的行。`-c`选项用于指定重复的行数。

![](/blog/linux-imgs/shell38.png)

使用`uniq`命令前需要对数据进行排序，否则是没有任何作用的。

![](/blog/linux-imgs/shell39.png)

```bash
sort passwd | uniq # 等价于
sort -u passwd
```

### tee
这个命令类似于输出重定向`>`，但是`tee`重定向后同样会把数据显示在终端。常和`|`管道符结合在一起使用。

```bash
cat passwd > passwd1
cat passwd | tee passwd2
```

![](/blog/linux-imgs/shell40.png)

### tr

这个命令主要是用来替换字符的。

```bash
tr 源字符 新字符
```

常用的选项有两个

- **-d**：表示删除某个字符
- **-s**：表示删除重复的字符 

![](/blog/linux-imgs/shell41.png)

![](/blog/linux-imgs/shell42.png)

将小写字母替换成大写字母

```bash
head -n 1 passwd | tr '[a-z]' '[A-Z]'
```

![](/blog/linux-imgs/shell43.png)

将`r`替换成`R`

```bash
head -n 1 passwd | tr 'r' 'R'
```
![](/blog/linux-imgs/shell44.png)

### split
这个命令主要是用来切割文档的，常用的有两个选项

- **-b**：按照大小来切割。单位是`byte`
- **-l**：按照行数来切割

按照大小来切割

![](/blog/linux-imgs/shell45.png)

![](/blog/linux-imgs/shell46.png)


按照行数来切割

![](/blog/linux-imgs/shell47.png)