# 每天一点linux（二）

了解了`linux`文件目录结构后，就需要掌握一些`linux`中操作文件目录的一些基本命令。其实，`linux`中很多类型的命令都可以分为四种操作：`增`，`删`，`改`，`查`。命令的一般格式基本上也是如下：

```bash
命令 [OPTIONS] [PARAMS]
```

## ls

`ls`命令是英文单词`list`的缩写。主要作用是用于查看目录的内容或者文件的属性信息。

```bash
ls [options] [dir/file]
```

> `ls`命令默认是查看当前目录的内容

```bash
ls
```

![ls](/blog/linux-imgs/ls1.png)

比较常用的选项主要有下面几个：

- **-a**：列出当前目录下所有的文件。包含隐藏文件。

> linux中的隐藏文件都是以 `.` 开头

```bash
ls -a
``` 
![ls](/blog/linux-imgs/ls2.png)

- **-R**：连同子目录中的内容一起列出

```bash
ls -R
```

![ls](/blog/linux-imgs/ls3.png)

- **-l**：列出文件的详细信息

这个选项以列表的形式列出当前目录下所有文件的详细信息

```bash
ls -l
```

![ls](/blog/linux-imgs/ls4.png)

各个选项之间可以组合使用。下面的命令会列出这个目录下面所有文件的详细信息

```bash
ls -al
```

![ls](/blog/linux-imgs/ls5.png)

- **-h**：可以理解成`human`。以可读的方式列出文件的大小。常常和`-l`选项结合使用。

```bash
ls -lh
```

![ls](/blog/linux-imgs/ls6.png)

在`linux`中`ls -lh`有一个便捷的别名-- `ll`

![ls](/blog/linux-imgs/ls7.png)

这里需要对`ll`的输出做些解释，理解了这些输出，对后面理解文件权限控制会有很大的帮助。

```bash
drwxr-xr-x. 6 root root 4.0K 5月  10 12:03 demos
```

## cd

`cd`是`change dir`的缩写。改变当前路径，也可以理解成进入到某个目录下面。

![cd](/blog/linux-imgs/cd1.png)

如果`cd`命令后面不加任何路径作为参数。则默认进入当前用户的家目录。

```bash
cd # 等价于 cd ~
```

## pwd

当看当前所在路径

![cd](/blog/linux-imgs/cd1.png)

## which

用于查看命令所在的路径

![which](/blog/linux-imgs/which1.png)

## mkdir

`mkdir`是`make directory`的缩写。主要目的是用于创建目录。如在当前目录下创建一个test目录：

```bash
mkdir test
```

`mkdir`有一个常见的选项`-p`，主要用于递归创建目录。因为在`linux`中，如果你所创建的目录的上一级目录不存在，则会报错。加上`-p`选项就会在上级目录不存在的情况下自动创建。

![mkdir](/blog/linux-imgs/mkdir1.png)

## rmdir
`rmdir`用于删除**空目录**。同样可以使用`-p`选项级联的来删除目录。但是一定要确保在所有的级联目录中都是空的，否则会删除失败。

![rmdir](/blog/linux-imgs/rmdir1.png)

## touch
`touch`主要有两个作用

- 文件不存在的时候，直接创建文件
- 文件存在的时候，将文件的访问时间和修改时间更新为当前时间

![touch](/blog/linux-imgs/touch1.png)

## rm
`rm`命令是一个非常常用的命令。主要用于删除目录或者文件。基本用法如下

```bash
rm [OPTIONS] [dir/file]
```

`rm`在执行删除**非空目录**操作的时候通常会询问用户是否删除。如果输入`y`则表示删除，输入`n`则表示不删除。**删除文件或者空目录**的时候会直接删除。

同时，在删除目录的时候需要指定`-r`选项。

![rm](/blog/linux-imgs/rm1.png)

`-f`选项也是一个比较常用的选项。表示强制删除。不会咨询用户是否需要执行删除操作。

![rm](/blog/linux-imgs/rm2.png)

## mv

`mv`命令也主要有两个作用

- 移动文件或者目录
- 重命名文件或者目录

基本格式如下：

```bash
mv [选项] [源文件或目录] [目标文件或目录]
```

在执行操作的时候，一半会发生如下情况：

- 移动目录时，如果目标目录存在，会把源文件或者目录移动到这个目录中。如果目标目录不存在，则会把源文件或目录重命名为给定的目标名称
- 移动文件时，如果源文件存在，则询问是否覆盖（有些linux机器不会询问）。如果源文件不存在，则会把源文件或目录重命名为给定的目标名称

下面分四种情况分别看一下demo。
- 目标目录存在

![mv](/blog/linux-imgs/mv1.png)
- 目标目录不存在

![mv](/blog/linux-imgs/mv2.png)
- 目标文件存在，目标文件不存在（在我的linux系统上，效果一样）

![mv](/blog/linux-imgs/mv4.png)


## cp
`cp`这个命令主要就是用于复制文件或者目录。在复制目录的时候需要加上`-r`选项。

![cp](/blog/linux-imgs/cp1.png)

`-i`选项会在目标文件存在的情况下询问是否需要覆盖

![cp](/blog/linux-imgs/cp2.png)