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
    "revision": "a0733bde34f2597be11dccc3347ac421"
  },
  {
    "url": "2017/Mocha中文文档.html",
    "revision": "dc8d07096f91f1b66c24def773fdc7a7"
  },
  {
    "url": "2017/react-start到co源码系列一.html",
    "revision": "dfd486de417abab20469fa60fd92d963"
  },
  {
    "url": "2017/react-start到co源码系列三.html",
    "revision": "223dfedae4b38ae7a47086de337c7ca0"
  },
  {
    "url": "2017/react-start到co源码系列二.html",
    "revision": "22d585c5bdf852f2745ed94c7e89be7a"
  },
  {
    "url": "2017/ReactDOM详解.html",
    "revision": "baf0754ce210413ac8781ac82158f4c6"
  },
  {
    "url": "2017/redux源码解读--applyMiddleware源码解析.html",
    "revision": "8354a6f5679742b31137e53d348844b3"
  },
  {
    "url": "2017/redux源码解读－－bindActionCreators源码解析.html",
    "revision": "be85c4e10938588ed907ad57d17a4ff0"
  },
  {
    "url": "2017/redux源码解读--compose源码解析.html",
    "revision": "ebb920b70942443393f9f7fcaf22793d"
  },
  {
    "url": "2017/redux源码解读－－createStore源码解析.html",
    "revision": "0469cb2be25254a811ba106ebf181ee8"
  },
  {
    "url": "2017/redux源码阅读－－主模块.html",
    "revision": "c571aa532724dbeb68c9a7fca67564cd"
  },
  {
    "url": "2017/redux源码阅读－－基本概括.html",
    "revision": "d7a768fafb01b12b14f0d650d6e26d49"
  },
  {
    "url": "2018/MessageChannel那些事.html",
    "revision": "3c116e02a6dc6e41c45e7ef3c76ff8be"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "a42f1cdc57c10ebf9de56906df276b29"
  },
  {
    "url": "2018/Node的二三四五六.html",
    "revision": "d511620f58985b118434db2e2e1f79f5"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "3949b34de1bbf93955a30daec4b7ffef"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "cd528e9d5438965e51660684f7d42550"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "5aa88f0a27db697e0379bd7bbb6100c8"
  },
  {
    "url": "2018/web安全之csrf攻击.html",
    "revision": "7076a9cb8f61a65446c4a54039e4610a"
  },
  {
    "url": "2018/web安全之xss攻击.html",
    "revision": "2f6c52e28863d2da12792deb8766ee6e"
  },
  {
    "url": "2018/web安全之点击劫持.html",
    "revision": "b6872bce5291f67906674aa73caf30fc"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "cf6cb69e1c257ebb5f354d291b522897"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "7e1af472e343495214642812853a1a01"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "63a2af93a02ea8191a7875007789464d"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "8066e4e269f0904024593ffb3801103f"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "d036fc18b19779ede0775b513121ea97"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "7e9af56b214c9d6b3297d93128e8e49f"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "c252887ceee06d108179000a24115e39"
  },
  {
    "url": "404.html",
    "revision": "6e6454a194e4c7a890d48bb50fff5697"
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
    "url": "assets/js/10.7abacfa0.js",
    "revision": "f94ff09ee2f432bba9e3a306698f2e90"
  },
  {
    "url": "assets/js/11.509fe57d.js",
    "revision": "7acb5719dd10569c6fbd980ed6718d46"
  },
  {
    "url": "assets/js/12.108c31cf.js",
    "revision": "d11fead1426dc664269a77343f268704"
  },
  {
    "url": "assets/js/13.3fa45ad9.js",
    "revision": "dd22f3d43c9f01575f87f93243a84415"
  },
  {
    "url": "assets/js/14.033a1cb9.js",
    "revision": "36f39edf8516f64643fa9e97d77e904b"
  },
  {
    "url": "assets/js/15.c4b4210f.js",
    "revision": "844d05f7b737e18420d70ccaa7523f4f"
  },
  {
    "url": "assets/js/16.be21c08e.js",
    "revision": "ad9acb6cd77375e3b944dd2db1e4e61d"
  },
  {
    "url": "assets/js/17.c939a3db.js",
    "revision": "aaf265a0c30d42e320e64a48566eadaa"
  },
  {
    "url": "assets/js/18.5390737d.js",
    "revision": "db0f7f36654c4d114c7c919c3b8913c0"
  },
  {
    "url": "assets/js/19.cbec6dfb.js",
    "revision": "36219497fbee64c228cd231185d0c3f7"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/20.a764f705.js",
    "revision": "47ebc142215ed494feacfddaf4ce3281"
  },
  {
    "url": "assets/js/21.a8e427da.js",
    "revision": "6235d877ebbdf92145322a8253e89f97"
  },
  {
    "url": "assets/js/22.a9759209.js",
    "revision": "48b2e5fdcb66b1a1b2c1987e77c15427"
  },
  {
    "url": "assets/js/23.3c789361.js",
    "revision": "6018431b0dc78c6a0d687276226bad23"
  },
  {
    "url": "assets/js/24.0832195c.js",
    "revision": "1c21a225e9691e8e619d471c8f180cfa"
  },
  {
    "url": "assets/js/25.230bcddf.js",
    "revision": "eb04d579dbeb78f0c18bd5e35acc1f96"
  },
  {
    "url": "assets/js/26.44e8953a.js",
    "revision": "0b8b9008dd1862b8110c865b0506de51"
  },
  {
    "url": "assets/js/27.5a545231.js",
    "revision": "7c6a41e278ca5206cc2cece6ee764fa0"
  },
  {
    "url": "assets/js/28.e5c3eac1.js",
    "revision": "f23d002d94b10831f43a45ecbea036d5"
  },
  {
    "url": "assets/js/29.f9ee8e1b.js",
    "revision": "4fc901a6747625ab212127a2e67f4b12"
  },
  {
    "url": "assets/js/3.7efd6ae6.js",
    "revision": "40fd90bc52bbfe9f356a8752ea1f91e8"
  },
  {
    "url": "assets/js/30.a339f6b9.js",
    "revision": "5f9d4b732e1ab11d3ad528c0b6673f25"
  },
  {
    "url": "assets/js/31.83ec8d1a.js",
    "revision": "a4a10e98f41d347d7554824c7997d154"
  },
  {
    "url": "assets/js/32.0363553c.js",
    "revision": "e38860f6bccec18c01bd626625bc1076"
  },
  {
    "url": "assets/js/33.e6b96c06.js",
    "revision": "e71d17d6ea7f79d4edc2b6131df493b5"
  },
  {
    "url": "assets/js/34.eec0c82f.js",
    "revision": "1143c4d0fb87a5d00c6d768353c55486"
  },
  {
    "url": "assets/js/4.74e8f904.js",
    "revision": "0699ea0f4f1c84414a0d1f2b0e32254d"
  },
  {
    "url": "assets/js/5.c326b64e.js",
    "revision": "4ab4eb53f9e594a96e67fc0680255c92"
  },
  {
    "url": "assets/js/6.cb2fcd6e.js",
    "revision": "a7f69f7b0b94c54c275ae12a7d7d751d"
  },
  {
    "url": "assets/js/7.b8163be3.js",
    "revision": "b9baa0a374f33f7c70be130addbdcb05"
  },
  {
    "url": "assets/js/8.48b8352b.js",
    "revision": "3597b9c2aecaf3a946e8a5b8352197cc"
  },
  {
    "url": "assets/js/9.2e63cc96.js",
    "revision": "d144b0c82b6449bb47d72c4c53afca0c"
  },
  {
    "url": "assets/js/app.b59338f7.js",
    "revision": "ef5c6bd99db82d95322a97735e3b91f0"
  },
  {
    "url": "bdtj.js",
    "revision": "50d5858588f0a767649f3da6c535c83e"
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
    "url": "good-writings.1.html",
    "revision": "7d8de8f525944509499a8c8a62716019"
  },
  {
    "url": "good-writings.html",
    "revision": "249f7c2ac66e40e524f4f2135037ef19"
  },
  {
    "url": "index.html",
    "revision": "b04b7711355cfbf42d72d67e4533292c"
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
