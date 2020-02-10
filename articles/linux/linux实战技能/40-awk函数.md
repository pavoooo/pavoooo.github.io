# awk函数

## 算数函数

`awk`的算数函数很多，主要用于数学计算的。比较常用的有`sin()`，`cos()`，`int()`，`rand()`，`srand()`等

```bash
[root@instance-6w9riila ~]# awk 'BEGIN{pi=3.14l; print int(pi)}'
3

```

```bash
[root@instance-6w9riila ~]# awk 'BEGIN{print rand()}'
0.237788
[root@instance-6w9riila ~]# awk 'BEGIN{print rand()}'
0.237788
[root@instance-6w9riila ~]# awk 'BEGIN{print rand()}'
0.237788
```

```bash
[root@instance-6w9riila ~]# awk 'BEGIN{srand();print rand()}'
0.356634
[root@instance-6w9riila ~]# awk 'BEGIN{srand();print rand()}'
0.129358
[root@instance-6w9riila ~]# awk 'BEGIN{srand();print rand()}'
0.129358
[root@instance-6w9riila ~]# awk 'BEGIN{srand();print rand()}'
0.807364
[root@instance-6w9riila ~]# awk 'BEGIN{srand();print rand()}'
0.807364
[root@instance-6w9riila ~]# awk 'BEGIN{srand();print rand()}'
0.380343
```

## 字符串函数

- **gsub(r, s, t)**
- **index(s, t)**
- **length(s)**
- **match(s, r)**
- **split(s, a, sep)**
- **sub(r, s, t)**
- **substr(s, p, n)**

## 自定义函数

```bash
function 函数名(参数) {
    awk 语句
    return awk变量
}
```

```bash
[root@instance-6w9riila ~]# awk 'function a() { return 0 }BEGIN { print a()  }'
0
```

```bash
[root@instance-6w9riila ~]# awk 'function double(str) { return str str } BEGIN { print double("hello awk") }'
hello awkhello awk
```