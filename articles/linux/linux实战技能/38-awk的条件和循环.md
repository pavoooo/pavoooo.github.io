# awk的条件和循环

## 条件语句

条件语句使用`if`开头，根据表达式的结果判断执行哪条语句。

```bash
if (表达式)
    awk语句1
[
    else
        awk语句2
]
```

如果有多个语句需要执行，可以使用`{}`将多个语句扩起来。

例子：选出第二个字段大于80的用户

```bash
[root@instance-6w9riila ~]# cat kpi.txt
user1 70 72 74 76 74 72
user2 80 82 84 82 80 78
user3 60 61 62 63 64 65
user4 90 89 88 87 86 85
user5 45 60 63 62 61 50
[root@instance-6w9riila ~]# awk '{if($2>=80) print $1}' kpi.txt
user2
user4
```

多个语句同时执行的时候需要使用`{}`包含

```bash
[root@instance-6w9riila ~]# awk '{if($2>=80) { print $1; print $2} }' kpi.txt
user2
80
user4
90
```

## 循环语句

### while循环

```bash
while(表达式)
    awk语句1
```

### do 循环

```bash
do {
    awk 语句1
}while(表达式)
```

### for循环

```bash
for(初始值; 循环判断条件; 累加)
    awk语句1
```

在循环语句中可以使用`continue`和`break`阻断循环语句的输出。

例子，计算`kpi.txt`中第第一个用户的总成绩

```bash
[root@instance-6w9riila ~]# head -1 kpi.txt | awk '{for(c=2;c<=NF;c++){sum += $c};print sum}'
438
```

平均成绩

```bash
[root@instance-6w9riila ~]# head -1 kpi.txt | awk '{for(c=2;c<=NF;c++){sum += $c};print sum/(NF-1)}'
73
```

所有用户的总成绩和平均成绩

```bash
[root@instance-6w9riila ~]# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};print sum}' kpi.txt
438
486
375
525
341
```

```bash
[root@instance-6w9riila ~]# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};print sum/(NF-1)}' kpi.txt
73
81
62.5
87.5
56.8333
```

