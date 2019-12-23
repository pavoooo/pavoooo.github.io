
# su和sudo

## 用户切换

`su`用来切换用户

```bash
su - username # 使用login shell方式切换用户
```

`sudo`以其它用户的身份执行命令

```bash
# 普通用户使用下列命令可以进入root用户家目录
sudo cd /root
```

## su

`su`命令可以用来切换用户

```bash
╭─root@localhost.localdomain ~
╰─➤  su - u1
[u1@localhost ~]$ id
uid=505(u1) gid=507(group1) 组=507(group1) 环境=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
```

> `-`表示切换用户的时候把自己的运行环境一起变更为所要切换的用户

如果没有使用`-`，表示不完全切换

```bash
[u1@localhost ~]$ cd /root
-bash: cd: /root: 权限不够
[u1@localhost ~]$ exit
logout
╭─root@localhost.localdomain ~
╰─➤  su u1                                                                                                                                                                  
[u1@localhost root]$ id
uid=505(u1) gid=507(group1) 组=507(group1) 环境=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
[u1@localhost root]$ pwd
/root
```

一般在切换用户的时候都使用`-`。

## sudo

比如，普通用户执行关机命令，默认情况下是没有权限执行的。

```bash
╭─root@localhost.localdomain ~
╰─➤  su - u1
[u1@localhost ~]$ shutdown -h 30
shutdown: Need to be root

[u1@localhost ~]$ sudo shutdown -h 30
[sudo] password for u1:
u1 不在 sudoers 文件中。此事将被报告。
```

> 普通用户如果想使用`sudo`命令，则普通用户必须在`sudoers`文件中。如果不在，可以使用`visudo`命令打开相关配置文件，将普通用户添加进去

```bash
visudo
# 然后在最下面添加如下命令，表示u1可以通过sudo执行如下命令。
u1 ALL=/sbin/shutdown
```