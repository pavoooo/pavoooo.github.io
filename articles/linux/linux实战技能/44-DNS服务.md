# DNS服务

## DNS服务介绍

`DNS`被称为域名系统。`DNS`服务也被称为域名解析服务。域名解析通常有两种方式：递归查询和迭代查询。

## BIND软件安装

我们可以直接在`/etc/hosts`文件中配置域名映射。

```bash
[root@instance-6w9riila ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
172.16.0.4 instance-6w9riila instance-6w9riila.novalocal
```

安装`BIND`

```bash
yum install bind bind-utils
```

修改配置文件

```bash
vim /etc/named.conf
```

```bash
 listen-on port 53 { 127.0.0.1; }; ->  listen-on port 53 { anys; };
 allow-query     { localhost; }; -> allow-query     { any; };
```

启动`BIND`服务

```bash
systemctl start named.service
```

## BIND的配置文件

## 使用dig和nslookup命令测试DNS

## 从根域名服务器的配置