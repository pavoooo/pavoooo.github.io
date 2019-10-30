# Add POST Data to a Request (TLDR: Use `-d var=val` argument)

> [原文地址](https://catonmat.net/cookbooks/curl/add-post-data)

[[toc]]

下面这些例子向你展示了在使用`curl`发送`post`请求的时候怎么传输数据。如果需要添加编码后的`form data`，可以使用`-d`选项。如果需要让`curl`自己处理编码，可以使用`--data-urlencode`选项。如果需要传输`multipart form data`，可以使用`-F`选项。

## Send Form Data

```bash
curl -d 'name=johnny%20depp' https://httpbin.org/post
```

这个例子使用`-d`选项将参数`name=johnny%20depp`添加到`post`请求的请求体中。当使用`-d`选项的时候，`curl`会自动的在请求头中添加`Content-Type: application/x-www-form-urlencoded`。这个请求头告诉服务器客户端发送的是已经编码后的数据。所以，一定要切记`-d`所指定的`key=value`参数一定是编码后的数据。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "johnny depp"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "18",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/post"
}
```

## URL-encode and Send Form Data

```bash
curl --data-urlencode 'name=john depp' https://httpbin.org/post
```

这个例子使用`--data-urlencode`选项添加`post`请求的请求体。这个选项的使用方式和`-d`相同，但它会对数据进行编码。在这个例子中，请求体会被编码为`name=jhon%20depp`然后发送给服务器。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "john depp"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/post"
}
```

## Using Multiple -d Arguments

```bash
curl -d 'foo=bar' -d 'baz=quux' https://httpbin.org/post
```

上面的例子都是使用了一个`-d`选项，但是你可以使用多个`-d`选项来多次设置参数。`curl`在发送请求前会自动的合并它们。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "baz": "quux",
    "foo": "bar"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/post"
}
```

## Send Multipart Data

```bash
curl -F 'name=johnny' https://httpbin.org/post
```

这个例子使用`-F`选项指定`post`请求发送`multipart form data`。当发送`multipart form data`的时候，`curl`会将请求头`Content-Type`设置为`multipart/form-data`。如果你需要上传图片或者其它二进制数据，需要指定这种`Content-Type`。

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "johnny"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "145",
    "Content-Type": "multipart/form-data; boundary=------------------------635fb0bc10f0851a",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/post"
}
```

## Upload an Image

```bash
curl -F 'file=@blog/app1.png' https://httpbin.org/post
```

这个例子使用`-F`参数指定传输的数据，和上面的例子不同的是这次通过`-F`参数指定需要发送的数据是一个图片。通过指定`-F`选项，图片会被进行base64编码后上传给服务器。

## Upload an Image and Change Its Filename

```bash
curl -F 'file=@blog/app1.png;filename=a.png' https://httpbin.org/post
```

这个例子在`file=@blog/app1.png`后面加了`filename=a.png`参数。这个参数就是用来指定所上传的文件的名称，`curl`会读取`blog/app1.png`的内容上传并同时告诉服务器文件的名称是`a.png`。

## Send JSON Data

```bash
curl -H 'Content-Type: application/json' -d '{"query": "cats"}' https://httpbin.org/post
```

这个例子中的`post`请求，`curl`发送一段`json`数据给服务器。同样使用`-d`选项来指定发送的数据，同时需要设置请求头`Content-Type`为`application/json`。它就是用来告诉服务器客户端发送数据的数据格式。

```json
{
  "args": {},
  "data": "{\"query\": \"cats\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "17",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": {
    "query": "cats"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/post"
}
```

## Send XML Data

```bash
curl -H 'Content-Type: text/xml' -d 'hello' https://httpbin.org/post
```

和发送`json`类型的数据一样，发送`xml`类型的数据同样需要使用`-d`选项来明确指定需要发送的数据，同时指定请求头`Content-Type`为`text/xml`。

```json
{
  "args": {},
  "data": "hello",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "5",
    "Content-Type": "text/xml",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "json": null,
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/post"
}
```