# 每天一点linux（四）

`linux`中一切皆文件。`linux`中的文件分为若干种类型。比较常见的主要有如下四种类型的文件：

- **普通文件**：即我们常见的文本文件。在`linux`中使用`-`来表示
- **目录文件**：特指目录。在`linux`中使用`d`来表示
- **链接文件**：在`linux`中的链接文件主要分为两种类型`硬链接文件`和`软链接文件`。统一使用`l`来表示
- **设备文件**：`linux`设备文件同样分为两种：`块设备`主要用来存储数据的，比如硬盘等，用字符`b`来表示。`字符设备`，比如鼠标，键盘等，用字符`c`来表示。

上面几种类型的文件，我们在日常使用`linux`的过程中肯定会经常接触。如果你感到陌生，并不是不存在，可能是因为太常用而忽略了具体的文件类型。下面先介绍一下`linux`中的链接文件是什么？

`linux`中的链接文件主要分为两种，**硬链接文件**和**软链接文件**。两种链接文件的区别主要在于`inode`。

- **硬链接**：当系统要读取一个文件的时，就会先读`inode table`，然后再根据`inode`中的信息到块区域将数据取出来。硬链接的本质就是创建的时候再建立一个`inode`链接到文件放置的块区域。即进行硬链接的时候，文件本身的内容是没有发生任何变化的，只是多了一个指向这个文件的`inode`。

![link](/blog/linux-imgs/link1.png)

创建硬链接的时候主要有两个限制：

1. 不能跨文件系统，因为不同的文件系统有不同的`inode table`
2. 不能链接目录

- **软链接**：和硬链接不同的是，软链接是新创建一个独立的文件，当读取这个链接文件的时候，它会把读取行为转发到该文件所链接的文件上。（类似于windows）上的快捷方式

在`linux`中创建链接文件是通过`ln`命令来操作的。格式如下：

```bash
ln [-s] [来源文件] [目的文件]
```
选项`-s`用来表示创建的文件的类型。如果加上`-s`选项表示创建的文件是`软链接`，否则就是`硬链接`文件。

下面是对链接文件进行操作的一些例子。首先看一下硬链接具有什么特性

```bash
touch index.js # 创建一个文件
ln index.js index.hard # 创建一个硬链接文件
echo 'const a = 1' > index.js # 向源文件中插入数据
cat index.js index.hard # 查看两个文件的内容
echo 'var a = 1' > index.hard # 向链接文件中插入一些数据
cat index.js index.hard # 查看两个文件的内容
rm index.js # 删除源文件
cat index.hard # 查看链接文件
```

![link](/blog/linux-imgs/link2.png)

下面再看一下软链接的特性

```bash
touch index.js # 创建一个文件
ln -s index.js index.soft # 创建一个硬链接文件
echo 'const a = 1' > index.js # 向源文件中插入数据
cat index.js index.soft # 查看两个文件的内容
echo 'var a = 1' > index.soft # 向链接文件中插入一些数据
cat index.js index.soft # 查看两个文件的内容
rm index.js # 删除源文件
cat index.soft # 查看链接文件
```

![link](/blog/linux-imgs/link3.png)

上面就是链接文件的一些基本知识。下面学习一个特别有用的命令`find`，这个命令主要是用于搜索文件的。

## find
`find`命令主要是根据指定的参数在`linux`系统中找出符合条件的文件。格式如下：

```bash
find [路径] [参数]
```
主要有下面几个比较常用的参数

- **-type**：指定文件的类型，通过文件类型来查找文件。文件类型就是上面所介绍的几种`f`, `b`, `d`, `c`, `l`, `s`等

比如找出`demos`目录下所有的目录:

```bash
find demos -type d
```

![find](/blog/linux-imgs/find1.png)

- **-name**：指定文件名称，通过文件名称来查找文件。比如找出`demos`目录下文件名称是`index.js`的文件。

```bash
find demos -name index.js
```

![find](/blog/linux-imgs/find1.png)

从结果可知，这个命令会级联找出符合条件的文件。

下面几个是和文件时间属性有关的几个参数。在介绍这几个参数之前，我们有必要了解`linux`中的文件和时间有关的属性有哪些。总的说来，主要有`创建时间`，`编辑时间`，`访问时间`等。具体一点的描述如下：

- `Access time(atime)`：在读取或者执行文件的时候更改
- `Modified time(mtime)`：在编辑文件时候更改
- `Create time(ctime)`：在写入文件，更改文件所属信息，权限或者设置链接的时候随inode属性的更改而改变。

可以通过`stat`命令来查看文件的上面三个属性

![find](/blog/linux-imgs/find3.png)

所以，我们在查找文件的时候也是可以根据这三个属性进行查找的

- **-atime +n/-n**：找出atime时间大于或者小于n天的文件
- **-ctime +n/-n**：找出ctime时间大于或者小于n天的文件
- **-mtime +n/-n**：找出mtime时间大于或者小于n天的文件

::: tip
+n：表示大于n的时间

-n：表示小于n的时间
:::

比如找出`ctime`小于1天的文件

```bash
find demos -ctime -1
```

![find](/blog/linux-imgs/find4.png)

其它参数的用法类似