# Add HTTP Headers (TLDR: Use -H argument)

> [原文地址](https://catonmat.net/cookbooks/curl/add-http-headers)

[[toc]]

下面的例子主要展示怎么添加请求头，主要使用`-H`选项。比如：`-H 'Header: Value'`

## Add a Single Header

```bash
curl -H 'Accept-Language: en-US'  "https://httpbin.org/get"
```

这个例子使用`-H`选项将`Accept-Language: en-US`添加到`get`请求的请求头中。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Language": "en-US",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```

## Add Two Headers

```bash
curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy'  "https://httpbin.org/get"
```

这个例子使用两个`-H`选项为`get`请求添加两个请求头。如果需要添加多个请求头，可以使用多个`-H`选项。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Language": "en-US",
    "Host": "httpbin.org",
    "Secret-Message": "xyzzy",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```

## Add an Empty Header

```bash
curl -H 'Puppies;' "https://httpbin.org/get"
```

在这个例子中，我们给这个`get`请求添加了一个空的请求头。我们只传递`Puppies;`(注意后面的`;`)作为`-H`的参数。`curl`会将其转换成含有空值的请求头`Puppies:`。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "Puppies": "",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```