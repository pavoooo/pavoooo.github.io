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