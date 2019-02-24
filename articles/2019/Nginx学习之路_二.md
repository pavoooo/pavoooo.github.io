# Nginx学习之路(二)

在第一篇中主要学习了关于`Nginx`中的一些基本语法。接下来需要学习一些`Nginx`的常见应用。

## 静态资源服务

提供静态资源服务是`Nginx`最基本的一个功能。静态资源就是指那些不需要服务器程序动态运行生成的文件，比如图片，文本文件等。下面是使用`Nginx`提供静态服务最常见的一种模式。

![](/blog/static_resource.png)

除了使用本机文件系统提供静态资源服务外，`cdn`也是最常见的使用`Nginx`提供静态资源服务的一种方式。

![](/blog/cdn.png)

对于静态资源服务的配置，`Nginx`涉及到很多相关的指令。

- **sendfile**

开启`sendfile`功能。`sendfile`功能可以提供`Nginx`静态资源的托管效率。`sendfile`是一个系统调用，直接在内核中完成文件发送，不需要先`read`再`write`，没有上下文切换的开销。

```nginx
syntax: sendfile on | off;
default: sendfile off;
context: server, location
```

- **tcp_nopush**

在`sendfile`指令开启的情况下，开启`tcp_nopush`。启用了这个指令后，数据包会被累积到一定大小才发送，减少额外的开销，提升了网络效率。

```nginx
syntax: tcp_nopush on | off;
default: tcp_nopush off;
context: http, server, location
```

> 这个指令只有在`sendfile`为`on`的时候才起作用

- **tcp_nodelay**

这个指令的目的就是尽快发送数据。`Nginx`只会针对`keep-alive`状态的`TCP`连接启用`tcp_nodelay`。`tcp_nopush`和`tcp_nodelay`结合在一起使用的时候，会先填满包，然后再尽快发送。

```nginx
syntax: tcp_nodelay on | off;
default: tcp_nodelay on;
context: http, server, location
```

- **gzip**

![](/blog/gzip.png)

一般在项目上线前，我们都会对代码(html, css, js)等进行压缩，图片也会压缩。对于文本文件，我们在服务端发送响应之前开启`gzip`压缩。

```nginx
syntax: gzip on | off;
default: gzip off;
context: http, server, location
```

在`gzip`指令开启的情况下，有很多其它辅助的指令对压缩的特性进行设置。

**设置压缩比**

```nginx
syntax: gzip_comp_level level;
default: gzip_comp_level 1;
context: http, server, location
```

**设置在哪个版本的http协议下才会对资源进行压缩**

```nginx
syntax: gzip_http_version 1.0|1.1;
default: gzip_http_version 1.1;
context: http, server, location
```

我们也可以使用`http_gzip_static_module`模块来开启预读`gzip`数据的功能。这个模块就是在获取资源的时候预先读取被压缩的资源，如果压缩资源存在，直接读取。否则就读取源文件然后压缩返回。

```nginx
location .. {
  gzip_static on | off;
}
```

上面是`Nginx`作为静态资源服务时候的一些配置，下面是一份`Nginx`作为静态资源服务时候的配置文件。

```nginx
server {
    listen       80;
    server_name  localhost;

    # 开启sendfie指令
    sendfile on;

    # 视情况开启下面两个指令
    # tcp_nopush on;
    # tcp_nodelay on;

    # 配置一些关于静态文件读取的规则
    # 如果获取的文件是以 .png .gif .jeg 结尾的资源，通过如下指令进行处理
    location ~ .*\.(jpg|png|gif)$  {
        # 放置图片的地方
        root /opt/app/code/images;
        # 是否开启gzip压缩
        gzip on;

        # gzip的http协议的版本
        gzip_http_version 1.1;

        # 压缩等级
        gzip_comp_level 2;

        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    }


    location ~ .*\.(txt|xml)$  {
        # 放置文本文件的地方
        root /opt/app/code/doc;
        # 是否开启gzip压缩
        gzip on;

        # gzip的http协议的版本
        gzip_http_version 1.1;

        # 压缩等级
        gzip_comp_level 2;

        gzip_types text/plain application/javascript application/x-javascript text/css application/xm
l text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    }

    # 如果是下载资源
    location ~ ^/download  {
        # 放置下载资源的地方
        root /opt/app/code;
        # 预先读取压缩文件
        gzip_static on;
        # 开启 tcp_nopush
        tcp_nopush on;
    }
}
```

## 缓存

`http缓存`是提升网站性能最有效的手段之一。想了解更多关于缓存的知识，可以参考我的文章[缓存那些事](https://zhaosaisai.com/blog/2018/%E7%BC%93%E5%AD%98%E9%82%A3%E4%BA%9B%E4%BA%8B.html)。

`Nginx`是通过`expires`指令来控制缓存行为的。`expires`指令的原理就是添加`cache-control`，`expires`头部。配置语法如下：

```nginx
syntax: expires [modified] time;
default: expires off;
context: http, server, location
```

`time`就是用来指定缓存过期的时间。比如，我们对`html`文件设置的缓存时间为`24h`

```nginx
location ~ .*\.(htm|html)$ {
    # 对html文件设置过期时间
    expires 24h;
    root /opt/app/code;
}
```

## 跨站资源共享

`Nginx`可以通过`add_header`指令添加允许跨站资源共享的头部。

```nginx
syntax: add_header name value [always]
default: --
context: http, server, location
```

- **name**：就是和跨站访问有关的头部
- **value**：就是允许的站点的名称
- **always**：表示对全部站点允许

下面是和跨站资源共享相关的两个配置

```nginx
location ~ .*\.(htm|html)$ {
  add_header Access-Control-Allow-Origin http://zhaosaisai.com;
  add_header Access-Control-Allow-Method GET,POST,PUT,DELETE,OPTIONS;
  root /opt/app/code;
}
```

允许所有站点的跨站访问

```nginx
location ~ .*\.(htm|html)$ {
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Method GET,POST,PUT,DELETE,OPTIONS;
  root /opt/app/code;
}
```

## 防盗链

防盗链的目的就是防止资源被盗用。防盗链设置思路，首要方式就是区别哪些请求是非正常的用户请求。在`Nginx`中我们可以使用`http_refer`模块来配置防盗链规则。语法如下

```nginx
syntax: valid_referers none | blocked | server_names | string...
default: --
ontext: server, location
```

- **none**：表示允许没有带`referer`的请求
- **blocked**：表示允许`referer`信息不携带协议，比如不带`http`或者`https`协议等
- **server_names**：表示允许的域名或者ip。

下面是对图片资源防盗链的一个配置规则

```nginx
location ~ .*\.(jpg|png|gif)$  {
    # 放置图片的地方
    root /opt/app/code/images;
    # 是否开启gzip压缩
    gzip on;

    # gzip的http协议的版本
    gzip_http_version 1.1;

    # 压缩等级
    gzip_comp_level 2;

    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

    # 防盗链设置
    valid_referers none blocked 192.168.144.129;
    
    # 通过内置变量$invalid_referer来判断是否有一些referer被阻止
    if ($invalid_referer) {
      return 403;
    }
}
```

当然你也可以通过正则表达式来设置合法或者非法的域名或者ip


```nginx
valid_referers none blocked 192.168.144.129 ~/google\./;
```

## 代理

作为代理服务器也是`Nginx`的一种常见用途。代理分为两种：正向代理和反向代理。

**正向代理**

![](/blog/zxdl.png)

**反向代理**

![](/blog/fxdl.png)

正向代理和反向代理的区别就是代理的对象不一样。正向代理的代理对象是客户端，反向代理代理对象是服务端。

### Nginx代理配置语法

Nginx配置代理主要是通过`proxy_pass`指令声明，语法如下：

```conf
syntax: proxy_pass url;
default: --
context: location, if in location, limit_except;
```

下面是`Nginx`配置的一个反向代理的配置文件


**配置一：外部可以访问的端口配置**

```nginx
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

	location ~ /test_proxy.html$ {
    # 访问test_proxy.html页面的时候，通过代理服务转到本机8080端口上。本机的8080端口外部是无法直接访问的
		proxy_pass http://127.0.0.1:8080;
	}
}
```

**配置二：配置8080端口的访问**

```nginx
server {
    listen       8080;
    server_name  localhost;

    location / {
        # 8080服务的根目录
        root   /opt/app/code2;
        index  index.html index.htm;
    }
}
```

当我们访问`http://192.168.144.129/test_proxy.html`的时候，在服务器的内部会将我们的请求转发给本机`8080`端口所在的服务。这里用户实际看到的是`/opt/app/code2/test_proxy.html`。

> 正向代理的转发并不在服务端，着重的是对客户端的配置。

`proxy_pass`是`Nginx`配置代理最基本的指令。除此，还有一些其它的指令在配置代理的过程中生效。

- **proxy_buffering**

```nginx
syntax: proxy_buffering on | off;
default: proxy_buffering on;
context: http, server, location
```

`proxy_buffering`这个指令打开后会尽可能的将一个请求的数据收集完一次性的返回给客户端。这个指令起到了缓冲区的作用。当这个指令打开后，数据默认保存在内存中，对于缓冲区的大小，可以通过下面几个配置修改`proxy_buffer_size`, `proxy_buffers`, `proxy_busy_buffers_size`。

- **proxy_redirect**

```nginx
syntax: proxy_redirect default;
        proxy_redirect off;
        proxy_redirect redirect replacement;
default: proxy_redirect default;
context: http, server, location;
```

`proxy_redirect`这个指令的作用就是当我们使用`nginx`作为代理服务器的时候，代理后端的服务返回的是一个重定向。比如301的时候，`nginx`就会把我们的请求重定向到指定的`url`然后返回给客户端。这种场景多用在后端返回的重定向地址是前端无法直接访问到的时候，或者需要对重定向地址进行重写的时候使用。一般使用默认配置`default`即可。

- **proxy_set_header**

```nginx
syntax: proxy_set_header field value;
default: proxy_set_header Host $proxy_host
         proxy_set_header Connection close
context: http, server, location
```

`Nginx`代理服务器将请求转发给后端的时候，添加头部信息给后端服务器。

- **proxy_connect_timeout**

```nginx
syntax: proxy_connect_timeout time;
default: proxy_connect_timeout 60s;
context: http, server, location
```

设置连接超时(nginx连接后端服务的时间)

> 一个Nginx作为代理服务器时的配置文件

```nginx
location / {
  proxy_pass http://127.0.0.1:8080;
  proxy_redirect default; # 一般设置为默认

  # nginx访问后端服务的时候的头部信息
  proxy_set_header Host $http_host;
  proxy_set header X-Real-IP $remote_addr;

  # 设置超时时间
  proxy_connect_timeout 30;
  proxy_send_timeout 60;
  proxy_read_timeout 60;

  # 设置缓冲区
  proxy_buffering on;
  proxy_buffer_size 32k;
  proxy_buffers 4 128k;
  proxy_busy_buffers_size 256k;
  proxy_max_temp_file_size 256k;
}
```

## 负载均衡服务

`Nginx`作为负载均衡服务器也是`Nginx`最主要的用途之一。下图是对`Nginx`作为负载均衡服务器的一个简单概括

![](/blog/fzjh1.png)

`Nginx`实现负载均衡服务器主要是通过`proxy_pass`指令和`upstream`配置来实现。`proxy_pass`用于将请求转发给上游服务器。`upstream`用来定义上游服务器集。

::: warning
upstream是配置只能在http块中，不能配置在server或者location块中。
:::

下面是`upstream`的配置语法

```nginx
syntax: upstream name {}
default: --
context: http
```

### upstream配置讲解

下面我们详细的了解一下怎么去配置`upstream`

```nginx
upstream 虚拟服务的名称 {
  # 内部是对应的每一个server
  # server后面可以是对应的域名，也可以是具体的ip地址
  # weight表示的是权重，权重越大，被轮询的概率就越大
  server backend1.example.com weight=5;
  server backend2.example.com:8080;
  # 也可以是socket
  server unix:/tmp/backend3;

  # 后面的backup表示的是负载均衡服务器在调度中的状态
  server backend1.example.com:8080 backup;
  server backend2.example.com:8080 backup;
}
```

**负载均衡服务器在调度中的状态**

- **down**：当前的server暂时不参与负载均衡
- **backup**：预留的备份服务器，其它的服务器不可用的时候会访问。
- **max_fails**：允许请求失败的次数
- **fail_timeout**：经过max_fails后，服务暂停的时间
- **max_conns**：限制最大的接收连接数

为了能够快速理解负载均衡服务的配置，我们先用`Nginx`实现一个简单的负载均衡

**首先配置三台上游服务器**

1. **server1.conf**

```nginx
server {
  listen       8001;
  server_name  localhost;

  location / {
      root   /opt/app/code1;
      index  index.html index.htm;
  }
}
```

2. **server2.conf**

```nginx
server {
  listen       8002;
  server_name  localhost;

  location / {
      root   /opt/app/code2;
      index  index.html index.htm;
  }
}
```

3. **server3.conf**

```nginx
server {
  listen       8003;
  server_name  localhost;

  location / {
      root   /opt/app/code3;
      index  index.html index.htm;
  }
}
```

上面三个服务(8001, 8002, 8003)是作为内部服务存在，外部无法直接访问。

**上游服务器配置好后，配置自己的服务器负载均衡到这三台服务器中**


```nginx
upstream saisai {
		server 192.168.144.129:8001;
		server 192.168.144.129:8002;
		server 192.168.144.129:8003;
	}
server {
    listen       80;
    server_name  localhost;

    location / {
      # 代理到upstream模块中的server上
      proxy_pass http://saisai;
    }
}
```

当我们访问`http://192.168.144.129/`会看到我们的请求会周期性的返回三台服务器中的内容。这是由`Nginx`内部的调度算法决定的。调度算法主要有如下几种

### 调度算法配置方式

#### ip_hash

```nginx
upstream saisai {
    ip_hash;
    server 192.168.144.129:8001;
    server 192.168.144.129:8002;
    server 192.168.144.129:8003;
}
```

#### 加权轮询

```nginx
upstream saisai {
    server 192.168.144.129:8001 weight=1;
    server 192.168.144.129:8002 weight=2;
    server 192.168.144.129:8003 weight=3;
}
```

> weight的值越大，访问的几率越大

#### url_hash

```conf
syntax: hash key [consistent]
default: --
context: upstream
```

```nginx
upstream saisai {
    # 对请求地址进行hash计算
    hash $request_uri;
    server 192.168.144.129:8001;
    server 192.168.144.129:8002;
    server 192.168.144.129:8003;
}
```

## 代理缓存

我们可以通过`Nginx`设置代理缓存，这样能有有效的减轻后端服务器的负载压力。

![](/blog/dlhc.png)

代理缓存主要是通过`proxy_cache`指令配置。

```nginx
Syntax:	proxy_cache zone | off;
Default:	proxy_cache off;
Context:	http, server, location
```

开启代理缓存后，我们还需要使用`proxy_cache_path`指令定义好一个目录和空间大小用来存放缓存文件。

```nginx
Syntax:	proxy_cache_path path [levels=levels] [use_temp_path=on|off] keys_zone=name:size [inactive=time] [max_size=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time];
Default:	—
Context:	http
```

> key_zone就是在proxy_cache指令中设置的zone的名称

除此我们也可以定义缓存的生效时间和系统保存缓存内容时候的`key`。

```nginx
syntax: proxy_cache_valid [code...] time;
default: -
context: http, server, location
```

`code`就是指返回的状态码，`time`用来定义过期时间。

`proxy_cache_key`就是用来定义缓存的维度。其实就是缓存的key。

```conf
Syntax:	proxy_cache_key string;
Default:  proxy_cache_key $scheme$proxy_host$request_uri;
Context:	http, server, location
```

下面是`Nginx`配置代理缓存的一个实际例子

```nginx
 upstream saisai {
    server 192.168.144.129:8001;
    server 192.168.144.129:8002;
    server 192.168.144.129:8003;
  }
  # 定义缓存路径
  proxy_cache_path /opt/app/cache levels=1:2 keys_zone=saisai_cache:10m max_size=100m inactive=60m use_temp_path=off;

server {
    listen       80;
    server_name  localhost;

    location / {
        proxy_pass http://saisai;
        proxy_cache saisai_cache;
        # 200 和 304的响应缓存2小时
        proxy_cache_valid 200 304 2h;
        # 其它响应缓存10分钟
        proxy_cache_valid any 10m;
        proxy_cache_key $host$uri$is_args$args;
        add_header Nginx-Cache "$upstream_cache_status";

        # 定义重试机制
        # 下面的配置就表示在 error timeout invalid_header http_500 http_502 http_503 http_504的响应下
        # 将请求重新发送到下一个上游服务器进行重试操作
        proxy_next_stream error timeout invalid_header http_500 http_502 http_503 http_504;
    }
}
```