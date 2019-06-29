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
    "revision": "27c60f6e27f71ec7ef240a226e8f60c8"
  },
  {
    "url": "2017/Mocha中文文档.html",
    "revision": "c32d63fb6056c338c4df653156e762fb"
  },
  {
    "url": "2017/react-start到co源码系列一.html",
    "revision": "91655c7d885b250fb44fc8ef0c078f45"
  },
  {
    "url": "2017/react-start到co源码系列三.html",
    "revision": "b2f83cc90229db7c0607ccfd8a5d3ff0"
  },
  {
    "url": "2017/react-start到co源码系列二.html",
    "revision": "b7a7bb1842108e1d3b4c409432335fcd"
  },
  {
    "url": "2017/ReactDOM详解.html",
    "revision": "7687f4b7483c2663ea7c2f3a4a11e733"
  },
  {
    "url": "2017/redux源码解读--applyMiddleware源码解析.html",
    "revision": "c38a8e721b6f17838dc149671687abc4"
  },
  {
    "url": "2017/redux源码解读－－bindActionCreators源码解析.html",
    "revision": "8306651ffb7bfee310205733747a912b"
  },
  {
    "url": "2017/redux源码解读--compose源码解析.html",
    "revision": "250397cfec0c2528f82665a6a53a1858"
  },
  {
    "url": "2017/redux源码解读－－createStore源码解析.html",
    "revision": "193ba85879e0ad52569bfe12fe768757"
  },
  {
    "url": "2017/redux源码阅读－－主模块.html",
    "revision": "617bc582db51f9d3b3f3f5d8e52229d2"
  },
  {
    "url": "2017/redux源码阅读－－基本概括.html",
    "revision": "76a8b5945790a27a9ab87da2cf297d2a"
  },
  {
    "url": "2018/MessageChannel那些事.html",
    "revision": "b27e2e1e2392772102056944438c7cc6"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "ddc61d47635c340b6b0b2b6331f6621e"
  },
  {
    "url": "2018/Node的二三四五六.html",
    "revision": "289232711089d1efc02e8f294f4412fb"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "be064fe835d471c357496eeeba8abecd"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "558d92ff30725c2fdbc2d70a0a2b9d37"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "cde35cc0b8cb0f37e0bb33b5d76d6515"
  },
  {
    "url": "2018/web安全之csrf攻击.html",
    "revision": "d12ec7145d57cdda780ee5c5d1fb756a"
  },
  {
    "url": "2018/web安全之xss攻击.html",
    "revision": "accdb7f8827eed79436ea78631363507"
  },
  {
    "url": "2018/web安全之点击劫持.html",
    "revision": "25c75ab39b8c9608138d9ea45231246d"
  },
  {
    "url": "2018/XMLHttpRequest.html",
    "revision": "6c69577aa42b5aba2af10f89415aa40a"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "adac5141c60f3be6b96981af6029d4b8"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "c251a0af2014eb5ec1173754140a4062"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "318405fcbd2bb2b3d38c0b2d8a57fe4e"
  },
  {
    "url": "2018/小程序的坑坑坑-填填填.html",
    "revision": "4e7591745be09c26c703597564deec5e"
  },
  {
    "url": "2018/小而美的CLI开发记录.html",
    "revision": "e50527ae7d8f7a75e98014c708223925"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "681ff37d0d02f6e07d62cef7f1753a67"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "9321c810d969ed58f8879e72bdb7bdbf"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "c48ee686d74a70c0eb18c45cecbfc10d"
  },
  {
    "url": "2018/缓存那些事.html",
    "revision": "e21cbf4744b0e0c2824fc89f429d6482"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "48e946bff36ff2d6014d8a5c717e50aa"
  },
  {
    "url": "2019/IntersectionObserver.html",
    "revision": "b97b32cfcd3380721af0b6021c388dfe"
  },
  {
    "url": "2019/iptables学习.html",
    "revision": "ed47cd37ccc7899f410729472ffef8db"
  },
  {
    "url": "2019/iview组件库table诡异排序.html",
    "revision": "e0a247cd7e5ac872ed378e3e0ba24622"
  },
  {
    "url": "2019/Nginx学习-rewrite_https.html",
    "revision": "3069e65f32a9044bcdba8932c0b6a204"
  },
  {
    "url": "2019/Nginx学习-安装_基本模块_请求限制_访问限制.html",
    "revision": "acfc617c127c46fc1db1cf10eade9afe"
  },
  {
    "url": "2019/Nginx学习-常见问题.html",
    "revision": "364344a8311025c38efa5744d5c58330"
  },
  {
    "url": "2019/Nginx学习-静态资源服务_代理_负载均衡.html",
    "revision": "e7912e6c2cae16a3a3e3c6f3cae91999"
  },
  {
    "url": "2019/tapable使用和原理分析.html",
    "revision": "801eb07517081381fabcdd7562c7bac4"
  },
  {
    "url": "2019/travis自动化部署github项目到server.html",
    "revision": "a23d86039d11ee6e1accf052cbf64f2f"
  },
  {
    "url": "2019/webpack@4常用配置总结.html",
    "revision": "ce012e71967802bf31b270168ffbb2b3"
  },
  {
    "url": "2019/大白话webpack配置.html",
    "revision": "cd1d856f0d013d7d965cf395258d0c7e"
  },
  {
    "url": "2019/探探Koa.html",
    "revision": "a1ca025411d09abf1b825fbf9b67f2ce"
  },
  {
    "url": "2019/探探Koa之application.html",
    "revision": "66dc815b52045ca58a55ac29df021786"
  },
  {
    "url": "2019/探探Koa之context.html",
    "revision": "fcb188fae00ad569e75540fcca3e1e7c"
  },
  {
    "url": "2019/探探Koa之response.html",
    "revision": "8ec3f1c21af48da95837729398ceebe9"
  },
  {
    "url": "2019/探探Koa之resquest.html",
    "revision": "f14df21ba1835e044632820d3607ed03"
  },
  {
    "url": "2019/探探怎么获取随机端口.html",
    "revision": "74605b8790f286caec9477a3be141a34"
  },
  {
    "url": "2019/超长typescript记录.html",
    "revision": "795ea10f53c221a627c4d80bec7258e9"
  },
  {
    "url": "404.html",
    "revision": "8f881a21e3e41d24d687fe702f9ce8ba"
  },
  {
    "url": "app1.png",
    "revision": "ec1157c196e571df1fa132f2a985a279"
  },
  {
    "url": "app2.png",
    "revision": "6f74a36bf5b6adeb5a718f039298e9e5"
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
    "url": "assets/js/10.f945838f.js",
    "revision": "a14b146689d04e20c67d278aac9cad0d"
  },
  {
    "url": "assets/js/11.49fcc2bd.js",
    "revision": "29ec49768e261c30505dc2e3c86c44d5"
  },
  {
    "url": "assets/js/12.d3602b67.js",
    "revision": "1c1640274c2165f819aaf0478771acff"
  },
  {
    "url": "assets/js/13.70b305bb.js",
    "revision": "9fdb75b28c467780d48659f6aba974e3"
  },
  {
    "url": "assets/js/14.32cf3f5c.js",
    "revision": "43c1692f25b45b2ade07f33dba4479c3"
  },
  {
    "url": "assets/js/15.21ca5469.js",
    "revision": "4f855e8c973a997d0cb935aaba5305c0"
  },
  {
    "url": "assets/js/16.80a1f156.js",
    "revision": "ff5a38ccbaee9bf67b54e1c377536a17"
  },
  {
    "url": "assets/js/17.d510fcbf.js",
    "revision": "f1cda051334441ffa6516686366ef8c2"
  },
  {
    "url": "assets/js/18.0addd3df.js",
    "revision": "37cbb606f8cf39a418ec4a3ec4d2d382"
  },
  {
    "url": "assets/js/19.cde47560.js",
    "revision": "9f44a0d08de6454b93fbb8d9afbf6b74"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/20.f2b3d7a0.js",
    "revision": "552f5b5e32df5cfcac308facb968b3e5"
  },
  {
    "url": "assets/js/21.fb0dfbdc.js",
    "revision": "a82aab458610f77b952c7f3f7f294c09"
  },
  {
    "url": "assets/js/22.add6de0c.js",
    "revision": "8e7147c6e23e673d96597a25c4277780"
  },
  {
    "url": "assets/js/23.b04f481b.js",
    "revision": "6689729002007c057730724956debc9a"
  },
  {
    "url": "assets/js/24.9b25b45f.js",
    "revision": "62e3c02f1f8645c8082efe3d2200c444"
  },
  {
    "url": "assets/js/25.e3c8fc3b.js",
    "revision": "a514d9fe313ef0324872c7e7bdd4e7e4"
  },
  {
    "url": "assets/js/26.df213e6d.js",
    "revision": "e63b02a6023c9dc970603d59b37605bf"
  },
  {
    "url": "assets/js/27.26e0a740.js",
    "revision": "3d946d0792fd047ef01f577f47ce5472"
  },
  {
    "url": "assets/js/28.b173e962.js",
    "revision": "8470c3dd41cc9d06a9a1105bfb653acb"
  },
  {
    "url": "assets/js/29.feee8832.js",
    "revision": "6796c4cbe0c09d1d3f4c905c8e61a65d"
  },
  {
    "url": "assets/js/3.8614e950.js",
    "revision": "2a6c16e61c45d283c5281d7084e68c17"
  },
  {
    "url": "assets/js/30.e1cfde92.js",
    "revision": "1be47bdf18ccd0bb2ab1cecdd127992d"
  },
  {
    "url": "assets/js/31.439fd555.js",
    "revision": "d1578a589f3194fc39660a5cec9d5c06"
  },
  {
    "url": "assets/js/32.34d4c2ea.js",
    "revision": "77f79df5863e7569caab7441cc5ae925"
  },
  {
    "url": "assets/js/33.f60163cb.js",
    "revision": "ee4106472ec57e095744d8d49107771b"
  },
  {
    "url": "assets/js/34.e1f0e7a5.js",
    "revision": "7e0d40020f7578dba56f126f75108945"
  },
  {
    "url": "assets/js/35.f0e19097.js",
    "revision": "86fa036a25cd60da65ba9cd7a91ff914"
  },
  {
    "url": "assets/js/36.526ee101.js",
    "revision": "2eac95838895c1e751fc22be1264fff4"
  },
  {
    "url": "assets/js/37.2a2d3f30.js",
    "revision": "d894542dc89249c24df6efad0b872e6c"
  },
  {
    "url": "assets/js/38.a6972860.js",
    "revision": "7fb05fb6c0b6debee85eafb48b8522fd"
  },
  {
    "url": "assets/js/39.8cacaa53.js",
    "revision": "ee9e021265afdbe2c4bc4e272b4614a4"
  },
  {
    "url": "assets/js/4.f2c636f9.js",
    "revision": "ddcde6b62ff5112cb1f7857fd00a355b"
  },
  {
    "url": "assets/js/40.88dc690c.js",
    "revision": "13e0874450fc0b00998b790bff3c7691"
  },
  {
    "url": "assets/js/41.463140bd.js",
    "revision": "3427fb57d8ecb263889a8269d52c2e83"
  },
  {
    "url": "assets/js/42.ae019df6.js",
    "revision": "877c592094eaddfc5a83a4b5451e04ab"
  },
  {
    "url": "assets/js/43.d42d6e6d.js",
    "revision": "a01741aa983aff7c630d970cdce53f88"
  },
  {
    "url": "assets/js/44.f572ff50.js",
    "revision": "8589243c0f282e684acc0be8c632daaf"
  },
  {
    "url": "assets/js/45.8712f7f5.js",
    "revision": "2e29f19e06ccab688aa6c480f94e792c"
  },
  {
    "url": "assets/js/46.8ddc4f12.js",
    "revision": "2f8c70775e901cb10f654d2a3b40abe2"
  },
  {
    "url": "assets/js/47.d412e955.js",
    "revision": "7c24b76d47b55a4a102b92d1606feb66"
  },
  {
    "url": "assets/js/48.17943c10.js",
    "revision": "5055eda45699599f5155df79aba4445f"
  },
  {
    "url": "assets/js/49.c9f777d6.js",
    "revision": "a0a649c61cae285c59b70f98c24d5388"
  },
  {
    "url": "assets/js/5.f22e182a.js",
    "revision": "f756dda6a6cea539b6a9f0a1c286a525"
  },
  {
    "url": "assets/js/50.7961cea9.js",
    "revision": "fcd9a28fc974c5a573186aa6a263dd04"
  },
  {
    "url": "assets/js/51.f1e313e6.js",
    "revision": "27c348a3f869cb85f479f04a82cc5548"
  },
  {
    "url": "assets/js/52.582ffde9.js",
    "revision": "ffcc048e6f1db7b2df33f2d7b538002a"
  },
  {
    "url": "assets/js/53.6ca59eee.js",
    "revision": "b64a67fa737bd9604b6ad305f9d07bdc"
  },
  {
    "url": "assets/js/54.8d1a1a8f.js",
    "revision": "57a0f8c87aa89533659fdbd878a1ecba"
  },
  {
    "url": "assets/js/55.2a27c230.js",
    "revision": "3c78a319b9aaa7f5d88a42a2dc2a4406"
  },
  {
    "url": "assets/js/56.7c54121b.js",
    "revision": "4ea6eaaa873ebdca06e05c894967c164"
  },
  {
    "url": "assets/js/57.a9b3707f.js",
    "revision": "5ede6bbc81ca85d5a467913e536dfce9"
  },
  {
    "url": "assets/js/58.a61ecf2f.js",
    "revision": "3cf1dd4276d54dd42fb4d5bf106413bb"
  },
  {
    "url": "assets/js/59.053d804b.js",
    "revision": "be38e20694e9470e8d18fb13ef4f58d0"
  },
  {
    "url": "assets/js/6.705c6a76.js",
    "revision": "c8d2711b3bd4041484ff85e5f5ad2ff6"
  },
  {
    "url": "assets/js/60.c991880d.js",
    "revision": "f1b818209925380b4c09081d93cd410f"
  },
  {
    "url": "assets/js/61.dcb02945.js",
    "revision": "b0ac9dd85aba7d7f7bf401912d77660f"
  },
  {
    "url": "assets/js/62.1c470d24.js",
    "revision": "940a1c2362ae15cdc546abc28649a626"
  },
  {
    "url": "assets/js/63.6ff653ae.js",
    "revision": "8e1d858040f75427a488fb5e44b92f30"
  },
  {
    "url": "assets/js/64.30b980c1.js",
    "revision": "c085e41b9c104ef8e7d15d8f2b3bef19"
  },
  {
    "url": "assets/js/65.d1752ff7.js",
    "revision": "0b4e0db8b161369d843e7b4715966d81"
  },
  {
    "url": "assets/js/66.340bc90e.js",
    "revision": "c3760b105b6b2bb5d5c24e7e0dc4ac9e"
  },
  {
    "url": "assets/js/67.d8167cf0.js",
    "revision": "8398fa5cb22e47f99dc885c627a591d2"
  },
  {
    "url": "assets/js/7.1b37c5d0.js",
    "revision": "93738013530f5a7281c60a2b905bd1a9"
  },
  {
    "url": "assets/js/8.8c8fa426.js",
    "revision": "a844e06967aac932a06408bed9539f78"
  },
  {
    "url": "assets/js/9.8be4c074.js",
    "revision": "0310271bd824732fed31862c890ef86d"
  },
  {
    "url": "assets/js/app.90531a8f.js",
    "revision": "533796870be721c1b03edfb863bac7fe"
  },
  {
    "url": "basic/internet/第一章：概述.html",
    "revision": "09a2c84c0e3358d354c642161a56054d"
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
    "url": "cdn.png",
    "revision": "7271e59c92790959df5b7f0d9b49af0c"
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
    "url": "conn_req.png",
    "revision": "e81794b3eae42a586c9324deb245c34b"
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
    "url": "dlhc.png",
    "revision": "37ec98e74b03869d11bebaa8f96cab3e"
  },
  {
    "url": "fxdl.png",
    "revision": "538dd48e297e619ec5af79cde6d03e98"
  },
  {
    "url": "fzjh1.png",
    "revision": "f9a56893c50e1b4f8ea799bba9019c80"
  },
  {
    "url": "fzjh2.png",
    "revision": "2d03c29539bd863837bd3746c6421f95"
  },
  {
    "url": "good-writings.html",
    "revision": "9d35d751735f33769f308f6dcc3db94c"
  },
  {
    "url": "gzip.png",
    "revision": "19b287a19cea33b8c36d583ad04b22b6"
  },
  {
    "url": "index.html",
    "revision": "fe52ec2b2815e2272d0b9125da175421"
  },
  {
    "url": "intersectionObserver1.png",
    "revision": "24f53703c8d7489c87f3cdb7f083d63c"
  },
  {
    "url": "intersectionObserver2.png",
    "revision": "fa0f27d59bd3a8de700ef6267d3f4280"
  },
  {
    "url": "intersectionObserver3.png",
    "revision": "cade88bb7df696a8247747ed319d7b97"
  },
  {
    "url": "intersectionObserver4.png",
    "revision": "2f9824d8b1184af6784a6e5c39ca7e11"
  },
  {
    "url": "intersectionObserver5.png",
    "revision": "3b8c218200d5c04dc64891391b312590"
  },
  {
    "url": "iptables1.png",
    "revision": "acc75261331195aea9fa3d75a10524ed"
  },
  {
    "url": "iptables2.png",
    "revision": "b14b8f7a10d6021ca7b9b1cca13cd748"
  },
  {
    "url": "linux-imgs/bash1.png",
    "revision": "b4bb109dc47268f613e71a8f5e56f8f1"
  },
  {
    "url": "linux-imgs/bash10.png",
    "revision": "2a3c1e4f07705838eabc7118f68c9528"
  },
  {
    "url": "linux-imgs/bash11.png",
    "revision": "426929102d89feab714aac46c04d59c7"
  },
  {
    "url": "linux-imgs/bash12.png",
    "revision": "c431ccee53d0ba92bfa92237dd2d3a14"
  },
  {
    "url": "linux-imgs/bash13.png",
    "revision": "7a71daac8df7c6501f8049f9b9584b9d"
  },
  {
    "url": "linux-imgs/bash14.png",
    "revision": "91b65e9b5cdd350e92f5693f5f6d6af3"
  },
  {
    "url": "linux-imgs/bash2.png",
    "revision": "541ab53c3b693a53ef1fe4dd65fbbe6f"
  },
  {
    "url": "linux-imgs/bash3.png",
    "revision": "142b512794e3dccc0a9ed53bfffd6bd9"
  },
  {
    "url": "linux-imgs/bash4.png",
    "revision": "8714ac3ed62c550e4639559802c1e49d"
  },
  {
    "url": "linux-imgs/bash5.png",
    "revision": "13eeb6033263636d8274afc007533a39"
  },
  {
    "url": "linux-imgs/bash6.png",
    "revision": "5bae05c39cd87cd27766674df2e776e3"
  },
  {
    "url": "linux-imgs/bash7.png",
    "revision": "f5812283fc9c85ad196193a468c448d4"
  },
  {
    "url": "linux-imgs/bash8.png",
    "revision": "ff52a647e0db8a542808fbc91fa597b4"
  },
  {
    "url": "linux-imgs/bash9.png",
    "revision": "56d34f4b73e05639c6a0afd3a98e3dc7"
  },
  {
    "url": "linux-imgs/bzip1.png",
    "revision": "e797e979150f993f16026da7adbfe039"
  },
  {
    "url": "linux-imgs/bzip2.png",
    "revision": "4ab761c5c9de02b898ee78b70effc49a"
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
    "url": "linux-imgs/func1.png",
    "revision": "807c38ace590ef50c3c0a08d988f22d2"
  },
  {
    "url": "linux-imgs/func2.png",
    "revision": "0dc466dbac4384c18094d418e0e70334"
  },
  {
    "url": "linux-imgs/func3.png",
    "revision": "48eb349efb1322b5057b36473051ea82"
  },
  {
    "url": "linux-imgs/func4.png",
    "revision": "f25becb26f918e148dcdf385ca8f2ad5"
  },
  {
    "url": "linux-imgs/func5.png",
    "revision": "861a00cd2dbb54794cb348c3f00c6ac7"
  },
  {
    "url": "linux-imgs/func6.png",
    "revision": "9d86de8a1e531217c8f96b2a60511bd8"
  },
  {
    "url": "linux-imgs/groupadd1.png",
    "revision": "d5baf1cfc365f6b9f917a4640f3475ac"
  },
  {
    "url": "linux-imgs/groupadd2.png",
    "revision": "b89234cd952ff732f97150e2a72684d6"
  },
  {
    "url": "linux-imgs/groupadd3.png",
    "revision": "c82ccb6dc32cb9eb1948b96c13200cdb"
  },
  {
    "url": "linux-imgs/groupadd4.png",
    "revision": "60d9e50f220d7551bd7de2296f8f7e2b"
  },
  {
    "url": "linux-imgs/groupadd5.png",
    "revision": "710f1f847d60f805d437d04cfdd66451"
  },
  {
    "url": "linux-imgs/groupadd6.png",
    "revision": "a3c8b17e25980db116d07f4cb23a11f6"
  },
  {
    "url": "linux-imgs/gzip1.png",
    "revision": "693d8e54331a4d6cf0ed69a1e2c72a57"
  },
  {
    "url": "linux-imgs/gzip2.png",
    "revision": "60a67e3a0623fa1ac5391f581c8a030f"
  },
  {
    "url": "linux-imgs/gzip3.png",
    "revision": "9e8c0b1a3b2b3bc9d131f1a53ca586fc"
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
    "url": "linux-imgs/passwd1.png",
    "revision": "6dd7b18061a58a073bce86103ea51465"
  },
  {
    "url": "linux-imgs/passwd2.png",
    "revision": "8ed59498685e3a8ac45df601e8c8d1aa"
  },
  {
    "url": "linux-imgs/passwd3.png",
    "revision": "2e6e56ab06614d0eee990907ae5c4147"
  },
  {
    "url": "linux-imgs/pwd1.png",
    "revision": "6dc3051d4e297eaaccb861f59732f6cf"
  },
  {
    "url": "linux-imgs/pwd2.png",
    "revision": "63c1039e8996ab7bd3781596ba4af043"
  },
  {
    "url": "linux-imgs/pwd3.png",
    "revision": "7fb3ba72d3b9370911d98e0aa4d517e7"
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
    "url": "linux-imgs/shell1.png",
    "revision": "917313e41458b6acf2c674cf394e2f97"
  },
  {
    "url": "linux-imgs/shell10.png",
    "revision": "12e1a1d584616b249b024764e8ebfc1b"
  },
  {
    "url": "linux-imgs/shell11.png",
    "revision": "575e4c22c8ae3a72e51be407d73a5031"
  },
  {
    "url": "linux-imgs/shell12.png",
    "revision": "8838e0b28f86dc0b11ed2205875499e0"
  },
  {
    "url": "linux-imgs/shell13.png",
    "revision": "1126e293f45ddc16a90c1716609624bc"
  },
  {
    "url": "linux-imgs/shell14.png",
    "revision": "2983768bf29cab4e424c4ca5c4fec4fa"
  },
  {
    "url": "linux-imgs/shell15.png",
    "revision": "d1be6c6023a86acbfa3a9056293576eb"
  },
  {
    "url": "linux-imgs/shell16.png",
    "revision": "e713c45e18c2f87e8aec30c144baa0b9"
  },
  {
    "url": "linux-imgs/shell17.png",
    "revision": "44d71bd90872d9f798c8d6e74ed5c9d0"
  },
  {
    "url": "linux-imgs/shell18.png",
    "revision": "dc03a0181825f74cb03ffa0eb36e27aa"
  },
  {
    "url": "linux-imgs/shell19.png",
    "revision": "a80ba040f026133fe3b79bba435bbdca"
  },
  {
    "url": "linux-imgs/shell2.png",
    "revision": "d4d5a71d094dcacfa27f2f2f912f2ec4"
  },
  {
    "url": "linux-imgs/shell20.png",
    "revision": "ef654977214820aef94e0deaf024701b"
  },
  {
    "url": "linux-imgs/shell21.png",
    "revision": "cf3fad46a61db43baef9b6b9bf39403d"
  },
  {
    "url": "linux-imgs/shell22.png",
    "revision": "18060640a9d9ec960dfa90a19818203e"
  },
  {
    "url": "linux-imgs/shell23.png",
    "revision": "5812b5466cd4ba6addfecbcb6a8e2df9"
  },
  {
    "url": "linux-imgs/shell24.png",
    "revision": "c50a42121b47bf0341d5c526c1adda6b"
  },
  {
    "url": "linux-imgs/shell25.png",
    "revision": "946a36739640db9d201dca7456837f9e"
  },
  {
    "url": "linux-imgs/shell26.png",
    "revision": "1ff75774d78feac8830fb85937702622"
  },
  {
    "url": "linux-imgs/shell27.png",
    "revision": "4637a77199141c0f08a80b2a9b6b549a"
  },
  {
    "url": "linux-imgs/shell28.png",
    "revision": "9df86659d6dc29bcec6b4c6c11470bd0"
  },
  {
    "url": "linux-imgs/shell29.png",
    "revision": "6eee131e000093c628a22a807b1ff627"
  },
  {
    "url": "linux-imgs/shell3.png",
    "revision": "6f3754d707a68be36d77217c6c3c9385"
  },
  {
    "url": "linux-imgs/shell30.png",
    "revision": "b5040941358e96ba778058ab0fa29e48"
  },
  {
    "url": "linux-imgs/shell31.png",
    "revision": "3f0f8ea67f2145ba06e932b52953354e"
  },
  {
    "url": "linux-imgs/shell32.png",
    "revision": "7dd448240abff9ea2b5f1c2546ab495e"
  },
  {
    "url": "linux-imgs/shell33.png",
    "revision": "454588451eecb4bab1916e91dcd907e6"
  },
  {
    "url": "linux-imgs/shell34.png",
    "revision": "191f6fbdb157888c776af7e27f30f51a"
  },
  {
    "url": "linux-imgs/shell35.png",
    "revision": "7ff92ddb85c444763694c9204cb3ce18"
  },
  {
    "url": "linux-imgs/shell36.png",
    "revision": "753684f832b556a90fb5fe96c79bf73b"
  },
  {
    "url": "linux-imgs/shell37.png",
    "revision": "79d5c3931e0e604f754d8e376184d4cd"
  },
  {
    "url": "linux-imgs/shell38.png",
    "revision": "7cdad5c388e3d8d777d15ad2f67fb4bc"
  },
  {
    "url": "linux-imgs/shell39.png",
    "revision": "163f65b713af64ba75816a57be37f581"
  },
  {
    "url": "linux-imgs/shell4.png",
    "revision": "7c45737af527c9699cad0cd6cb772639"
  },
  {
    "url": "linux-imgs/shell40.png",
    "revision": "b7ff2d94b0f7263e4bc2708d24fa649d"
  },
  {
    "url": "linux-imgs/shell41.png",
    "revision": "b9be90df5bc616359b77bc52bec57d51"
  },
  {
    "url": "linux-imgs/shell42.png",
    "revision": "1fb3b82c7a9c3699f183ea379f11710f"
  },
  {
    "url": "linux-imgs/shell43.png",
    "revision": "08cdac7db92cf948372a66ba66325cd0"
  },
  {
    "url": "linux-imgs/shell44.png",
    "revision": "de763253a1dcb4c6bbfde67a9feed9f5"
  },
  {
    "url": "linux-imgs/shell45.png",
    "revision": "666fb481516c9e6b5377a2633ac284a6"
  },
  {
    "url": "linux-imgs/shell46.png",
    "revision": "3c2d84fc0518f8252a50347b7458ef4b"
  },
  {
    "url": "linux-imgs/shell47.png",
    "revision": "7fd5dc342e733577da0c5c6e09098df5"
  },
  {
    "url": "linux-imgs/shell48.png",
    "revision": "ad6790a5b7436e330bb80345b9faf8ff"
  },
  {
    "url": "linux-imgs/shell5.png",
    "revision": "744fcbf309fd77359b793d258dec6828"
  },
  {
    "url": "linux-imgs/shell6.png",
    "revision": "c2c52221cd5951c1127c60a52e3f1cbd"
  },
  {
    "url": "linux-imgs/shell7.png",
    "revision": "5ba7756e7f795bc245634838698a6228"
  },
  {
    "url": "linux-imgs/shell8.png",
    "revision": "b1fd8d19d88735b84c03a86facc0a7ca"
  },
  {
    "url": "linux-imgs/shell9.png",
    "revision": "ad62234c6fb274c73f4774278d1ac59b"
  },
  {
    "url": "linux-imgs/su1.png",
    "revision": "d60ad26d09d9d2f3d43241d25e46a6ae"
  },
  {
    "url": "linux-imgs/su2.png",
    "revision": "0598a72c213c19bac259757db5de8222"
  },
  {
    "url": "linux-imgs/su3.png",
    "revision": "2e4396152d9579ae2c868fb42536798c"
  },
  {
    "url": "linux-imgs/sudo1.png",
    "revision": "d9964bf68beb6b2d701e0f4beb7f24f0"
  },
  {
    "url": "linux-imgs/sudo2.png",
    "revision": "462c1a08ab0ff81db9c9d0762687acae"
  },
  {
    "url": "linux-imgs/sudo3.png",
    "revision": "036d8bc8c4a6d104de6beb76e6741793"
  },
  {
    "url": "linux-imgs/sudo4.png",
    "revision": "6b0566b329e6dba2d7790022a68fd6cb"
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
    "url": "linux-imgs/tar-gz1.png",
    "revision": "0b93be576de08c3cd4adc3990a37f61c"
  },
  {
    "url": "linux-imgs/tar-gz2.png",
    "revision": "cf756f455cea6d77ac61cf9043d1bc97"
  },
  {
    "url": "linux-imgs/tar-gz3.png",
    "revision": "4ee43b6a891a16913b89e3d9a1077d42"
  },
  {
    "url": "linux-imgs/tar1.png",
    "revision": "fdc6318b404fc9e7abb79a695da96951"
  },
  {
    "url": "linux-imgs/tar2.png",
    "revision": "20715d487f8b989567cc172aafabab78"
  },
  {
    "url": "linux-imgs/tar3.png",
    "revision": "1b7ac58282bfa98c6ed81470619e6c1d"
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
    "url": "linux-imgs/unzip1.png",
    "revision": "178c0ec637ff4f744d30fb49aef28a71"
  },
  {
    "url": "linux-imgs/useradd1.png",
    "revision": "0597f65e9313cfb498f6a3656667fd55"
  },
  {
    "url": "linux-imgs/useradd2.png",
    "revision": "f7582233db64bee293da85a55ded4dbf"
  },
  {
    "url": "linux-imgs/userdel1.png",
    "revision": "d882f9e246cca6e991accb14c020e096"
  },
  {
    "url": "linux-imgs/which1.png",
    "revision": "1b78ef92fa820f8afbaa7ed5922544de"
  },
  {
    "url": "linux-imgs/zip1.png",
    "revision": "f9c92e421d5172c0ff42ae17e8182dd1"
  },
  {
    "url": "linux.html",
    "revision": "5be977ef75279c11cd25e63f0bf2ea22"
  },
  {
    "url": "linux/每天一点linux（一）.html",
    "revision": "ea7420ea767ad52731ceff286233bbce"
  },
  {
    "url": "linux/每天一点linux（七）.html",
    "revision": "97fe071548b2d0a7b630045876be92de"
  },
  {
    "url": "linux/每天一点linux（三）.html",
    "revision": "3fbb83084d791ed16c2ecfe029d97589"
  },
  {
    "url": "linux/每天一点linux（九）.html",
    "revision": "069d3a46cf4fdba81d9d5b98f2f0b161"
  },
  {
    "url": "linux/每天一点linux（二）.html",
    "revision": "f6e0a945d6225169a6cc6b7422b686ce"
  },
  {
    "url": "linux/每天一点linux（五）.html",
    "revision": "a8f041ef9c8cc7cb570398f29669e39e"
  },
  {
    "url": "linux/每天一点linux（八）.html",
    "revision": "a857b2acddc1641f981981e074d77c56"
  },
  {
    "url": "linux/每天一点linux（六）.html",
    "revision": "49d2c620b96e4ec761d43bd20ed9f737"
  },
  {
    "url": "linux/每天一点linux（四）.html",
    "revision": "28aead9e5cf6e15706bc4bc47f6e40a6"
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
    "url": "ls-test_server.png",
    "revision": "4e11158b89e68b4f0673fbe9a4ecd8e2"
  },
  {
    "url": "mp1.jpeg",
    "revision": "06c5201bcdde4814e8b6115bd6ffa1f5"
  },
  {
    "url": "mp1.png",
    "revision": "e70fb8860a5e3c2a6260642adb7fc796"
  },
  {
    "url": "mp2.png",
    "revision": "c60869f59311a23e0d5b0a92541a7b34"
  },
  {
    "url": "mp3.png",
    "revision": "e7c2ff01bd424feb10bc49f26b95f0f6"
  },
  {
    "url": "mp4.png",
    "revision": "632b3d5635cdd8167c122c7a9577aa1d"
  },
  {
    "url": "mp5.png",
    "revision": "bac8ad675b0594b6f043eb1334a828c4"
  },
  {
    "url": "mp6.png",
    "revision": "996e9d185f9f67c724b43455fba91be5"
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
    "url": "ng_https1.png",
    "revision": "3be45a2a1d6cf98256c1bc66a05ea09b"
  },
  {
    "url": "ng_https2.png",
    "revision": "facc16f73e8ff865777412a1473127c7"
  },
  {
    "url": "ng_https3.png",
    "revision": "325bb01319dcc66fa97f4385b7e3e5ef"
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
    "url": "request.svg",
    "revision": "d26b729886a45f3922ec613c34c8caf1"
  },
  {
    "url": "response.svg",
    "revision": "b36d12c60f87aed3dedec8b74ff996d9"
  },
  {
    "url": "server1.png",
    "revision": "e4eab3e585bbc9750628b9f419e0e9da"
  },
  {
    "url": "server2.png",
    "revision": "e10e9004f28c623f7c4e07ceff8e415f"
  },
  {
    "url": "static_resource.png",
    "revision": "f3dcd38e6388708caa77bcba8094fbf8"
  },
  {
    "url": "travis.png",
    "revision": "8746bde5453aef06dc12f62644c70faf"
  },
  {
    "url": "travis2.png",
    "revision": "038de48c74bfbe4037390cabbbc1641a"
  },
  {
    "url": "travis3.png",
    "revision": "8991a634ed79450baa8597e1fd71145e"
  },
  {
    "url": "travis4.png",
    "revision": "d11564e6cd91037d277887752e52ec44"
  },
  {
    "url": "travis5.png",
    "revision": "4aad2bd07bbb3df625195322c4619eff"
  },
  {
    "url": "webkit.html",
    "revision": "ef45b1ff7573ea92a38a1418ec075382"
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
  },
  {
    "url": "zxdl.png",
    "revision": "91e2acb678a19dd649f78724afec4725"
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
