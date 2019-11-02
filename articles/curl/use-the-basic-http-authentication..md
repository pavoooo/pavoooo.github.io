# Use the Basic HTTP Authentication (TLDR: Use -u user:pass argument)

> [原文地址](https://catonmat.net/cookbooks/curl/use-basic-http-authentication)

[[toc]]

下面的例子想你演示了怎么在`curl`请求中处理`http`服务的认证等相关信息。我们可以使用形如`-u user:pass`选项。如果你省略了密码，但是保留了`:`，`curl`会认为密码为空。如果你省略了密码，并且省略了`:`，`curl`会提示你输入密码。

## Set the Username and Password via the -u Argument

```bash
curl -u 'bob:12345' https://httpbin.org/bearer
```

在这个例子中，我们使用`-u 'bob:12345'`选项，设置了用户名是`bob`，密码是`12345`。`curl`会对用户名和密码进行base64编码后，将其作为请求头`Authorization`字段的值，发送给服务器。这个例子中的请求头`Authorization`会被设置为`Authorization: Basic Ym9iOjEyMzQ1`。

## Set the Username and Password in the URL

```bash
curl https://bob:12345@httpbin.org/bearer
```

这个例子中将认证的用户名和密码写入了请求链接。`curl`会智能的识别出相关的认证信息后进行`http`认证的请求操作。

## Use an Empty Password

```bash
curl -u 'bob:' https://httpbin.org/bearer
```

这个例子只设置了`user:pass`中的`user:`部分，并没有明确指定`pass`。在这种情况下，`pass`会被认为是空。如果后端服务允许无密码的用户的请求，那么这次认证就会成功，否则就会失败。

## Make Curl Prompt for the Password

```bash
curl -u 'bob' https://httpbin.org/bearer
```

这个例子中的认证信息省略了关于密码的部分。在这种情况下，`curl`会提示用户输入密码，如果你不想将密码保存在shell的历史记录中，使用这种操作方式是十分实用的。