# Save the Response to a File (TLDR: Use -o argument)

> [原文地址](https://catonmat.net/cookbooks/curl/save-response-to-file)

[[toc]]

下面的例子演示了怎么将一个请求的响应保存在一个文件中。默认情况下，`curl`会在屏幕上打印出响应的内容。吐过你想将一个响应保存在文件中，可以使用`-o file`选项。

## Save the Response from a GET Request to a File

```bash
curl -o response.txt https://www.baidu.com
```

这个例子中将对`https://www.baidu.com`发起的请求的响应保存在了文件`response.txt`中

## Use the Last Fragment of a URL as the Filename

```bash
curl -O https://www.baidu.com/index.html
```

这个例子中在发起请求的时候使用了`-O`选项。这个选项会告诉`curl`使用请求链接的最后一部分作为文件名，并保存在相应的文件中。这个例子中的请求链接是`https://www.baidu.com/index.html`，其最后一部分是`index.html`。所以这个请求的响应就会保存在`index.html`中。