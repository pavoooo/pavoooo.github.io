# FTP

## FTP协议介绍

`FTP`协议就是文件传输协议。它主要分为主动模式和被动模式。

## vsftpd服务器安装

```bash
yum install vsftpd ftp
# 启动sftpd服务
systemctl start vsftpd.service
# 开机启动sftpd服务
systemctl enable vsftpd.service
```

连接

```bash
ftp 服务器ip
```

比如

```bash
[root@instance-6w9riila ~]# ftp localhost
Trying ::1...
Connected to localhost (::1).
220 (vsFTPd 3.0.2)
Name (localhost:root):
530 Permission denied.
Login failed.
ftp>
```

## vsftpd服务配置文件

`vsftpd`服务的配置文件主要如下：

- `/etc/vsftpd/vsftpd.conf`

这个文件是`vsftpd`服务的主配置文件

- `/etc/vsftpd/ftpusers`

这个文件中记录了哪些用户不允许登录我们的ftp服务

- `/etc/vsftpd/user_list`

这个文件记录了用户的黑白名单，可以根据主配置文件将其设置为用户黑名单或者用户白名单。

## FTP命令

## 使用虚拟用户进行验证