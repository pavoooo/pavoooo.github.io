# 业务组件jest测试总结

`loan-component`是我们组维护的一个集成了金融很多项目中核心功能业务组件库，接入方有我司的人品贷，信用花和即刻有等产品。每一次需求的迭代和开发，如果对三个产品都进行回归的话，时间和人力成本会很高。其次，`loan-compoent`项目承载的都是一些业务组件，文档仅限于接入方怎么使用它，对于内部的实现没有提及，也没有必要进行详细的说明。如果有新的开发者介入到此项目的开发，只有通过读源码的方式才能深入了解到核心功能是怎么实现的。如果我们为组件提供了完整的测试用例，回归测试前开发人员就可以通过测试用例感知在不同产品的表现。同时，新的开发者介入的时候也可以通过测试用例快速了解到组件的核心功能，快速的上手开发。


提到测试，或许很多前端人员都感觉到很陌生，也会有一部分人感觉前端的测试用例写起来太复杂。因为前端的基本业务都是UI层面的，这些业务基本上都是和人打交道，用代码模拟人的交互行为确实没有那么好做。但是，前端测试领域并不仅限于UI层面的测试，即UI测试。目前前端测试主要包含单元测试，UI测试，集成测试和端到端(e2e)测试。关于这些，大家可以看下这篇文章[万字长文总结前端测试体系建设与最佳实践](https://mp.weixin.qq.com/s/IgA29U-etBKUls7JnpE2Zw)。这里我们主要总结一下我们在我们自己的业务组件中是怎么进行测试的。


这里先说一下为什么对我们的项目选择了集成测试，原因有二。


- 业务组件之间的各组件或者是各模块之间并不解耦，一个核心功能是需要很多组件相互调用完成。当然，你也可以为每个组件编写单元测试，两者不排斥。但我们主要是为了测试核心流程上有没有问题，所以就选择了集成测试
- 集成测试相对于e2e测试和ui测试来说，上手成本低，简单易用，且能覆盖很多核心流程。


## 需要了解的几个东西
- [jest](https://jestjs.io/): 运行测试用例的框架，功能齐全，简单易用。
- [vue-test-utils](https://vue-test-utils.vuejs.org/): vue官方测试工具，我们可以利用这个工具进行组件的挂载，获取组件vm实例，触发组件中元素的事件等。


所以，对于vue项目的测试，上面两个东西够了。


## 测试环境配置

首先安装一些运行测试必要的package


```bash
nbm install @vue/test-utils jest vue-jest jest-environment-jsdom-fifteen jest-serializer-vue jest-transform-stub jest-watch-typeahead babel-jest@21 @types/jest -D
```


> 注意，这里我们安装了babel-jest@21的版本。因为从这个版本之上需要babel@7的环境，但我们的项目依然使用的是babel@6，所以安装的时候注意一下。


安装好工具后，我们就需要对我们的项目环境做一些配置。首先在根目录中创建一个`jest.config.js`文件。`jest`是基于配置的，它在运行的时候会读取这个文件中的配置内容。


```bash
touch jest.config.js
```


然后，加入下面这些配置


```js
module.exports = {
    // 文件没有后缀的时候，后缀的匹配顺序。类似于webpack的resolve.extensions
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue',
    ],
    // 各种模块转化器
    transform: {
        // process *.vue files with vue-jest
        '^.+\\.vue$': require.resolve('vue-jest'),
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
        require.resolve('jest-transform-stub'),
        '^.+\\.jsx?$': require.resolve('babel-jest'),
    },
	// 指定项目中引入的源码编译的包。默认是node_modules。我们可以通过如下配置指定node_modules下面哪些包在运行测试的时候使用上面的工具进行编译。
    transformIgnorePatterns: [
        '/node_modules/(?!@u51\/pg|@u51\/log|@u51\/import-*|@u51\/week)',
    ],
    // 模块引入时候的别名映射，类似于webpack中的alias配置
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
	// jsdom 版本
    testEnvironment: 'jest-environment-jsdom-fifteen',
    testEnvironmentOptions: {
        userAgent: 'EnNiu_RenPinDai/5.2.3 (iPhone;iOS 10.3.3)',
    },
    // 快找序列化工具
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    // 当运行测试的时候需要到哪些目录下寻找我们的测试文件
    testMatch: [
        // 任意__tests__下的目录以.spec.js结尾的文件
        '**/__tests__/**/*.spec.[jt]s?(x)',
        '**/__tests__/**/*.test.[jt]s?(x)',
    ],
    testURL: 'http://localhost/',
    watchPlugins: [
        require.resolve('jest-watch-typeahead/filename'),
        require.resolve('jest-watch-typeahead/testname'),
    ],
	// 测试覆盖率收集文件
    collectCoverageFrom: [
        '<rootDir>/**/*.{js,jsx,vue}',
    ],
    coverageReporters: ['html', 'text-summary'],
};
```

jest配置好后，我们需要对我们的babel配置做一些变更。在babel的配置文件中添加一个env.test配置


```js
module.exports = {
	env: {
		// 其它环境的配置信息没有列出
		"test": {
      	"presets": [["env", { "targets": { "node": "current" } }], "stage-0"],
      	"plugins": [
        	["@u51/babel-plugin-weekui", {
	          "platform": "web",
    	      "code": "bundle"
        	}]
	      ]
    	}
	}
}
```
上面的babel配置你可以根据自己的项目另行配置。


然后在package.json中添加两个command


```js
{
	scripts: {
		"test:unit": "jest --watch",
		"test:cov": "jest --coverage"
	}
}
```

`test:unit`是开发环境下以`watch`的模式运行`jest`，这样每当关联文件改变的时候`jest`会自动帮我们运行测试用例。这种模式下在终端会显示很多选项，根据需要可以自行选择观察策略。
`test:cov`是生成测试覆盖率报告。基于哪些文件收集测试覆盖率以及生成什么格式的测试覆盖率我们已经在`jest.config.js`中配置好了。

至此，测试环境基本搭建完毕，下面就可以开始对需要测试的组件写测试了。

## 写测试


先弄懂两个小问题，测试用例放在哪里，怎么写？


测试用例放在哪里取决于你在`jest.config.js`做了什么样的配置。比如我们的配置文件中的`testMatch`做了如下配置


```js
testMatch: [
    // 任意__tests__下的目录以.spec.js结尾的文件
    '**/__tests__/**/*.spec.[jt]s?(x)',
    '**/__tests__/**/*.test.[jt]s?(x)',
]
```


所以在你项目中的任意`__tests__`文件夹下以`.test.js`,`.test.ts`,`.test.jsx`,`.test.tsx`和`.spec.js`,`.spec.ts`,`.spec.jsx`,`.spec.tsx`都会被认为是测试用例文件。当然你也可以根据自己的喜好设置自己测试文件目录。比如，`loan-components`中的测试就是像下面这样放置的


```bash
├── __mocks__
│   └── @u51
│       └── pg.js
├── __tests__
│   ├── index.spec.js
│   └── utils
│       ├── check-init-data.js
│       ├── city-data.js
│       ├── index.js
│       ├── real-info-new.js
│       ├── real-info-old.js
│       └── real-info-status.js
├── index.js
├── util
│   ├── api.js
│   └── service.js
└── view
    ├── config.js
    ├── index.vue
    └── input-info
        └── index.vue
```
把测试用例放在在每个组件目录中，用例跟着组件走。

那怎么写呢？即使没有写过测试用例的同学，多多少少也会对测试有一些了解。测试其实就是用来验证预期和实际是否吻合的过程。比如，我期望 1 + 1 等于 2，如果用一个测试用例来表述的话，如下


```js
expect(1+1).toBe(2)
```
上面的这个用例，期望值和实际值是吻合的，所以测试用例会成功通过。但是，如果你这样写


```js
expect(1+1).toBe(3)
```


这明显是一个期望值和实际值不吻合的情况，所以测试用例会失败。因此，测试用例的运行结果有两种，成功和失败(感觉是废话哈哈哈哈)。成功意味着你的业务逻辑运行结果和期望相符，失败则意味着不符，这种情况下你就要去检查是不是你的代码有bug还是测试用例写的有问题。在这一点上，jest会给我们很多人性化的错误信息，便于我们排查问题。


## 实战


实战之前，希望你对下面这些玩意有一个基本的了解


- describe
- it
- expect(断言)
- jest钩子


不了解的花个几分钟看一下文档，就全了解了。


下面我们就来看一下怎么使用jest测试我们的vue项目。假设我们的vue组件如下


```html
// page.vue
<template>
	<div class-="page">
		<span class="text">{{ text }}</span>
		<button @click="onBtnClick">按钮</button>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				text: 'hello world'
			}
		},
		methods: {
			onBtnClick() {
				this.text = 'hi world'
				this.$emit('click')
			}
		}
	}
</script>
```


上面的组件很简单，如果我们要对上面的组件进行测试，我们需要做什么？


第一步：渲染组件。那怎么渲染呢？这里就需要使用vue-test-utils了。这个工具提供了两种渲染组件的方式shallowMount和mount，两者的区别大家可以通过文档了解。一般我们在写单元测试的时候使用shallowMount挂载组件，在写集成测试的时候更多的是使用mount挂载组件。当然，这并不是绝对的，具体的还需要你根据自己的业务场景自行判断。
第二步：想一下你需要测试哪几种场景？其实就是整理测试case。比如，页面渲染是否正确，dom元素的隐藏和显示是否符合预期，点击按钮的交互行为是不是也符合预期等。


> jest为我们提供的jsdom并不是浏览器中真实的dom环境，但基本的api都已经包含。详细了解可以点击[jsdom](https://github.com/jsdom/jsdom)


下面我们就来写一下针对上面组件的测试用例


```js
import { shllowMount } from 'vue-test-utils'
import Page from '../page.vue'


describe('page component', () => {
	it('页面结构正确。应该包含一个按钮和一个span', () => {
		const wrapper = shallowMount(Page)
		
		expect(wrapper.find('.text').exists()).toBe(true)
		expect(wrapper.find('button').exists()).toBe(true)
		expect(wrapper.find('.text').text()).toBe('hello world')
	})


	it('点击按钮，组件的text值改变。同时触发click事件', () => {
		const wrapper = shallowMount(Page)
		const vm = wrapper = vm


		expect(vm.text).toBe('hello world')
		expect(wrapper.find('button').trigger('click'))
		expect(vm.text).toBe('hi world')


		expect(wrapper.find('.text').text()).toBe('hi world')
		expect(wrapper.emitted().click).toBeTruthy()
	})
})
```
上面我们就为`Page.vue`组件添加了基本的测试用例。复杂组件的测试用例也不外乎这些东西，只是业务复杂了，场景多了，用例代码多了。但是也有一些场景需要了解怎么处理。


比如，业务中可能会调用接口，这种场景我们怎么处理。在webapp中，我们可能会调用客户端的功能，比如openWebview,selectContacter等，这种场景我们应该怎么处理。业务中可能会对环境进行判断，安卓和ios采用不同的处理方法，这种场景我们又需要怎么处理。


对于上面这些场景，我们就需要赞叹jest为我们提供的mock功能。接口mock，模块mock，功能mock，方法mock统统都有。总之你遇到上面这些场景，没有什么是mock不能解决的。关于mock的详细知识，请点击[mock](https://jestjs.io/docs/zh-Hans/mock-functions)


下面我们结合一些实际的业务场景来看看mock的应用


```html
// page.vue
<template>
	<div class-="page">
		<span class="text">{{ text }}</span>
		<button @click="onBtnClick">按钮</button>
	</div>
</template>


<script>
	import axios from 'axios'
	import { PG } from '@u51/pg'
	export default {
		data() {
			return {
				text: 'hello world'
			}
		},
		async created() {
			const data = await axios.get('/some/api')
			this.text = data.text
		},
		methods: {
			onBtnClick() {
				PG.exec('openWebview', { url: 'https://www.baidu.com' })
			}
		}
	}
</script>
```


上面的这个组件中在`created`生命周期中会调用后端的接口，当按钮点击的时候会调用`PG`的方法。针对这种场景我们进行mock，这里我们采用手动mock的方式，在__tests__同级目录下创建一个__mocks__文件夹。它看起来可能是这样


```bash
├── @u51
│   └── pg.js
└── axios.js
```


在`@u51/pg.js`中我们可以作如下mock


```js
export const PG = {
	exec: jest.fn()
}
```


在axios中我们可能作如下mock


```js
export default {
	get: jest.fn().mockResolvedValue({ text: 'saisai' })
}
```


做了mock后，我们就可以针对上面组件编写测试用例代码了


```js
import { shllowMount } from 'vue-test-utils'
import { PG } from '@u51/pg
import Page from '../page.vue'
describe('page component', () => {
	
	it('页面渲染后，text值改变。点击按钮，调用PG方法', async () => {
		const wrapper = shallowMount(Page)
		const vm = wrapper = vm
		
		await vm.$nextTick()
		
		expect(vm.text).toBe('saisai')
		expect(wrapper.find('button').trigger('click'))
		expect(PG.exec).toBeCalledTimes(1)
	})
})
```


上面就是jest的mock场景的简单应用。


## 总结


上面是针对这几天写测试用例做的一个简单总结。根据二八原则，着手写测试用例我们只要了解了jest的断言，jest的mock，可能某些场景还需要了解下jest的钩子函数，vue-test-utils的简单使用，就能够开始写了。当然，最重要的你要对你的业务逻辑足够熟悉。
