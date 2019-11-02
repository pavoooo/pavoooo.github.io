# Make Curl Silent (TLDR: Use -s argument)

> [原文地址](https://catonmat.net/cookbooks/curl/make-curl-silent)

[[toc]]

下面的例子演示了怎么利用`curl`发起一个静默请求，这种请求不会打印出进度条，错误和其他输出的内容。为了实现这个功能，可以使用`-s`选项。如果你也想隐藏响应的信息，可以使用`-o /dev/null`。

## Hide Errors and Progress Bar (but Print Response)

```bash
curl -s https://catonmat.net
```

