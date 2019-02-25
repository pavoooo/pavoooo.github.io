# Nginx学习-安装_基本模块_请求限制_访问限制

`Nginx`是目前一款主流的`web`服务器。`Nginx`相对于其它`web`服务器，比如，`tomcat`，`apache`等具有如下优点。

## 优势

- 高并发，高性能

很多web服务器随着并发连接的上升，`rps`会急剧下降。`nginx`高并发和高性能是同时具有的。

- 可扩展性好

可扩展性的主要体现在`Nginx`的模块化设计，第三方模块和生态圈是十分丰富的。

- 高可靠性

高可靠性主要体现在`Nginx`可以在服务器上持续不间断的运行数年。

- 热部署

体现在在不重启`Nginx`的情况下升级`Nginx`。

## 用途

在实际的应用场景中，`Nginx`一般有如下几种用途：

- 静态资源服务
  - 通过本地文件系统提供服务

- 反向代理服务
  - Nginx强大的性能
  - 缓存
  - 负载均衡

- API 服务
  - OpenResty

## 安装

`Nginx`的安装有源码编译和工具安装两种方式。因为我的服务器是`centos`，所以这里着重介绍如何通过`yum`来安装`Nginx`。

`yum`安装`Nginx`有如下步骤：

1. 在[nginx.org](http://nginx.org/en/linux_packages.html)中根据自己的操作系统选择对应的安装方式。对于`centos`系统而言，我们可以选择通过`yum`的安装方式。所以，我们需要在系统中添加`Nginx`的`yum`源。

```bash
# 安装yum-utils
yum install yum-utils
```
然后在文件`/etc/yum.repos.d/nginx.repo`中添加如下内容

```txt
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
```

这里我们安装的是`Nginx`的`stable`版本。当然你也可以选择安装`mainline`版本，安装方式可参考上述链接中提供的方法自行安装。为了确定我们的`yum`源安装成功，可以执行如下命令：

```bash
yum list | grep nginx
```

如果有如下输出，就表示安装成功。当然，不同的系统和版本输出可能会不一样

```txt
nginx.x86_64                      1.14.2-1.el6.ngx   @nginx-stable
nginx-module-geoip.x86_64         1.14.2-1.el6.ngx   @nginx-stable
...
```

2. `yum`源安装好之后，我们就可以直接`install`命令来安装`Nginx`

```bash
yum install nginx
```

`Nginx`安装成功后，可以执行如下命令查看`Nginx`的安装目录

```bash
rpm -ql nginx
```

同样不同的系统和版本可能会有不同的输出

```txt
/etc/logrotate.d/nginx
/etc/nginx
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf
/etc/nginx/fastcgi_params
/etc/nginx/koi-utf
/etc/nginx/koi-win
/etc/nginx/mime.types
/etc/nginx/modules
/etc/nginx/nginx.conf
/etc/nginx/scgi_params
/etc/nginx/uwsgi_params
/etc/nginx/win-utf
/etc/rc.d/init.d/nginx
/etc/rc.d/init.d/nginx-debug
/etc/sysconfig/nginx
/etc/sysconfig/nginx-debug
/usr/lib64/nginx
/usr/lib64/nginx/modules
/usr/sbin/nginx
/usr/sbin/nginx-debug
/usr/share/doc/nginx-1.14.2
/usr/share/doc/nginx-1.14.2/COPYRIGHT
/usr/share/man/man8/nginx.8.gz
/usr/share/nginx
/usr/share/nginx/html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html
/var/cache/nginx
/var/log/nginx
```

## Nginx安装目录介绍

为了能够更好的学习`Nginx`，我们需要对`Nginx`的安装目录有一个大致的了解。

- `/etc/logrotate.d/nginx`：配置文件。Nginx日志轮转，用于logrotate服务的日志切割

- `/etc/nginx`：目录、配置文件。nginx的主配置文件
  - `/etc/nginx/nginx.conf`
  - `/etc/nginx/conf.d/*.conf`

cgi，fastcgi相关配置的配置文件
- `/etc/nginx/fastcgi_params`
- `/etc/nginx/uwsgi_params`
- `/etc/nginx/scgi_params`

编码转换映射转化相关的配置文件
- `/etc/nginx/koi-utf`
- `/etc/nginx/koi-win`
- `/etc/nginx/win-utf`

设置http协议content-type头部与扩展名的对应关系
- `/etc/nginx/mime.type`

用于配制系统守护进程管理器管理方式
- `/etc/sysconfig/nginx`
- `/etc/sysconfig/nginx-debug`

nginx模块目录
- `/etc/nginx/modules`
- `/usr/lib64/nginx/modules`

nginx服务的启动管理终端命令
- `/usr/sbin/nginx`
- `/usr/sbin/nginx-debug`

nginx的手册和帮助文件
- `/usr/share/doc/nginx-1.14.2`
- `/usr/share/doc/nginx-1.14.2/COPYRIGHT`
- `/usr/share/man/man8/nginx.8.gz`

nginx的缓存目录
- `/var/cache/nginx`

nginx的日志目录
- `/var/log/nginx`

当然，上面的目录是`Nginx`安装成功后默认生成的目录。有一些目录我们可以根据自己的需要在配置文件中进行更改。

## Nginx命令

`Nginx`在运行的过程中可能会设计到如下命令

```bash
# 启动nginx，这种方式会使用默认的nginx配置文件。也就是/etc/nginx/nginx.conf
nginx

# 启动nginx的时候指定配置文件
nginx -c /etc/nginx/新的nginx配置文件

# 停止nginx
nginx -s stop

# 重启nginx
nginx -s reload

# 检查配置文件语法的准确性
nginx -tc 配置文件路径
```

## Nginx日志

`Nginx`中的日志主要有两种：访问日志和错误日志。下面是`Nginx`安装的成功后默认的配置文件的部分内容

```nginx
error_log  /var/log/nginx/error.log warn;

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    include /etc/nginx/conf.d/*.conf;
}
```

`Nginx`的错误日志通过`error_log`指令配置，默认保存在`/var/log/nginx/error.log`文件中，日志的级别是`warn`。访问日志是通过`access_log`指令配置的，对于每一个`http`请求其访问日志默认保存在`/var/log/nginx/access.log`，日志的格式就是`main`所指向的`log_format`指令配置的。当然，对于访问日志你可以定义在`main`，`http`，`server`块中，不同的地方拥有不同的控制范围。日志的格式通过`log_format`指令配置，`log_format`的语法如下：

```nginx
log_format name [escape=json|default] string...;
```

在定义日志格式的时候，我们可以使用任意的`Nginx`变量。默认日志中所使用到的变量有

- $remote_addr：表示客户端的地址
- $remote_user：表示客户端请求nginx认证的用户名，如果没有开启认证模块的话，这个是不会被记录的
- $time_local：表示nginx的时间
- $request：表示request头部的请求行。GET / HTTP/1.1等
- $status：表示的是响应状态码
- $body_bytes_sent：从服务端响应给客户端body的大小
- $http_referer：客户端referer
- $http_user_agent：客户端的user-agent字段
- $http_x_forwarded_for：每一级代理服务器的http信息

## Nginx变量

`Nginx`中的变量主要有三种：内置变量，http请求变量和自定义变量。`Nginx`中的变量一般通过`$`进行获取。

1. http请求中的变量

`http`请求中的变量并不是指唯一变量，而是有无限多变种的一种变量。主要有如下三种：

- arg_PARAMETERS

这类变量就是用来获取当前请求中的参数值。比如我们的请求路径是`/arg?name=saisai&age=25`。那我们就可以通过如下变量获取`name`和`age`对应的值。

```nginx
location /arg {
  # 获取请求参数name的值
  echo "$arg_name";
  # 获取请求参数age的值
  echo "$arg_age";
}
```

- http_HEADER

这类变量主要是用来获取请求头部中相关字段的值。比如获取`http`请求头部`user-agent`的值，可以通过变量`$http_user_agent`来获取。

```nginx
location /user_agent {
  echo "$http_user_agent";
}
```

- sent_http_HEADER

当然，有请求就有响应。这类变量主要是用来获取`http`响应头信息。比如，获取响应头部中的`content-length`的值

```nginx
location /content-length {
  echo "$sent_http_content_length";
}
```

2. 内置变量

[内置变量](http://nginx.org/en/docs/http/ngx_http_log_module.html#access_log)是`Nginx`为我们提供的。比如上面定义日志格式的时候涉及到的一些内置变量。

```nginx
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
```

3. 自定义变量

`Nginx`允许我们在配置文件中使用自定义变量。自定义变量通过`set`来指定。

```bash
set $变量名 变量值
```

比如

```nginx
location / {
  set $hello hello;
  echo "$hello";
}
```

## Nginx模块

`Nginx`是基于模块化的设计。`Nginx`中的模块也分为官方模块和第三方模块。可以通过如下命令来查看`Nginx`在安装的过程中所安装的一些模块。

```bash
nginx -V
```

```txt
nginx version: nginx/1.14.2
built by gcc 4.4.7 20120313 (Red Hat 4.4.7-23) (GCC)
built with OpenSSL 1.0.1e-fips 11 Feb 2013
TLS SNI support enabled
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector --param=ssp-buffer-size=4 -m64 -mtune=generic -fPIC' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie'
```

### http_stub_status_module

这个模块主要是用来查看`Nginx`当前的连接状态。通过在编译的时候添加`--with-http_stub_status_module`参数启动。

模块启动后，可以通过指令`stub_status`配置。基本语法如下：

```nginx
Syntax:	stub_status;
Default: —
Context: server, location
```

比如，`Nginx`有如下配置

```nginx
location /mystatus {
  stub_status;
}
```

当我们访问`http://192.168.144.129/mystatus`会在网页中看到如下内容

```nginx
Active connections: 2  # nginx当前活跃的连接数
server accepts handled requests
 12 12 8 # 第一个12表示的是nginx处理的握手的总的次数 第二个12表示的nginx处理的连接数 第三个8表示nginx的总的连接数。正常情况下 第一个和第二个数字是相等的，表示没有丢失
Reading: 0 # 表示正在读取的数目
Writing: 1 # 表示正在写的连接数
Waiting: 1 # 表示建立的连接数。nginx在开启了keep-alive情况下
```

### http_random_index_module

这个模块主要用于在主目录中随机选择一个文件作为主页，但这个模块是不会选择隐藏文件作为主页的。可以在编译的时候通过指定`--with-http_random_index_module`参数来指定。

配置语法如下：

```nginx
Syntax:	random_index on | off;
Default: random_index off;
Context: location
```

假如我们的`Nginx`有如下配置

```nginx
location / {
  root   /usr/share/nginx;
  random_index on;
}
```

每次访问`http://192.168.144.129`都可能会看到一个随机的页面显示。

### http_sub_module

这个模块主要用于对`http`响应中的内容进行替换。通过在编译的时候添加 `--with-http_sub_module` 参数启动。

这个模块主要有如下几个指令配置：

- **配置一：对body中返回的内容进行替换**

```nginx
syntax: sub_filter string replacement;
default: --
context: http/server/location
```

假设在我们的服务器上存在文件`/opt/app/code/index.html`，其内容如下：

```html
<a>saisai</a>
<a>zhao</a>
<a>saisai</a>
```

我们的`Nginx`配置如下

```nginx
location / {
  root /opt/app/code;
  index index.html index.htm;
  # 配置需要替换的内容
  sub_filter '<a>saisai' '<a>SAISAI'
}
```

重启`Nginx`后，访问`http://192.168.144.129`。返回客户端的内容如下

```html
<a>SAISAI</a>
<a>zhao</a>
<a>saisai</a>
```

默认情况下，`sub_filter`只会替换第一个匹配的内容。我们可以通过配置下面的指令来替换所有匹配的内容。

- **配置二：对body中匹配的内容进行全部的替换**

```nginx
syntax: sub_filter_once on | off;
default: sub_filter_once on;
context: http/server/location
```

同样是上面的`html`文件，如果我们的`Nginx`配置如下

```nginx
location / {
  root /opt/app/code;
  index index.html index.htm;
  # 配置需要替换的内容
  sub_filter '<a>saisai' '<a>SAISAI'
  # 替换所有匹配的内容
  sub_filter_once off;
}
```

这时访问`http://192.168.144.129`。返回客户端的内容如下

```html
<a>SAISAI</a>
<a>zhao</a>
<a>SAISAI</a>
```

- **配置三：判断资源的内容是否更新。如果有更新返回最新文件，否则返回304；**

```nginx
syntax: sub_filter_last_modified on | off;
default: sub_filter_last_modified off;
context: http/server/location
```

这个配置是协商缓存的一种方式，依赖对`last-modified`和`if-modified-since`头部的判断。


## Nginx请求限制

`Nginx`对请求的限制主要包括两方面：连接频率的限制和请求频率的限制。其中，连接频率的限制通过模块`limit_conn_module`配置，请求频率的限制通过模块`limit_req_module`配置。

为了区分上述两种限制的不同之处，我们得知道`连接`和`请求`有什么不同。

![](/blog/conn_req.png)

`连接`是指`connection`，即我们常说的`tcp`连接。建立一个`tcp`连接必须要通过三次握手。
`请求`是指`request`，即`http`请求。`http`请求是构建在`tcp`连接上的。

`tcp`连接是有状态的，而构建在tcp之上的http却是无状态的协议。在一个`tcp`连接的生命周期中，会存在一个或者多个请求，这主要是为了加快效率，避免每次请求都要三次握手建立连接，现在的`HTTP/1.1`协议都支持这种特性，叫做`keepalive`。

明白了二者的区别后，就可以了解`Nginx`是怎么对这两种限制进行配置。

- 连接频率的限制

```nginx
syntax: limit_conn_zone key zone=name:size;
default: --
context: http
```

通过`limit_conn_zone`指令来设置限制的维度。`key`是维度变量。`zone`用来设置共享内存的名称和大小。比如，我们想基于客户端的`ip`地址进行限制，那么`key`就应该设置为客户端的`ip`地址`$remote_addr`。这个指令设置完成后，我们还需要通过`limit_conn`指令进行调用才能生效。

```nginx
syntax: limit_conn zone number;
default: --
context: http, location, server
```

上面的配置是在`limit_conn_zone`配置好的基础上进行配置的。`zone`就是在`limit_conn_zone`中设置的名字，`number`就是限制的连接数。

基于上述语法，我们可以对`nginx`进行如下配置来进行连接频率的限制

```nginx
http {
  limit_conn_zone $binary_remote_addr zone=conn_zone:1m;
  server {
    location / {
      root /opt/app/code;
      # 对连接进行限制
      limit_conn conn_zone 1;
      index  index.html index.htm;
    }
  }
}
```

- 请求频率的限制

请求频率的限制语法和上面的连接频率限制的语法相似

```nginx
syntax: limit_req_zone key zone=name:size rate=rate;
default: --
context: http
```

相对于连接频率的限制，在请求频率限制的配置中多了一个`rate`配置。用于设置最大的请求频率。

```nginx
syntax: limit_req zone=name [burst=number] [nodelay];
default: --
context: http, location, server
```

在`limit_req`中多了`burst`用来表示缓存住的请求数。`nodelay`用来表示是否希望请求延迟。比如下面的配置

```nginx
limit_req   zone=req_one  burst=120 nodelay;
```
加上 `nodelay`之后超过 `burst`大小的请求就会直接返回503。


下面是两个`Nginx`配置

- 配置一


```nginx
http {
  # 下面配置的含义就是对于同一个客户端ip地址的请求限制在1s的时间内请求一个
  # 其中这个zone的空间的大小是1m
  limit_req_zone $binary_remote_addr zone=req_zone:1m rate=1r/s;
  server {
    location / {
      root /opt/app/code;
      # 对请求进行限制
      limit_req zone=req_zone;
      index  index.html index.htm;
    }
  }
}
```

然后通过ab进行测试

```bash
ab -n 50 -c 2 http://192.168.144.129/1.html
```

```bash
...
Non-2xx responses:      49
...
```

上面的配置表示对于同一个客户端ip地址的请求限制在1s的时间内请求一个。使用`ab`测试`50`个请求，会发现失败的请求数是`49`。

- 配置二

```nginx
http {
  # 下面配置的含义就是对于同一个客户端ip地址的请求限制在1s的时间内请求一个
  # 其中这个zone的空间的大小是1m
  limit_req_zone $binary_remote_addr zone=req_zone:1m rate=1r/s;
  server {
    location / {
      root /opt/app/code;
      # 对请求进行限制，当客户端的请求超过限制后，遗留三个请求到下一秒处理，其它的直接返回错误状态503
      limit_req zone=req_zone burst=3 nodelay;
      index  index.html index.htm;
    }
  }
}
```

```bash
...
Non-2xx responses:      46
...
```

`Nginx`会成功处理1个请求，然后遗留3个请求到下一秒处理。所以，对于`ab`的`50`个请求会成功处理4个，失败`46`个。

## Nginx的访问控制

`Nginx`对于访问权限的控制也可以通过两个方面控制。一是基于`IP`的访问控制，二是基于用户的信任登录控制。

基于`IP`的访问控制通过`http_access_module`模块来实现，基于用户的信任登录控制通过`http_auth_basic_module`模块来实现。

### http_access_module

这个模块允许我们设置哪些`ip`地址可以或者不能访问我们的服务。配置语法如下：

**1. 允许某些ip访问**

```nginx
syntax: allow address | CIDR | unix: | All
default: --
context: http,server,location
```

**2. 拒绝某些ip访问**

```nginx
syntax: deny address | CIDR | unix: | All
default: --
context: http,server,location
```
- address: ip地址
- cidr: 网段地址
- unix: socket方式的访问
- all：所有的IP

下面是两个关于`ip`访问控制的配置。

**测试一：不允许我的ip访问**

```nginx
location ~ ^/admin.html {
    root  /opt/app/code ;
    deny 192.168.144.1;
    allow all;
    index  index.html index.htm;
}
```

**测试二：只允许我的ip访问**

```nginx
location ~ ^/admin.html {
    root  /opt/app/code ;
    allow 192.168.144.1;
    deny all;
    index  index.html index.htm;
}
```

::: danger
上面的配置只能用于客户端直连Nginx服务才会起作用
:::

### auth_basic_module

这个模块要求客户端需要使用`HTTP Basic Authentication`协议进行用户名和密码的基本认证。我们需要使用`auth_basic`开启认证的功能，同时使用`auth_basic_user_file`指定用户登录的密钥文件。配置语法如下：

```nginx
syntax: auth_basic string | off;
default: auth_basic off;
context: http, server, location
```

`string`就是用来设置前端的弹窗title，同时也表示开启用户认证。

```nginx
syntax: auth_basic_user_file file;
default: --;
context: http, server, location
```

用户登录的密钥文件我们可以通过`htpasswd`生成，比如我们设置用户登录的用户名是`saisai`，可以通过如下命令生成加密密码

```bash
htpasswd -c ./auth_conf saisai
```

根据提示输入密码即可。

下面是一段关于用户认证的配置

```nginx
server {
  listen       80;
  server_name  localhost;

	location ~ ^/admin.html {
    root   /opt/app/code;
		auth_basic "Auth access test!input your password";
		auth_basic_user_file /etc/nginx/auth_conf;
    index  index.html index.htm;
  }
}
```

当用户访问`http://192.168.144.129/admin.html`的时候，客户端就会弹窗提示用户输入用户名和密码。只有输入了正确的用户名和密码，才能允许访问页面。