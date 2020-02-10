# SSH

## SSH服务介绍

`SSH`服务起源于`telnet`服务。`telnet`服务就是远程命令行服务。`telnet`服务使用的是明文传输。

## SSH服务配置文件

`SSH`服务的配置文件在`/etc/ssh/sshd_config`文件中，这个文件是服务端的配置文件。`/etc/ssh/ssh_config`是客户端的配置文件。

在`/etc/ssh/sshd_config`配置文件中有几个比较重跑的配置项

```bash
# ssh服务的默认端口是22
Port 22
# 是否允许root用户通过ssh服务登录服务器
PermitRootLogin yes
# 秘钥的公钥的放置的位置
AuthorizedKeysFile .ssh/authorized_keys
```

## SSH命令

```bash
ssh ip地址
ssh 用户@ip地址
ssh -p 端口号(默认22) 用户@ip地址
```

## SSH公钥认证

### 密钥认证原理

### 常用命令

```bash
# 产生密钥
ssh-keygen -t rsa
# 将密钥拷贝到远程服务器上
ssh-copy-id
```

```bash
➜ /Users/zhaosai >ssh-copy-id -i ~/.ssh/id_rsa.pub root@106.13.108.56
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/zhaosai/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
root@106.13.108.56's password:
.bashrc
/etc/bashrc

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'root@106.13.108.56'"
and check to make sure that only the key(s) you wanted were added.
```

## scp和sftp远程拷贝文件

```bash
# 将本地文件拷贝到远程
scp 客户端本地文件 服务器用户名@服务器ip地址:服务器目录

# 将远程文件拷贝到本地
scp 服务器用户名@服务器ip地址:远程文件地址 本地存放目录地址
```