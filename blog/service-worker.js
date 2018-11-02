/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2017/Centos6.8使用rpm安装mysql5.7.html",
    "revision": "522db8d37d58bb2776c51533eba31db3"
  },
  {
    "url": "2017/Mocha中文文档.html",
    "revision": "80cf04c0d60f3cf1b375e8368188c9f1"
  },
  {
    "url": "2017/react-start到co源码系列一.html",
    "revision": "5bcc2be9858d2b3aac61557cec4c0ee0"
  },
  {
    "url": "2017/react-start到co源码系列三.html",
    "revision": "daf4e3a5c888c53dc141114dfc4fc353"
  },
  {
    "url": "2017/react-start到co源码系列二.html",
    "revision": "b2328d1a92f2a89cac6bf1a623cb300d"
  },
  {
    "url": "2017/ReactDOM详解.html",
    "revision": "c537abe2b7c8287081851cf861744716"
  },
  {
    "url": "2017/redux源码解读--applyMiddleware源码解析.html",
    "revision": "e5d0bac5ab2ae8c54d0ebf458d8ed8b6"
  },
  {
    "url": "2017/redux源码解读－－bindActionCreators源码解析.html",
    "revision": "e99c15fda621d973abe9512df61b2829"
  },
  {
    "url": "2017/redux源码解读--compose源码解析.html",
    "revision": "c8ab5acb7be66f039e5e8a9482e1c49c"
  },
  {
    "url": "2017/redux源码解读－－createStore源码解析.html",
    "revision": "4a095f1730b075753a1cc3ee99c2aa31"
  },
  {
    "url": "2017/redux源码阅读－－主模块.html",
    "revision": "7c604c2ef01b5610ff67bd71e8c36457"
  },
  {
    "url": "2017/redux源码阅读－－基本概括.html",
    "revision": "7999f40a78f9c9ff42e6c801c16da985"
  },
  {
    "url": "2018/MessageChannel那些事.html",
    "revision": "16307da492274600190ca6f0393cb564"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "5241fe1eaf6a3f8b273538c4c9b9e9f5"
  },
  {
    "url": "2018/Node的二三四五六.html",
    "revision": "81d7ab6031f3aadd124b3c0ce94848ea"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "c0a97e56513637927f9aa2a6bedb7b49"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "9140efc5b9151241ac8e0bb7785cf658"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "668b1a4a7bc0d4221f19f11db25fe3f4"
  },
  {
    "url": "2018/web安全之csrf攻击.html",
    "revision": "b4d3e293e4963e7a3d7c25311c65de0e"
  },
  {
    "url": "2018/web安全之xss攻击.html",
    "revision": "646dbcb22fa852e7d64582364abb25f5"
  },
  {
    "url": "2018/web安全之点击劫持.html",
    "revision": "2c90570170bd8b1327d2ca0e3b293fca"
  },
  {
    "url": "2018/XMLHttpRequest.html",
    "revision": "4b0dfa54772e3dc72a154375d2fbbd7d"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "734ec7ea2b3ce6621e4fbcc88766ca3a"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "b7401bc29113f43f64d418b83d612944"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "3f6f3531664bdc8f9288485f61ddfc55"
  },
  {
    "url": "2018/小而美的CLI开发记录.html",
    "revision": "2f99422d4aa887b2300da69ecadde044"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "a13573d425732bbca1f7142c1a7526ab"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "e657a51479edb52157aaa77b327ed702"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "4085a17ac67876c3e32995e7254db20e"
  },
  {
    "url": "2018/缓存那些事.html",
    "revision": "066370409ff405ad9da6acf17c634d0c"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "569763c7ce8ce1eaaf7e017cedd9c137"
  },
  {
    "url": "404.html",
    "revision": "b78c957731c6f6defaa7300bf37d875e"
  },
  {
    "url": "assets/css/0.styles.626dd732.css",
    "revision": "7e51308594a72dd9204cebf7263bcd72"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.3dee602e.js",
    "revision": "1df1b507a1b326fdc96b6eb4c6b3cc45"
  },
  {
    "url": "assets/js/11.305b8aca.js",
    "revision": "4f4953c1d6544ecd109e7cad699a3b8d"
  },
  {
    "url": "assets/js/12.94685fce.js",
    "revision": "9298ad75824fb7cc64654eb6808710be"
  },
  {
    "url": "assets/js/13.34672e37.js",
    "revision": "2ef30faf59031523705bc17aff66ecc3"
  },
  {
    "url": "assets/js/14.d0a9190a.js",
    "revision": "4235a72ff519c8bb6b3387b204ffeee8"
  },
  {
    "url": "assets/js/15.9fb29183.js",
    "revision": "c7d49cb89734a199bef1d3604dd46d91"
  },
  {
    "url": "assets/js/16.606fa5c4.js",
    "revision": "488eb55d15f1869303868f6a000fa6fc"
  },
  {
    "url": "assets/js/17.1371a2fe.js",
    "revision": "40ac38303a46616fc8d398e440730f8b"
  },
  {
    "url": "assets/js/18.d3e02084.js",
    "revision": "5c522dbdc30719898eb024cd3b4581ee"
  },
  {
    "url": "assets/js/19.704104f4.js",
    "revision": "0c4780a94ff1b829edd5fe92495ca2a8"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/20.a9203969.js",
    "revision": "f7be713afb755d3d2fd29556c3489b54"
  },
  {
    "url": "assets/js/21.d5d86b29.js",
    "revision": "a6c36160403847a2fc33a448e8384e52"
  },
  {
    "url": "assets/js/22.10d34197.js",
    "revision": "cc6348fdc59e2ff81bb6a87636799fd6"
  },
  {
    "url": "assets/js/23.57ff8af5.js",
    "revision": "9a0ec915dc27b5d0cb0c70f7cf1e6c54"
  },
  {
    "url": "assets/js/24.7af472a8.js",
    "revision": "933eb65fdba1a9794240cb72a9223326"
  },
  {
    "url": "assets/js/25.274cc202.js",
    "revision": "c03b0146990db5d5e2e181b80d8cb790"
  },
  {
    "url": "assets/js/26.cf8f61dc.js",
    "revision": "f84817718343ac588aac83149c7f4d40"
  },
  {
    "url": "assets/js/27.55193d0c.js",
    "revision": "a7c89706f55fc337406cb46f8ef5e924"
  },
  {
    "url": "assets/js/28.eb5bffb2.js",
    "revision": "d4599ad63a7553412d4db7ae36d6236b"
  },
  {
    "url": "assets/js/29.bf7b82ca.js",
    "revision": "4fd7c954faab2232353cb74b02e2be7b"
  },
  {
    "url": "assets/js/3.ddf3836b.js",
    "revision": "107e76a27d1e0c9ffb04a0e1cfa502f7"
  },
  {
    "url": "assets/js/30.b579e2ff.js",
    "revision": "0649ca297352dc4c5942867b0554362c"
  },
  {
    "url": "assets/js/31.8e3c73e6.js",
    "revision": "b77f87b389dff1209764c8f362973c3f"
  },
  {
    "url": "assets/js/32.e9bf1f42.js",
    "revision": "aab0002376dca5ba86f4727f80d7cb0d"
  },
  {
    "url": "assets/js/33.4dbd8d3d.js",
    "revision": "c1b64430933aa8a1b2b84bd6e7782108"
  },
  {
    "url": "assets/js/34.589fd362.js",
    "revision": "e23ebfdc3691e8745f6da3b02c05197b"
  },
  {
    "url": "assets/js/35.9e655163.js",
    "revision": "885d747844212388e940880200fc1dac"
  },
  {
    "url": "assets/js/36.6c76ebfd.js",
    "revision": "2b92c6f84cea36b44118d8a2d0c26fd9"
  },
  {
    "url": "assets/js/37.775e4d59.js",
    "revision": "82ad213bd288e43abb8b45070fb61afc"
  },
  {
    "url": "assets/js/38.90d9e34c.js",
    "revision": "60aef57c4afc82238bb97b54e6863390"
  },
  {
    "url": "assets/js/39.d643b517.js",
    "revision": "485537f45ad57b639a75302d8373a5c9"
  },
  {
    "url": "assets/js/4.f2c636f9.js",
    "revision": "ddcde6b62ff5112cb1f7857fd00a355b"
  },
  {
    "url": "assets/js/40.a2762e3f.js",
    "revision": "8babbe53b97863f8956e056b6ea4fca1"
  },
  {
    "url": "assets/js/41.517c6d11.js",
    "revision": "deed46dbccac8951a0b9890be98d009b"
  },
  {
    "url": "assets/js/5.f22e182a.js",
    "revision": "f756dda6a6cea539b6a9f0a1c286a525"
  },
  {
    "url": "assets/js/6.4b72d98f.js",
    "revision": "ae864fd43f798dc65eae116e4329070c"
  },
  {
    "url": "assets/js/7.eb0741b4.js",
    "revision": "f89bb7c9d645cb02ce881bb7ee6ec308"
  },
  {
    "url": "assets/js/8.261585b6.js",
    "revision": "9430036e9f1d16a4199b08df59e3dd64"
  },
  {
    "url": "assets/js/9.0d52be2b.js",
    "revision": "021e4e3a9631e9ed79b251f8ea966d58"
  },
  {
    "url": "assets/js/app.45df0d89.js",
    "revision": "40e5cc81ae2653a48f16f3df1b2189f1"
  },
  {
    "url": "bdtj.js",
    "revision": "50d5858588f0a767649f3da6c535c83e"
  },
  {
    "url": "cache1.png",
    "revision": "b41aab63be85c267d64047dd63d877a4"
  },
  {
    "url": "cache2.png",
    "revision": "d5489c7dfb8c121c7a1eb6fe82d13a65"
  },
  {
    "url": "cache3.png",
    "revision": "48b94a07503899caf940c6920c957898"
  },
  {
    "url": "cache4.png",
    "revision": "b5856b37c8b77d471cbe39238a582e11"
  },
  {
    "url": "cache5.png",
    "revision": "a1ff3e39511c20a5fc160d29f13c9e60"
  },
  {
    "url": "cache6.png",
    "revision": "7dacf6e3caa540c7d0537ecc6171f17c"
  },
  {
    "url": "cli1.png",
    "revision": "4986b97467f72de305ad99bf0abbc96c"
  },
  {
    "url": "cli2.png",
    "revision": "e1cf9aa9eef368276eba1e5f7468af28"
  },
  {
    "url": "cli3.png",
    "revision": "bd8b7c13f0510f57b5a454fec52c34bf"
  },
  {
    "url": "cli4.png",
    "revision": "9d3e886f82db5916de3ab542b8182183"
  },
  {
    "url": "cli5.png",
    "revision": "ba083086d9875ae2c0fd2e07b5f153d5"
  },
  {
    "url": "cross1.png",
    "revision": "6a8c4eca37594bff32b1db3b484add6e"
  },
  {
    "url": "cross2.png",
    "revision": "fad0871e05da7f7d2330a56e6e98337d"
  },
  {
    "url": "cross3.png",
    "revision": "a9990545318f181fe66faf09f64e2c33"
  },
  {
    "url": "cross4.png",
    "revision": "32d5a5e3138456c07d6f6b4245400263"
  },
  {
    "url": "cross5.png",
    "revision": "39615658937255cfbe03c03ccd5c445e"
  },
  {
    "url": "cross6.png",
    "revision": "fd4bb4251de4c0c48d46c3f2025255c2"
  },
  {
    "url": "csrf1.png",
    "revision": "b51c73ff363b94e4ba34765e3b3f3741"
  },
  {
    "url": "good-writings.html",
    "revision": "cf9c3cbe241ed1dfdea027eb77885485"
  },
  {
    "url": "index.html",
    "revision": "0972f2c8e7c86d09b0796e3afa7649e3"
  },
  {
    "url": "linux-imgs/cat1.png",
    "revision": "d428fb4eecd8c1d4cf33b96527425123"
  },
  {
    "url": "linux-imgs/cat2.png",
    "revision": "808e95c2a48b306dd9c502d3afbb7b65"
  },
  {
    "url": "linux-imgs/cat3.png",
    "revision": "bcdf779c5bfc878176e425d70fb5ef97"
  },
  {
    "url": "linux-imgs/cd1.png",
    "revision": "616a7a163944b4d1983b36af8ebaeabe"
  },
  {
    "url": "linux-imgs/chgrp1.png",
    "revision": "74ca7fbb1b1d1efae2e15013dea614a0"
  },
  {
    "url": "linux-imgs/chgrp2.png",
    "revision": "3cc5ebc0f273cc5d48772adcf370843f"
  },
  {
    "url": "linux-imgs/chgrp3.png",
    "revision": "b4cc96b51b7997195306c4bd885de0fe"
  },
  {
    "url": "linux-imgs/chgrp4.png",
    "revision": "138b2af9eeaa869331dd667729a4bc51"
  },
  {
    "url": "linux-imgs/chgrp5.png",
    "revision": "0c4a86a83ba68f71fb6755d5c8344802"
  },
  {
    "url": "linux-imgs/chgrp6.png",
    "revision": "f802e67dfe2f699b5591bb7a91106a92"
  },
  {
    "url": "linux-imgs/chmod1.png",
    "revision": "befd9ed5cbc6f8221ed9ed8ed7edf127"
  },
  {
    "url": "linux-imgs/chmod2.png",
    "revision": "b5252ad68625d58aaf99f2977b0efed0"
  },
  {
    "url": "linux-imgs/chmod3.png",
    "revision": "05ded58aecfe887ddb377fdb09884e74"
  },
  {
    "url": "linux-imgs/chmod4.png",
    "revision": "5b4dcd1635763b01d3f748e7696f28ce"
  },
  {
    "url": "linux-imgs/chmod5.png",
    "revision": "75ab73cfcc4ed2b0cf5ce024c8ec10b2"
  },
  {
    "url": "linux-imgs/chown.png",
    "revision": "03000b6705770989455c4cbd6ab7e506"
  },
  {
    "url": "linux-imgs/cp1.png",
    "revision": "885d28f87460ee20da70af1118955ffd"
  },
  {
    "url": "linux-imgs/cp2.png",
    "revision": "b0a33fcff7e58cbfc5dd6ff0d690d635"
  },
  {
    "url": "linux-imgs/file1.png",
    "revision": "00d0cc15561af09b7a75ff560e0e628a"
  },
  {
    "url": "linux-imgs/find1.png",
    "revision": "30970456766e782af10ed83fedbc7f9f"
  },
  {
    "url": "linux-imgs/find2.png",
    "revision": "5a7a7db8a2df8ec69f35e134bbc7d594"
  },
  {
    "url": "linux-imgs/find3.png",
    "revision": "53c5ae48edf49fe39a7c035e0cf6609f"
  },
  {
    "url": "linux-imgs/find4.png",
    "revision": "30727fc8bb23bbd933c671bae60a5f19"
  },
  {
    "url": "linux-imgs/head1.png",
    "revision": "6d09b17fd1217d04c2d5800798e8e7f9"
  },
  {
    "url": "linux-imgs/head2.png",
    "revision": "50e034fd4aa9a6c8ff8d0c48be3e8892"
  },
  {
    "url": "linux-imgs/link1.png",
    "revision": "6649ecf27b3c40391adfc4696e1f1907"
  },
  {
    "url": "linux-imgs/link2.png",
    "revision": "cf2546bcbfd35eb652d9ecb4f1a0d153"
  },
  {
    "url": "linux-imgs/link3.png",
    "revision": "3b83c33a57e2733e0101c1101964f49b"
  },
  {
    "url": "linux-imgs/linux1.png",
    "revision": "de75966c084ffcb9f57d7d6e181c55ee"
  },
  {
    "url": "linux-imgs/linux2.png",
    "revision": "d09e1126757e8b991fd8916169966322"
  },
  {
    "url": "linux-imgs/linux3.png",
    "revision": "faf2413d6748f51085a3f7353434fe8f"
  },
  {
    "url": "linux-imgs/ls1.png",
    "revision": "cf8a05d0e899ac7b8ca82544d858ba1f"
  },
  {
    "url": "linux-imgs/ls2.png",
    "revision": "10d61fbb344cfc0a12bd95f7014fdd54"
  },
  {
    "url": "linux-imgs/ls3.png",
    "revision": "c97aad107fa2736c86ccd115bde55f08"
  },
  {
    "url": "linux-imgs/ls4.png",
    "revision": "997926c1dc46f387d26084078cd651dd"
  },
  {
    "url": "linux-imgs/ls5.png",
    "revision": "cf32862c06f2f80ab19e18f7805d731b"
  },
  {
    "url": "linux-imgs/ls6.png",
    "revision": "0f59f0fe1792086d73f931623b6068d1"
  },
  {
    "url": "linux-imgs/ls7.png",
    "revision": "36918e156fd94fe87b2b5c75bc7a6e21"
  },
  {
    "url": "linux-imgs/mkdir1.png",
    "revision": "61adf0942dbf1e7470d7bd8f39875c74"
  },
  {
    "url": "linux-imgs/more.png",
    "revision": "566800ddf5cc88b0cf000400601aaed7"
  },
  {
    "url": "linux-imgs/mv1.png",
    "revision": "87a7b76428b204c7f66008a248216ede"
  },
  {
    "url": "linux-imgs/mv2.png",
    "revision": "1743830b9242b544dcbebe0f137e4a53"
  },
  {
    "url": "linux-imgs/mv4.png",
    "revision": "752d1b14242a70302106f1fd1886e556"
  },
  {
    "url": "linux-imgs/rm1.png",
    "revision": "db6f606b6484750793ba391e7514ed37"
  },
  {
    "url": "linux-imgs/rm2.png",
    "revision": "67b50dfff26eeced2e1482086778c921"
  },
  {
    "url": "linux-imgs/rmdir1.png",
    "revision": "eaade63d27186e391ae31027ea9f8ec2"
  },
  {
    "url": "linux-imgs/tac.png",
    "revision": "67a9d77fecdb96056d8b3c53e38e188d"
  },
  {
    "url": "linux-imgs/tail1.png",
    "revision": "40722a7f93f410bc2abc8cb57c431480"
  },
  {
    "url": "linux-imgs/tail2.png",
    "revision": "f22ba6411603532e013f51d3c17d055a"
  },
  {
    "url": "linux-imgs/tail3.png",
    "revision": "ab0764cdfff2fda14bbf5ef706c1d890"
  },
  {
    "url": "linux-imgs/touch1.png",
    "revision": "8c002c3d601dc2b44f724f81122daa9a"
  },
  {
    "url": "linux-imgs/umask1.png",
    "revision": "bbc487d0b0e4c60648cfdf79d58e1918"
  },
  {
    "url": "linux-imgs/umask2.png",
    "revision": "6723ceb5867a2da359ea7fdcfb1459f1"
  },
  {
    "url": "linux-imgs/umask3.png",
    "revision": "ebde56d19143a8420f1f3c112b784517"
  },
  {
    "url": "linux-imgs/which1.png",
    "revision": "1b78ef92fa820f8afbaa7ed5922544de"
  },
  {
    "url": "linux.html",
    "revision": "0acb3fcac1c8bffb7c744f30c67adf0b"
  },
  {
    "url": "linux/每天一点linux（一）.html",
    "revision": "c08d54f4eadc4126750a21c9a6582f86"
  },
  {
    "url": "linux/每天一点linux（三）.html",
    "revision": "17b7e1c52501f5a96ad62ff51d46bacd"
  },
  {
    "url": "linux/每天一点linux（二）.html",
    "revision": "4b47555d0671da154e44c59bf0c80fd4"
  },
  {
    "url": "linux/每天一点linux（四）.html",
    "revision": "59ca98050b9bc25bf9485198501deb11"
  },
  {
    "url": "logo.gif",
    "revision": "803bb46a6acef395ed9353de2dcf26f5"
  },
  {
    "url": "logo.png",
    "revision": "b7aeabfd3a0edbc3b066dc7c7a9e26e5"
  },
  {
    "url": "mysql1.png",
    "revision": "8630445fd67ec104730c9605d22148a2"
  },
  {
    "url": "mysql2.png",
    "revision": "54d03bffe6125e72a14ffcb56cedb319"
  },
  {
    "url": "mysql3.png",
    "revision": "c8129301a9a9714ae7626ca1dbec00a5"
  },
  {
    "url": "node1.png",
    "revision": "84cf823fbf5dccbfcaf1176f080e60fb"
  },
  {
    "url": "reactdom1.png",
    "revision": "1114c0e867ea884d495bc1da6520bcd6"
  },
  {
    "url": "reactdom2.png",
    "revision": "db7f86195ba5afb3f71961ad9a2fdec8"
  },
  {
    "url": "reactdom3.jpeg",
    "revision": "7603a93bd65b6186473f446ebc8b9af4"
  },
  {
    "url": "reactdom4.jpeg",
    "revision": "b31a258e72a005625edba96dd1bc521c"
  },
  {
    "url": "reactdom5.jpeg",
    "revision": "9e1a247446775bd4d85e9b812bad71ff"
  },
  {
    "url": "reactdom6.jpeg",
    "revision": "cfdbeee97c31f258368c70ed4fbc4001"
  },
  {
    "url": "reactdom7.jpeg",
    "revision": "f6f3797b3ada80f662d6f97796569720"
  },
  {
    "url": "reactdom8.jpeg",
    "revision": "eddaae0947a2ed41821a113c886a4cbe"
  },
  {
    "url": "reactdom9.jpeg",
    "revision": "9ebb1de129309ee52c56018544b40c83"
  },
  {
    "url": "redux1.png",
    "revision": "8759d5b0a53215ff509a749e0c8e9a9e"
  },
  {
    "url": "redux2.png",
    "revision": "0e0c905be0a49b2cfbd4b3d56956145b"
  },
  {
    "url": "redux3.png",
    "revision": "8fb24c8a02d773aa1a7e24df2675c808"
  },
  {
    "url": "redux4.png",
    "revision": "8448d82a2ddc57c08bf2ac122fed318d"
  },
  {
    "url": "redux5.png",
    "revision": "2d0707fda61603c4f1154aceadf91c87"
  },
  {
    "url": "redux6.png",
    "revision": "7b698111e192dcc50ec169cae7abe077"
  },
  {
    "url": "xhr1.png",
    "revision": "71f6685d2bddb1daa4ced5d3d2b6a30a"
  },
  {
    "url": "xhr2.png",
    "revision": "8746c5498c76be4dba64d8ad80f8129a"
  },
  {
    "url": "xhr3.png",
    "revision": "debef97380e3b71a930d9a2926a24e1a"
  },
  {
    "url": "xhr4.png",
    "revision": "db3f1cf090b2d709d66bc59827dd2fd7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
