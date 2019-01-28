# 超长typescript记录
## Typescript介绍

- `Typescript`是一款由微软开发的一款开源的编程语言
- `Typescript`是`javascript`的超集，遵循`ES6`，`ES5`规范。`Typescript`扩展了`javascript`的语法
- `Typescript`在语法上更像`Java`，`C#`等强面向对象的语言

在语法上，`Typescript` > `Es6` > `Es5`。

## typescript安装

在使用`Typescript`之前，我们首先做的是安装`Typescript`。如果你选择全局安装

```bash
npm install typescript -g
```

在安装成功后，就可以使用`tsc`命令来编译`.ts`文件

```bash
which tsc

tsc hello.ts
```

当然，这种开发方式还是比较痛苦的，因为每次文件改变后，我们都要尝试重新构建。为了能够自动构建我们的`.ts`文件，我们可以尝试对编辑器`vscode`作如下配置

- 在项目根目录下运行`tsc --init`生成`tsconfig.json`文件。关于`tsconfig.json`文件，后面会作详细的介绍。

```bash
tsc --init
```

- 点击编辑器`菜单 -> 任务 -> 运行任务 -> tsc:监视-tsconfig.json`。操作完成后，每次文件的改变都会触发`ts`的自动编译。

> 可以通过`菜单 -> 任务 -> 结束任务 -> tsc:监视-tsconfig.json`停止对文件的监听

除了上述开发方式外，目前比较主流的就是将`Typescript`和`webpack`进行集成。

```js
{
  test: /\.ts$/,
  loader: 'awesome-typescript-loader'
}
```

## 数据类型

`typescript`为了使编写的代码更加规范，更易于维护，增加了类型校验。类型校验其实就是在声明变量的时候明确其类型，类型一旦确定，便不能更改。建议我们在`typescript`项目中声明变量的时候明确其类型。

```js
let str: string = 'this is a string'

str = 'hello world'
str = 123 // 类型校验无法通过
```

前面我们提到过`typescript`是`javascript`的超集，所以，`typescript`中的数据类型可以分为两类。一类是`javascript`本身就具备的，比如：

- 布尔类型(boolean)
- 字符串类型(number)
- 数字类型(number)
- 数组类型(array)
- null和undefined

另一类就是`typescript`给我们提供的类型，比如

- 元组类型(tuple)
- 枚举类型(enum)
- 任意类型(any)
- void类型
- never类型

### 基本类型
```js
// 声明一个布尔类型
const bool: boolean = true
// 声明一个数字类型
const num: number = 123
// 声明一个字符串类型
const str: string = 'hello world'
```

### 数组类型

`数组类型`是一种复合数据类型，定义的时候一般同时指定数组中元素的类型。在`ts`中定义数组有两种方式

1. `const 变量名: 元素类型[] = 值`

```js
// 表示数组中所有的元素都是number类型
const arr: number[] = [1, 2, 3, 4]
```

2. `const 变量名：Array<元素类型> = 值`

```js
const arr2: Array<number> = [1, 2, 3, 4]
```

可以将元素类型指定为`any`，则数组中可以存在任意类型的元素。

### 元组类型

`元组类型`是`ts`提供的一种数据类型，从本质上说它也是数组的一种。它在定义的时候需要明确的指定数组中每个元素对应的类型，这也就直接确定了数组中元素的个数。

```js
// 定义一个 第一个元素是字符串，第二个元素是数字
const tuple: [string, number] = ['id', 12]

const tuple: [string, number] = ['id', 12, 34] // 错误，长度不匹配

const tuple: [string, number] = [34, 12] // 错误，类型不匹配
```

### 枚举类型

`枚举类型`数据是`枚举法`在`ts`中的一种应用，所谓的`枚举`就是对所声明的变量明确指定能取哪些值。`ts`中使用`enum`关键字来声明枚举类型变量。基本格式如下

```js
enum 枚举名称{
  标识符[=整型常数],
  标识符[=整型常数],
  ...
  标识符[=整型常数],
}
```

比如：

```js
enum Flag {
  success,
  error
}

const success: Flag = Flag.success // 0
const error: Flag = Flag.error // 1
const any = Flag.success // 0
```

也可以在声明枚举类型的时候设置枚举值

```js
enum Status {
  notFound = 404,
  success = 200,
  forbidden = 413
}

const notFound: Status = Status.notFound // 404
const success: Status = Status.success // 200
const forbidden: Status = Status.forbidden // 413
```

在声明枚举类型的时候有一件事需要特别注意，默认枚举类型值从0依次递增，如果你为某个元素设定了值，则后面的元素依照此元素递增。

```js
enum Num {
  a,
  b,
  c
}

console.log(Num.a, Num.b, Num.c) // 0, 1, 2
```

```js
enum Num {
  a,
  b = 3,
  c
}

console.log(Num.a, Num.b, Num.c) // 0, 3, 4
```

```js
enum Num {
  a,
  b = -1,
  c
}

console.log(Num.a, Num.b, Num.c) // 0, -1, 0
```

```js
enum Num {
  a,
  b = 'string',
  c
}

// 这种情况下，ts也会抛出 Enum member must have initializer(枚举成员必须具有初始化表达式) 的错误
console.log(Num.a, Num.b, Num.c) // 0, 'string', undefined
```

### 任意类型

`任意类型`在`ts`中用`any`表示，这种类型的数据可以被赋值为各种类型的变量。你就可以认为被声明为这种类型的变量和未加任何类型校验的变量是一样的。

```js
let any: any = 'hello world'

// 下面的赋值都是合法的
any = 123
any = true
any = []
```

`any`类型最常用于声明那些属性无法预知的对象。比如

```js
const axios = require('axios')

const result: any = axios.get('')

console.log(result.data)
```

### 空类型

空类型主要包含`null`和`undefined`。它们是`never`类型的字类型。

```js
// 可同时指定多种类型。对于无法确定初始值的变量，可以使用下面的类型声明
const num: number | undefined;

console.log(num)

// 一个元素可能是 undefined null 或者string类型
const str: string | null | undefined;
```

### void类型

`void类型`使用`void`表示，一般用在定义方法的时候没有任何返回值。

```js
// 下面用来声明函数返回值的类型
function say(): void {
  // 没有任何返回值
}

function say1(): void {
  return 'hello' // ts会抛出错误
}
```

### never类型

`never类型`用于指定不会出现任何值（比如抛出错误）。声明`never`类型的变量只能被`never`类型所赋值。一般不长使用

```js
let undef: undefined;

// undef 只能被赋值为 undefined
undef = undefined
undef = 123 // 会报错

let n: null

// n 只能被赋值为null
n = null
n = 'hello'// 会报错

let a:never;

a = 1 // 会报错

// 正确
a = (() => {
  throw new Error()
})()
```

## 函数

`ts`中的函数相对于`js`中的函数增加了在定义的时候添加类型校验的功能。类型校验主要添加在**参数**和**返回值**上。

```js
function sum(n1: number, n2: number): number {
  return n1 + n2
}

sum(1, 2)

sum(2, 'hello') // ts 编译会报错
sumn(1, 2, 3) // ts 编译也会报错
```

当然，匿名函数也是可以的

```js
const sum = (n1: number, n2: number): number => n1 + n2
```

### 可选参数

在`js`中声明的函数，形参和实参的类型和数量是没有严格限制的。但是在`ts`中定义的参数，形参和实参的类型和数量必须相等。如果不想等，可以通过可选参数声明。`ts`中可选参数的声明方式为`参数名称?:参数类型`

```js
function getInfo(name: string, subName?:string): string {
  return `${name}-${subName || ''}`
}

getInfo('saisai')

getInfo('saisai', 'zsee')
```

> 可选参数必须放在形参末尾

### 默认参数

`ts`中设置默认参数的方式和`es6`中基本相同

```js
function getInfo(name:string, subName: string = 'zsee'): string {
  return `${name}-${subName || ''}`
}

// 下面两种调用返回的结果相同
getInfo('saisai')

getInfo('saisai', 'zsee')
```

### 剩余参数

`ts`中设置剩余参数的方式和`es6`中基本相同

```js
function getInfo(name: string, ...rest): string {
  return `${name}${rest.join(',')}`
}

console.log(getInfo('saisai', 'zsee', 123, 'ss'))
```
也可以声明剩余参数中每个参数的类型

```js
function getInfo(name: string, ...rest: string[]): string {
  return `${name}${rest.join(',')}`
}

console.log(getInfo('saisai', 'zsee', 123, 'ss')) // ts 编译报错
```

### 函数重载

`重载`是指两个或两个以上同名的函数，但它们的参数不一样，这时会出现参数重载的情况。`ts`中的`重载`是指通过为一个函数提供多个函数类型定义来完成不同的目的。`ts`中的函数重载你就可以认为是预先对参数的类型进行了限制。

```js
// 定义基本的函数重载类型
function getInfo(param: string): string;

function getInfo(param: number): number;

// 调用前会进行参数的判断
function getInfo(str: any): any {
  console.log(str)
}

getInfo('hello world')
getInfo(123)

getInfo(true) // ts 编译会报错
```

## 类

`ts`中的类通过`class`关键字定义，但其功能比`es6`语法更加强大。下面是一个简单的类的定义

```js
class Person {
  // 构造函数
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  // 定义name属性
  name: string;

  // 定义age属性
  age: number;

  // 定义一个方法
  say(): string {
    return `${this.name}: ${this.age}`
  }
}

const p = new Person('saisai', 24)

const p1 = new Person(24, 'saisai') // ts 编译会报错
```

### 修饰符

`typescript`中的`class`提供了三种类修饰符：`public`，`protected`，`private`

- **public**：公有属性和方法，在类和子类中以及类外都能访问的属性和方法
- **protected**：保护属性和方法，在类和子类中可以访问，类外无法访问
- **private**：私有属性和方法，在类中可以访问，子类和类外是无法访问的。

```js
class Person {
  // 公有属性
  public name: string;
  // 保护属性
  protected height: number;
  // 私有属性
  private age: number;

  constructor(name: string, height: number, age: number) {
    this.name = name;
    this.age = age;
    this.height = height;
  }

  // 共有方法
  public sayName(): string {
    return this.name
  }

  // 保护方法
  protected sayHeight(): number {
    return this.height
  }

  // 私有方法
  private sayAge(): number {
    return this.age
  }
}

const person = new Person('saisai', 180, 24)

console.log(person.sayName())
console.log(person.sayHeight()) // [ts] 属性“sayHeight”受保护，只能在类“Person”及其子类中访问。
console.log(person.sayAge()) // [ts] 属性“sayAge”为私有属性，只能在类“Person”中访问。

// 子类中的现象也是如此
```

### 静态属性和静态方法

`静态属性`和`静态方法`是直接定义在类上面，访问的时候也需要通过类去访问。`静态属性`和`静态方法`需要通过关键字`static`去定义。静态方法中的`this`指向`类`本身。

```js
class Person {
  public name: string;

  // 静态方法
  static staticName: string;
  constructor(name: string) {
    // 实例属性
    this.name = name
  }

  // 实例方法
  sayName(): string {
    return this.name
  }

  // 静态方法
  static sayStaticName(): string {
    // 这里的 this 指向类本身
    return this.staticName
  }
}
```

### 多态

`多态`指的就是父类定义一个方法而不去实现它，让继承它的子类去实现它，每一个子类都有不同的表现。多态也是继承的一种表现。

```js
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat():void {
    console.log(this.name);
  }
}

// Dog 类继承 Animal
class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }

  // 实现父类的方法
  eat() {

  }
}
```

### 抽象类和抽象方法

`抽象类`是指只能够被其他类继承而不能被直接实例化的类。
`抽象方法`也是指那些只能被定义而不能被实现，而且子类必须实现的方法。而且，`抽象方法`只能放在抽象类中。抽象类中可以包含非抽象方法。

`抽象类`和`抽象方法`都是通过关键字`abstract`声明

```js
abstract class Animal {
  abstract eat(): string;
}

class Dog extends Animal {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }

  // 必须实现父类的抽象方法 eat
  eat():string {
    return this.name;
  }
}

const a = new Animal // ts 编译报错 无法创建抽象类的实例

const d = new Dog('a dog')
```

