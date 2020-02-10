# awk的数组

## 数组的定义

数组是一种有某种关联的数据（变量），通过下标依次访问

- 数组名[下标] = 值
- 下标可以使用数字，也可以使用字符串

## 数组的遍历

```bash
for(变量 in 数组名)
    使用数组名[变量]的方式依次对每个数组的元素进行操作
```
```bash
[root@instance-6w9riila ~]# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};average[$1] = sum / (NF-1)}END{for(user in average) print average[user]}' kpi.txt
73
81
62.5
87.5
56.8333
```

```bash
[root@instance-6w9riila ~]# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};average[$1] = sum / (NF-1)}END{for(user in average) sum2 += average[user]; print sum2}' kpi.txt
360.833
```

```bash
[root@instance-6w9riila ~]# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};average[$1] = sum / (NF-1)}END{for(user in average) sum2 += average[user]; print sum2/NR}' kpi.txt
72.1667
```

## 删除数组

```bash
delete 数组[下标]
```

## 命令行参数数组

命令行数组主要涉及到两个变量：`ARGC`和`ARGV`。其中`ARGC`表示`awk`命令后面所带的命令行参数的个数，`ARGC`就表示具体的每一个参数的内容。

```bash
[root@instance-6w9riila ~]# cat arg.awk
BEGIN {
	for(x=0;x<ARGC;x++){
		print ARGV[x]
	}

	print ARGC
}
[root@instance-6w9riila ~]# awk -f arg.awk  11 22 33
awk
11
22
33
4
```

## 数组综合使用

```bash
[root@instance-6w9riila ~]# cat kpi.txt
user1 70 72 74 76 74 72
user2 80 82 84 82 80 78
user3 60 61 62 63 64 65
user4 90 89 88 87 86 85
user5 45 60 63 62 61 50
```

```bash
[root@instance-6w9riila ~]# cat kpi.awk
{

sum = 0
for(column=2; column <= NF; column++) {
	sum += $column
}

average[$1] = sum / ( NF - 1 )


if (average[$1] >= 80) {
	letter = "S"
} else if (average[$1] >= 70) {
	letter = "A"
} else if (average[$1] >= 60) {
	letter = "B"
} else {
	letter = "C"
}


print $1, average[$1], letter


letter_all[letter]++

}
END{

for(user in average) {
	sum_all += average[user]
}

avg_all = sum_all / NR
print "average all: ", avg_all

for (user in average) {
	if (average[user] > avg_all) {
		above++
	} else {
		below++
	}
}

print "above", above

print "below", below

print "S: ", letter_all["S"]

}
```

```bash
[root@instance-6w9riila ~]# awk -f kpi.awk kpi.txt
user1 73 A
user2 81 S
user3 62.5 B
user4 87.5 S
user5 56.8333 C
average all:  72.1667
above 3
below 2
S:  2
```