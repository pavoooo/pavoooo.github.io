# 每天一点linux（六）

压缩文件是系统中非常常见的一种文件。使用压缩文件不仅能够节省磁盘的空间，还能够节省网络传输时候的带宽。`windows`系统下最常用的压缩文件时`.rar`文件。在`linux`系统下，这种压缩格式不能用，但`linux`也提供了多种类型的压缩文件，最常用的就是`.tar.gz`文件。

下面是`linux`系统下几种常用的压缩文件类型：

- `.gz`：由`gzip`工具压缩而来的压缩文件
- `.bz2`：由`bzip2`工具压缩而来的压缩文件
- `.tar`：由`tar`打包程序打包之后的文件
- `.tar.gz`：可以认为先由`tar`程序进行打包，然后再由`gzip`压缩
- `.tar.bz2`：可以认为先由`tar`程序进行打包，然后再由`bzip2`压缩

> `tar`程序不具备压缩功能，它只是把一个目录合并成一个文件

下面是对几种打包压缩方法的详细介绍

## gzip

使用`gzip`命令压缩文件的格式如下：

```bash
gzip [-d#] filename
```

- **-d**：这个参数主要在解压的时候使用。使用`-d`这个参数可以解压由`gzip`压缩的文件
- **#**：用来指定压缩等级。压缩等级是`1-9`，1为最差，9为最好，6为默认。一般使用默认的压缩等级也就够了。

```bash
touch index.txt # 创建一个文件
gzip index.txt # 对这个文件进行压缩
```

![](/blog/linux-imgs/gzip1.png)

现在对这个文件进行解压缩，解压缩需要指定`-d`选项

```bash
gzip -d index.txt.gz # 需要指定进行解压缩的文件路径
```

![](/blog/linux-imgs/gzip2.png)

## bzip2

这个命令也是用于压缩文件的，其主要格式如下：

```bash
bzip2 [-zd] filename
```
- **-z**：指示命令是压缩行为，这也是默认行为
- **-d**：指示命令时解压行为

```bash
touch index.js # 创建一个文件
bzip2 index.js # 这个也等同于 bzip2 -z index.js
```

![](/blog/linux-imgs/bzip1.png)

同样使用`-d`参数进行解压缩

```bash
bzip2 -d index.js.bz2
```

![](/blog/linux-imgs/bzip2.png)

::: danger
`gzip`和`bzip2`都是不能用来压缩目录的
:::

![](/blog/linux-imgs/gzip3.png)

## tar

`tar`是一个打包工具，可以把一个目录打包成一个文件，它主要是用来把所有文件整合成一个大文件，方便复制和移动。通过上面的介绍，我们知道`gzip`和`bzip2`是不能压缩目录文件的。如果我们想压缩目录，我们首要做的就是需要借助`tar`把目录整合成一个文件，然后使用`gzip`或者`bzip2`命令进行压缩。

`tar`的基本用法如下，参数多如牛毛：

```bash
tar [-zjxcvfpP] filename tar
```

参数很多，介绍几个比较常用的，不常用的介绍了也没啥不介绍也没事。

- **-z**：表示使用gzip进行压缩
- **-j**：表示使用bzip2进行压缩
- **-x**：表示解包或者解压缩
- **-c**：表示创建tar包或者压缩文件包
- **-v**：展示打包过程
- **-f**：指定打包后的文件的名称。(如果多个参数一起使用，这个参数一定要放在后面)

```bash
mkdir test # 创建一个目录
touch test/index.js test/index.css # 建立两个文件
tar -cf test test.tar # 创建一个打包文件
```

![](/blog/linux-imgs/tar1.png)

在创建好打包文件后，就可以使用`gzip`或者`bzip2`命令进行压缩了

```bash
gzip test.tar
```

![](/blog/linux-imgs/tar2.png)

同样，我们可以进行解压缩

```bash
gzip -d test.tar.gz
tar -xf test.tar
```

![](/blog/linux-imgs/tar3.png)

其实我们利用`tar`提供的参数可以直接进行打包后压缩。比如，打包的同时进行`gzip`压缩，并同时展示打包压缩的过程

```bash
tar -zcvf test.tar.gz test
```

![](/blog/linux-imgs/tar-gz1.png)

解压缩的同时，解包

```bash
tar -zxvf test.tar.gz
```

![](/blog/linux-imgs/tar-gz2.png)

同样可以使用`bzip2`进行压缩，这时候需要使用`-j`选项

```bash
tar -jcvf test.tar.bz2 test
```

![](/blog/linux-imgs/tar-gz3.png)

## zip
`zip`压缩是windows和linux系统上通用的压缩格式。它可以压缩目录和文件。，不过在压缩目录的时候，需要指定目录下的文件。

```bash
zip 压缩后的文件名 压缩的文件
```
`zip`也有一个非常重要的选项`-r`，主要是用来级联压缩目录的。

```bash
touch index.js
zip index.js.zip index.js # 压缩文件
zip test.zip test/* # 压缩目录
```

![](/blog/linux-imgs/zip1.png)

可以使用`unzip`命令对`zip`格式的压缩文件进行解压缩

```bash
unzip index.js.zip
unzip test.zip
```

![](/blog/linux-imgs/unzip1.png)

> 如果系统中不支持`zip`和`unzip`命令，可以使用`yum`工具进行安装

```bash
yum install -y zip
yum install -y unzip
```