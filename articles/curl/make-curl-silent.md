# Make Curl Silent (TLDR: Use -s argument)

> [原文地址](https://catonmat.net/cookbooks/curl/make-curl-silent)

[[toc]]

下面的例子演示了怎么利用`curl`发起一个静默请求，这种请求不会打印出进度条，错误和其他输出的内容。为了实现这个功能，可以使用`-s`选项。如果你也想隐藏响应的信息，可以使用`-o /dev/null`。

## Hide Errors and Progress Bar (but Print Response)

```bash
curl -s https://catonmat.net
```

在这个例子中，`curl`使用`-s`选项隐藏全部的错误信息和进度信息。如果请求是成功的，`curl`仍然会打印出响应体。如果发生了错误，那么你只能通过`curl`进程的退出码来判断了。

## Make Curl Dead Silent

```bash
curl -s -o /dev/null https://google.com
```

在这个例子中，我们同时使用了`-s`和`-o /dev/null`选项。这两个选项结合在一起，`curl`请求就完全静默了。只能通过判断`curl`的退出码来确定请求的成功还是失败。如果退出码是0，则表示成功，否则就是失败。

## Make Curl Dead Silent (but Print the Error)

```bash
curl -S -s -o /dev/null https://google.com
```

这个例子在上一个例子的基础上增加了`-S`选项。它表示`curl`仍然发送静默请求，但是在有错误出现的时候，要显示出来。如果你想在`curl`静默请求中知道失败情况的具体原因，这个选项是十分实用的。