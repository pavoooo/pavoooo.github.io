# case分支

`case`语句和`select`语句可以构成分支。基本格式如下

```bash
case "$变量" in
    "情况1" )
        命令..;;
    "情况2" )
        命令..;;
    * )
        命令..;;
esac
```

```bash
#!/bin/bash

# case demo

case "$1" in
	"start"|"START" )
		echo $0 "start"
	;;

	"stop"|"STOP")
		echo $0 "stop"
	;;

	"restart"|"RESTART" )
		echo $0 "restart"
	;;

	* )
		echo "help"
	;;
esac
```

```bash
[root@instance-6w9riila jikeshijian-linux]# ./12.sh start
./12.sh start
[root@instance-6w9riila jikeshijian-linux]# ./12.sh stop
./12.sh stop
[root@instance-6w9riila jikeshijian-linux]# ./12.sh restart
./12.sh restart
[root@instance-6w9riila jikeshijian-linux]# ./12.sh reload
help
```