(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{169:function(v,_,e){"use strict";e.r(_);var s=e(0),a=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("div",{staticClass:"content"},[e("h1",[v._v("vim的使用")]),v._v(" "),e("p",[e("code",[v._v("vim")]),v._v("主要是用来在终端中编辑文件的。它是一个同"),e("code",[v._v("vi")]),v._v("向上兼容的文本编辑器。")]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[v._v("vim "),e("span",{attrs:{class:"token function"}},[v._v("file")]),v._v("\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br")])]),e("p",[e("code",[v._v("vim")]),v._v("的四种模式")]),v._v(" "),e("ul",[e("li",[v._v("正常模式(Normal-mode)")]),v._v(" "),e("li",[v._v("插入模式(Insert-mode)")]),v._v(" "),e("li",[v._v("命令模式(Command-mode)")]),v._v(" "),e("li",[v._v("可视模式(Visual-mode)")])]),v._v(" "),e("h2",{attrs:{id:"正常模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#正常模式","aria-hidden":"true"}},[v._v("#")]),v._v(" 正常模式")]),v._v(" "),e("p",[v._v("直接通过"),e("code",[v._v("vim")]),v._v("打开一个文件就进入了"),e("code",[v._v("vim")]),v._v("的正常模式。通过以下命令可以进入插入模式。")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("i")]),v._v("：光标在当前位置")]),v._v(" "),e("li",[e("code",[v._v("I")]),v._v(": 光标会移动到当前行的开头")]),v._v(" "),e("li",[e("code",[v._v("a")]),v._v(": 光标会向后移动一个字符")]),v._v(" "),e("li",[e("code",[v._v("A")]),v._v("：光标会移动到该行的末尾")]),v._v(" "),e("li",[e("code",[v._v("o")]),v._v("：在当前光标所在行的下面添加一个空行，并将光标移动到该空行最前面")]),v._v(" "),e("li",[e("code",[v._v("O")]),v._v("：在当前光标所在行的上面添加一个空行，并将光标移动到该空行最前面")])]),v._v(" "),e("blockquote",[e("p",[v._v("其他模式下可以按下"),e("code",[v._v("esc")]),v._v("进入到正常模式")])]),v._v(" "),e("p",[v._v("在正常模式下可以输入"),e("code",[v._v(":wq")]),v._v("对该文件进行保存退出。")]),v._v(" "),e("p",[e("strong",[v._v("1. 光标移动")])]),v._v(" "),e("ul",[e("li",[e("code",[v._v("h")]),v._v(": 向左移动")]),v._v(" "),e("li",[e("code",[v._v("j")]),v._v("：向下移动")]),v._v(" "),e("li",[e("code",[v._v("k")]),v._v("：向上移动")]),v._v(" "),e("li",[e("code",[v._v("l")]),v._v("：向右移动")])]),v._v(" "),e("p",[e("strong",[v._v("2. 复制和粘贴")])]),v._v(" "),e("ul",[e("li",[e("code",[v._v("yy")]),v._v("：复制当前行的内容")]),v._v(" "),e("li",[e("code",[v._v("p")]),v._v("：粘贴复制的内容")]),v._v(" "),e("li",[e("code",[v._v("(number)yy")]),v._v("：从当前行开始向下复制"),e("code",[v._v("number")]),v._v("行")]),v._v(" "),e("li",[e("code",[v._v("y$")]),v._v("：复制从光标的位置到当前行的结尾")]),v._v(" "),e("li",[e("code",[v._v("dd")]),v._v("：剪切当前行")]),v._v(" "),e("li",[e("code",[v._v("(number)dd")]),v._v("：从当前行开始向下剪切"),e("code",[v._v("number")]),v._v("行")]),v._v(" "),e("li",[e("code",[v._v("d$")]),v._v("：从光标所在位置剪切到行末尾")]),v._v(" "),e("li",[e("code",[v._v("u")]),v._v("：撤销操作")])]),v._v(" "),e("blockquote",[e("p",[v._v("多次按"),e("code",[v._v("u")]),v._v("进行多次撤销")])]),v._v(" "),e("ul",[e("li",[e("code",[v._v("ctrl+r")]),v._v("：恢复操作")])]),v._v(" "),e("p",[e("strong",[v._v("3. 光标操作")])]),v._v(" "),e("ul",[e("li",[e("code",[v._v("x")]),v._v("：删除光标所在位置的字符")]),v._v(" "),e("li",[e("code",[v._v("r")]),v._v("：对光标所在位置的字符进行替换")]),v._v(" "),e("li",[e("code",[v._v("(number)G")]),v._v("：将光标移动到"),e("code",[v._v("number")]),v._v("行的行首位置")]),v._v(" "),e("li",[e("code",[v._v("gg")]),v._v("：将光标移动到文件第一行行首")]),v._v(" "),e("li",[e("code",[v._v("GG")]),v._v("：将光标移动到文件最后一行行首")]),v._v(" "),e("li",[e("code",[v._v("^")]),v._v("：将光标移动到该行行首")]),v._v(" "),e("li",[e("code",[v._v("$")]),v._v("：将光标移动到该行末尾")])]),v._v(" "),e("h2",{attrs:{id:"命令模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令模式","aria-hidden":"true"}},[v._v("#")]),v._v(" 命令模式")]),v._v(" "),e("p",[v._v("命令模式主要是对文件的操作，可以对文件进行保存，退出，查找和替换等功能。")]),v._v(" "),e("blockquote",[e("p",[e("code",[v._v(":")]),v._v("可以进入命令模式")])]),v._v(" "),e("ul",[e("li",[e("code",[v._v("w")]),v._v("：保存文件")])]),v._v(" "),e("p",[v._v("使用"),e("code",[v._v("w")]),v._v("进行文件保存的时候，可以指定文件的保存路径。")]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[v._v(":w /root/a.txt\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br")])]),e("ul",[e("li",[e("p",[e("code",[v._v("q")]),v._v("：退出vim")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("qw")]),v._v("：保存并退出")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("q!")]),v._v("：强制退出(如果文件没有被保存是不会保存的)")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("!")]),v._v("：执行"),e("code",[v._v("linux命令")])])])]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[v._v("# 查看当前文件路径")]),v._v("\n:"),e("span",{attrs:{class:"token operator"}},[v._v("!")]),v._v(" "),e("span",{attrs:{class:"token function"}},[v._v("pwd")]),v._v("\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br"),e("span",{staticClass:"line-number"},[v._v("2")]),e("br")])]),e("ul",[e("li",[e("code",[v._v("/查找的内容")])])]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[v._v("# 查找文件中的i")]),v._v("\n/i\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br"),e("span",{staticClass:"line-number"},[v._v("2")]),e("br")])]),e("p",[v._v("在查找模式下，按"),e("code",[v._v("n")]),v._v("可以使光标移动到下一个"),e("code",[v._v("i")]),v._v("的位置。按"),e("code",[v._v("shift+n")]),v._v("可以使光标移动到上一个"),e("code",[v._v("i")]),v._v("的位置。")]),v._v(" "),e("ul",[e("li",[e("code",[v._v(":s/旧的内容/新的内容")])])]),v._v(" "),e("p",[v._v("通过上面的格式可以进行文本的替换")]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[v._v("# 将文件中每一行的第一个的i替换成I")]),v._v("\n:%s/i/I\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br"),e("span",{staticClass:"line-number"},[v._v("2")]),e("br")])]),e("blockquote",[e("p",[e("code",[v._v("%s")]),v._v("是对整个文件所有行进行查找和替换，"),e("code",[v._v("s")]),v._v("默认对光标所在行进行替换。但是它们默认只替换每行的第一个匹配的字符")])]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[v._v("# 将文件中所有的i替换成I")]),v._v("\n:%s/i/I/g\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br"),e("span",{staticClass:"line-number"},[v._v("2")]),e("br")])]),e("ul",[e("li",[e("code",[v._v("start,ends/旧的内容/新的内容")])])]),v._v(" "),e("p",[v._v("上面对指定行的内容进行替换")]),v._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[v._v("# 将第二行-第四行所有的I替换成i")]),v._v("\n:2,4s/I/i/g\n")])]),v._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[v._v("1")]),e("br"),e("span",{staticClass:"line-number"},[v._v("2")]),e("br")])]),e("ul",[e("li",[e("code",[v._v("set nu")]),v._v("：显示行号")]),v._v(" "),e("li",[e("code",[v._v("set nonu")]),v._v("：取消行号")])]),v._v(" "),e("blockquote",[e("p",[e("code",[v._v("set")]),v._v("命令只对当前修改生效，文件保存退出再次打开后，上面的设置就不生效了。如果你相对"),e("code",[v._v("vim")]),v._v("打开的文件都生效，可以设置"),e("code",[v._v("/etc/vimrc")]),v._v("相关内容")])]),v._v(" "),e("p",[v._v("比如将"),e("code",[v._v("set nu")]),v._v("添加到"),e("code",[v._v("/etc/vimrc")]),v._v("文件中，则每次使用"),e("code",[v._v("vim")]),v._v("打开文件的时候都会显示行号。")]),v._v(" "),e("h2",{attrs:{id:"可视模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#可视模式","aria-hidden":"true"}},[v._v("#")]),v._v(" 可视模式")]),v._v(" "),e("p",[v._v("三种进入可视模式的方式")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("v")]),v._v("：字符可视模式")]),v._v(" "),e("li",[e("code",[v._v("V")]),v._v("：行可视模式")]),v._v(" "),e("li",[e("code",[v._v("ctrl+v")]),v._v("：块可视模式\n"),e("ul",[e("li",[v._v("配合"),e("code",[v._v("d")]),v._v("和"),e("code",[v._v("I")]),v._v("可以命令可以进行块的便利操作")])])])]),v._v(" "),e("p",[v._v("比如在每一行的行首添加"),e("code",[v._v("123")]),v._v("。可以按照如下操作：首先进入可视模式，移动光标选择需要添加"),e("code",[v._v("123")]),v._v("的行，使用"),e("code",[v._v("shift+i")]),v._v("("),e("code",[v._v("I")]),v._v(")命令进入可视编辑模式，输入"),e("code",[v._v("123")]),v._v("后，连续按下两次"),e("code",[v._v("esc")]),v._v("，就会在选中的行的行首添加"),e("code",[v._v("123")]),v._v("。")]),v._v(" "),e("p",[v._v("在可视模式下，选中块后，使用"),e("code",[v._v("d")]),v._v("键，可以将选中的块进行删除。")])])}],!1,null,null,null);a.options.__file="08-vim的使用.md";_.default=a.exports}}]);