# Nginx学习-rewrite_https

`Nginx`允许我们在配置文件中对请求的`url`根据某些规则进行重写，比如跳转/重定向某个规则。`Nginx`通过`rewrite`指令为我们提供这个能力。

## rewrite

`rewrite`指令语法如下

```nginx
syntax: rewrite rule replacement [flag]
default: --
context: server, location, if
```

- **rule**：使用字符串或者正则表达式设置的规则
- **replacement**：规则匹配后要定向的地址。如果使用正则表达式定义规则，则可以在这里使用`$1`，`$2`...等获取对应分组中的值
- **flag**：表示重写类型。有如下四种
  - **last**：完成rewrite，但依然会通过新的规则进行匹配
  - **break**：本条规则匹配完成后，终止匹配，不再匹配后面的规则
  - **redirect**：返回302临时重定向，地址栏会显示跳转后的地址
  - **permannet**：返回301永久重定向，地址栏会显示跳转后的地址

下面是一个简单的`rewrite`的例子，把所有的请求跳转到`/pages/index.html`上。

```nginx
rewrite ^(.*)$ /pages/index.html break;
```

### 正则表达式

`Nginx`的正则表达式的语法和`javascript`中正则表达式的语法相似，下面是一些常用的元字符

- .：匹配除换行符之外的任意字符
- ?：重复一次或0次
- +：重复一次或多次
- *：重复0次或多次
- \d：匹配数字
- ^：匹配字符串的开始
- $：匹配字符串的结尾
- {n}：重复n次
- {n,}：重复n次或者多次
- [c]：匹配单个字符c
- [a-z]：匹配a-z字符中的任意一个
- \ ：转义字符
- ()：用于匹配括号之间的内容，通过$1和$2调用

掌握了基本的正则表达式后，我们就能够使用正则表达式来书写匹配规则。比如

```nginx
server {
  if ($http_user_agent ~ MSIE) {
    rewrite ^(.*)$ /msie/$1 break;
  }
}
```

对来自`IE`浏览器的请求加上`/msie`前缀。

在上面介绍`rewrite`的重写类型`last`和`break`时提到过，二者都能阻止后续的`rewrite`指令。但`last`不会终止重写后的`url`的匹配，即`last`重写类型会使用重写后的`url`继续走一遍匹配流程。而`break`终止匹配后立即以匹配后的资源进行返回。

比如

```nginx
server {
	listen 80;
  server_name localhost;
  root /opt/app/code;

   location / {
        rewrite /last/ /index.html last;
        rewrite /break/ /index.html break;
    }
    location = /index.html {
        return 403;
    }
}
```

- 当访问`/last/`的时候，重写到`/index.html`，然后使用新的`url`再进行匹配，命中`location = /index.html`规则返回`400`
- 当访问`/break/`的时候，重写到`/index.html`，不会使用新的`url`再进行匹配，直接返回`/opt/app/code/index.html`文件。

## 重定向

`http`请求的重定向有两种：

- 301：永久重定向。浏览器会记录重定向后的地址，下次再访问原地址的是不会向服务器发送请求而直接访问重定向的地址
- 302: 临时重定向。每次重定向操作都由`server`返回`302`状态码来告诉客户端，客户端再执行重定向操作。

`rewrite`指令允许我们在配置文件中对某些`url`进行重定向操作。`redirect`表示临时重定向。`permannet`表示的则是永久重定向。

```nginx
server {
  listen       80;
  server_name  localhost;

	# 配置server中所有的location下的root
	root /opt/app/code;

  # 所有以break开头的路径，rewrite成/test
	location ~ ^/break {
    # 临时重定向
    rewrite ^/break /test redirect;
	}

  # 所有以last开头的路径，rewrite成/test
	location ~ ^/last {
    # 永久重定向
    rewrite ^/last /test permanent;
  }

  # 所有以last开头的路径，返回json数据
	location /test {
    default_type application/json;
		return 200 '{"status": "success"}';
	}
}
```

上面的配置规则在客户端的表现是：当我们访问`/break`和`/last`时，都会被重定向到`/test`。但当我们再次访问`/break`客户端仍然会向服务端发送请求，然后`Nginx`再次返回`302`重定向响应。而再次访问`/last`的时候，客户端并不会向服务端发送请求，而是直接重定向到`/test`。

## https

`https`一般就可认为是`http+ssl`。其本质就是对传输的数据进行加密以及身份认证。因为`http`的传输是不安全的，传输的数据容易被中间人盗用，造成信息泄漏。数据的内容也有可能会被劫持和篡改。

### 对称加密和非对称加密

在`https`整个加密传输流程中涉及到**对称加密**和**非对称加密**两种加密方法。

- 对称加密

加密密钥和解密密钥是相同的

- 非对称加密

密钥包含公钥和私钥，公钥加密的数据需要私钥解密，私钥加密的数据需要公钥解密。

### https协议加密原理

![](/blog/ng_https1.png)

客户端首先发起ssl连接(非对称加密)，服务端将公钥发送给客户端。客户端使用这个公钥加密接下来进行对称加密的密码，服务端收到数据后，利用私钥解开接下来需要进行对称加密的密码。后续客户端和服务器会使用对称加密的方式来传输数据。

对于上面密钥和数据的传输过程同样是不安全的。首先，在客户端发起ssl连接，服务端将公钥发送给客户端这一过程可能会被中间人劫持。

![](/blog/ng_https2.png)

对于第一幅图中的数据交换过程，中间人劫持的风险是无法避免的。为了能够有效的避免中间人劫持的风险，我们需要引入一种机制--`CA证书`。

![](/blog/ng_https3.png)

服务端向客户端之前发送的是公钥，在引入了CA证书后，服务端向客户端发送的是CA签名证书。客户端会对这个数字证书进行CA校验(和第三方的签名机构进行校验，CA证书中包含了相应的公钥)，如果校验成功则利用公钥加密密码，如果校验失败则停止会话。

## Nginx配置https连接

`Nginx`配置`https`连接大致会经过以下几个步骤

### 生成密钥

- **首先保证安装了`openssl`**

```bash
openssl version
```

`nginx`需要开启`--with-http_ssl_module`

```bash
nginx -V
```

- **生成key密钥** 

```bash
openssl genrsa -idea -out saisai.key 1024
```

> 1024 表示加密的位数，位数越高，精度就越高。

```txt
Enter pass phrase for saisai.key:
```

生成的过程中需要输入`phrase`，这个密码一定要记住。

- **生成证书签名请求文件(csr文件)**


使用上面生成的`key`文件来生成证书签名请求文件。

```bash
openssl req -new -key saisai.key -out saisai.csr
```

在生成的过程中会需要输入上述设置的密码，同时需要根据自己的要求填写一些信息。

```txt
Country Name (2 letter code) [XX]:CN
State or Province Name (full name) []:hangzhou
Locality Name (eg, city) [Default City]:hangzhou
Organization Name (eg, company) [Default Company Ltd]:CN
Organizational Unit Name (eg, section) []:mooc
Common Name (eg, your name or your server's hostname) []:
Email Address []:1457358080@qq.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []: 可以为空
An optional company name []:mooc
```

在工作中，完成了上面两个步骤后，就可以将这两个文件进行打包发送给第三方机构，生成CA证书。个人也可以使用这两个文件建立自签名的CA。

### 生成证书签名文件(CA文件)

```bash
openssl x509 -req -days 3650 -in saisai.csr -signkey saisai.key -out saisai.crt
```

> -days 3650表示的是签名证书的过期时间。不写的话一般默认一个月左右。

生成的过程中同样需要输入第一步设置的密码,输入完成后，就会生成签名文件了。

### Nginx配置https

`Nginx`配置`https`协议首先确保`ssl`连接打开。语法如下

```nginx
syntax: ssl on | off;
default: ssl off;
context: http, server
```

> ssl指令就表示是否开始ssl连接

然后需要配置`ssl`证书文件和`ssl`证书密码文件

```nginx
syntax: ssl_certificate file;
default: --
context: http, server
```

> 配置ssl的证书文件(.crt文件)

```nginx
syntax: ssl_certificate_key file;
default: --
context: http, server
```

> 配置ssl的证书密码文件(.key文件)


然后就是对`Nginx`的配置文件进行详细配置

```nginx
server {
	listen 443;
	server_name 192.168.144.129;

	ssl on;
	ssl_certificate /etc/nginx/ssl_key/saisai.crt;
	ssl_certificate_key /etc/nginx/ssl_key/saisai.key;

	index index.html index.htm;

	location / {
		root /opt/app/code;
	}
}
```

重启nginx同样会要求输入上述的phrase密码。重启成功后就可以通过命令

```bash
netstat -luntp | grep 443
```

查看到443的端口被监听

然后就可以通过`https://192.168.144.129/1.html`来访问对应的https页面了。

> 你访问的链接可能会收到浏览器的提示，这是因为我们使用的`CA`证书是自签名的，浏览器无法判断其真实性。

