# Ignore the SSL Certificate (TLDR: Use -k argument)

> [原文地址](https://catonmat.net/cookbooks/curl/use-proxy)

[[toc]]

下面的这些例子想你演示了怎么在`curl`中进行不安全的请求的时候忽略`SSL`证书的验证。可以使用`-k`选项来实现这个功能。有些情况下，`SSL`证书可能过期或者损坏了，使用这个选项能够跳过对证书的验证。

## Don't Verify SSL Certificate Details

```bash
curl -k https://www.baidu.com
```

在这个例子中，`curl`使用`-k`选项发起一个`https`的请求，且不会检查证书的详细信息。如果它是过期的，或者损坏了，或者服务器配置错误了。这个请求仍然能够通过，但是并不会得到信任。

## Use SSL Version 1

```bash
curl -1 https://www.baidu.com
```

这个例子中使用`-1`选项告诉`curl`在与服务器协商的时候使用`SSLv1`版本。你也可以使用`-2`或者`-3`来告诉`curl`使用`SSLv2`和`SSLv3`版本。