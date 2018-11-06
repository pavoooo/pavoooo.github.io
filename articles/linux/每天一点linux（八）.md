# 每天一点linux（八）

昨天学习了一些关于`shell`的基础知识，今天就需要了解一下`shell`编程。`shell`编程也被称为`shell`脚本，其运行环境就是`linux`的`shell`。

那什么是`shell`脚本呢？`shell`脚本就是**逻辑+一些命令的集合**。

那我们怎么创建和执行`shell`脚本呢？首先，`shell`脚本就是一个普通的文本文件，通常以`.sh`结尾。在`shell`脚本的首行，通常需要添加`#!/bin/bash`，表明这个脚本所使用的是`bash`语法。下面就是一个普通的`shell`脚本。

```bash
#!/bin/bash

# 这是我们第一个shell脚本
echo 第一个shell脚本文件
```

> `shell`脚本中，`#`表示注释

编写好`shell`脚本后，我们就需要执行她。执行的方式有两种：

第一种：**shell名称 脚本路径**

```bash
bash first.sh
```

![](/blog/linux-imgs/bash1.png)

使用这种方式来执行`shell`脚本，可以通过`-x`选项来查看脚本执行的过程

```bash
bash -x first.sh
```

![](/blog/linux-imgs/bash3.png)

第二种：**基本路径**，这种情况下需要赋予这个脚本可执行权限

```bash
chmod +x ./first.sh
./first.sh
```

![](/blog/linux-imgs/bash2.png)

## 变量
`shell`脚本中也有变量的概念。`shell`脚本变量的定义格式是

```bash
变量名=变量值
```

::: warning
定义变量的时候，变量名和变量值之间**等号两边不能有空格**
:::

使用变量直接`$变量名`即可。

```bash
name=saisai
echo $name
echo '$name' # ''的作用和先前介绍的是一样的
echo "$name" # ""的作用和先前介绍的也是一样的
```

![](/blog/linux-imgs/bash4.png)

我们也可以把一个命令的输出结果赋值给一个变量

```bash
directory=`pwd` # ``会把其中的字符串当作命令来执行
echo $directory
```

![](/blog/linux-imgs/bash5.png)

## 数学运算
我们可以在`shell`脚本中进行简单的数学运算。进行数学运算需要遵循如下的格式：

```bash
$[进行数学运算的式子]
```

```bash
a=1
b=2
c=3

echo $[$a+$b+$c]
echo $[1+$a+$b*$c]
```

![](/blog/linux-imgs/bash6.png)

## 读取用户输入
我们可以在`shell`中通过`read`命令来和用户进行交互。通过`-p`选项输出提示语。用户输入的结果会赋给我们所指定的变量。

```bash
read -p '提示语' 变量名
```

比如

```bash
read -p '请输入第一个数字：' first
read -p '请输入第二个数字' second

echo '计算结果是：'
echo $first+$second
```

![](/blog/linux-imgs/bash7.png)

## 预设变量
`预设变量`就是在`shell`脚本中预先定义好的具有特殊含义的变量。比如，我们的`shell`脚本如下

```bash
echo $0 $1 $2
```
其中的`$0`，`$1`，`$2`...等就是脚本中预设的变量。这些变量都是在我们执行脚本的时候传递的。比如

```bash
bash prev.sh 1 2 # $0 就是 prev.sh $1 就是1 $2 就是2等等
```

![](/blog/linux-imgs/bash8.png)

## 逻辑判断

在`shell`中，进行逻辑判断的语句主要有`if`, `if-else`, `if-elif-else`和`case`。

### if

`if`判断的基本格式如下

```bash
if 判断语句; then
  command
fi
```

如果带有`else`语句，则具体形式如下：

```bash
if 判断语句; then
  command
else
  command
fi
```

如果带有`elif`语句，则具体形式如下：

```bash
if 判断语句; then
  command
elif 判断语句; then
  command
else
  command
fi
```

具有一定编程基础的人，对上面的这些判断语句都不会陌生。下面看一下列子

```bash
read -p 'Please input a number：' a

if [ $a -gt 60 ]; then
  echo 'Good'
else
  echo 'Bad'
fi
```

![](/blog/linux-imgs/bash9.png)

```bash
#!/bin/bash

if [ $1 -gt 79 ]; then
  echo 'Perfect'
elif [ $1 -gt 59 ]; then
  echo 'Good'
else
  echo 'Bad'
fi
```

![](/blog/linux-imgs/bash10.png)

在`shell`中判断语句一般使用`[]`。在进行不同类型判断的时候也会有不同的操作符。比如在进行数值判断的时候会有这些操作符。

```bash
-lt：小于
-gt：大于
-le：小于或等于
-ge：大于或等于
-eq：等于
-ne：不等于
```

比如：

```bash
if [ $a -gt 10 ] ==> 如果变量a的值大于10
if [ $a -le 10 ] ==> 如果变量a的值小于等于10
if [ $a -ne 10 ] ==> 如果变量a的值不等于10
```

除此，我们还可以借助`&&`，`||`进行多重条件的判断

```bash
if [ $a -gt 60] && [ $a -lt 80 ] ===> 变量a的值大于60且小于80
if [ $a -gt 60 ] || [ $a -lt 30 ] ===> 变量a的值大于60或小于30，条件都成立
```

除了和数值进行比较，`shell`更多的是和文档进行比较，比如，判断一个文件是否存在或者文档是不是目录等。一般会涉及到如下的操作符

```bash
-e：判断文件或者目录是否存在
-d：判断文件是否存在，而且是目录
-f：判断文件是否存在而且是普通文件
-r：判断文件是否有读权限
-w：判断文件是否有写权限
-x：判断文件是否有执行权限
```

下面是一些具体的使用例子

```bash
#!/bin/bash

path='./test.js'

if [ -e $path ]; then
	echo "$path文件存在"
fi

if [ -d $path ]; then
  echo "$path是目录"
fi

if [ -f $path ] && [ -x $path ]; then
  echo "$path是文件而且是具有可执行权限"
fi
```

上面就是`if`判断的基本形式，除了`if`判断，我们还经常使用的是`case`判断。

`case`就类似于编程语言中的`switch...case`语句。只是写法不同：

```bash
case 变量 in
value1)
  command
  ;;
value2)
  command
  ;;
*)
  command
  ;;
esac
```

上面的格式中`value`是不限制个数的，一旦找到一个符合的，就会立即执行`command`，而且不会继续往下走。如果所有的`value`都不满足条件，则会执行`*`中的`command`。`*`也是可选的。

比如：

```bash
#!/bin/bash
read -p 'please input a number：' num
res=$[$num%2]

case $res in
1)
  echo "$num is odd"
  ;;
0)
  echo "$num is even"
  ;;
*)
  echo "$num is not a number"
  ;;
esac
```

## 循环

`shell`中的循环一般有三种：`for`循环，`while`循环和`until`循环。这三种循环只是写法不同，彼此之间是可以转换的。

### for循环

`for`循环的基本格式如下：

```bash
for 变量 in v1 v2 ..
do
  cmd1
  cmd2
  ...
done
```

比如输出`1-10`

```bash
#!/bin/bash

for loop in 1 2 3 4 5 6 7 8 9 10
do
  echo "The value is $loop"
done
```

![](/blog/linux-imgs/bash11.png)

`in`后面也可以是命令的输出

```bash
#!/bin/bash

for file in `ls`
do
  echo "当前文件 $file 的信息是："
  ls -l $file
done
```

![](/blog/linux-imgs/bash12.png)

## while
`while`循环用于不断的执行一条命令。基本格式如下

```bash
while 条件
do
  command
done
```

比如，使用`while`循环输出`1-10`

```bash
#!/bin/bash

int=1
while (($int<11))
do
  echo "The value is $int"
  int=$[$int+1]
done
```

![](/blog/linux-imgs/bash13.png)

## until
`until`循环类似于`while`循环。until 循环执行一系列命令直至条件为 true 时停止。其格式如下

```bash
until 条件
do
  cmd1
  ...
done
```

同样输出`1-10`

```bash
#!/bin/bash

int=1
until [ $int -gt 10 ]
do
  echo "The value is $int"
  int=$[$int+1]
done
```
![](/blog/linux-imgs/bash14.png)