(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{170:function(s,a,n){"use strict";n.r(a);var t=n(0),e=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",{staticClass:"content"},[n("h1",[s._v("awk的条件和循环")]),s._v(" "),n("h2",{attrs:{id:"条件语句"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#条件语句","aria-hidden":"true"}},[s._v("#")]),s._v(" 条件语句")]),s._v(" "),n("p",[s._v("条件语句使用"),n("code",[s._v("if")]),s._v("开头，根据表达式的结果判断执行哪条语句。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("表达式"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    awk语句1\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),n("span",{attrs:{class:"token keyword"}},[s._v("else")]),s._v("\n        awk语句2\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("如果有多个语句需要执行，可以使用"),n("code",[s._v("{}")]),s._v("将多个语句扩起来。")]),s._v(" "),n("p",[s._v("例子：选出第二个字段大于80的用户")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# cat kpi.txt")]),s._v("\nuser1 70 72 74 76 74 72\nuser2 80 82 84 82 80 78\nuser3 60 61 62 63 64 65\nuser4 90 89 88 87 86 85\nuser5 45 60 63 62 61 50\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# awk '{if($2>=80) print $1}' kpi.txt")]),s._v("\nuser2\nuser4\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("p",[s._v("多个语句同时执行的时候需要使用"),n("code",[s._v("{}")]),s._v("包含")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# awk '{if($2>=80) { print $1; print $2} }' kpi.txt")]),s._v("\nuser2\n80\nuser4\n90\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("h2",{attrs:{id:"循环语句"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#循环语句","aria-hidden":"true"}},[s._v("#")]),s._v(" 循环语句")]),s._v(" "),n("h3",{attrs:{id:"while循环"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#while循环","aria-hidden":"true"}},[s._v("#")]),s._v(" while循环")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("while"),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("表达式"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    awk语句1\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h3",{attrs:{id:"do-循环"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#do-循环","aria-hidden":"true"}},[s._v("#")]),s._v(" do 循环")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("do")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{attrs:{class:"token function"}},[s._v("awk")]),s._v(" 语句1\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),s._v("while"),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("表达式"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("h3",{attrs:{id:"for循环"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#for循环","aria-hidden":"true"}},[s._v("#")]),s._v(" for循环")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("for"),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("初始值"),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" 循环判断条件"),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" 累加"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    awk语句1\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("在循环语句中可以使用"),n("code",[s._v("continue")]),s._v("和"),n("code",[s._v("break")]),s._v("阻断循环语句的输出。")]),s._v(" "),n("p",[s._v("例子，计算"),n("code",[s._v("kpi.txt")]),s._v("中第第一个用户的总成绩")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# head -1 kpi.txt | awk '{for(c=2;c<=NF;c++){sum += $c};print sum}'")]),s._v("\n438\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("平均成绩")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# head -1 kpi.txt | awk '{for(c=2;c<=NF;c++){sum += $c};print sum/(NF-1)}'")]),s._v("\n73\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("所有用户的总成绩和平均成绩")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};print sum}' kpi.txt")]),s._v("\n438\n486\n375\n525\n341\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@instance-6w9riila ~"),n("span",{attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{attrs:{class:"token comment"}},[s._v("# awk '{sum=0; for(c=2;c<=NF;c++){sum += $c};print sum/(NF-1)}' kpi.txt")]),s._v("\n73\n81\n62.5\n87.5\n56.8333\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])])])}],!1,null,null,null);e.options.__file="38-awk的条件和循环.md";a.default=e.exports}}]);