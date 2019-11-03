# Debug Curl Requests (TLDR: Use -v or --trace arguments)

> [原文地址](https://catonmat.net/cookbooks/curl/debug-curl-requests)

[[toc]]

下面的这些例子演示了怎么调试`curl`请求来查看发送和接收的数据。默认情况下，`curl`只打印出响应体。为了打印出全部的响应信息，包括请求头，`SSL`证书协商，响应头，以及响应体。可以使用`-v`选项。如果想显示以十六进制的格式来显示数据，可以使用`--trace`选项。如果只想打印出响应头和响应体，可以使用`-i`选项。

## Make Curl Verbose

```bash
curl -v https://www.baidu.com
```

这个例子中使用`-v`选项打印出`curl`请求和响应的详细信息。以`>`开头的数据是发送给服务器的，以`<`开头的数据是从服务器接收到的，以`*`开头的数据表示的是其他信息，比如连接相关的信息，`SSL`的握手信息，以及协议相关的信息。

## Detailed Trace

```bash
curl --trace - https://www.baidu.com
```

这个例子使用了`--trace -`选项，它能够将请求和接收的数据全打印出来。`trace`也会以十六进制的格式打印出所有的请求和接收到的字节数据。

## Detailed Trace with Timestamps

```bash
curl --trace - --trace-time https://www.baidu.com 
```

如果在请求中使用了`--trace-time`选项，会将发送和接收到的数据的时间也打印出来。

## Include Response Headers in the Output

```bash
curl -i https://www.baidu.com 
```

默认情况下，`curl`只会在屏幕上打印出响应体。这个例子中使用了`-i`选项，它能够在屏幕上打印出响应头。如果设置了这个选项，`curl`会先打印出响应头，然后是一个空行，其次是响应体信息。

## Print Only the Response Headers

```bash
curl -s -o /dev/null -D - https://www.baidu.com
```

出于某些原因，你可能只想打印出响应的头部信息。这种在`curl`发起的请求中也是可能实现的。在这个例子中，`-s`选项表明这个请求是一个静默请求(隐藏进度和错误信息)。第二部分`-o /dev/null`表示丢弃响应体。第三部分`-D -`表示将头部信息转存到一个文件中，这个例子中的文件是`-`，代表标准输出。通过连接上面几个选项，`curl`就能实现只打印出响应的头部信息。

## Print Only the Request Headers

```bash
curl -v -s -o /dev/null --stderr - https://www.baidu.com | grep '^>'
```

只打印`curl`请求的请求头部信息不是一件容易的事情。这个例子中使用`-v`选项打印出`curl`请求和响应的详细信息，使用`-s`选项使`curl`静默请求，使用`-o /dev/null`禁止将输出打印到屏幕上，使用`--stderr -`将标准错误输出重定向到标准输出，最后使用`grep`过滤出请求头部信息。

## Print Only the Response Code

```bash
curl -w '%{response_code}' -s -o /dev/null https://www.baidu.com
```

这个例子中使用`-w`选项让`curl`在请求完成后打印出其它额外的信息。这里的额外信息我们使用`%{response_code}`，表示响应的状态码信息。为了让`curl`只打印出状态码而不打印出其它信息，我们又指定了`-s`和`-o /dev/null`选项。