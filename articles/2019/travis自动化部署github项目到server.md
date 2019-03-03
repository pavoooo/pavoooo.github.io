# travis自动化部署github项目到server

`travis`是目前市场上比较流行的进行持续集成服务的工具之一。所谓的持续集成就是说只要代码有变更，它就能够自动的进行构建，测试，发布等一系列的流程。`travis`能够和我们`github`上的项目进行绑定，一旦我们项目对应分支上的内容发生变化，它就能自动的进行持续集成服务，把变更同步到远程服务器上。这就使下面的开发流程成为了可能

```bash
本地项目开发 -->
推送变更到github -->
travis监测到内容变化 -->
自动拉取最新代码 -->
基于最新代码进行构建，测试 -->
所有流程成功后，同步到我们自己的远程服务器 -->
触发远程服务器上的构建和部署等工作
```

上面的流程中只有前两步需要我们手工操作，后面的一系列流程都是通过持续集成服务自动完成，这可以让我们只关注于业务开发即可。这篇文章的目的就是从零构建一个项目，通过持续集成服务自动部署到服务器，最后，利用`Nginx`实现项目的可访问。

## 环境准备

- `github`一个权限是`public`的项目(`travis`对`private`的项目收费)
- 云服务器(`travis`可连接)
- 终端连接工具(我用的是`iTerm`)

## 创建项目

首先在`github`上创建一个`public`项目，创建的过程这里就不再详述，创建成功后，克隆到本地。

```bash
git clone https://github.com/zhaosaisai/publish-system.git
```

> 后面我会以自己的项目`publish-system`来演示整个过程，实际操作的时候，需要换成自己的项目。

然后，进入到项目中。为了能够演示完整的流程，这里我就先把项目初始化一个`vue`工程

```bash
cd publish-system
vue init webpack-simple .
```

把变更推送到远程`master`分支

```bash
git add .
git commit -m "Init project"
git push origin master
```

> 实际开发中我们一般会有一些开发分支，这些分支稳定后会合并到`master`上。这里主要是因为后面`travis`监听的就是`master`分支的变化，为了方便，我这里就直接在`master`分支上进行操作了。

项目初始化好以后，接下来需要做的工作就是将我们的`github`工程和`travis`关联起来

## 绑定`travis`

使用自己的`github`用户登录[https://travis-ci.org/](https://travis-ci.org/)，登录成功后，`travis`会自动帮我们同步所有的`github`工程。找到需要`travis`进行构建的项目，打开后面的开关。

![](/blog/travis4.png)

### 添加.travis.yml

上面的开关打开后，`travis`就会监听这个仓库的所有的变化。但是`travis`并不知道在仓库发生变化后需要做什么，这里就要求我们需要在对应项目的根目录下面创建一个`.travis.yml`文件。这是`travis`的配置文件，里面描述了`travis`需要做的各种行为，这个文件必须放在项目的根目录下面，一旦项目发生变化，`travis`就会根据这个文件的配置去做各种操作。所以，在这里我们需要在项目的根目录下面添加一个`.travis.yml`文件。

```bash
touch .travis.yml
```

然后添加如下内容

```yml
language: node_js
node_js:
- 8
branches:
  only:
  - master
script:
- echo "build"
```

这个文件告诉`travis`这个项目是一个`noed.js`的项目，使用的`node.js`的版本是`@8`，只有当`master`分支发生变化的时候才会去执行构建任务，这里只是简单的运行了一条命令`echo "build"`。

将内容的变更推送到远程仓库的`master`分支上，这时你就能发现`travis`开始根据`.travis.yml`中的配置进行持续集成的工作了。构建结束后，就能在网页中的终端控制台中看到`script`的执行结果了

![](/blog/travis5.png)

## ssh免密登录远程服务器

之前的步骤没有什么难以理解的地方，到此，我们能够实现项目变更后`travis`能够自动进行一些持续集成的任务了。但我们所希望的是在持续集成结束后`travis`能够自动将更新同步到我们的远程服务器或者通知我们的服务器进行更新同步。这种操作首先需要解决的就是`travis`能够连接我们的远程服务器。但`travis`不像我们本地的交互式终端，输入用户名和密码后就能登录到服务器。另一方面，这一操作也不能完全自动化的去完成。所以，我们只能利用其它的方式让`travis`能够自动登录到我们的服务器。这种方式就是我们即将提到的**ssh免密登录**。

**ssh免密登录**利用的是**非对称加密**的方式。基本步骤就是

- 在客户端生成`公钥`和`私钥`
- 然后将`私钥`保存在客户端的`~/.ssh/id_rsa`中，将`公钥`保存在服务器的`~/.ssh/authorized_keys`文件中

更改文件的权限后，我们就能直接通过`ssh`免密登录我们的服务器。但是我们是无法操作`travis`的客户端的，但是如果我们了解`ssh`免密登录的原理后，你会发现公钥和私钥在什么地方生成都行，最重要的是两个要成对。

> ssh免密登录的大致过程就是：客户端向服务器发起登录请求，服务器向客户端返回一段随机字符串，客户端收到这段字符串后使用自己的私钥进行加密，然后发给服务器。服务器接收后使用自己保存的公钥解密，如果解密后的数据相等就登录成功，否则断开连接。

所以，公钥和私钥的生成我们完全可以在自己的服务器上进行操作。首先，登录到自己的服务器

```bash
ssh root@118.24.204.202
```

生成密钥对之前，我们先创建一个`travis`连接的用户

```bash
# 添加publish用户
useradd publish
# 添加密码
passwd publish
# 添加sudoer权限
vim /etc/sudoers

# 加入 
# publish  ALL=(ALL)   ALL
```

接着，切换到`publish`用户

```bash
su publish
```

下面开始进行密钥对的生成

```bash
[publish@VM_0_12_centos ~]$ ssh-keygen -t rsa

Generating public/private rsa key pair.
Enter file in which to save the key (/home/publish/.ssh/id_rsa):
Created directory '/home/publish/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/publish/.ssh/id_rsa.
Your public key has been saved in /home/publish/.ssh/id_rsa.pub.
The key fingerprint is:
b6:c5:e8:4a:6a:e8:63:e9:79:47:c6:77:a2:24:be:3f publish@VM_0_12_centos
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|                 |
|                 |
|         o       |
|     .  S o      |
|    . =ooo.      |
|   + =.ooo       |
|  =.+oE.         |
| +++o+o.         |
+-----------------+
```

::: danger
Enter passphrase 这一步直接设置为空
:::

```bash
# 然后就会发现加目录下面的.ssh目录中多了两个文件
[publish@VM_0_12_centos ~]$ ll ~/.ssh/
总用量 8
-rw------- 1 publish publish 1679 3月   3 10:04 id_rsa
-rw-r--r-- 1 publish publish  404 3月   3 10:04 id_rsa.pub
[publish@VM_0_12_centos ~]$ ls -al
总用量 28
drwx------  3 publish publish 4096 3月   3 10:04 .
drwxr-xr-x. 3 root    root    4096 2月  27 21:27 ..
-rw-------  1 publish publish  500 3月   3 10:05 .bash_history
-rw-r--r--  1 publish publish   18 8月   3 2016 .bash_logout
-rw-r--r--  1 publish publish  193 8月   3 2016 .bash_profile
-rw-r--r--  1 publish publish  231 8月   3 2016 .bashrc
drwx------  2 publish publish 4096 3月   3 10:04 .ssh
```

密钥生成后，我们需要更改`.ssh`和`.ssh/*`的权限。一般设置`.ssh`的权限是`700`(可能默认就是)，`.ssh/*`的权限是`600`。

```bash
[publish@VM_0_12_centos ~]$ chmod 600 ~/.ssh/*
[publish@VM_0_12_centos ~]$ ll ~/.ssh/
总用量 8
-rw------- 1 publish publish 1679 3月   3 10:04 id_rsa
-rw------- 1 publish publish  404 3月   3 10:04 id_rsa.pub
```

然后将生成的公钥(`id_rsa.pub`)中的内容添加到`.ssh/authorized_keys`中

```bash
[publish@VM_0_12_centos ~]$ touch ~/.ssh/authorized_keys
[publish@VM_0_12_centos ~]$ cat ~/.ssh/id_rsa.pub >>  ~/.ssh/authorized_keys
[publish@VM_0_12_centos ~]$ cat  ~/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCt28duvuem+0YweqQA4gzOhEJEv7uPgl6btH...
```

到此，密钥对已经生成完成。下面，我们就需要测试一下免密登录的操作是否能成功。

```bash
[publish@VM_0_12_centos .ssh]$ touch config
```

然后在`config`中添加如下内容

```bash
Host test
# 你需要登录的主机ip
HostName 118.24.204.202
# 你需要登录的用户名
User publish

IdentitiesOnly yes

IdentityFile ~/.ssh/id_rsa
```

> HostName需要换成自己的

```bash
[publish@VM_0_12_centos .ssh]$ ll
总用量 12
-rw-rw-r-- 1 publish publish  404 3月   3 10:09 authorized_keys
-rw-rw-r-- 1 publish publish    0 3月   3 10:11 config
-rw------- 1 publish publish 1679 3月   3 10:04 id_rsa
-rw------- 1 publish publish  404 3月   3 10:04 id_rsa.pub
[publish@VM_0_12_centos .ssh]$ ssh test
Bad owner or permissions on /home/publish/.ssh/config
```

运行`ssh test`后报错`Bad owner or permissions on /home/publish/.ssh/config`。这里同样要求我们要把`.ssh/config`和`.ssh/authorized_keys`权限设置为`600`。

```bash
[publish@VM_0_12_centos .ssh]$ chmod 600 config
[publish@VM_0_12_centos .ssh]$ chmod 600 authorized_keys
[publish@VM_0_12_centos .ssh]$ ll
总用量 12
-rw------- 1 publish publish  404 3月   3 10:09 authorized_keys
-rw------- 1 publish publish    0 3月   3 10:11 config
-rw------- 1 publish publish 1679 3月   3 10:04 id_rsa
-rw------- 1 publish publish  404 3月   3 10:04 id_rsa.pub
```

然后执行`ssh test`

```bash
[publish@VM_0_12_centos .ssh]$ ssh test
The authenticity of host '118.24.204.202 (118.24.204.202)' can't be established.
ECDSA key fingerprint is a3:d8:b0:f6:cb:6f:c0:f6:9a:4e:e5:6c:69:35:d6:fd.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '118.24.204.202' (ECDSA) to the list of known hosts.
Last login: Sun Mar  3 10:00:35 2019 from 115.193.184.147

[publish@VM_0_12_centos ~]$ ls .ssh/
authorized_keys  config  id_rsa  id_rsa.pub  known_hosts
```

出现上面输出就表示我们的免密登录配置成功，同时在`.ssh/`下多了一个`known_hosts`文件。

下面我们就需要将上面的密钥对中的私钥放在`travis`上，但是我们是无法直接操作`travis`服务器的，因此我们也就不能将私钥放在`travis`服务器上。但是，我们可以将私钥放在`travis`服务器能够读取的地方，因为`travis`是能够直接读取我们项目的工程的，所以，我们可以将私钥放在我们的项目中，`travis`提供了对私钥进行加密的功能，我们可以将私钥加密之后放在我们的工程中，当`travis`需要连接我们的服务器时，就解密这个私钥用于连接。

## 安装travis客户端

`travis`是通过`gem`进行安装的，`gem`是`ruby`的管理工具。所以我们需要先安装`ruby`，安装`ruby`我们可以使用`ruby`的版本控制工具`rvm`，它就相当于我们`Node`界中的`nvm`。

### 安装rvm

```bash
[publish@VM_0_12_centos ~]$ curl -sSL https://get.rvm.io | bash -s stable
Downloading https://github.com/rvm/rvm/archive/1.29.7.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.29.7/1.29.7.tar.gz.asc
gpg: 已创建目录‘/home/publish/.gnupg’
gpg: 新的配置文件‘/home/publish/.gnupg/gpg.conf’已建立
gpg: 警告：在‘/home/publish/.gnupg/gpg.conf’里的选项于此次运行期间未被使用
gpg: 钥匙环‘/home/publish/.gnupg/pubring.gpg’已建立
gpg: 于 2019年01月04日 星期五 06时01分48秒 CST 创建的签名，使用 RSA，钥匙号 39499BDB
gpg: 无法检查签名：没有公钥
```

安装的过程中可能因为签名的问题而失败，我们只需要按照它的提示运行响应的命令即可

```bash
[publish@VM_0_12_centos ~]$ gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
[publish@VM_0_12_centos ~]$ source /home/publish/.rvm/scripts/rvm
[publish@VM_0_12_centos ~]$ rvm --version
rvm 1.29.7 (latest) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
```

`rvm`安装成功后，我们就可以安装`ruby`了

```bash
[publish@VM_0_12_centos ~]$ rvm install ruby # 安装过程有点慢
[publish@VM_0_12_centos ~]$ ruby -v
ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-linux]
```

`ruby`安装成功后，`gem`也就安装成功了。和`npm`同样因为防火墙的问题，我们需要将`gem`源切换成国内的

```bash
[publish@VM_0_12_centos ~]$ gem sources -l
*** CURRENT SOURCES ***

https://rubygems.org/
[publish@VM_0_12_centos ~]$ gem -v
3.0.1
[publish@VM_0_12_centos ~]$ gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
https://gems.ruby-china.com/ added to sources
https://rubygems.org/ removed from sources
[publish@VM_0_12_centos ~]$ gem sources -l
*** CURRENT SOURCES ***

https://gems.ruby-china.com/
```

然后就能安装`travis`客户端了

```bash
[publish@VM_0_12_centos ~]$ gem install travis
Shell completion not installed. Would you like to install it now? |y| y
[publish@VM_0_12_centos ~]$ travis help
Usage: travis COMMAND ...

Available commands:
```

如果有上面的输出，就说明`travis`客户端已经在我们的服务器上安装成功了。下面，我们需要将项目克隆到我们的服务器上

```bash
[publish@VM_0_12_centos ~]$ mkdir projects
[publish@VM_0_12_centos ~]$ cd projects/
[publish@VM_0_12_centos projects]$ git clone https://github.com/zhaosaisai/publish-system.git
[publish@VM_0_12_centos projects]$ cd publish-system/
[publish@VM_0_12_centos publish-system]$ ls -al
总用量 40
drwxrwxr-x 3 publish publish 4096 3月   3 10:46 .
drwxrwxr-x 3 publish publish 4096 3月   3 10:46 ..
drwxrwxr-x 8 publish publish 4096 3月   3 10:46 .git
-rw-rw-r-- 1 publish publish  914 3月   3 10:46 .gitignore
-rw-rw-r-- 1 publish publish  208 3月   3 10:46 index.html
-rw-rw-r-- 1 publish publish 1071 3月   3 10:46 LICENSE
-rw-rw-r-- 1 publish publish  919 3月   3 10:46 package.json
-rw-rw-r-- 1 publish publish  343 3月   3 10:46 README.md
-rw-rw-r-- 1 publish publish  164 3月   3 10:46 .travis.yml
-rw-rw-r-- 1 publish publish 2457 3月   3 10:46 webpack.config.js

# 在项目根目录下 执行　travis的login操作
[publish@VM_0_12_centos publish-system]$ travis login
We need your GitHub login to identify you.
This information will not be sent to Travis CI, only to api.github.com.
The password will not be displayed.

Try running with --github-token or --auto if you don't want to enter your password anyway.

Username: zhaosaisai
Password for zhaosaisai: ***********
Successfully logged in as zhaosaisai!
```

同样使用`github`的账户登录`travis`，然后，先来看看`.travis.yml`文件的内容

```bash
[publish@VM_0_12_centos publish-system]$ cat .travis.yml
# 指定项目开发语言
language: node_js
# 指定node的版本
node_js:
  - 8
# 指定触发构建的分支
branches:
  only:
  - master

script:
- echo 'build'
```

接着对上面生成的私钥进行加密

```bash
[publish@VM_0_12_centos publish-system]$ travis encrypt-file ~/.ssh/id_rsa  --add
Detected repository as zhaosaisai/publish-system, is this correct? |yes| yes
encrypting /home/publish/.ssh/id_rsa for zhaosaisai/publish-system
storing result as id_rsa.enc
storing secure env variables for decryption

Make sure to add id_rsa.enc to the git repository.
Make sure not to add /home/publish/.ssh/id_rsa to the git repository.
Commit all changes to your .travis.yml
```

然后，你就会发现在项目的根目录下多了一个`id_rsa.enc`文件以及`.travis.yml`多了一个`before_install`指令

```bash

[publish@VM_0_12_centos publish-system]$ ls -al
总用量 44
drwxrwxr-x 3 publish publish 4096 3月   3 10:50 .
drwxrwxr-x 3 publish publish 4096 3月   3 10:46 ..
drwxrwxr-x 8 publish publish 4096 3月   3 10:50 .git
-rw-rw-r-- 1 publish publish  914 3月   3 10:46 .gitignore
-rw-rw-r-- 1 publish publish 1680 3月   3 10:50 id_rsa.enc
-rw-rw-r-- 1 publish publish  208 3月   3 10:46 index.html
-rw-rw-r-- 1 publish publish 1071 3月   3 10:46 LICENSE
-rw-rw-r-- 1 publish publish  919 3月   3 10:46 package.json
-rw-rw-r-- 1 publish publish  343 3月   3 10:46 README.md
-rw-rw-r-- 1 publish publish  223 3月   3 10:50 .travis.yml
-rw-rw-r-- 1 publish publish 2457 3月   3 10:46 webpack.config.js

[publish@VM_0_12_centos publish-system]$ cat .travis.yml
language: node_js
node_js:
- 8
branches:
  only:
  - master
script:
- echo 'build'
before_install:
- openssl aes-256-cbc -K $encrypted_ff98517d7fe4_key -iv $encrypted_ff98517d7fe4_iv
  -in id_rsa.enc -out ~\/.ssh/id_rsa -d

```

然后将变更推送到远程`master`分支上，同样会触发`travis`自动构建的工作。但是这次构建你可能会发现如下的错误

![](/blog/travis.png)

这是因为`travis`的`1.8.8`以上的客户端有一个bug，生成的命令的`-out`选项的值多了一个`\`，这会导致报错：

```bash
 ~/.ssh/id_rsa: No such file or directory
```

所以，我们手动将`before_install`中`-out`选项的值中多余的`\`删除即可。

```yml
before_install:
- openssl aes-256-cbc -K $encrypted_ff98517d7fe4_key -iv $encrypted_ff98517d7fe4_iv
  -in id_rsa.enc -out ~/.ssh/id_rsa -d
```

然后将变更推送到远程`master`分支，就不会出现上述错误了，`travis`同样也会构建成功。

## 登录命令

到此，我们就差最后一个步骤了：在`.travis.yml`中添加登录服务器的命令。下面是我完整的`.travis.yml`内容

```yml
language: node_js
node_js:
- 8
branches:
  only:
  - master
install:
- yarn install 
script:
- yarn run build
before_install:
- openssl aes-256-cbc -K $encrypted_****_key -iv $encrypted_****_iv
  -in id_rsa.enc -out ~/.ssh/id_rsa -d
addons:
  ssh_known_hosts:
  - 118.24.204.202
after_success:
- chmod 600 ~/.ssh/id_rsa
- ssh publish@118.24.204.202 -o StrictHostKeyChecking=no 'cd ~/projects && ./sync_publish_system.sh'
```

有两个注意事项：

- ssh_known_hosts需要换成你自己的ip
- ssg命令需要加上**StrictHostKeyChecking=no**选项，具体的可以查看[禁用ssh远程主机的公钥检查](http://www.worldhello.net/2010/04/08/1026.html)


至此，我们就完成了当项目变更推送到`master`分支后，自动触发`travis`自动安装，构建等工作。构建成功后，自动登录到我的服务器，进入到`~/projects`目录中执行`./sync_publish_system.sh`脚本。

下面是我的`sync_publish_system.sh`的内容

```bash
[publish@VM_0_12_centos projects]$ cat sync_publish_system.sh
#!/usr/bin/env bash

set -euxo pipefail

# 输出版本信息
echo -e "\033[32m $(git version) \033[0m"

# 设置git配置相关的信息
git config --global user.name "zhaosaisai"
git config --global user.email "zhaosaisai@u51.com"

# 进入到publish-system
cd ~/projects/publish-system

# 获取最新内容
git pull origin master

# 安装和构建
yarn install
yarn run build

exit 0
```

> 你可以在安装和构建的过程中添加更过的操作，比如进行测试等环节。

## 服务器安装`Node`环境

我的服务器的`Node`环境很简单

- 安装`nvm`
- 安装`Node`
- 安装`yarn`

```bash
[publish@VM_0_12_centos ~]$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
[publish@VM_0_12_centos ~]$ nvm -h
[publish@VM_0_12_centos ~]$ nvm install 8
Downloading and installing node v8.15.1...
Downloading https://nodejs.org/dist/v8.15.1/node-v8.15.1-linux-x64.tar.xz...
######################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v8.15.1 (npm v6.4.1)
Creating default alias: default -> 8 (-> v8.15.1)
[publish@VM_0_12_centos ~]$ which node
~/.nvm/versions/node/v8.15.1/bin/node
[publish@VM_0_12_centos ~]$ node -v
v8.15.1
[publish@VM_0_12_centos ~]$ npm -v
6.4.1
[publish@VM_0_12_centos ~]$ npm install yarn -g
/home/publish/.nvm/versions/node/v8.15.1/bin/yarn -> /home/publish/.nvm/versions/node/v8.15.1/lib/node_modules/yarn/bin/yarn.js
/home/publish/.nvm/versions/node/v8.15.1/bin/yarnpkg -> /home/publish/.nvm/versions/node/v8.15.1/lib/node_modules/yarn/bin/yarn.js
+ yarn@1.13.0
added 1 package in 2.66s
[publish@VM_0_12_centos ~]$ yarn -v
1.13.0
```

## 安装Nginx

在`travis`持续集成服务技术后，我们可以通过`Nginx`来提供对我们的项目的访问，关于`Nginx`的安装可以查看[Nginx学习-安装_基本模块_请求限制_访问限制
](https://zhaosaisai.com/blog/2019/Nginx%E5%AD%A6%E4%B9%A0-%E5%AE%89%E8%A3%85_%E5%9F%BA%E6%9C%AC%E6%A8%A1%E5%9D%97_%E8%AF%B7%E6%B1%82%E9%99%90%E5%88%B6_%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6.html)。

安装成功后，在`nginx`的配置文件中添加如下规则

```nginx
location / {
    return 403;
}

location ^~ /publish-system {
    alias /home/publish/projects/publish-system;
    index index.html index.htm;
}

location ^~ /dist {
    rewrite ^(.*)$ /publish-system/$1 last;
}
```

重启`nginx`，访问`http://118.24.204.202/publish-system/`就能看到我们从零开始的项目，通过持续集成构建后，可以成功访问了。