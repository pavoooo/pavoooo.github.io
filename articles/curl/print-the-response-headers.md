# Print the Response Headers (TLDR: Use -i argument)

> [原文地址](https://catonmat.net/cookbooks/curl/print-response-headers)

[[toc]]

下面的例子展示了怎么打印`curl`请求的响应头。默认情况下，`curl`并不会打印出响应头，它只打印响应体。为了打印响应头，可以使用`-i`选项。

## Print the Response Headers and Body (together)

```bash
curl -i https://www.baidu.com
```

这个例子中，`curl`指定了`-i`选项，你会发现在命令的输出中包含了http响应的头部信息。`curl`向`https://www.baidu.com`发起请求，当它接收到响应的时候，它首先打印出响应头，然后是一个空行，紧接着是响应的主体部分。也有的资料说使用`-I`选项打印出响应头信息，指定了`-I`选项后，`curl`会通过`HEAD`的方式发起请求，这个和`GET`请求还是有一些区别的。

## Print Only the Response Headers

```bash
curl -s -o /dev/null -D - https://www.baidu.com
```

出于某些原因，你可能只想打印出响应的头部信息。这种在`curl`发起的请求中也是可能实现的。在这个例子中，`-s`选项表明这个请求是一个静默请求(隐藏进度和错误信息)。第二部分`-o /dev/null`表示丢弃响应体。第三部分`-D -`表示将头部信息转存到一个文件中，这个例子中的文件是`-`，代表标准输出。通过连接上面几个选项，`curl`就能实现只打印出响应的头部信息。