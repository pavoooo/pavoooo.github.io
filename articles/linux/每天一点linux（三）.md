# 每天一点linux（三）

今天要学习的是和几个文档有关的命令，在我们查看文件内容或者实时查看日志的时候会很有帮助。

## cat

`cat`命令主要是用来查看文件内容的。

![cat](/blog/linux-imgs/cat1.png)

这个命令还有几个比较常用的选项：

- **-n**：查看文件内容的时候把行号也显示在屏幕上

![cat](/blog/linux-imgs/cat2.png)

- **-A**：显示所有的内容，包含一些特殊字符。

![cat](/blog/linux-imgs/cat3.png)

## tac
`tac`是一个比较有意思的命令。从字面上来看它是`cat`命令的逆序书写。其作用也是和`cat`命令相反，它用于倒序显示文件的内容。**`-n`和`-A`选项不适用它。**

![cat](/blog/linux-imgs/tac.png)

## more

`more`命令主要用在所查看的文件内容过多的场景下使用。如果文件内容过多，它只会显示一屏的内容。我们可以按**空格键**继续查看下一屏，或者按**q**键退出查看。

```bash
more index.html
```

![more](/blog/linux-imgs/more.png)

## less
`less`命令和`more`命令的作用比较类似。但`less`命令对输出的文本提供了更多的交互。
- **空格键**：实现翻页
- **j键**：向下移动
- **k键**：向上移动
- **/**：向下查找字符，按`n`键显示下一个
- **?**：向上查找字符，按`n`键显示上一个

```bash
/root # 查找 
?root
```

## head
`head`这个命令主要是用于显示文件的前10行。使用`-n`可以指定需要显示的行数。

![head](/blog/linux-imgs/head1.png)

显示文件的前5行

![head](/blog/linux-imgs/head2.png)

## tail
`tail`这个命令默认会显示文件的后10行。同样可以使用`-n`指定需要显示的行数.

![tail](/blog/linux-imgs/tail1.png)

显示文件的后3行

![tail](/blog/linux-imgs/tail2.png)

`tail`的`-f`选项也是十分常用的。它会动态监测文件的内容，当文件内容有变化的时候实时输出到屏幕上。这对我们实时检测日志很有帮助。

![tail](/blog/linux-imgs/tail3.png)

`linux`中的文件除了具有一些常规属性外，还具有一些和权限相关的属性。比如文件的所有者信息，所属组信息，以及文件的可读性，可写性以及可执行性。`linux`也提供了对这些特殊属性进行了操作。

## chgrp
`chgrp`即`change group`。这个命令就是用来更改文件的所属组的。用法如下：

```bash
chgrp [组名称] [文件路径]
```

所以，我们可以这样用

```bash
groupadd everyday # 添加一个新组

touch everyday.js

chgrp everyday everyday.js
```

![chgrp](/blog/linux-imgs/chgrp1.png)

![chgrp](/blog/linux-imgs/chgrp2.png)

这个命令还能更改目录的所属组信息：

```bash
mkdir everyday

chgrp everyday everyday
```

![chgrp](/blog/linux-imgs/chgrp3.png)

![chgrp](/blog/linux-imgs/chgrp4.png)

但是，`chgrp`命令在更改目录所属组的信息的时候，只会更改当前目录本身的所属组信息，目录下的目录和文件的所属组信息是没有更改的。如果想级联更改目录的所属组信息，请加上`-R`选项。

![chgrp](/blog/linux-imgs/chgrp5.png)

```bash
chgrp -R everyday everyday
```
![chgrp](/blog/linux-imgs/chgrp6.png)

## chown
`chown`即`change owner`，用来更改文件的所有者信息。当更改目录的所有者信息的时候，默认行为和`chgrp`类似。只会更改当前目录的所有者信息，不会更改子目录等文件的所有者信息。如果需要级联更改，同样使用`-R`选项。用法如下：

```bash
chown [-R] 用户名 文件路径
```

一个简单的例子：

```bash
useradd js # 添加一个用户js
mkdir -p lang/js # 级联创建目录
chown -R js lang # 更改lang所有者 为js
```

![chown](/blog/linux-imgs/chown.png)

::: tip
chown还有一个比较常用的用法，可以同时更改文件的所有者和所属组信息。

**chown -R 所有者:所属组**
:::

## chmod
`chmod`是`linux`非常重要的命令之一。主要是用来修改文件的相关权限。`linux`中的用户有三种身份

- **所有者**
- **所属组**
- **其它用户**

文件对于这三种身份分别具有三种访问权限，分别是:

- **r**：可读性
- **w**：可写性
- **x**：可执行性


比如，通过`ll`命令来查看一个文件

![chmod](/blog/linux-imgs/chmod1.png)

> -表示当前用户对这个文件没有相应的权限

从输出的第一列就可以看出。文件的所有者即`js`对其具有可读可写可执行的权限。文件相同组`lang`用户对其具有可读和可执行性。同样，其它用户对其也是有可读和可执行性。

通过`rwx`用来表示文件的权限是`linux`中权限的一种表示方法。`linux`中还有一种使用**数字**来表示权限的方式。在这种权限表示方式中，**r等于4，w等于2，x等于1**。上述的文件如果使用数字表示就会变成：

- 所有者`rwx` ---> 4 + 2 + 1 ---> 7
- 所属组`r-x` ---> 4 + 1 ---> 5
- 其它用户`r-x` ---> 4 + 1 ---> 5

所以，上述文件如果使用数字表示权限，就代替为这个文件的权限是`755`。

鉴于上面的介绍，我们可以猜测在`linux`中修改文件饿的权限至少有两种方式我们可以使用。

- 第一种：通过数字来更改文件的权限。其基本格式为：

```bash
chmod [-R] 权限数字 文件路径
```

> -R选项同样是我们在更改目录权限时候需要级联更改的时候使用。

比如，把上面的`lang`目录的权限更改为`775`。

```bash
chmod 775 lang
```
![chmod](/blog/linux-imgs/chmod2.png)

上面是`linux`中更改文件权限的第一种方式。第二种方式则是通过`rwx`来设置权限。

- 第二种：增减`rwx`来设置权限

了解这种更改文件权限方式之前，需要了解几个字母的含义。

```bash
u -> 表示文件的所有者
g -> 表示文件的所属组
o -> 表示其它用户
a -> 表示全部用户
``` 

下面是这种方式修改文件权限的具体例子：

1. 把文件的所有者设置为`rwx`，文件的所属组和其它用户只有`r`权限

```bash
chmod u=rwx,og=r lang
```

![chmod](/blog/linux-imgs/chmod3.png)

2. 给所有身份加上可执行`x`权限

```bash
chmod a+x lang
```

![chmod](/blog/linux-imgs/chmod4.png)

3. 去除其它用户`o`的可执行权限

```bash
chmod o-x lang
```

![chmod](/blog/linux-imgs/chmod5.png)

## umask

首先创建一个目录`dir`和一个普通文件`file.js`

![umask](/blog/linux-imgs/umask1.png)

可以看出所创建的目录`dir`的权限是`rwxr-xr-x` ---> `755`。普通文件`file.js`的权限是`rw-r--r--` ---> `644`。这两个值也是`linux`创建的目录和普通文件的默认权限。那么，这些默认权限是怎么来的呢。这里就需要设计一个命令`umask`。这个命令主要用于更改文件的缺省权限。

```bash
umask # 默认是 022
```

![umask](/blog/linux-imgs/umask2.png)

在`linux`创建文件的时候是有两个默认规则的

- 若创建的是目录，则会对其开放所有权限即777(`rwxrwxrwx`)
- 若创建的是文本文件，则是没有可执行权限的，即666(`rw-rw-rw`)

那为啥我们创建的目录默认权限是`755`，普通文件是`644`呢？那是因为在创建文件的时候，需要使用上面默认的权限来减去`umask`的所表示的值。

```bash
777 - 022 ===> 755
666 - 022 ===> 644
```

其实，`umask`也是可写的。也就是说我们可以自己定义`umask`的值，那么在定义后所创建文件的行为都会以这个新的`umask`的值来确认文件的默认权限。

```bash
umask 数值
```

比如，我们把`umask`的设置为`000`，那么所创建的文件都是其对应类型默认的最大预设权限。

![umask](/blog/linux-imgs/umask3.png)

为了安全起见，我们在测试完毕后，别忘了恢复到原来的值 

```bash
umask 022
```