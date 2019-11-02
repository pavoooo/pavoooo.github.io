# Use a Proxy

> [原文地址](https://catonmat.net/cookbooks/curl/use-proxy)

[[toc]]

下面这些例子向你展示了怎么通过`socks4`，`socks5`或者`http`，`https`协议代理请求。为了设置代理，使用`-x protocol://user:password@host:port`选项。

## Use a Socks5 Proxy

```bash
curl -x socks5://james:cats@myproxy.com:8080 https://catonmat.net
```

在这个例子中，使用`-x`选项设置代理的协议是`socks5`。代理的认证名称是`james`，代理的认证密码是`cats`，代理的主机地址是`myproxy.com`，端口为`8080`。当代理连接成功后，`curl`对`https://catonmat.net`发起`GET`请求。

## Use a Socks4 Proxy

```bash
curl -x socks4://james:cats@myproxy.com:8080 https://catonmat.net
```

这个例子和上面一个例子基本相同，只是将代理协议改为了`socks4`。

## Use an HTTP Proxy

```bash
curl -x james:cats@myproxy.com:8080 https://catonmat.net
```

在这个例子中，我们并没有明确指定`protocol://`部分。这种情况下，就默认使用`http`协议的代理。和上面的两个例子相同，代理认证的用户名和密码被设置为了`james:cats`，代理的地址和端口被设置为了`myproxy.com:8080`。

## Don't Use a Proxy for Host.com

```bash
curl --no-proxy host.com -x https://myproxy.com:8080 host.com https://catonmat.net https://digg.com https://host.com
```

在这个例子中，我们在命令中使用了`--no-proxy host.com`。这个选项禁止了对`host.com`的请求进行代理。后面的参数`-x https://myproxy.com:8080`表示设置https代理为`myproxy.com:8080`，然后对`https://catonmat.net`，`https://digg.com`，`https://host.com`三个地址发起请求。头两个请求会通过`myproxy.com:8080`地址进行代理。最后一个请求并不会被代理，因为`https://host.com`域名在忽略代理的列表内。