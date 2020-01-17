# 什么是shell

`shell`是命令解释器，用于解释用户对操作系统的操作。`shell`的种类有很多，可以通过如下命令查看：

```bash
cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

> `centos7`默认使用的`shell`是`bash`

## shell脚本

`shell`脚本由一条条命令组成--一条命令只做一件事。

```bash
# cd.sh
cd /var
ll
```

> 对于编写的`shell`脚本需要给其赋予可执行权限

### shell脚本的格式

- **shebang**

```bash
#!/usr/bin/env bash
#!/bin/bash
```

- **注释**

`shell`脚本文件中的注释以`#`开头

```bash
# 这是一行注释
```

- **命令**

- **chmod u+rx filename**添加可执行权限

- **执行**

```bash
bash ./filename.sh
./filename.sh
source ./filename.sh
. filename.sh
```