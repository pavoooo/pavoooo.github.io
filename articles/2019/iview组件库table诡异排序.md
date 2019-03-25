# iview组件库table诡异排序

前几天，老大反馈说渠道营销后台的表格排序很诡异，到底什么诡异的现象呢？这里先来看一下

- 无排序正常效果

![](/blog/iview1.png)

- ”登录成本“ 降序排列

![](/blog/iview2.png)

- “登录成本” 升序排列

![](/blog/iview3.png)

很奇怪，无论是升序排列还是降序排列，登录成本中的两个`0`记录都会在中间出现。难道`iview`的表格排序内部做了什么额外的处理吗？带着这个疑问，去看一下`iview`的`table`组件是怎么处理表格排序的？

`iview`中的表格排序方法通过[table组件的sortData](https://github.com/iview/iview/blob/2.0/src/components/table/table.vue#L680)方法实现的。下面是它的源码

```js
sortData (data, type, index) {
  const key = this.cloneColumns[index].key;
  data.sort((a, b) => {
    if (this.cloneColumns[index].sortMethod) {
      return this.cloneColumns[index].sortMethod(a[key], b[key], type);
    } else {
      if (type === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else if (type === 'desc') {
        return a[key] < b[key] ? 1 : -1;
      }
    }
  });
  return data;
}
```

源码中对表格数据的排序就是通过`Array.prototype.sort`方法实现的。在我们的这个场景中，我们没有自定义排序方法`sortMethod`，所以`sort`的回掉函数会始终走`else`分支。在这个分支里，会根据我们的排序方式选择不同的分支去处理。为了验证一下这个排序方法的准确性，我写了如下代码

```js
const array = [27.47, 21.98, 0, 28.27, 20.66, 0, 17.22] // 上述表格中登录成本 显示的数据

console.log(
  array.sort((a, b) => {
    return a < b ? 1 : -1
  })
)
```

然后使用node运行一下，得到如下结果

```js
// [ 28.27, 27.47, 21.98, 20.66, 17.22, 0, 0 ]
```

而且和浏览器中运行的结果一致。


很懵逼，为什么这里排序准确无误，表格中的排序那么乱呢？难道是我们的数据有问题？看了一下接口返回，突然意识过来，我们用在表格中排序的data，并不是由数字组成的数组，而是对象数组。下面是精简后的数据

```js
const array = [
  { "name": "应用商店组", "count": 9494, "cost": 27.47, },
  { "name": "精准营销组", "count": 10562, "cost": 21.98, },
  { "name": "其他", "count": 10696, },
  { "name": "广告媒体组", "count": 3148, "cost": 28.27, },
  { "name": "社交媒体组", "count": 1241, "cost": 20.66, },
  { "name": "渠道合作", "count": 148, },
  { "name": "合计", "count": 35289, "cost": 17.22, }
]
```

那我们就对这段数据以`cost`(表格中的登录成本的key)的值进行一个排序，

```js
console.log(
  array.sort((a, b) => {
    return a.cost < b.cost ? 1 : -1
  })
)
```

在nodejs运行结果如下

```js
[ { name: '应用商店组', count: 9494, cost: 27.47 },
  { name: '精准营销组', count: 10562, cost: 21.98 },
  { name: '其他', count: 10696 },
  { name: '广告媒体组', count: 3148, cost: 28.27 },
  { name: '社交媒体组', count: 1241, cost: 20.66 },
  { name: '渠道合作', count: 148 },
  { name: '合计', count: 35289, cost: 17.22 } ]
```

果然，数据并不是严格的按照`cost`的值降序排列。我们仔细观察一下原数据，你会发现`name`为*其它*和*渠道合作*的两个元素，并没有`cost`字段。所以，这两个元素以`cost`列进行排序的时候，其在`sort`回掉函数中获得的值是`undefined`。**`undefined`和任何值进行比较，结果都为`false`**，即

```js
undefined > 100 //  false
undefined === 100 // false
undefined < 100 // false
```

所以这两列元素在进行比较的时候`sort`方法的回掉函数返回值都是`-1`。过程清楚了，但是为什么输出上面的结果，还不是很清楚。带着疑问，就去看看`Array.prototype.sort`方法是怎么实现的？

经查资料得知，`V8`对于数组的排序实现了两种排序算法：**插入排序**和**快速排序**。这一点，我们在[V8仓库](https://github.com/v8/v8/blob/6.2.414/src/js/array.js#L718)中也能看出

> 我的版本是`8.10`对应的`v8`版本是`6.2.414.50`

```js
// For short (length <= 10) arrays, insertion sort is used for efficiency.
```

源码中明确说明了，当数组长度小于10的时候使用插入排序。下面是`V8`的插入排序算法

```js
function InsertionSort(a, from, to) {
  for (var i = from + 1; i < to; i++) {
    var element = a[i];
    for (var j = i - 1; j >= from; j--) {
      var tmp = a[j];
      var order = comparefn(tmp, element);
      if (order > 0) {
        a[j + 1] = tmp;
      } else {
        break;
      }
    }
    a[j + 1] = element;
  }
};
```

参数`a`就是待排序的数组，`from`就是开始位置，`to`就是结束的位置。`comparefn`就是我们传入给`sort`方法的回掉函数。对于我们这种场景，我们可以稍微作一下改动就能验证结果了

```js
const comparefn = (a, b) => {
  return a.cost < b.cost ? 1 : -1
}

function InsertionSort(a, from, to) {
  for (var i = from + 1; i < to; i++) {
    var element = a[i];
    for (var j = i - 1; j >= from; j--) {
      var tmp = a[j];
      var order = comparefn(tmp, element);
      if (order > 0) {
        a[j + 1] = tmp;
      } else {
        break;
      }
    }
    a[j + 1] = element;
  }
};
```

然后对我们上面的数组进行排序

```js
InsertionSort(array, 0, array.length)
```

果然，结果和`Array.prototype.sort`的排序一致

```js
[ { name: '应用商店组', count: 9494, cost: 27.47 },
  { name: '精准营销组', count: 10562, cost: 21.98 },
  { name: '其他', count: 10696 },
  { name: '广告媒体组', count: 3148, cost: 28.27 },
  { name: '社交媒体组', count: 1241, cost: 20.66 },
  { name: '渠道合作', count: 148 },
  { name: '合计', count: 35289, cost: 17.22 } ]
```

上面排序算法关键之处就在于`order < 0`的时候，最内部的循环直接`break`了。回到上面我们说的`undefined`和任何值相比较都是`false`，`sort`回掉函数的返回值永远是`-1`。当进行name是`其他`和`渠道合作`两个元素的排序的时候，`InsertionSort`函数内部的第二层`for`循环进去就出来了，所以，对于这两列而言，排序之后的位置永远不变。

但是，还没结束，把下面的代码在浏览器中运行一下

```js
console.log(
  array.sort((a, b) => {
    return a.cost < b.cost ? 1 : -1
  })
)
```

结果是这样的

```js
[ { name: '渠道合作', count: 148 },
  { name: '广告媒体组', count: 3148, cost: 28.27 },
  { name: '其他', count: 10696 },
  { name: '应用商店组', count: 9494, cost: 27.47 },
  { name: '精准营销组', count: 10562, cost: 21.98 },
  { name: '社交媒体组', count: 1241, cost: 20.66 },
  { name: '合计', count: 35289, cost: 17.22 } ]
```

这个结果和最初一样表格中的排序结果是一样的。但是，很奇怪，难道浏览器端的`Array.prototype.sort`方法不是`V8`中实现的吗，还是版本的不同造成了结果的差异？

看一下我的`chrome`的版本吧：`chrome@72.0.3626`，对应的`V8@7.2.502`。那就到`V8`的仓库中看一下这个版本的`sort`方法的实现。[https://github.com/v8/v8/blob/7.2.502/src/js/array.js#L239](https://github.com/v8/v8/blob/7.2.502/src/js/array.js#L239)

你会发现`V8@7.2.502`和`V8@6.2.414`的实现方法是一样的，但为什么结果确是不一样的呢？然后在`V8@7.2.502`全局搜索了一下`sort`关键字，也没发现其它排序方法的实现。既然找不到，就大胆猜测一下吧---难不成`Chrome`使用的是 **二分插入排序**？然后，扒了一段二分插入排序算法的实现(记不住啊记不住)

```js
function binaryInsertSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var key = arr[i],
      left = 0,
      right = i - 1;
    while (left <= right) {
      var middle = parseInt((left + right) / 2);
      if (key.totalLoginCost < arr[middle].totalLoginCost) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    for (var j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = key;
  }
  return arr;
}
```

然后在`node`端运行一下

```js
console.log(
  binaryInsertSort(array).reverse()
)
```

> 保持结果一致， reverse了一下

```js
[ { name: '渠道合作', count: 148 },
  { name: '广告媒体组', count: 3148, cost: 28.27 },
  { name: '其他', count: 10696 },
  { name: '应用商店组', count: 9494, cost: 27.47 },
  { name: '精准营销组', count: 10562, cost: 21.98 },
  { name: '社交媒体组', count: 1241, cost: 20.66 },
  { name: '合计', count: 35289, cost: 17.22 } ]
```

这次的输出结果就和`chrome`中一致了。但是`chrome`中实现这段排序的代码在哪里😳😳😳？

最后呢，对于这种场景下的`iview`的表格排序问题，可以通过下面三种方式解决

- 改源码，undefined || 0
- 自定义sortMethod
- 数据传给table组件前，自己做一下判断，尽量避免undefined出现