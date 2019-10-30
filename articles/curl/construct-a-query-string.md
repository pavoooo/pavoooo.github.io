# Construct a Query String (TLDR: Use -G argument)

> [原文地址](https://catonmat.net/cookbooks/curl/construct-query-string)

[[toc]]

下面这些关于`curl`的例子主要就是用来向你展示怎么为`get`请求构造查询参数。这种情况下我们需要指定`-G`参数，同时也需要使用`-d`或者`--data-urlencode`选项来设置数据。这些数据将会作为查询字符串拼接在请求链接中。

## Construct Two Query Arguments

```bash
curl -G -d 'q=kitties' -d 'count=20' https://httpbin.org/get
```

在这个例子中，我们使用`-G`选项告诉`curl`命令为我们构造查询参数。同时使用了两个`-d`选项设置了两个查询参数。`curl`会将它们拼接成`q=kitties&count=20`的形式并将它们添加在请求链接`https://httpbin.org/get`的后面。然后向`https://httpbin.org/get?q=kitties&count=20`发送一个`get`请求。注意，如果你遗忘了`-G`选项，那么这个请求就会被作为一个`post`请求。

```json
{
  "args": {
    "count": "20",
    "q": "kitties"
  },
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get?q=kitties&count=20"
}
```

## URL-encode a Query Argument

```bash
curl -G --data-urlencode 'comment=this cookbook is awesome' https://httpbin.org/get
```

这个例子使用`--data-urlencode`选项，它的用法和`-d`选项一致。但是`curl`会对它所指定的值进行编码。上面这个参数所指定的值会被编码成`this%20cookbook%20is%20awesome`。然后`curl`会对`https://httpbin.org/get?comment=this%20cookbook%20is%20awesome`发起一个`get`请求。

```json
{
  "args": {
    "comment": "this cookbook is awesome"
  },
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get?comment=this cookbook is awesome"
}
```