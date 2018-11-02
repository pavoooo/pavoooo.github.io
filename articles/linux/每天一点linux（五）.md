# 每天一点linux（五）

`linux`是一个多用户的操作系统，在了解怎么对用户进行增删改查的操作之前，有必要了解`linux`中的两个文件：
`/etc/passwd`和`/etc/shadow`。这两个文件是`linux`中最重要的两个文件之一，如果没有这两个文件，我们是无法正常登录`linux`系统的。

## /etc/passwd
首先来看一下`/etc/passwd`文件长什么样

```bash
head -n /etc/passwd
```

![find](/blog/linux-imgs/passwd1.png)

从上述输出可以看出`/etc/passwd`的每一行文件具有相同的格式：由`:`分隔的7个字段组成。下面，我们就对这7个字段做一个简单的介绍。

```bash
root:x:0:0:root:/root:/bin/zsh
```

> 以上面这行输出来作说明

- 第一个字段是**用户名**。它是代表用户名称的字符串。这一行数据表示的用户就是`root`。
- 第二个字段是**密码**。细心的人可能会发现这个文件中的所有记录的第二列都是`x`，这是因为早期的`unix`系统的密码确实放在这个字段中，后来因为安全的原因，用户的密码被移至我们接下来即将介绍的`/etc/shadow`文件中。这里就用一个`x`来替代一下。这个字段在目前是没有任何含义的。

- 第三个字段是一个数值，表示用户的**uid**。系统是通过这个字段来标识用户的身份的。上述记录是超级用户的记录，可以看出超级用户的`uid`是0。这在`linux`中也是规定好的，如果我们把其它用户的这一列改为0，那么系统也会把这个用户视作超级管理员。

`linux`中用户的`uid`取值是有一定规则的。一般`0`表示超级管理员，`1-499`是系统预留的，作为系统管理员账号，普通用户的`uid`是从`500`开始的。取值范围在`0-65535`

- 第四个字段也是一个数值，表示用户的**gid**，也就是用户的组id。主要是用来标识用户所属组的，这个字段和`/etc/group`中的信息相对应。

![find](/blog/linux-imgs/passwd2.png)

- 第五个字段没有太大的意义，我们可以把它看作是对当前用户的备注信息

- 第六个字段表示用户的家目录，也即用户登录系统后默认所在的目录。可以看出`root`用户的家目录是`/root`。如果我们想改变一个用户的家目录，可以直接在此处修改

- 第七个字段是用户默认使用的`shell`，有些用户的`shell`是`/sbin/nologin`，它表示这个用户是不能通过`ssh`进行远程登录这个系统的。如果我们想创建一个不允许登录的用户，可以把这个字段设置为`/sbin/nologin`。

上面是对`/etc/passwd`的一个简单介绍，下面主要是对`/etc/shadow`文件的介绍

## /etc/shadow

先来看看这个文件长什么样子

```bash
head -n 5 /etc/shadow
```

![find](/blog/linux-imgs/passwd3.png)

这个文件的每一行同样是由`:`分隔的字段，由`:`分为九个字段

- 第一个字段是**用户名**，和`/etc/passwd`文件中的第一个字段一一对应
- 第二个字段是一串加密之后的字符串，这个字符串是用户真正的密码

后面的几个字段我们简单的了解一下即可

- 第三个字段是用户上次修改密码的时间
- 第四个字段指定用户过多少天才可以修改密码，0表示不受限制
- 第五个字段是密码在多少天后过期
- 第六个字段是过期前多少天给予用户警告信息
- 第七个字段表示失效期限
- 第八个字段表示账号的生命周期
- 第九个字段作为保留字段，没有实际的意义

## groupadd
在`/etc/group`文件中包含了在这个`linux`系统中包含的所有组。

![](/blog/linux-imgs/groupadd1.png)

有时我们需要手动的创建用户组来满足我们的需求，`groupadd`命令允许我们手动的创建一个组。基本格式如下：

```bash
groupadd [-g gid] 组名称
```

命令很简单，我们要知道的是我们自己手动创建的组，组id是从500开始依次递增的，当然，我们也可以通过`-g`选项指定所创建组的id。

```bash
groupadd test
```

![](/blog/linux-imgs/groupadd2.png)

通过`-g`选项可以指定所创建组的`id`

```bash
groupadd -g 506 test2
```

![](/blog/linux-imgs/groupadd3.png)

## groupdel

有创建就有删除，`groupdel`就是用来删除组的。用法也很简单

```bash
groupdel 组名
```

把刚才创建的`test2`删除了

![](/blog/linux-imgs/groupadd4.png)

`groupdel`在删除组的时候有一个限制，就是只能删除不包含任何用户的组。如果一个组中包含了用户，那么是不能删除的。比如

```bash
useradd -g 504 test1 # 在组test下添加用户test1
groupdel test # 删除组
```

这种情况下，我们必须先把用户`test1`删除了才能删除组`test`

```bash
userdel -r test1 # 删除test1用户
groupdel test # 删除组
```

![](/blog/linux-imgs/groupadd4.png)

成功删除

## useradd

上面介绍了创建和删除组的命令。`useradd`这个命令主要是用来创建用户的。这个命令在使用的时候选项比较多，具体如下：

```bash
useradd [-u uid] [-g gid] [-d home] [-M] [-s]
```

- **-u**：表示创建用户自定义用户id
- **-g**：声明所创建的用户的组的id
- **-d**：自定义用户的家目录
- **-M**：表示不建立家目录
- **-s**：表示用户自定义shell

除了这一点，我们还有一点需要注意的是：如果我们创建的用户没有指定组名，那么就会直接创建一个和用户同名的组。并且，如果-g选项后面跟一个不存在的gid，那就会报错并提示该组不存在。

```bash
useradd new # 创建一个用户名是 new 的用户
```

![](/blog/linux-imgs/useradd1.png)

创建用户的时候声明组id，并不创建家目录

```bash
useradd -g new -M new2
```

![](/blog/linux-imgs/useradd2.png)

从输出结果中可以看到，在使用`-M`选项创建用户的时候，虽然不会创建用户的家目录，但是在`/etc/passwd`中是依然存在这个字段的。

## userdel

删除用户的命令是`userdel`，基本格式如下：

```bash
userdel [-r] username
```

其中`-r`选项表示删除用户的时候是否删除用户的家目录

![](/blog/linux-imgs/userdel1.png)

## passwd
上面介绍了添加用户组和用户的方式。有一个问题这里需要陈述一下，一旦我们创建了一个普通用户，如果没有设置为这个用户设置密码的话，我们是无法通过`ssh`登录的。比如：

```bash
useradd new
# 切换到其它终端
ssh new@yourip
```

![](/blog/linux-imgs/pwd1.png)

为了能够正常的使用这个用户来登录系统，我们需要使用`passwd`为这个用户设置密码

```bash
passwd new
```

![](/blog/linux-imgs/pwd2.png)

设置完密码之后就可以登录这个系统了

![](/blog/linux-imgs/pwd3.png)

这个时候我们就以一个普通用户的身份登录到了`linux`系统。既然是普通用户，那么有一些超级用户所能做的行为，普通用户是无法做到的。比如查看一下`/etc/shadow`的内容

![](/blog/linux-imgs/su1.png)

对于这种情况，下面要介绍的切换用户身份的指令是十分有用的。

## su
`su`也是用来切换用户身份的。基本格式如下：

```bash
su [-] username
```
普通用户使用`su`命令的时候，如果不加`username`就切换到`root`用户。`root`用户也可以使用这个方法切换到普通用户。`-`选项表示切换用户的时候会初始化用户的各种环境变量。

![](/blog/linux-imgs/su2.png)

![](/blog/linux-imgs/su3.png)

## sudo

`su`可以切换用户的身份，而且是任何一个普通用户在知道`root`密码的前提下都可以切换到`root`身份。这是很不安全的，所以`linux`提供了`sudo`命令让普通用户可以执行`root`用户才能执行的命令。

```bash
sudo cat /etc/shadow
```

![](/blog/linux-imgs/sudo1.png)

默认状态下，普通用户即使使用`sudo`命令也是越过权限执行命令的。这是因为普通用户如果想要使用`sudo`命令，是需要`root`用户事先设定的。我们可以在`root`用户下使用`visudo`命令编辑相关的配置文件`/etc/sudoers`。

```bash
visudo
```

![](/blog/linux-imgs/sudo2.png)

`root`用户默认是支持`sudo`命令的，这是因为`/etc/sudoers`文件中有一行 

```bash
## Allow root to run any commands anywhere
root    ALL=(ALL)   ALL
```

如果我们想让`new`用户同样拥有`sudo`权限，只需要在这个文件中添加一行 

```bash
new    ALL=(ALL)   ALL
```

然后保存，退出，再次执行上述命令

![](/blog/linux-imgs/sudo3.png)

如果我们为每个用户都这样操作的话，还是有一点麻烦的。`visudo`也提供了对组设置`sudo`权限，这样，只要是这个组的用户是都能够使用`sudo`命令的。在`visudo`打开的文件中找到

```bash
## Same thing without a password
# %wheel    ALL=(ALL)   NOPASSWD: ALL
```

将`# %wheel`前的`#`去掉后，那么所有被添加到`wheel`组中的用户都能够使用`sudo`命令的。这里，我们新建一个用户组来测试一下

![](/blog/linux-imgs/sudo4.png)
