# Make Curl Slow (TLDR: Use --limit-rate argument)

> [原文地址](https://catonmat.net/cookbooks/curl/make-curl-slow)

[[toc]]

下面的例子演示了怎么使用`curl`进行慢请求和慢响应。默认情况下，`curl`请求会使用最大的带宽速度。如果你想指定请求或者响应速度的最大值，可以使用`--limit-rate speed`选项。

## Limit Curl to 200 Kilobytes per Second

```bash
curl --limit-rate 200k https://www.baidu.com
```

这个例子使用`--limit-rate 200k`选项限制了请求和响应的最大速度为`200k/s`。除了使用`k`作为单位，你也可以使用`m`或者`g`来作为单位。

## Limit Curl to 1 byte per Second

```bash
curl --limit-rate 1 https://www.baidu.com
```

这个例子中没有对`--limit-rate`指定明确的单位，`curl`默认会使用`byte`作为单位。所以，上面的例子中所限定的速度就是`1byte/s`。