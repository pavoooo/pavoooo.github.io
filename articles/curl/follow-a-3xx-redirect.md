# Follow a 3XX Redirect (TLDR: Use -L argument)

> [原文地址](https://catonmat.net/cookbooks/curl/follow-3xx-redirect)

[[toc]]

下面的例子向你展示了怎么让`curl`跟踪301，302，303或者其它3xx类型的重定向。默认情况下，`curl`不会跟踪重定向请求。为了能够跟踪重定向请求，需要使用`-L`选项。

## Follow Any Redirect

```bash
curl -L http://www.baidu.com
```

这个例子使用`-L`选项，使得`curl`能够跟踪任意的重定向请求。这个例子中，我们使用`curl`请求`http://www.baidu.com`，但是网站已经迁移到`https`，它发送`307`重定向响应给`curl`，`curl`收响应后，继续请求`https://www.baidu.com`