# find

`find`命令主要是用来进行文件查找的。

```bash
find 路径 查找条件 [ 补充条件 ]
```

精确匹配某个路径

```bash
[root@instance-6w9riila jikeshijian-linux]# cd /etc/
[root@instance-6w9riila etc]# find passwd
passwd
```

在某个目录下查找文件名称是`passwd`的文件

```bash
find /etc -name passwd
```

```bash
[root@instance-6w9riila etc]# find /etc -name passwd
/etc/passwd
/etc/pam.d/passwd
```

在某个目录中查找文件名称包含`pass`的文件，这里使用`*`通配符。

```bash
[root@instance-6w9riila etc]# find /etc -name 'pass*'
/etc/selinux/targeted/active/modules/100/passenger
/etc/passwd
/etc/pam.d/passwd
/etc/pam.d/password-auth-ac
/etc/pam.d/password-auth
/etc/passwd-
/etc/openldap/certs/password
```

也可以在`find`中使用正则表达式，正则表达式主要使用`-regex`来指定。

查找以`wd`结尾的文件

```bash
[root@instance-6w9riila etc]# find /etc -regex .*wd
/etc/passwd
/etc/pam.d/passwd
/etc/security/opasswd
```

```bash
[root@instance-6w9riila etc]# find /etc -regex .etc.*wd
/etc/passwd
/etc/pam.d/passwd
/etc/security/opasswd
```

也可以根据`文件类型`来查找文件，文件类型通过`-type`选项来指定

```bash
[root@instance-6w9riila etc]# find /etc -type f -regex .*wd
/etc/passwd
/etc/pam.d/passwd
/etc/security/opasswd
```

也可以根据`时间`来查找文件，这个时间主要有三种

- `-atime`：文件的访问时间
- `-ctime`：文件的创建时间(inode节点发生变化)
- `mtime`：文件内容发生变化的时间

可以通过`stat`命令查看一个文件的上述三个属性

```bash
[root@instance-6w9riila jikeshijian-linux]# stat 12.sh
  文件："12.sh"
  大小：195       	块：8          IO 块：4096   普通文件
设备：fd01h/64769d	Inode：917542      硬链接：1
权限：(0744/-rwxr--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2020-01-18 14:14:31.836288332 +0800
最近更改：2020-01-18 14:14:28.604008793 +0800
最近改动：2020-01-18 14:14:28.607009053 +0800
创建时间：-
```

找出`/etc`下8小时内访问过的
```bash
[root@instance-6w9riila etc]# find /etc/ -atime 8
/etc/redhat-release
/etc/centos-release
```

我们可以结合`find`命令对文件进行批量操作。

```bash
find *.txt -exec rm -v {} \;
```

