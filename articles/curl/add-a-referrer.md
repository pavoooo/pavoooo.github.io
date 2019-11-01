# Add a Referrer (TLDR: Use -e argument)

> [原文地址](https://catonmat.net/cookbooks/curl/add-referrer)

[[toc]]

下面这些例子展示了怎么在`curl`请求中添加`referrer`。web服务器通常会检查一个请求的`referrer`来判断请求的合法性。所以，你最好知道怎么来设置它。为了在`curl`请求中设置`referrer`，我们可以使用`-e`选项。比如`-e 'https://url.com'`。

## Add a Referrer

```bash
curl -e 'https://google.com?q=cats' https://httpbin.org/get
```

这个例子使用`-e`选项将`http`的`referrer`设置为`https://google.com?q=cats`并向`https://httpbin.org/get`发起请求。服务所有者可能会检测`referrer`的合法性，经过我们如此设置，即使服务所有者也不能发现我们在欺骗他。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "Referer": "https://google.com?q=cats",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```

## Send an Empty Referrer

```bash
curl -e '' https://httpbin.org/get
```

将`-e`选项设置为一个空值，会将请求头中的`Referer`清空。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "Referer": "",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```

## Send a Referer via the -H argument

```bash
curl -H 'Referer: https://digg.com' https://httpbin.org/get
```

除了使用`-e`选项设置`referer`，我们也可以使用`-H`选项将请求头`Referer`设置为某个网址来达到设置`referer`的目的。这个例子中将`Referer`设置为`https://digg.com`。web服务也会认为这个请求是从这个地址发起的。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "Referer": "https://digg.com",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```