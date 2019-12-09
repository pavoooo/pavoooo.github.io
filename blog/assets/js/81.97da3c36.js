(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{169:function(s,t,n){"use strict";n.r(t);var a=n(0),e=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"content"},[n("h1",[s._v("axios揭密--拦截器的实现原理")]),s._v(" "),n("p"),n("div",{staticClass:"table-of-contents"},[n("ul")]),n("p"),s._v(" "),n("p",[n("code",[s._v("axios")]),s._v("的拦截器是其非常好用且强大的特性之一。拦截器是什么？它能做什么？相信很多"),n("code",[s._v("axios")]),s._v("的使用者都会很清楚这两个问题。但在具体分析其实现之前我们还是先来看一下拦截器是什么以及它能够做什么？")]),s._v(" "),n("p",[n("code",[s._v("axios")]),s._v("的拦截器有两种，请求拦截器和响应拦截器。请求拦截器让我们能够对发送请求的config作统一的处理，比如添加公参或者添加统一的认证信息。响应拦截器能够让我们对响应的结果作统一的处理，比如响应结果的解构，对错误的响应作统一的处理等。总之，"),n("strong",[s._v("拦截器就是用来对一些统一的操作做统一的处理。")])]),s._v(" "),n("p",[s._v("下面是它的一个基本使用")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("import")]),s._v(" axios "),n("span",{attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v("'axios'")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("// 请求拦截器")]),s._v("\naxios"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("request"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("use")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token comment"}},[s._v("// 添加一些公参")]),s._v("\n    config"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("params "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{attrs:{class:"token operator"}},[s._v("...")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("params"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        user"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" userId"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        requestType"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" requestType\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),n("span",{attrs:{class:"token comment"}},[s._v("// 添加认证信息")]),s._v("\n    config"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("headers "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{attrs:{class:"token operator"}},[s._v("...")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("headers"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        Authorization"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{attrs:{class:"token template-string"}},[n("span",{attrs:{class:"token string"}},[s._v("`encrypt ")]),n("span",{attrs:{class:"token interpolation"}},[n("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("${")]),s._v("token"),n("span",{attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("}")])]),n("span",{attrs:{class:"token string"}},[s._v("`")])]),s._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" config\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("// 响应拦截器")]),s._v("\naxios"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("response"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("use")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("response "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" response"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("data\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" error "),n("span",{attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token comment"}},[s._v("// 按照业务自己处理错误信息")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("Toast")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("error"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("response"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("data"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("message"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br")])]),n("p",[s._v("上面就是"),n("code",[s._v("axios")]),s._v("拦截器的基本使用。通过它，我们能够很方便的对请求中的一些统一操作进行处理。")]),s._v(" "),n("p",[s._v("了解了拦截器的基本使用后，我们就来看一下这么强大的功能是怎么实现的？首先让我们回到"),n("code",[s._v("Axios")]),s._v("构造函数上，在"),n("code",[s._v("lib/core/Axios")])]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("Axios")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("instanceConfig"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("defaults "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" instanceConfig"),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    request"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("InterceptorManager")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    response"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{attrs:{class:"token class-name"}},[s._v("InterceptorManager")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("当我们在声明一个"),n("code",[s._v("Axios")]),s._v("实例对象的时候，会在上面添加一个"),n("code",[s._v("interceptors")]),s._v("属性。"),n("code",[s._v("interceptors")]),s._v("有两个属性"),n("code",[s._v("request")]),s._v("和"),n("code",[s._v("response")]),s._v("。其中"),n("code",[s._v("request")]),s._v("是用来管理请求拦截器的，"),n("code",[s._v("response")]),s._v("是用来管理响应拦截器的。且两者都是"),n("code",[s._v("InterceptorManager")]),s._v("的实例对象，所以二者在使用的时候是没有任何差别的。")]),s._v(" "),n("p",[s._v("下面我们就来看下"),n("code",[s._v("InterceptorManager")]),s._v("是怎么实现的。在"),n("code",[s._v("lib/core/InterceptorManager.js")]),s._v("文件中。")]),s._v(" "),n("p",[n("code",[s._v("InterceptorManager")]),s._v("同样是一个构造函数，实现如下")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("InterceptorManager")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("handlers "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nInterceptorManager"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function-variable function"}},[s._v("use")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("use")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" rejected"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("handlers"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("push")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    rejected"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" rejected\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("handlers"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length "),n("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),n("span",{attrs:{class:"token number"}},[s._v("1")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nInterceptorManager"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function-variable function"}},[s._v("eject")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("eject")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("handlers"),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("id"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("handlers"),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("id"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("null")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nInterceptorManager"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function-variable function"}},[s._v("forEach")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("forEach")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("fn"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  utils"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("forEach")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("handlers"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("forEachHandler")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("h"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("h "),n("span",{attrs:{class:"token operator"}},[s._v("!==")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("null")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),n("span",{attrs:{class:"token function"}},[s._v("fn")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("h"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nmodule"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" InterceptorManager"),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br")])]),n("p",[n("code",[s._v("InterceptorManager")]),s._v("实现也很简单。它的实例对象只有一个属性"),n("code",[s._v("handlers")]),s._v("，用来保存所有的拦截器。当我们调用"),n("code",[s._v("use")]),s._v("方法添加拦截器的时候，该方法接收两个参数，可以理解为成功的回调函数和错误的回调函数。这两种回调函数，"),n("code",[s._v("axios")]),s._v("会在内部根据实际情况进行调用。所以，拦截器一般都是成对出现的，而且能够添加多个。")]),s._v(" "),n("p",[s._v("假设我们给"),n("code",[s._v("axios")]),s._v("添加了如下的拦截器")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("import")]),s._v(" axios "),n("span",{attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v("'axios'")]),s._v("\n\naxios"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("request"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("use")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("onFulfilled1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" onRejected1"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\naxios"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("request"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("use")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("onFulfilled2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" onRejected2"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("// 那么 axios.interceptors.request.handlers就是")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" onFulfilled1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        rejected"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" onRejected1\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" onFulfilled2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        rejected"),n("span",{attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" onRejected2\n    "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])]),n("p",[s._v("多个拦截器会在发送请求前被依次调用。")]),s._v(" "),n("p",[s._v("从"),n("code",[s._v("use")]),s._v("方法中我们也能看到该方法是有返回值的，它在调用的时候返回新添加的拦截器在"),n("code",[s._v("handlers")]),s._v("中的索引。这个返回值有什么作用呢？它主要是给"),n("code",[s._v("InterceptorManager.prototype.eject")]),s._v("使用，我们可以通过调用这个方法并将"),n("code",[s._v("use")]),s._v("方法的返回值传入，就能从"),n("code",[s._v("handlers")]),s._v("中删除对应的拦截器。")]),s._v(" "),n("p",[n("code",[s._v("InterceptorManager.prototype.forEach")]),s._v("方法主要是在内部中使用，后面我们会讲。")]),s._v(" "),n("p",[s._v("上面就是拦截器的添加过程。总结一下，"),n("code",[s._v("axios")]),s._v("的拦截器由内部类"),n("code",[s._v("InterceptorManager")]),s._v("统一管理，其实例对象的属性"),n("code",[s._v("handlers")]),s._v("用来保存添加的每一个拦截器。添加的拦截器会在合适的实际通过原型方法"),n("code",[s._v("forEach")]),s._v("遍历调用。")]),s._v(" "),n("p",[s._v("知道了拦截器是怎么添加的，下面我们就来看一下拦截器是怎么触发。")]),s._v(" "),n("p",[s._v("之前我们在分析"),n("code",[s._v("Axios.prototype.request")]),s._v("方法的时候提起过拦截器。下面我们再回到那个方法中看一下，在"),n("code",[s._v("lib/core/Axios.js")]),s._v(" 文件中。")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[s._v("Axios"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function-variable function"}},[s._v("request")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token comment"}},[s._v("// 省略了一些核心代码")]),s._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("var")]),s._v(" chain "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("dispatchRequest"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" undefined"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("var")]),s._v(" promise "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" Promise"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("resolve")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("config"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("request"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("forEach")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("unshiftRequestInterceptors")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("interceptor"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    chain"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("unshift")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("interceptor"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" interceptor"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("rejected"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("this")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("interceptors"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("response"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("forEach")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{attrs:{class:"token function"}},[s._v("pushResponseInterceptors")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("interceptor"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    chain"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("push")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("interceptor"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("fulfilled"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" interceptor"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("rejected"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("chain"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    promise "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" promise"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("then")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("chain"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("shift")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" chain"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{attrs:{class:"token function"}},[s._v("shift")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),n("span",{attrs:{class:"token keyword"}},[s._v("return")]),s._v(" promise\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br")])]),n("p",[s._v("当我们调用"),n("code",[s._v("Axios.prototype.request")]),s._v("方法的时候，其内部会对请求拦截器和响应拦截器进行遍历。在遍历请求拦截器的时候，会将每个拦截器的"),n("code",[s._v("fulfilled")]),s._v("和"),n("code",[s._v("rejected")]),s._v("成对的依次添加在"),n("code",[s._v("chain")]),s._v("队列的首部，而在遍历响应拦截器的时候，会将每个拦截器的"),n("code",[s._v("fulfilled")]),s._v("和"),n("code",[s._v("rejected")]),s._v("成对的依次添加在"),n("code",[s._v("chain")]),s._v("队列的尾部。执行完拦截器的遍历后，"),n("code",[s._v("chain")]),s._v("队列可能是下面这种形式")]),s._v(" "),n("blockquote",[n("p",[s._v("这里使用this.interceptors.response.forEach对拦截器进行遍历可以有效的过滤掉那些已经被eject的拦截器")])]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    requestFulfiled1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" requestRejected1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" requestFulfilled2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" requestRejected2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("...")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("// 请求拦截器")]),s._v("\n    dispatchRequest"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" undefined"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("// 真正大发送请求的函数")]),s._v("\n    responseFulfiled1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" responseRejected1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" responseFulfilled2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" responseRejected2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token operator"}},[s._v("...")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("// 响应拦截器")]),s._v("\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("下面的"),n("code",[s._v("while")]),s._v("循环会创建一个"),n("code",[s._v("promise")]),s._v("的执行链。"),n("code",[s._v("while")]),s._v("循环结束后"),n("code",[s._v("promise")]),s._v("执行过程可能如下")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[s._v("promise"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("then")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("requestFulfiled1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" requestRejected1"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("then")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("requestFulfiled2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" requestRejected2"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("then")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("dispatchRequest"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" undefined"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("then")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("responseFulfiled1"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" responseRejected1"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("then")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("responseFulfiled2"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" responseRejected2"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("我们知道"),n("code",[s._v("dispatchRequest")]),s._v("是真正的发送请求的函数，这样就保证了所有的请求拦截器都会在请求发送之前被调用，所有的响应拦截器也是在请求响应之后才被调用。")]),s._v(" "),n("p",[s._v("上面就是关于"),n("code",[s._v("axios")]),s._v("拦截器的一些具体实现细节，后面我们会分析下"),n("code",[s._v("axios")]),s._v("是怎么取消请求的。")])])}],!1,null,null,null);e.options.__file="axios揭密--拦截器的实现原理.md";t.default=e.exports}}]);