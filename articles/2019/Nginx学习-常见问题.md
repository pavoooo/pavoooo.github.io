# Nginx学习-常见问题

## 多个虚拟主机优先级


**配置一：**

```nginx
server {
  listen 80;
  server_name testserver1 test.saisai.com;
  location ... {

  }
}
```

**配置二：**

```nginx
server {
  listen 80;
  server_name testserver2 test.saisai.com;
  location ... {

  }
}
```

上述两份`nginx`的配置中都包含了`test.saisai.com`。这两份的配置其实是会产生冲突，即使有冲突的存在，也不会影响`nginx`的正常启动。这里就会出现一个问题 - **在多个虚拟主机中有同样的server_name，nginx是怎么处理的？**

下面是三份`nginx`的配置文件，这里我直接对`server_name`进行相同ip的配置。

- **test_server1.conf**

```nginx
server {
	listen 80;
	server_name testserver1 192.168.144.129;

	location / {
		root /opt/app/code1;
		index index.html index.htm;
	}
}
```

- **test_server2.conf**

```nginx
server {
	listen 80;
	server_name testserver2 192.168.144.129;

	location / {
		root /opt/app/code2;
		index index.html index.htm;
	}
}
```

- **test_server3.conf**

```nginx
server {
	listen 80;
	server_name testserver3 192.168.144.129;

	location / {
		root /opt/app/code3;
		index index.html index.htm;
	}
}
```

下面是配置文件不同之处

```bash
diff test_server1.conf test_server2.conf

# 3c3
# < 	server_name testserver1 192.168.144.129;
# ---
# > 	server_name testserver2 192.168.144.129;
# 6c6
# < 		root /opt/app/code1;
# ---
# > 		root /opt/app/code2;
```

除了`server_name`的配置不同，`location.root`也是不一样的，主要是为了方便查看请求返回的是什么资源。

然后检测一下我们的`nginx`的配置是否正确

```bash
nginx -tc /etc/nginx/nginx.conf
```

会看到如下输出

```txt
nginx: [warn] conflicting server name "192.168.144.129" on 0.0.0.0:80, ignored
nginx: [warn] conflicting server name "192.168.144.129" on 0.0.0.0:80, ignored
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

有warning输出，表示服务名称有冲突，但是其它语法OK。warning是不会影响`nginx`运行的，下面执行`reload`。

```bash
nginx -s reload
```

然后在浏览器中输入`http://192.168.144.129`访问页面，会发现，**始终返回的是`server1`配置中的页面。**

![](/blog/server1.png)

也就是`test_server1.conf`配置生效了。下面呢，把`test_server1.conf`重命名为`test_server4.conf`。

```bash
mv test_server1.conf test_server4.conf
```

重启`nginx`，然后访问`http://192.168.144.129`。会返现访问到`server2`中的页面

![](/blog/server2.png)

在服务器上执行如下命令

```bash
ls test_server*
```

![](/blog/ls-test_server.png)

所以，这里可以得出一个初步的结论：**对于相同server_name多个虚拟主机的访问，nginx读取文件名的顺序会按照文件在系统中优先读取的顺序。**

## location匹配优先级

`location`的配置语法如下

```nginx
location 匹配符 路径 {

}
```

匹配符主要有如下几种：

- **=**：进行普通字符的精确匹配，也就是完全匹配
- **^~**：表示普通字符匹配，使用前缀匹配
- **~/~\***：执行正则匹配

> ~ 区分大小写，~*不区分大小写


下面是关于`location`的一段配置

```nginx
server {
	listen 80;
	server_name 192.168.144.129;

	root /opt/app;

	# 精确匹配
	location = /code1/ {
		rewrite ^(.*)$ /code1/index.html break;
	}

	# 正则匹配
	location ~ /code.* {
		rewrite ^(.*)$ /code3/index.html break;
	}

	# 普通字符匹配，使用前缀匹配
	location ^~ /code {
		rewrite ^(.*)$ /code2/index.html break;
	}
}
```

访问`http://192.168.144.129/code1/`会发现返回的是`server1`的内容。

然后把下面一段注释

```nginx
location = /code1/ {
  rewrite ^(.*)$ /code1/index.html break;
}
```

重启，访问`http://192.168.144.129/code1/`会返回`server2`的内容。同样，把下面的内容注释

```nginx
# 普通字符匹配，使用前缀匹配
location ^~ /code {
  rewrite ^(.*)$ /code2/index.html break;
}
```

重启，访问`http://192.168.144.129/code1/`会返回`server3`的内容。

从上面的访问情况就能够大致推出`nginx`的location的匹配规则了：`精确匹配 > 前缀匹配 > 正则匹配`。

> 前缀匹配也会有一个最长匹配原则

## try_files


```nginx
location / {
  try_files $uri $uri/ /index.php
}
```

首先检查用户请求的uri的内容在本地是否存在，如果不存在，则尝试在请求路径结尾加一个`/`，类似于重定向处理，如果还不存在则交给`index.php`来处理。

比如下面的`nginx`规则

```nginx
server {
	listen 80;
	server_name 192.168.144.129;

	location / {
		root /opt/app/code/cache;
		try_files $uri @node_page;
	}

	location @node_page {
		proxy_pass http://127.0.0.1:9090;
	}
}
```

上面的配置规则会首先访问用户访问的uri对应的文件，如果不存在交给`http://127.0.0.1:9090`服务进行处理。

当访问`http://192.168.144.129/saisai.html`会返回`/opt/app/code/cache/saisai.html`文件的内容。访问其他路径的时候则返回`http://127.0.0.1:9090`服务处理后的结果。

上述配置中涉及到了`location`的`@name`的用法。

`@`是用来命名location的，主要用于`nginx`内部的重定向，不能处理外部过来的请求。其基本用法如下：

```nginx
location / {
  try_files $uri ... @someName;
}

location @someName {
  # 具体规则
}
```

首先尝试访问uri对应的文件，找不到对应的文件就重定向到我们自定义的命名location。

> 命名location中不能再嵌套其它的命名location

## alias 和 root

`nginx`中的`root`指令指定了我们程序的根目录是在哪一个位置。

比如我们有如下的配置

```nginx
location /request_path/image/ {
  root /local_path/image;
}
```

当客户端访问的资源路径是`http://192.168.144.129/request_path/image/cat.png`的时候，根据`root`规则的设置，`nginx`会访问本机的资源就是`/local_path/image/request_path/image/cat.png`；也就是`root+uri`。

当我们使用`alias`来配置路径的时候

```nginx
location /request_path/image/ {
  alias /local_path/image/;
}
```

同样访问`http://192.168.144.129/request_path/image/cat.png`的时候，根据`alias`的配置规则，nginx实际访问的资源就是`/local_path/image/cat.png`。

综上，**如果通过`root`指令来配置文件，真实的路径是`root`指定的值加上`location`指定的值。通过`alias`来配置文件，`alias`指定的路径是`location`的别名，不管`location`的值怎么写，资源的真实路径都是`alias`指定的路径。**

**注意：**

- `alias` 只能作用在`location`中，而`root`可以存在`server`、`http`和`location`中。
- `alias` 后面必须要用 “/” 结束，否则会找不到文件，而 `root` 则对 ”/” 可有可无。


## X-Real-ip

这种场景主要出现在我们的`nginx`并不是作为用户的直接服务，而是作为代理而出现的。这种情况就可能会出现用户的真实地址无法获取到。这种情况的请求链路可能如下：

```txt
用户(IP1)  --->
代理1(IP2) --->
代理2(IP3) --->
...
后端服务(IPn)
```

在这种情况下，我们应该从一级代理出发（这里就是代理1），约定一个请求头，比如`x_real_ip`来存储用户真实的`ip`地址。然后一级一级的透传到后端服务，后端服务就能通过`x_real_ip`头部获取到用户真实的ip信息。

## Nginx: 413 Request Entity Too Large

Nginx会对用户上传的文件的大小进行限制，这个限制通过`client_max_body_size`来设置，可以通过这个指令来重设限制的大小。

```nginx
Syntax:	client_max_body_size size;
Default:	
client_max_body_size 1m;
Context:	http, server, location
```

其它错误
- Nginx: 502 bad gateway：后端服务无响应。
- Nginx：504 Gateway Time-out：后端服务执行超时

## ab压测工具


**1. 安装**

```bash
yum install httpd-tools
```

`httpd-tools`包中包含了`ab`测试工具。

**2. 基本用法**

```bash
ab -n 2000 -c 2 http://127.0.0.1

# -n：总的请求数
# -c：并发数目
# -k：是否开启长连接
```
  
比如，对我们的服务器使用下面的命令进行压测

```bash
ab -n 2000 -c 2 http://127.0.0.1/saisai.html
```

可能会得到如下输出，下面这些输出是对本次压测结果的具体描述

```bash
# 压测对应的服务器信息
Server Software:        nginx/1.14.2
Server Hostname:        127.0.0.1
Server Port:            80

# 压测的文件的路径
Document Path:          /saisai.html

# 文件的大小
Document Length:        7 bytes

# 并发级别，就是-c参数指定的值
Concurrency Level:      2

# 请求的总时间
Time taken for tests:   0.188 seconds

# 总的请求个数
Complete requests:      2000

# 请求失败的个数
Failed requests:        0

Write errors:           0

# 总共传输的数据量，指的是ab从被测服务器接收到的总数据量，包括index.html的文本内容和请求头信息。
Total transferred:      472236 bytes

# 从服务器接收到的index.html文件的总大小，等于Document Length＊Complete requests＝7 bytes＊2000＝14007 bytes
HTML transferred:       14007 bytes

# rps 每秒的请求数 -- 总的请求数/请求总的时间
Requests per second:    10635.30 [#/sec] (mean)

# 对于客户端而言，每个请求所需要的时间
Time per request:       0.188 [ms] (mean)

# 服务端处理每个请求的平均时间 不包含客户端和服务端网络传输的时间
Time per request:       0.094 [ms] (mean, across all concurrent requests)

# 传输的速率。可以用来判断网络是否有问题
Transfer rate:          2452.33 [Kbytes/sec] received
```


## 系统与Nginx的性能优化

**1. 文件句柄**

`linux/unix`一切皆是文件，文件句柄就是一个索引。文件句柄也会随着请求量的增多，也会增加。系统对文件句柄是有限制的，不能让一个进程无限制的增加文件句柄。我们可以自己设置文件句柄的多少。

**2. 设置方式**

- **系统全局性修改**

我们可以编辑`/etc/security/limits.conf`文件来修改文件句柄的多少。

```bash
vim /etc/security/limits.conf

# 可以在文件的末尾添加如下格式的配置文件

# 针对所有用户(全局性配置)
* soft nofile 65535
* hard nofile 65535

# 用户 soft/hard nofile 句柄数(一般10000左右)
# soft：只发提醒，超过限制的时候发送提醒，但不会限制
# hard：超过限制的时候，系统会采取机制进行限制
```

- **用户局部性修改**

```bash
vim 

# 文件末尾添加
# 针对root用户的限制
root soft nofile 65535
root hard nofile 65535
```

- **进程局部性修改**

我们也可以根据进程进行单独的设置，比如针对`Nginx`的进程进行单独的句柄设置。

`nginx`文件句柄的设置语法

```nginx
Syntax:	worker_rlimit_nofile number;
Default:	—
Context:	main
```

```bash
vim /etc/nginx/nginx.conf

# 可以在配置文件中添加如下指令
worker_rlimit_nofile 35535;
```