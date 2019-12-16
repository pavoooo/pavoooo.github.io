# Node和NodePath

`babel`编译代码的第一阶段就是将源码解析为抽象语法树。或许你不了解什么是抽象语法树，但你一定清楚什么是`DOM`树。浏览器在渲染`html`文件的时候，也会有一个解析的过程--将`html`文件转换为`DOM`树结构。所以，`DOM`树其实是你`html`文件的结构化表示，每一个`html`标签都对应`DOM`树中的一个节点，每一种节点都对应一种特定的类型。`DOM`树中各节点之间有着千丝万缕的联系，一个节点可能会有父节点，也可能会有兄弟节点，当然，也可能会有子节点。浏览器给我们提供了强大的操作`DOM`的方法，你可以对`DOM`树中的任意节点进行增删改查。明白了这些，我们就可以类比一下抽象语法树。首先，我们应该清楚，`javascript`解析器，比如`babel`会将我们的源代码转换为抽象语法树，所以，我们也可以认为抽象语法树是对你`javascript`文件的一种结构化表示，`javascript`代码中的每一种语法都对应抽象语法树中的一个节点，同样，每一个节点(`Node`)也有一种特定的类型。抽象语法树中的各节点之间也是有着千丝万缕的联系，同样会有父节点，兄弟节点或者子节点。而且，抽象语法树也有很多操作其节点的方法，你也可以对节点进行增删改查。

现在你应该对抽象语法树有了一个简单的概念，下面我们就通过和`DOM`树类比的方式来了解一下抽象语法树相关的内容。

## 节点(Node)

首先我们来直观感受下抽象语法树，假设我们有如下代码

```js
const { parse } = require('@babel/parser')

const sourceCode = `
  function sum(a, b) {
    return a + b
  }
`

const ast = parse(sourceCode)

console.log(ast)
```

我们可以直接使用`@babel/parser`将`javascript`代码解析成抽象语法树。打印出来的格式如下

```
Node {
  type: 'File',
  start: 0,
  end: 45,
  loc: 
   SourceLocation {
     start: Position { line: 1, column: 0 },
     end: Position { line: 5, column: 0 } },
  errors: [],
  program: 
   Node {
     type: 'Program',
     start: 0,
     end: 45,
     loc: SourceLocation { start: [Object], end: [Object] },
     sourceType: 'script',
     interpreter: null,
     body: [ [Object] ],
     directives: [] },
  comments: [] }
```

> 有些内容在打印的时候被折叠了，我们先不用关心，我们主要是看一下抽象语法树的结构。

正如`DOM`树结构会有一个根节点，抽象语法树也存在一个根节点，这个节点的类型是`File`。前面我们提到过`DOM`树中的每一个节点都有一种类型，我们可以通过节点的`nodeType`属性获取。抽象语法树中的节点也有特定的类型，比如上面的`File`，`Program`等。下面是完整的类型列表

> 你可以在@babel/types的index.d.ts中查看

```js
export type Node = AnyTypeAnnotation | ArgumentPlaceholder | ArrayExpression | ArrayPattern | ArrayTypeAnnotation | ArrowFunctionExpression | AssignmentExpression | AssignmentPattern | AwaitExpression | BigIntLiteral | Binary | BinaryExpression | BindExpression | Block | BlockParent | BlockStatement | BooleanLiteral | BooleanLiteralTypeAnnotation | BooleanTypeAnnotation | BreakStatement | CallExpression | CatchClause | Class | ClassBody | ClassDeclaration | ClassExpression | ClassImplements | ClassMethod | ClassPrivateMethod | ClassPrivateProperty | ClassProperty | CompletionStatement | Conditional | ConditionalExpression | ContinueStatement | DebuggerStatement | Declaration | DeclareClass | DeclareExportAllDeclaration | DeclareExportDeclaration | DeclareFunction | DeclareInterface | DeclareModule | DeclareModuleExports | DeclareOpaqueType | DeclareTypeAlias | DeclareVariable | DeclaredPredicate | Decorator | Directive | DirectiveLiteral | DoExpression | DoWhileStatement | EmptyStatement | EmptyTypeAnnotation | EnumBody | EnumBooleanBody | EnumBooleanMember | EnumDeclaration | EnumDefaultedMember | EnumMember | EnumNumberBody | EnumNumberMember | EnumStringBody | EnumStringMember | EnumSymbolBody | ExistsTypeAnnotation | ExportAllDeclaration | ExportDeclaration | ExportDefaultDeclaration | ExportDefaultSpecifier | ExportNamedDeclaration | ExportNamespaceSpecifier | ExportSpecifier | Expression | ExpressionStatement | ExpressionWrapper | File | Flow | FlowBaseAnnotation | FlowDeclaration | FlowPredicate | FlowType | For | ForInStatement | ForOfStatement | ForStatement | ForXStatement | Function | FunctionDeclaration | FunctionExpression | FunctionParent | FunctionTypeAnnotation | FunctionTypeParam | GenericTypeAnnotation | Identifier | IfStatement | Immutable | Import | ImportDeclaration | ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier | InferredPredicate | InterfaceDeclaration | InterfaceExtends | InterfaceTypeAnnotation | InterpreterDirective | IntersectionTypeAnnotation | JSX | JSXAttribute | JSXClosingElement | JSXClosingFragment | JSXElement | JSXEmptyExpression | JSXExpressionContainer | JSXFragment | JSXIdentifier | JSXMemberExpression | JSXNamespacedName | JSXOpeningElement | JSXOpeningFragment | JSXSpreadAttribute | JSXSpreadChild | JSXText | LVal | LabeledStatement | Literal | LogicalExpression | Loop | MemberExpression | MetaProperty | Method | MixedTypeAnnotation | ModuleDeclaration | ModuleSpecifier | NewExpression | Noop | NullLiteral | NullLiteralTypeAnnotation | NullableTypeAnnotation | NumberLiteral | NumberLiteralTypeAnnotation | NumberTypeAnnotation | NumericLiteral | ObjectExpression | ObjectMember | ObjectMethod | ObjectPattern | ObjectProperty | ObjectTypeAnnotation | ObjectTypeCallProperty | ObjectTypeIndexer | ObjectTypeInternalSlot | ObjectTypeProperty | ObjectTypeSpreadProperty | OpaqueType | OptionalCallExpression | OptionalMemberExpression | ParenthesizedExpression | Pattern | PatternLike | PipelineBareFunction | PipelinePrimaryTopicReference | PipelineTopicExpression | Placeholder | Private | PrivateName | Program | Property | Pureish | QualifiedTypeIdentifier | RegExpLiteral | RegexLiteral | RestElement | RestProperty | ReturnStatement | Scopable | SequenceExpression | SpreadElement | SpreadProperty | Statement | StringLiteral | StringLiteralTypeAnnotation | StringTypeAnnotation | Super | SwitchCase | SwitchStatement | TSAnyKeyword | TSArrayType | TSAsExpression | TSBigIntKeyword | TSBooleanKeyword | TSCallSignatureDeclaration | TSConditionalType | TSConstructSignatureDeclaration | TSConstructorType | TSDeclareFunction | TSDeclareMethod | TSEntityName | TSEnumDeclaration | TSEnumMember | TSExportAssignment | TSExpressionWithTypeArguments | TSExternalModuleReference | TSFunctionType | TSImportEqualsDeclaration | TSImportType | TSIndexSignature | TSIndexedAccessType | TSInferType | TSInterfaceBody | TSInterfaceDeclaration | TSIntersectionType | TSLiteralType | TSMappedType | TSMethodSignature | TSModuleBlock | TSModuleDeclaration | TSNamespaceExportDeclaration | TSNeverKeyword | TSNonNullExpression | TSNullKeyword | TSNumberKeyword | TSObjectKeyword | TSOptionalType | TSParameterProperty | TSParenthesizedType | TSPropertySignature | TSQualifiedName | TSRestType | TSStringKeyword | TSSymbolKeyword | TSThisType | TSTupleType | TSType | TSTypeAliasDeclaration | TSTypeAnnotation | TSTypeAssertion | TSTypeElement | TSTypeLiteral | TSTypeOperator | TSTypeParameter | TSTypeParameterDeclaration | TSTypeParameterInstantiation | TSTypePredicate | TSTypeQuery | TSTypeReference | TSUndefinedKeyword | TSUnionType | TSUnknownKeyword | TSVoidKeyword | TaggedTemplateExpression | TemplateElement | TemplateLiteral | Terminatorless | ThisExpression | ThisTypeAnnotation | ThrowStatement | TryStatement | TupleTypeAnnotation | TypeAlias | TypeAnnotation | TypeCastExpression | TypeParameter | TypeParameterDeclaration | TypeParameterInstantiation | TypeofTypeAnnotation | UnaryExpression | UnaryLike | UnionTypeAnnotation | UpdateExpression | UserWhitespacable | V8IntrinsicIdentifier | VariableDeclaration | VariableDeclarator | Variance | VoidTypeAnnotation | While | WhileStatement | WithStatement | YieldExpression;
```
> 每一种类型的节点都对应javascript中的一种语法

`DOM`树中的每一个节点都有不同的属性，不同的节点具有的类型也可能是不一样的。一般的元素节点都有`innerHTML`属性可以用来获取其`html`结构，表单元素会有`value`属性，可以用来获取其值。同样，抽象语法树中的节点也有相应的属性，不同的节点也是不一样的。

比如，`File`类型具有的属性有

```js
export interface File extends BaseNode {
  type: "File";
  program: Program;
  comments: any;
  tokens: any;
}
```

这里也值得一说的就是抽象语法树中的节点都继承自`BaseNode`这种节点，所以，每个节点都包含如下共有属性

```js
interface BaseNode {
  leadingComments: ReadonlyArray<Comment> | null;
  innerComments: ReadonlyArray<Comment> | null;
  trailingComments: ReadonlyArray<Comment> | null;
  start: number | null;
  end: number | null;
  loc: SourceLocation | null;
  type: Node["type"];
}
```

其次，我们是不是能够像获取`DOM`节点数据那样直接获取抽象语法树某个节点的属性呢，当然是可以的。比如

```js
console.log(ast.program.body[0].params[0].name)
```

上面获取的就是源代码中`sum`函数的第一个参数的名称。既然能够获取，我们是不是也能修改抽象语法树某个节点的属性呢？当然也是可以的，比如我们把`sum`函数的第一个参数的名称改为`c`。

```js
const { parse } = require('@babel/parser')
const generate = require('@babel/generator').default

const sourceCode = `
  function sum(a, b) {
    return a + b
  }
`

const ast = parse(sourceCode)

ast.program.body[0].params[0].name = 'c'

console.log(generate(ast))
```

输入如下 

```js
{ code: 'function sum(c, b) {\n  return a + b;\n}',
  map: null,
  rawMappings: null }
```

从输出代码中可以看出`sum`函数的第一个参数的名称被我们修改了。

> 修改抽象语法树你可以直接通过修改抽象语法树中的某些节点的属性来完成，也可以通过我们下面即将介绍的NodePath对象来完成。

## NodePath

上面通过将抽象语法树和`DOM`树进行类比，我们大概清楚了抽象语法树是一个什么东西。同时，我们也可以通过对抽象语法树中节点的操作对抽象语法树进行简单的增删改查等功能。我们回头想一下，我们在实际的项目开发中，如果直接调用`DOM`相关的`api`完成对`DOM`树操作，是不是一件十分麻烦的事情。为了能够更容易的操作`DOM`节点，我们是不是可以借助`jquery`等类库简化我们的操作。同样的，如果我们对抽象语法树的变更都是通过直接操作抽象语法树中的节点来完成，这同样是一件很麻烦的事情。幸运的是，当我们对抽象语法树进行遍历的过程中，`babel`给我们提供了`NodePath`对象来简化我们对抽象语法树节点的操作。

当我们通过`@babel/traverse`遍历抽象语法树的时候，`traverse`的第二个参数接收一个`visitor`对象。对象的方法名都是上面提到的抽象语法树的节点的类型，当`traverse`遍历到相关节点的时候，会自动调用`visitor`对象中和其类型同名的方法的名称，并自动将该节点对应的`NodePath`对象传进去，我们可以利用这个`NodePath`对象对当前节点进行操作。

比如，在下面的代码中我们就可以获取到`FunctionDeclaration`节点对应的`NodePath`对象

```js
traverse(ast, {
  FunctionDeclaration(path) {
    console.log(path)
  }
})
```

所以我们可以使用`NodePath`对象来完成将参数`c`重命名为`a`的功能

```js
const { parse } = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default

const sourceCode = `
  function sum(a, b) {
    return a + b
  }
`

const ast = parse(sourceCode)

traverse(ast, {
  FunctionDeclaration(path) {
    path.get('params.0').node.name = 'c'
  }
})

console.log(generate(ast))
```

了解了`NodePath`是什么，下面我们就来看一下这个对象给我们提供了哪些便捷的方式来操作抽象语法树的节点的。

> 关于`NodePath`对象的定义可以查看`@types/babel__traverse/index.d.ts`

关于`NodePath`我们同样可以从其`.d.ts`文件中了解其基本的属性和方法。

`NodePath`对象上的属性和方法可以分为如下四种：

- 基本的属性---用于获取抽象语法树中节点的信息
- 核心操作方法---用于操作抽象语法树中的节点
- `isXXX`系列方法---用于判断抽象语法树中节点类型
- `assert`等断言系列方法---对抽象语法树中节点信息进行断言的方法

下面我们就看几个属性和方法来了解一下它的基本使用

> 以下NodePath简称为path

- `path.node`：获取当前`NodePath`对象原生的`Node`节点
- `path.parent`：获取父节点的`NodePath`对象
- `path.parentNode`：获取当前`NodePath`对象原生的`Node`节点的父节点
- `path.context`：获取当前`NodePath`所在的上下文对象
- `path.contexts`：获取当前`NodePath`所在的上下文对象链
- `path.scope`：当前节点所在的作用域对象
- `path.getScope()`：获取当前节点所在的作用域对象。`path.getScope() === path.scope`

> 关于作用域`Scope`，后面我们会一起探讨
- `path.traverse()`：对当前节点进行遍历
- `path.replaceWith()`：用一个节点取代另一个节点
- `path.evaluateTruthy()`：当前节点是否可计算
- `path.evaluate()`：计算当前节点
- `path.remove()`：移除当前节点

> 更多的方法可以参考`@types/babel__traverse/index.d.ts`中关于`NodePath`的定义

知道了上面一些`NodePath`的属性和方法，我们来看几个小例子：

- **去除没有使用到的代码**

```js
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default

const sourceCode = `
  import m,{c} from 'modulec'
  var a = 123
  var b = 234
  const d = 'd'
  let e = 'e'

  function sayA() {
    // console.log(m)
    // console.log(m)
    return () => a
  }

  sayA()
`

const ast = parse(sourceCode, {
  sourceType: 'module'
})

const kinds = ['var', 'let', 'const', 'module']

traverse(ast, {
  Program(path) {
    const bindings = path.scope.bindings
    Object.keys(bindings).forEach(key => {
      const binding = bindings[key]
      const kind = bindings[key].kind
      if (kinds.includes(kind)) {
        if (!binding.referenced) {
          binding.path.remove()
        }
        if (kind === 'module') {
          const parentPath = binding.path.parentPath
          if (parentPath.isImportDeclaration()) {
            const specifiers = parentPath.node.specifiers
            if (specifiers && specifiers.length === 0) {
              parentPath.remove()
            }
          }
        }
      }
    })
  }
})
```

上面这个demo的实现思路也很简单，首先判断声明的变量是否被引用过，如果没有被引用过，就可以直接移除。需要额外注意的一点就是，对于从模块中引入的变量，除了要判断这个变量本身是否被使用过，也要判断下该模块是否有变量被引入了。

- **实现求幂运算符**

> 求幂运算符`**`

```js
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')

const sourceCode = `
  const a = 2**50
`

const ast = parse(sourceCode, {
  sourceType: 'module'
})

traverse(ast, {
  BinaryExpression(path) {
    const node = path.node
    if (node.operator === '**') {
      const leftValue = node.left.value
      const rightValue = node.right.value
      // 也可以直接通过这种方式处理，但是不推荐
      // path.replaceWithSourceString(`Math.pow(${leftValue}, ${rightValue})`)
      path.replaceWith(
        t.callExpression(
          t.memberExpression(t.identifier('Math'), t.identifier('pow'), false),
          [
            t.numericLiteral(leftValue),
            t.numericLiteral(rightValue)
          ]
        )
      )
    }
  }
})
```

- **编译箭头函数**

```js
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')

const sourceCode = `
const picker = (a, b) => {
	if (a > b) {
    	return a - b
    }

  	return a + b
}

const sum = (a, b, c, d, e) => a + b + c * d / e
`

const ast = parse(sourceCode, {
  sourceType: 'module'
})

traverse(ast, {
  ArrowFunctionExpression(path) {
    const parent = path.parentPath.node
    const fnName = parent.id.name
    const node = path.node
    const anchor = path.findParent((p) => p.isVariableDeclaration())

    if (t.isBlockStatement(node.body)) {
      anchor.replaceWith(
        t.functionDeclaration(
          t.identifier(fnName),
          node.params,
          node.body
        )
      )
      return
    }
    anchor.replaceWith(
      t.functionDeclaration(
        t.identifier(fnName),
        node.params,
        t.blockStatement(
          [
            t.returnStatement(
              node.body
            )
          ]
        )
      )
    )
  }
})
```

## 作用域

`javascript`引擎执行`javascript`代码之前会先对源代码进行编译(注：此编译非`babel`编译)。`javascript`代码经过编译后会生成两部分：**执行上下文**和**可执行代码**，执行上下文中包含了当前作用域的语法环境(保存变量声明和函数声明)和词法环境(保存块级作用域变量)。`babel`在编译`javascript`代码的时候也会生成作用域相关的概念，作用域中也含了该作用域下声明的变量和块级作用域。`babel`的作用域对象用`Scope`表示，我们可以通过`NodePath.scope`或者`NodePath.getScope()`获取当前节点所处的作用域对象。

下面我们来看一下和作用域相关的一些比较常用的属性和方法。

> 作用域对象定义在`@types/babel__traverse/index.d.ts`的`Scope`中

- `scope.path`：获取调用`scope`属性的`NodePath`对象，`NodePath.scope.path === NodePath`
- `scope.block`：获取调用`scope`属性的`NodePath`对象的节点，`NodePath.node === NodePath.scope.block`
- `scope.parentBlock`：获取调用`scope`属性的`NodePath`对象的节点的父节点，`NodePath.parent === NodePath.scope.parentBlock`
- `scope.parent`：获取当前作用域对象的父作用域对象。
- `scope.bindings`：获取在当前作用域下声明的变量，函数或者模块。

> 这个对象的每个成员的值都是`Binding`对象的实例，关于`Binding`后面会一起探讨

- `scope.traverse()`：在当前作用域和`NodePath`下遍历节点
- `scope.generateDeclaredUidIdentifier()`：创建一个唯一的标示符并将其添加到当前作用域下(**慎用哈哈哈**)
- `scope.generateUidIdentifier()`：创建一个唯一的标示符，返回值是`t.Identifier`
- `scope.generateUid()`：创建一个唯一的标示符，返回值是`string`
- `scope.generateUidIdentifierBasedOnNode()`：以当前节点为基准创建一个唯一的标示符
- `scope.rename()`：对当前作用域下声明的某个变量进行命名
- `scope.hasReference()`：判断某个变量名是否在当前作用域下定义
- `scope.hasGlobal()`：判断某个变量是否在全局作用域下定义
- `scope.getAllBindings()`：从当前作用域开始，返回当前作用域链上的所有`bindings`
- `scope.getBinding()`：获取某个变量的`binding`对象，会向上查找作用域链
- `scope.getOwnBinding()`：只获取当前作用域下声明的变量
- `scope.getOwnBindingIdentifier()`：只在当前作用域下获取某个变量的定义
- `scope.hasOwnBinding()`：判断某个变量是否在当前作用下定义
- `scope.hasBinding()`：判断某个变量是否在当前作用域链(也会检查父作用域链)
- `scope.parentHasBinding()`：判断某个变量是否在父作用域中声明
- `scope.moveBindingTo()`：移动某个变量的声明到另一个作用域中
- `scope.removeOwnBinding()`：将某个变量从当前作用域中移除
- `scope.removeBinding()`：将某个变量从当前作用域链中移除

作用域对象中的`bindings`属性包含了当前当前作用域中声明的所有变量。下面是关于`binding`的一些属性。

> `Binding`的定义在`@types/babel__traverse/index.d.ts`的`Binding`中

- `binding.identifier`：获取某个参数名称的`identifier`表示
- `binding.scope`：获取该变量所在的`scope`。`binding.scope === NodePath.scope`
- `binding.path`：获取该变量所在的`NodePath`。`binding.path === NodePath`
- `binding.kind`：获取定义该变量的时候所使用的类型。`"var" | "let" | "const" | "module"`
- `binding.referenced`：该变量是否被使用过
- `binding.references`：该变量被使用的次数
- `binding.referencePaths`：使用该变量的`NodePath`对象集合
- `binding.constant`：如果一个变量没有被重新赋值过则为`true`，否则为`false`
- `binding.constantViolations`：为变量复制的语句所在的`NodePath`对象

了解了关于作用域的相关内容，我们再来看几个小`demo`。

- **参数重命名**

```js
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default

const sourceCode = `
function picker(a, b) {
  return a + b
}
`

const ast = parse(sourceCode)

traverse(ast, {
  FunctionDeclaration(path) {
    const node = path.node
    if (node.params.length > 0) {
      const scope = path.scope
      node.params.forEach(({ name }) => {
        scope.rename(name, scope.generateUid())
      })
    }
  }
})
```

- **参数重命名的另一种方法**

```js
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default

const sourceCode = `
function picker(a, b, c) {
  console.log(b)
  return a + b
}
`

const ast = parse(sourceCode)

traverse(ast, {
  FunctionDeclaration(path) {
    const node = path.node
    node.params.forEach(param => {
      const { name } = param
      const binding = path.scope.bindings[name]
      const uid = path.scope.generateUid()
      // 参数重命名
      param.name = uid

      if (binding && binding.referencePaths.length > 0) {
        binding.referencePaths.forEach(({ node }) => {
          node.name = uid
        })
      }
    })
  }
})
```

了解了这么多，我们就能开发基本的`babel`插件了，后面我们就用上面了解到的属性和方法进行`babel`插件的开发。