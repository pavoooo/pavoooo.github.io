(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{190:function(s,v,n){"use strict";n.r(v);var _=n(0),a=Object(_.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,v=s.$createElement,n=s._self._c||v;return n("div",{staticClass:"content"},[n("h1",[s._v("每天一点linux（一）")]),s._v(" "),n("h2",{attrs:{id:"目录结构"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#目录结构","aria-hidden":"true"}},[s._v("#")]),s._v(" 目录结构")]),s._v(" "),n("p",[n("code",[s._v("linux")]),s._v("系统中"),n("strong",[s._v("一切皆文件")]),s._v("。在系统学习"),n("code",[s._v("linux")]),s._v("系统之前，我们有必要对"),n("code",[s._v("linux")]),s._v("系统的目录结构进行熟悉。\n在"),n("code",[s._v("linux")]),s._v("系统中有一个"),n("strong",[s._v("根目录")]),s._v("，用符号"),n("code",[s._v("/")]),s._v("表示。登录到"),n("code",[s._v("linux")]),s._v("系统，直接进入到这个目录后执行如下命令。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token comment"}},[s._v("# 进入到根目录")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("cd")]),s._v(" /\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("# 显示当前目录名称")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("pwd")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("# 列出当前目录下的文件夹")]),s._v("\nll "),n("span",{attrs:{class:"token comment"}},[s._v("# 或者 ls -al")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])]),n("p",[s._v("会有如下输出")]),s._v(" "),n("p",[n("img",{attrs:{src:"/blog/linux-imgs/linux1.png",alt:"linux"}})]),s._v(" "),n("p",[s._v("其中"),n("code",[s._v("ll")]),s._v("命令的输出中的蓝色字体表示的就是"),n("code",[s._v("linux")]),s._v("系统下"),n("code",[s._v("/")]),s._v("目录下面所有的目录。对于这些目录，我们需要清楚的知道它是谁，它用来做什么。")]),s._v(" "),n("ul",[n("li",[n("strong",[s._v("/bin")]),s._v("："),n("code",[s._v("bin")]),s._v("就是"),n("code",[s._v("Binary")]),s._v("的缩写。这个目录主要是用来存放系统的可执行文件的，即存放常用命令的文件。")]),s._v(" "),n("li",[n("strong",[s._v("/boot")]),s._v("：存放内核和启动程序，所有和启动相关的文件都存放在这个目录中")]),s._v(" "),n("li",[n("strong",[s._v("/dev")]),s._v("："),n("code",[s._v("dev")]),s._v("是"),n("code",[s._v("Device")]),s._v("的缩写。这个目录主要存放的是linux的外部设备。在linux系统中，外部设备同样以文件的形式进行访问。")]),s._v(" "),n("li",[n("strong",[s._v("/etc")]),s._v("：这个目录主要是用来存放系统软件的配置文件及相关子目录等")]),s._v(" "),n("li",[n("strong",[s._v("/home")]),s._v("：用来存放各个用户家目录的文件。各文件夹以用户名进行命名。")]),s._v(" "),n("li",[n("strong",[s._v("/lib")]),s._v("：存放系统的动态连接共享库。")]),s._v(" "),n("li",[n("strong",[s._v("/lost+found")]),s._v("：这个目录一般是空的。当系统非法关机后，这里会存放一些文件")]),s._v(" "),n("li",[n("strong",[s._v("/media")]),s._v("：挂载媒体设备，如光驱、U盘等")]),s._v(" "),n("li",[n("strong",[s._v("/mnt")]),s._v("：临时挂载别的文件系统")]),s._v(" "),n("li",[n("strong",[s._v("/opt")]),s._v("：存放应用软件包的文件")]),s._v(" "),n("li",[n("strong",[s._v("/proc")]),s._v("：这个目录是系统内存的映射，我们可以直接访问这个目录来获取系统相关的信息。这个目录存放在内存中而不是硬盘上。")]),s._v(" "),n("li",[n("strong",[s._v("/root")]),s._v("：超级管理员的家目录")]),s._v(" "),n("li",[n("strong",[s._v("/sbin")]),s._v("：存放超级管理员所使用的命令文件")]),s._v(" "),n("li",[n("strong",[s._v("/selinux")]),s._v("：存放和selinux相关的文件")]),s._v(" "),n("li",[n("strong",[s._v("/srv")]),s._v("：存放一些服务启动后需要提取的数据")]),s._v(" "),n("li",[n("strong",[s._v("/sys")]),s._v("：存放和硬件驱动相关的信息")]),s._v(" "),n("li",[n("strong",[s._v("/tmp")]),s._v("：存放临时文件")]),s._v(" "),n("li",[n("strong",[s._v("/usr")]),s._v("：非常非常重要的一个目录。主要用于存放系统的应用程序的")]),s._v(" "),n("li",[n("strong",[s._v("/var")]),s._v("：记录系统运行时候产生的日志等")])]),s._v(" "),n("p",[s._v("上面就是关于"),n("code",[s._v("linux")]),s._v("系统目录的一些基本罗列和介绍。除了这些根目录的直接子目录，我们也需要对"),n("code",[s._v("/usr")]),s._v("目录进行一些简单的介绍。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("ll /usr\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("ul",[n("li",[n("strong",[s._v("/usr/bin")]),s._v("：存放系统用户使用的命令")]),s._v(" "),n("li",[n("strong",[s._v("/usr/sbin")]),s._v("：存放超级用户使用的命令和一些系统守护程序")]),s._v(" "),n("li",[n("strong",[s._v("/usr/src")]),s._v("：内核源代码默认目录")]),s._v(" "),n("li",[n("strong",[s._v("/usr/lib")]),s._v("：应用程序的库文件")]),s._v(" "),n("li",[n("strong",[s._v("/usr/local")]),s._v("：包含用户程序等")])]),s._v(" "),n("h2",{attrs:{id:"终端"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#终端","aria-hidden":"true"}},[s._v("#")]),s._v(" 终端")]),s._v(" "),n("p",[s._v("在使用"),n("code",[s._v("linux")]),s._v("系统时，我们操作系统的工具就是"),n("code",[s._v("终端")]),s._v("。"),n("code",[s._v("终端")]),s._v("又被称为"),n("code",[s._v("shell")]),s._v("。所谓"),n("code",[s._v("shell")]),s._v("，其实就是命令解释器，能够根据输入的命令让系统执行相应的操作。")]),s._v(" "),n("p",[s._v("可以通过如下方式查看当前"),n("code",[s._v("linux")]),s._v("中包含哪些"),n("code",[s._v("shell")]),s._v("：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token function"}},[s._v("cat")]),s._v(" /etc/shells\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[n("img",{attrs:{src:"/blog/linux-imgs/linux2.png",alt:"linux"}})]),s._v(" "),n("p",[s._v("如下命令可以查看当前系统正在使用的"),n("code",[s._v("shell")])]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[s._v("echo")]),s._v(" "),n("span",{attrs:{class:"token variable"}},[s._v("$SHELL")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[n("img",{attrs:{src:"/blog/linux-imgs/linux3.png",alt:"linux"}})]),s._v(" "),n("ul",[n("li",[n("strong",[s._v("/bin/bash")]),s._v("：linux系统默认的shell")]),s._v(" "),n("li",[n("strong",[s._v("/bin/sh")]),s._v("：已经被"),n("code",[s._v("/bin/bash")]),s._v("所代替")]),s._v(" "),n("li",[n("strong",[s._v("/bin/dash")]),s._v("：比"),n("code",[s._v("/bin/bash")]),s._v("更轻量、更快速。但是没有"),n("code",[s._v("/bin/bash")]),s._v("常用")]),s._v(" "),n("li",[n("strong",[s._v("/sbin/nologin")]),s._v("：如果一个用户的默认shell设置为/sbin/nologin，则这个用户是禁止登录系统的。")]),s._v(" "),n("li",[n("strong",[s._v("/bin/zsh")]),s._v("：功能更加强大的shell")])]),s._v(" "),n("p",[s._v("上述的"),n("code",[s._v("shell")]),s._v("我们可以通过如下命令进行切换")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("chsh -s /bin/zsh "),n("span",{attrs:{class:"token comment"}},[s._v("# chsh -s 要切换的shell名称")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("h2",{attrs:{id:"路径"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#路径","aria-hidden":"true"}},[s._v("#")]),s._v(" 路径")]),s._v(" "),n("p",[n("code",[s._v("linux")]),s._v("中的路径形式有两种："),n("strong",[s._v("绝对路径")]),s._v("和"),n("strong",[s._v("相对路径")]),s._v("。")]),s._v(" "),n("ul",[n("li",[n("strong",[s._v("绝对路径")]),s._v("：以"),n("code",[s._v("/")]),s._v("开头，相对于根目录进行解析的路径")])]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("/root\n/home/saisai\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("ul",[n("li",[n("strong",[s._v("相对路径")]),s._v("：相对于当前位置进行解析的路径")])]),s._v(" "),n("p",[s._v("有两种特殊的相对路径："),n("code",[s._v(".")]),s._v("和"),n("code",[s._v("..")]),s._v("。其中"),n("code",[s._v(".")]),s._v("就表示当前目录，"),n("code",[s._v("..")]),s._v("表示的是当前目录的上级目录。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token function"}},[s._v("cd")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("..")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("# 返回到上级目录中")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])])])}],!1,null,null,null);a.options.__file="每天一点linux（一）.md";v.default=a.exports}}]);