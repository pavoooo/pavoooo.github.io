# pwd和ls命令

> `linux`中一切皆文件，文件的操作都是通过命令进行

## pwd

`pwd`用于显示当前的操作目录

```bash
[root@instance-6w9riila ~]# pwd
/root
```

## ls

`ls`用于显示目录的内容

```bash
ls [options] [args...]
```

```bash
[root@instance-6w9riila ~]# ls /
bin  boot  cgroup  dev  etc  flag_ok  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  selinux  srv  sys  tmp  usr  var
[root@instance-6w9riila ~]# ls /root
appendonly.aof  installed     mydocker         nodes-6381.conf  nodes-6383.conf  nodes-6385.conf  study
dump.rdb        myDataVolume  nodes-6380.conf  nodes-6382.conf  nodes-6384.conf  packages         test-changelog
```

`ls`可以同时显示多个目录的内容

```bash
[root@instance-6w9riila ~]# ls / /root
/:
bin  boot  cgroup  dev  etc  flag_ok  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  selinux  srv  sys  tmp  usr  var

/root:
appendonly.aof  installed     mydocker         nodes-6381.conf  nodes-6383.conf  nodes-6385.conf  study
dump.rdb        myDataVolume  nodes-6380.conf  nodes-6382.conf  nodes-6384.conf  packages         test-changelog
```

### 选项

> `ls`的选项非常多，这里只是常用的一些

#### `-l`：以行为单位显示目录或文件的详细信息

```bash
[root@instance-6w9riila ~]# ls -l
total 56
-rw-r--r-- 1 root root   92 Apr 27  2019 appendonly.aof
-rw-r--r-- 1 root root  176 Apr 27  2019 dump.rdb
drwxr-xr-x 3 root root 4096 Apr 27  2019 installed
drwxr-xr-x 2 root root 4096 Nov 18 22:37 myDataVolume
drwxr-xr-x 2 root root 4096 Nov 19 22:31 mydocker
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6380.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6381.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6382.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6383.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6384.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6385.conf
drwxr-xr-x 3 root root 4096 Oct 12 23:42 packages
drwxr-xr-x 3 root root 4096 Apr 21  2019 study
drwxr-xr-x 5 root root 4096 Oct 13 00:04 test-changelog
```

第一个字符具有特定的含义

- `-`：表示该文件是一个普通文件
- `d`：表示该文件是一个目录文件

#### `-a`：显示目录下的所有文件，包括隐藏文件

> `linux`系统中的隐藏文件以`.`开头

```bash
[root@instance-6w9riila ~]# ls -a
.               .bash_history  .bashrc  .dockerinit  .gemrc      installed     .node_repl_history  nodes-6382.conf  nodes-6385.conf  packages           .ssh     test-changelog
..              .bash_logout   .config  dump.rdb     .gitconfig  myDataVolume  nodes-6380.conf     nodes-6383.conf  .npm             .pki               study    .viminfo
appendonly.aof  .bash_profile  .cshrc   .gem         .gnupg      mydocker      nodes-6381.conf     nodes-6384.conf  .npmrc           .rediscli_history  .tcshrc  .vscode-server
```

#### `-r`：逆向排序

```bash
[root@instance-6w9riila ~]# ls -lr
total 56
drwxr-xr-x 5 root root 4096 Oct 13 00:04 test-changelog
drwxr-xr-x 3 root root 4096 Apr 21  2019 study
drwxr-xr-x 3 root root 4096 Oct 12 23:42 packages
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6385.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6384.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6383.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6382.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6381.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6380.conf
drwxr-xr-x 2 root root 4096 Nov 19 22:31 mydocker
drwxr-xr-x 2 root root 4096 Nov 18 22:37 myDataVolume
drwxr-xr-x 3 root root 4096 Apr 27  2019 installed
-rw-r--r-- 1 root root  176 Apr 27  2019 dump.rdb
-rw-r--r-- 1 root root   92 Apr 27  2019 appendonly.aof
```

> `-r`默认是以文件名进行排序的，如果你想以时间的方式进行排序，可以指定`-t`参数。`-t`就是以时间顺序显示目录信息

```bash
[root@instance-6w9riila ~]# ls -lrt
total 56
drwxr-xr-x 3 root root 4096 Apr 21  2019 study
drwxr-xr-x 3 root root 4096 Apr 27  2019 installed
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6385.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6380.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6384.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6383.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6381.conf
-rw-r--r-- 1 root root  781 Apr 27  2019 nodes-6382.conf
-rw-r--r-- 1 root root  176 Apr 27  2019 dump.rdb
-rw-r--r-- 1 root root   92 Apr 27  2019 appendonly.aof
drwxr-xr-x 3 root root 4096 Oct 12 23:42 packages
drwxr-xr-x 5 root root 4096 Oct 13 00:04 test-changelog
drwxr-xr-x 2 root root 4096 Nov 18 22:37 myDataVolume
drwxr-xr-x 2 root root 4096 Nov 19 22:31 mydocker
```

#### `-R`：递归显示目录下面的所有文件

```bash
[root@instance-6w9riila yorkie]# ls -R
.:
appveyor.yml  bin  CHANGELOG.md  HOOKS.md  LICENSE  package.json  README.md  src  __tests__

./bin:
install.js  uninstall.js

./src:
hooks.json  install.js  runner.js  uninstall.js  utils

./src/utils:
find-hooks-dir.js  find-parent.js  get-hook-script.js  is.js

./__tests__:
index.js
[root@instance-6w9riila yorkie]# ls -lR
.:
total 36
-rw-r--r-- 1 root root  468 Oct 26  1985 appveyor.yml
drwxr-xr-x 2 root root 4096 Oct 12 23:56 bin
-rw-r--r-- 1 root root 2193 Oct 26  1985 CHANGELOG.md
-rw-r--r-- 1 root root  785 Oct 26  1985 HOOKS.md
-rw-r--r-- 1 root root 1066 Oct 26  1985 LICENSE
-rw-r--r-- 1 root root 1889 Oct 12 23:56 package.json
-rw-r--r-- 1 root root  626 Oct 26  1985 README.md
drwxr-xr-x 3 root root 4096 Oct 13 00:03 src
drwxr-xr-x 2 root root 4096 Oct 12 23:56 __tests__

./bin:
total 8
-rwxr-xr-x 1 root root 647 Oct 26  1985 install.js
-rwxr-xr-x 1 root root 253 Oct 26  1985 uninstall.js

./src:
total 20
-rw-r--r-- 1 root root  347 Oct 26  1985 hooks.json
-rw-r--r-- 1 root root 3386 Oct 13 00:03 install.js
-rw-r--r-- 1 root root  480 Oct 26  1985 runner.js
-rw-r--r-- 1 root root  684 Oct 26  1985 uninstall.js
drwxr-xr-x 2 root root 4096 Oct 12 23:56 utils

./src/utils:
total 16
-rw-r--r-- 1 root root  700 Oct 26  1985 find-hooks-dir.js
-rw-r--r-- 1 root root  319 Oct 26  1985 find-parent.js
-rw-r--r-- 1 root root 2543 Oct 26  1985 get-hook-script.js
-rw-r--r-- 1 root root  597 Oct 26  1985 is.js

./__tests__:
total 8
-rw-r--r-- 1 root root 5331 Oct 26  1985 index.js
```

#### `-h`：以可读的方式显示文件的大小

```bash
[root@instance-6w9riila linux]# ls -lh .
total 20K
-rw-r--r-- 1 root root   15 Dec 22 17:34 file
drwxr-xr-x 2 root root 4.0K Dec 22 17:30 tmp
-rw-r--r-- 1 root root  10K Dec 22 18:22 tmp.tar
```