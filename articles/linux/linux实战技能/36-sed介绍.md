# sed介绍

## sed的模式空间

`sed`的基本工作方式如下：

- 将文件以行为单位读取到内存中（模式空间）
- 使用`sed`的每个脚本对该行进行操作
- 处理完成后输出该行

## 替换命令

`sed`的替换命令是`s`。

```bash
sed 's/旧的内容/新的内容' 文件名称
```

> 上面的`旧的内容`和`新的内容`是可以使用元字符的，为了防止元字符被解释成通配符，建议使用`'`。

```bash
[root@instance-6w9riila ~]# cat afile
a a a
```

```bash
[root@instance-6w9riila ~]# sed 's/a/aa/' afile
aa a a
[root@instance-6w9riila ~]# cat afile
a a a
```

`sed`命令中内容的分隔符是可以改变的，比如我们使用`!`作为分隔符。

```bash
[root@instance-6w9riila ~]# sed 's!/!abc!' afile
a a a
```

如果需要进行多次替换操作，可以使用`-e`选项。

```bash
sed -e 's/旧的内容/新的内容/' -e 's/旧的内容/新的内容/' filename
```

```bash
[root@instance-6w9riila ~]# sed -e 's/a/aa/' -e 's/aa/bb/' afile
bb a a
```

除了使用`-e`选项来指定多个命令，也可以不使用`-e`，使用`;`来分隔多个命令。

```bash
[root@instance-6w9riila ~]# sed 's/a/aa/;s/aa/bb/' afile
bb a a
```

如果需要将替换后的内容原样的写入到源文件中，需要使用`-i`选项

```bash
sed -i 's/旧的内容/新的内容/' -e 's/旧的内容/新的内容/' filename
```

```bash
[root@instance-6w9riila ~]# sed -i 's/a/aa/;s/aa/bb/' afile
[root@instance-6w9riila ~]# cat afile
bb a a
```

替换内容的时候也是可以使用`-r`选项的，使用正则表达式来匹配旧的内容。

```bash
sed -r 's/扩展正则表达式/new/' filename
```

```bash
[root@instance-6w9riila ~]# cat passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

```bash
[root@instance-6w9riila ~]# sed 's/...//' passwd
t:x:0:0:root:/root:/bin/bash
:x:1:1:bin:/bin:/sbin/nologin
mon:x:2:2:daemon:/sbin:/sbin/nologin
:x:3:4:adm:/var/adm:/sbin/nologin
x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

```bash
[root@instance-6w9riila ~]# sed 's/s*bin//' passwd
root:x:0:0:root:/root://bash
:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/:/sbin/nologin
adm:x:3:4:adm:/var/adm://nologin
lp:x:4:7:lp:/var/spool/lpd://nologin
```

```bash
[root@instance-6w9riila ~]# grep root passwd
root:x:0:0:root:/root:/bin/bash
[root@instance-6w9riila ~]# grep root passwd | sed 's/^root//'
:x:0:0:root:/root:/bin/bash
```

不加`-r`选项我们也是可以直接使用正则表达式的普通元字符的，如果你想使用正则表达式的扩展元字符，需要使用`-r`选项

```bash
[root@instance-6w9riila ~]# cat bfile
b
a
aa
aaa
ab
abb
abbb
```

```bash
[root@instance-6w9riila ~]# sed 's/ab*/!/' bfile
b
!
!a
!aa
!
!
!
```

```bash
[root@instance-6w9riila ~]# sed 's/ab+/!/' bfile
b
a
aa
aaa
ab
abb
abbb
```

```bash
[root@instance-6w9riila ~]# sed -r 's/ab+/!/' bfile
b
a
aa
aaa
!
!
!
```

```bash
[root@instance-6w9riila ~]# sed -r 's/ab?/!/' bfile
b
!
!a
!aa
!
!b
!bb
```

```bash
[root@instance-6w9riila ~]# sed -r 's/a|b/!/' bfile
!
!
!a
!aa
!b
!bb
!bbb
```

在`sed`命令中可以使用`()`来引用分组

```bash
[root@instance-6w9riila ~]# cat cfile
axyzb
```

```bash
[root@instance-6w9riila ~]# sed -r 's/(a.*b)/\1\1/' cfile
axyzbaxyzb
```

> `\1`获取第一个分组中的内容，`\2`获取第二个分组中的内容。以此类推...

### 替换命令加强版

#### 全局替换

`sed`的全局替换需要指定`g`标识用来表示全局替换，用于替换所有出现的次数。

```bash
sed 's/旧的内容/新的内容/g' filename
```

```bash
[root@instance-6w9riila ~]# head -5 passwd | sed 's/root/!!!!/'
!!!!:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

```bash
[root@instance-6w9riila ~]# head -5 passwd | sed 's/root/!!!!/g'
!!!!:x:0:0:!!!!:/!!!!:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

除了使用`g`来表示全局匹配，我们也可以明确的指定一个数字，用来表示匹配第几次出现的内容。

```bash
[root@instance-6w9riila ~]# head -5 passwd | sed 's/root/!!!!/2'
root:x:0:0:!!!!:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

#### 标志位

上面出现的`g`被称为标志位。`sed`命令可以使用标志位来加强替换命令。

```bash
sed 's/旧的内容/新的内容/标志位' filename
```

`sed`中主要有如下几个标志位：

- **数字**：表示第几次出现才进行替换
- **g**：表示每次出现都进行替换
- **p**：打印模式空间的内容
- **w file**：将模式空间的内容写入到文件中

```bash
[root@instance-6w9riila ~]# head -5 passwd | sed 's/root/!!!!/p'
# 下面输出两行的原因是，`sed`匹配一次后的输出，p模式输出
!!!!:x:0:0:root:/root:/bin/bash
!!!!:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

```bash
[root@instance-6w9riila ~]# ll wfile
ls: 无法访问wfile: 没有那个文件或目录
[root@instance-6w9riila ~]# head -5 passwd | sed 's/root/!!!!/w wfile'
!!!!:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
[root@instance-6w9riila ~]# ll wfile
-rw-r--r-- 1 root root 32 1月  19 23:36 wfile
[root@instance-6w9riila ~]# cat wfile
!!!!:x:0:0:root:/root:/bin/bash
```

#### 寻址

`sed`命令默认会对每一行的内容进行操作，当我们增加了寻址后，只会对匹配的行进行操作。

```bash
sed '/正则表达式/s/旧的内容/新的内容/标志位' filename
```

上面就会只有匹配了前面的正则表达式的`行`才会被`sed`处理

```bash
sed '行号/s/旧的内容/新的内容/标志位' filename
```

也可以明确指定行号，表示对哪一行的内容进行替换，也可以最后一行的`$`符号。

**我们可以使用多个寻址符号，也可以混用行号和正则表达式寻址。**

```bash
[root@instance-6w9riila ~]# head -6 /etc/passwd | sed 's/adm/!/'
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
!:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
[root@instance-6w9riila ~]# head -6 /etc/passwd | sed '1s/adm/!/'
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
```

在第`1-3`行进行替换

```bash
[root@instance-6w9riila ~]# head -6 /etc/passwd | sed '1,3s/adm/!/'
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
```

```bash
[root@instance-6w9riila ~]# head -6 /etc/passwd | sed '/root/s/adm/!/'
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
```

#### 分组

上面的寻址可以匹配多条命令

```bash
/regular/{s/old/new/; s/old/new/}
```

#### sed脚本文件

当我们的选项很长的时候，我们可以将选项保存为文件，然后使用`-f`选项来加载脚本文件。

```bash
sed -f sedscript filename
```

```bash
[root@instance-6w9riila ~]# cat sedscript
s/root/!!!!/
[root@instance-6w9riila ~]# head -5 /etc/passwd | sed -f sedscript
!!!!:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

## sed的其它指令

`sed`最常用的就是`s`即替换命令。除此之外，`sed`还支持其他的一些指令。

### 删除指令

```bash
[寻址]d
```

寻址可以是行号、正则表达式等。`d`这个指令用于删除模式空间内容，改变脚本的控制流，读取新的输入行。也就是说`d`指令后面的其它指令是不会被执行的。

```bash
[root@instance-6w9riila ~]# cat bfile
b
a
aa
aaa
ab
abb
abbb
[root@instance-6w9riila ~]# sed '/ab/d' bfile
b
a
aa
aaa
```

> `d`指令会将匹配到寻址的行从模式空间中删除

```bash
[root@instance-6w9riila ~]# sed '/ab/d;s/a/!/' bfile
b
!
!a
!aa
```

### 追加、插入、更改

追加指令是`a`

```bash
[root@instance-6w9riila ~]# sed '/ab/a hello' bfile
b
a
aa
aaa
ab
hello
abb
hello
abbb
hello
```

`a`指令会在匹配到的行的下面插入指定内容。

插入指令是`i`

```bash
[root@instance-6w9riila ~]# sed '/ab/i hello' bfile
b
a
aa
aaa
hello
ab
hello
abb
hello
abbb
```

`i`指令会在匹配到的行的上面插入指定内容

更改指令是`c`。

```bash
[root@instance-6w9riila ~]# sed '/ab/c hello' bfile
b
a
aa
aaa
hello
hello
hello
```

`c`指令会在将匹配到的行替换成指定内容



### 打印

打印行号我们可以使用`=`指令

```bash
[root@instance-6w9riila ~]# sed '/ab/=' bfile
b
a
aa
aaa
5
ab
6
abb
7
abbb
```

打印命令是`p`

```bash
[root@instance-6w9riila ~]# sed '/ab/p' bfile
b
a
aa
aaa
ab
ab
abb
abb
abbb
abbb
```

`p`指令会将匹配的行重新打印一遍，通常和`-n`选项一起使用

```bash
[root@instance-6w9riila ~]# sed -n '/ab/p' bfile
ab
abb
abbb
```

### 下一行

下一行命令是`n`，这种情况适用于只想处理文件的奇数行或者只想处理文件的偶数行。

### 读文件和写文件

读文件的命令是`r`

```bash
[root@instance-6w9riila ~]# sed '/ab/r afile' bfile
b
a
aa
aaa
ab
bb a a
abb
bb a a
abbb
bb a a
```

`r`指令可以将指定文件中的内容插入到匹配到的行的下面

写文件的命令是`w`

```bash
[root@instance-6w9riila ~]# sed '/ab/w dfile' bfile
b
a
aa
aaa
ab
abb
abbb
[root@instance-6w9riila ~]# cat dfile
ab
abb
abbb
```

`w`指令可以将匹配到的行的内容写入到指定文件中

### 退出命令

退出命令是`q`

```bash
[root@instance-6w9riila ~]# sed '/ab/q' bfile
b
a
aa
aaa
ab
```

遇到一个匹配的行就直接退出了

## sed多行模式空间

`sed`的多行模式处理命令是`N`, `D`, `P`。

多行模式一般用于处理配置文件，配置文件一般为单行出现，也有使用`XML`或`JSON`格式的配置文件，为多行出现。

- `N`将下一行加入到模式空间中
- `D`删除模式空间中的第一个字符到第一个换行符
- `P`打印模式空间中的第一个字符到第一个换行符

```bash
[root@instance-6w9riila ~]# cat a.txt
hel
lo
[root@instance-6w9riila ~]# sed 'N' a.txt
hel
lo
[root@instance-6w9riila ~]# sed 'N;s/hello/!!!/' a.txt
hel
lo
[root@instance-6w9riila ~]# sed 'N;s/hel\nlo/!!!/' a.txt
!!!
```

```bash
[root@instance-6w9riila ~]# cat b.txt
hell
o bash hel
lo bash
[root@instance-6w9riila ~]# sed 'N;s/\n//;s/hello bash/hello sed\n/;P;D' b.txt
hello sed
 hello sed
```

## 保持空间

`保持空间`也是多行的一种操作方式，将内容暂存在保持空间，便于做多行处理。

文本文件 -> 模式空间 -> 保持空间

- `h`和`H`将模式空间内容存放到保持空间中
    - `h`使用覆盖模式放到保存空间中
    - `H`使用追加模式将内容放到保存空间中
- `g`和`G`将保持空间内容取出到模式空间
    - `g`使用覆盖模式放到模式空间中
    - `G`使用追加模式将内容放到模式空间中
- `x`将模式空间和保持空间的内容进行对调

```bash
[root@instance-6w9riila ~]# cat -n /etc/passwd | head -6 | sed -n '1h;1!G;$!x;$p'
     6	sync:x:5:0:sync:/sbin:/bin/sync
     5	lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
     4	adm:x:3:4:adm:/var/adm:/sbin/nologin
     3	daemon:x:2:2:daemon:/sbin:/sbin/nologin
     2	bin:x:1:1:bin:/bin:/sbin/nologin
     1	root:x:0:0:root:/root:/bin/bash
```