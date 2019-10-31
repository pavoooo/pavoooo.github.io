# Change the User Agent (TLDR: Use -A argument)

> [原文地址](https://catonmat.net/cookbooks/curl/change-user-agent)

[[toc]]

下面的例子向你展示怎么在`curl`请求中改变请求头中的`User-Agent`字段。默认情况下，`curl`设置`User-Agent`字段为`curl/version`。但是通常情况下，你需要在请求中使用浏览器真实的`User-Agent`。为了实现这个功能，你可以使用`-A 'User Agent String'`选项。

## Change the User Agent to Firefox

```bash
curl -A 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0' https://httpbin.org/get
```

这个例子使用`-A`选项将请求头的`User-Agent`设置为Firefox 60的`User-Agent`--`Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0`。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```

## Change the User Agent to Chrome

```bash
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://httpbin.org/get
```

和上面的例子相同，这里将请求头的`User-Agent`设置为`chrome`浏览器的`User-Agent`--`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36`

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
  },
  "origin": "115.236.43.146, 115.236.43.146",
  "url": "https://httpbin.org/get"
}
```

## Pretend to be a Google Bot

```bash
curl -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' https://httpbin.org/get
```

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get"
}
```

## Remove the User Agent

```bash
curl -A '' https://httpbin.org/get
```

这个例子中，我们给`-A`传递一个空的参数。空字符串就是用来告诉`curl`在发送请求的时候不要发送`User-Agent`字段。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org"
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get"
}
```

## Send an Empty User Agent

```bash
curl -A '' -H 'User-Agent;' https://httpbin.org/get
```

这个例子比较特殊，首先我们使用`-A`选项移除默认的`User-Agent`，然后通过`-H`选项设置一个值为空的`User-Agent`请求头。注意，在`User-Agent`后面同样有一个`;`。这种方式会向服务器发送一个值为空字符串的`User-Agent`。

```json
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": ""
  },
  "origin": "115.192.111.1, 115.192.111.1",
  "url": "https://httpbin.org/get"
}
```