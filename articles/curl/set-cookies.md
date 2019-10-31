# Set Cookies (TLDR: Use -b name=value argument)

> [原文地址](https://catonmat.net/cookbooks/curl/set-cookies)

[[toc]]

下面这些例子向你展示怎么在`curl`的请求中发送`cookie`。默认情况，`curl`是不会发送任何`cookie`的，但是你可以通过`-b 'name=value'`选项明确指定需要发送的`cookie`。为了保存服务端发送的`cookie`，你也可以通过`-c file`选项，同样你也可以使用`-b file`加载`cookie`。

## Add a Cookie

```bash
curl -b 'session=abcdef' https://httpbin.org/get
```

这个例子使用`-b name=value`形式设置了一个名为`session`值为`abcdef`的`cookie`。进行了这个设置后，就会在请求头中携带`"Cookie": "session=abcdef"`请求头。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Cookie": "session=abcdef",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get"
}
```

## Add Two Cookies

```bash
url -b 'session=abcdef' -b 'loggedin=true' https://httpbin.org/get
```

如果通过两个`-b`选项来指定两个`cookie`，那么后面的选项会覆盖掉前面的。所以在请求头中只会携带`"Cookie": "loggedin=true"`一个`cookie`。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Cookie": "loggedin=true",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get"
}
```

## Add an Empty Cookie

```bash
curl -b 'session=' https://httpbin.org/get
```
这个例子在`-b`选项中只指定了`cookie`的名称而没有为其设置值。这样在请求头中会发送`Cookie: session=`形式的`cookie`数据给服务器。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Cookie": "session=",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get"
}
```

## Save Cookies to a File

```bash
curl -c cookies.txt https://httpbin.org/cookies
```

这个例子使用`-c cookies.txt`选项将服务端返回的`cookie`数据保存在`cookies.txt`文件中。当`curl`向`https://httpbin.org/cookies`发起请求的时候，服务器进行响应的时候会携带响应头`Set-Cookie`。`curl`会自动的取出他们并将它们保存在`cookies.txt`文件中。

```json
{
  "cookies": {
      "name": "hello world"
  }
}
```

## Load Cookies from a File

```bash
curl -b cookies.txt https://httpbin.org/cookies
```

这个例子`culr`会从`cookies.txt`中加载`cookie`的数据并发送给服务器。