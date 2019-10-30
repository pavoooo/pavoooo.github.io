# Make a POST Request (TLDR: Use `-X POST` argument)

> [原文地址](https://catonmat.net/cookbooks/curl/make-post-request)

[[toc]]

这篇文章向你介绍怎么使用`curl`发送`post`请求。默认情况下，`curl`发送的是`get`请求。为了发送`post`请求，需要在命令行中指定`-X POST`参数。同时，可以使用`-d`参数来指明`post`请求需要发送的数据。如果想设置`Content-Type`参数来明确发送的数据的类型，可以使用`-H`参数指定。

## Send an Empty POST Request

```bash
curl -X POST "https://httpbin.org/post"
```

上面的命令使用`-X POST`参数对`https://httpbin.org/post`发起了一个`post`请求。它没有发送任何数据给服务器，一旦接收到服务器的响应，就会在终端上将收到的数据打印出来。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "0",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## Send a POST Request with Form Data

```bash
curl -d 'login=emma&password=123' -X POST "https://httpbin.org/post"
```

上面那个命令对`https://httpbin.org/post`发送一个`post`请求，并在请求体中携带`login=emma&password=123`数据。当使用`-d`参数的时候，`curl`会将`Content-Type`请求头设置为`application/x-www-form-urlencoded`。另外，当设置了`-d`选项的时候，`curl`会忽略`-X POST`参数并自动的将请求设置为`POST`。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "login": "emma",
    "password": "123"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "23",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## Skipping the -X Argument

```bash
curl -d 'login=emma&password=123' "https://httpbin.org/post"
```

上面那个命令我们没有明确指定`-X POST`参数，`curl`仍然会发送一个`post`请求。因为`-d`参数被设置后，`curl`会隐式的将请求设置为`post`。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "login": "emma",
    "password": "123"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "23",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

如果我们省略了`-d`参数

```bash
curl  "https://httpbin.org/post"
```

会得到如下响应

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>405 Method Not Allowed</title>
<h1>Method Not Allowed</h1>
<p>The method is not allowed for the requested URL.</p>
```

## A Neater Way to POST Data

上面的例子都是使用一个`-d`参数来发送全部的请求体数据，比如`login=emma&password=123`。这里有一个更简洁的方式来做相同的事情，而且会使命令更加易读。使用多个`-d`参数来替代一个`-d`参数的形式，每个`-d`参数都能使用`key=value`的形式来指明需要发送的数据。`curl`在发送数据的时候会使用`&`分隔符将多个`-d`指定的参数连接在一起。

```bash
curl -d 'login=emma' -d 'password=123' "https://httpbin.org/post"
```

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "login": "emma",
    "password": "123"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "23",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## Send a POST Request and Follow a Redirect

```bash
curl -L -d 'tweet=hi' "https://api.twitter.com/tweet"
```

这个例子使用`-L`参数告诉`curl`跟踪任何可能遇见的重定向。默认情况下，`curl`并不会跟踪重定向链接，所以我们需要明确指定`-L`参数让`curl`跟踪重定向地址。

## Send a POST Request with JSON Data

```bash
curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://httpbin.org/post
```

在这个例子中，`curl`通过`post`请求发送一段`json`数据。对于这种情况，我们需要将`json`数据传递给`-d`参数，并通过`-H`选项设置`Content-Type`请求头为`application/json`。将请求头`Content-Type`设置为`application/json`是必要的，不然服务器是无法明确知道我们传递的数据类型。

```json
{
  "args": {},
  "data": "{\"login\": \"emma\", \"pass\": \"123\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "32",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": {
    "login": "emma",
    "pass": "123"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## Send a POST Request with XML Data

```bash
curl -d '<user><login>ann</login><password>123</password></user>' -H 'Content-Type: text/xml' https://httpbin.org/post
```

这个例子通过`post`请求传递`xml`数据给服务器。和传递`json`类型的数据一样，我们需要通过`-d`来明确指定传递的数据并通过`-H`参数将请求头`Content-Type`设置为`text/xml`

```json
{
  "args": {},
  "data": "<user><login>ann</login><password>123</password></user>",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "55",
    "Content-Type": "text/xml",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## Send a POST Request with Plain Text Data

```bash
curl -d 'hello world' -H 'Content-Type: text/plain' https://httpbin.org/post
```

这个例子通过`post`请求传递纯文本数据给服务器。和传递`json`类型的数据一样，我们需要通过`-d`来明确指定传递的数据并通过`-H`参数将请求头`Content-Type`设置为`text/plain`

```json
{
  "args": {},
  "data": "hello world",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "11",
    "Content-Type": "text/plain",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## Send a POST Request with Data from a File

```bash
curl -d '@jsconfig.json' https://httpbin.org/post
```

这个例子通过`post`请求将`jsconfig.json`中的内容发送给服务器。其中`@`是一个特殊的前缀，它相当于告诉`curl`先读取`jsconfig.json`中的内容，然后将对应的内容作为请求体发送给服务器。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "{  \"compilerOptions\": {    \"experimentalDecorators\": true,    \"baseUrl\": \".\",    \"paths\": {      \"component/*\": [\"src/*\"]    }  }}": ""
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "130",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## URL-encode POST Data

```bash
curl --data-urlencode 'comment=hello world' https://httpbin.org/post
```

到目前为止，我们都是通过`-d`选项将参数传递给`post`请求。`-d`是假定你的参数已经被编码过了，如果没有，可能会造成一些错误。如果你的参数没有被编码过，使用`--data-urlencode`选项来代替`-d`选项。它和`-d`的使用方式相同，但是会在数据发送之前对其进行编码。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "comment": "hello world"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "21",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## POST a Binary File

```bash
curl -F 'file=@blog/app1.png' https://httpbin.org/post
```

这个例子使用`-F`参数强制`curl`发起一个`multipart form data post`请求。它是一个十分复杂的请求类型，但是在传输二进制数据的时候是十分高效的。在这个例子中，`curl`会读取`blog/app1.png`文件的内容并上传到`https://httpbin.org/post`上。`-F`选项也会将请求头的`Content-Type`强制设置为`multipart/form-data`。

```json
> POST /post HTTP/1.1
> Host: httpbin.org
> User-Agent: curl/7.54.0
> Accept: */*
> Content-Length: 346623
> Expect: 100-continue
> Content-Type: multipart/form-data; boundary=------------------------e3bb3b95cde52c32
```

## POST a Binary File and Set Its MIME Type

```bash
curl -F 'file=@blog/app1.png;type=image/png' https://httpbin.org/post
```

与上个例子相似，这个例子同样使用`-F`参数来上传一个二进制文件。同时我们也声明了这个文件的`mime type`是`image/png`。如果我们没有明确声明具体的类型。`curl`会将其设置为`application/octet-stream`。

## POST a Binary File and Change Its Filename

```bash
curl -F 'file=@blog/app1.png;type=image/png;filename=me.png' https://httpbin.org/post
```

和上面两个例子相似，同样使用`-F`选项来上传一个二进制图片到服务器。此外，我们也明确指定了文件名称是`me.png`。如果我们没有明确指定`filename`，服务器是无法知道我们上传的文件名称的，因为它无法获取到文件原始名称，如`app1.png`。