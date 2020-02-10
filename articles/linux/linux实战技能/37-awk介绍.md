# awk介绍

`awk`相对于`sed`来说更像是脚本语言，它主要用于更加规范的文本处理，用于统计数量并输出指定字段。使用`sed`将不规范的文本，处理为“比较规范”的文本。

`awk`脚本的执行流程控制如下

- 输入数据前例程`BEGIN{}`。读入文件之前需要进行的操作
- 主输入循环`{}`。对每一行内容进行具体的操作
- 所有文件读取完成例程`END{}`

## awk的字段引用和分离

- 每一行都被称作awk的一条记录
- 使用空格、制表符分隔开的单词称作字段
- 可以使用自己指定的分隔符分隔字段

### 字段的引用

`awk`中使用`$1 $2 ... $n`表示每一个字段

```bash
awk '{print $1,$2,$3}' filename
```

`awk`可以使用`-F`选项改变字段分隔符，分隔符是可以使用正则表达式的。

```bash
awk -F ',' '{print $1,$2,$3}' filename
```

可以使用`$0`来显示整行的内容

```bash
[root@instance-6w9riila ~]# awk -F "'" '/^menu/{print $2}' /boot/grub2/grub.cfg
CentOS Linux 7 (Core), with Linux 3.10.0-1062.4.1.el7.x86_64
CentOS Linux 7 (Core), with Linux 3.10.0-229.el7.x86_64
CentOS Linux 7 (Core), with Linux 0-rescue-08461fbb81ed47ada250940822d42dba
```

```bash
[root@instance-6w9riila ~]# awk -F "'" 'BEGIN{ x=0 } /^menu/{print ++x,$2}' /boot/grub2/grub.cfg
1 CentOS Linux 7 (Core), with Linux 3.10.0-1062.4.1.el7.x86_64
2 CentOS Linux 7 (Core), with Linux 3.10.0-229.el7.x86_64
3 CentOS Linux 7 (Core), with Linux 0-rescue-08461fbb81ed47ada250940822d42dba
```

## awk表达式

### 赋值操作符

`=`是最常用的赋值操作符

```bash
var1="name"
var2="hello"
var3=$1
```

还有其他赋值操作符：`++ -- += -= *= /= %= ^=`

### 算数操作符

最常用的就是`+ - * / %`

### 系统变量

`awk`可以也有自己的系统变量，主要有如下几个

- `FS`和`OFS`字段分隔符，`FS`表示输入的字段分隔符，`OFS`表示输出的字段分隔符。

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk -F ':' '{print $1}'
root
bin
daemon
adm
lp
```

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk 'BEGIN{FS=":"}{print $1}'
root
bin
daemon
adm
lp
```
默认输出分隔符是`空格`

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk 'BEGIN{FS=":"}{print $1, $2}'
root x
bin x
daemon x
adm x
lp x
```

将输出分隔符更改为`-`

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk 'BEGIN{FS=":";OFS="-"}{print $1, $2}'
root-x
bin-x
daemon-x
adm-x
lp-x
```

- `RS`用于记录分隔符

`awk`默认以`\n`作为分隔符确认每一行的内容。我们可以使用`RS`来改变。下面的例子就是将记录分隔符更改为`:`

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk 'BEGIN{RS=":"}{print $1, $2}'
root
x
0
0
root
/root
/bin/bash bin
x
1
1
bin
/bin
/sbin/nologin daemon
x
2
2
daemon
/sbin
/sbin/nologin adm
x
3
4
adm
/var/adm
/sbin/nologin lp
x
4
7
lp
/var/spool/lpd
/sbin/nologin
```

- `NR`和`FNR`表示行号

当文件的内容发生变化的时候`NR`不会进行重排，`FNR`会进行重排。

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk '{print NR}'
1
2
3
4
5
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk '{print NR,$0}'
1 root:x:0:0:root:/root:/bin/bash
2 bin:x:1:1:bin:/bin:/sbin/nologin
3 daemon:x:2:2:daemon:/sbin:/sbin/nologin
4 adm:x:3:4:adm:/var/adm:/sbin/nologin
5 lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk '{print FNR,$0}'
1 root:x:0:0:root:/root:/bin/bash
2 bin:x:1:1:bin:/bin:/sbin/nologin
3 daemon:x:2:2:daemon:/sbin:/sbin/nologin
4 adm:x:3:4:adm:/var/adm:/sbin/nologin
5 lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

```bash
[root@instance-6w9riila ~]# awk '{print FNR,$0}' /etc/hosts /etc/hosts
1 127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
2 ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
3 172.16.0.4 instance-6w9riila instance-6w9riila.novalocal
1 127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
2 ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
3 172.16.0.4 instance-6w9riila instance-6w9riila.novalocal
```

```bash
[root@instance-6w9riila ~]# awk '{print NR,$0}' /etc/hosts /etc/hosts
1 127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
2 ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
3 172.16.0.4 instance-6w9riila instance-6w9riila.novalocal
4 127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
5 ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
6 172.16.0.4 instance-6w9riila instance-6w9riila.novalocal
```

- `NF`表示字段数量，最后一个字段的内容可以使用`$NF`获取

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk '{print NF,$0}'
1 root:x:0:0:root:/root:/bin/bash
1 bin:x:1:1:bin:/bin:/sbin/nologin
1 daemon:x:2:2:daemon:/sbin:/sbin/nologin
1 adm:x:3:4:adm:/var/adm:/sbin/nologin
1 lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk 'BEGIN{FS=":"}{print NF}'
7
7
7
7
7
```

```bash
[root@instance-6w9riila ~]# head -5 /etc/passwd | awk 'BEGIN{FS=":"}{print NF, $NF}'
7 /bin/bash
7 /sbin/nologin
7 /sbin/nologin
7 /sbin/nologin
7 /sbin/nologin
```

### 关系操作符

`> < <= >= == != ~ !~`

### 布尔操作符

`&& || !`

