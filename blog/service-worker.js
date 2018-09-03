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
    "revision": "fdf90c5c39f584c3e8737717879f6038"
  },
  {
    "url": "2017/Mocha中文文档.html",
    "revision": "26558d238464ce2ecffa2cb049a4c77b"
  },
  {
    "url": "2017/react-start到co源码系列一.html",
    "revision": "50e9d260d54115060654b0822df32f5b"
  },
  {
    "url": "2017/react-start到co源码系列三.html",
    "revision": "837652c3071e8d121f6b29b7738327d7"
  },
  {
    "url": "2017/react-start到co源码系列二.html",
    "revision": "9ebb41b7a7560de76880fc97bc42e54a"
  },
  {
    "url": "2017/ReactDOM详解.html",
    "revision": "4cc2e07d0d5ec02735cc930963471366"
  },
  {
    "url": "2017/redux源码解读--applyMiddleware源码解析.html",
    "revision": "3e3e1d1426e07aabbaafe865f37a04fe"
  },
  {
    "url": "2017/redux源码解读－－bindActionCreators源码解析.html",
    "revision": "77ccabf355434105710773d5b9801500"
  },
  {
    "url": "2017/redux源码解读--compose源码解析.html",
    "revision": "6b9b76b61f85463c037faf16503a37b4"
  },
  {
    "url": "2017/redux源码解读－－createStore源码解析.html",
    "revision": "c992856553d65483130cc91fe5a44210"
  },
  {
    "url": "2017/redux源码阅读－－主模块.html",
    "revision": "45ec0fa77a77360f872361cabc276089"
  },
  {
    "url": "2017/redux源码阅读－－基本概括.html",
    "revision": "8c5401bdd5f18e5a952721b6e21dc338"
  },
  {
    "url": "2018/MessageChannel那些事.html",
    "revision": "610f51559cd52cfa61d69a6afee742c1"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "f4f16c132ddacfa3447c530fcf153370"
  },
  {
    "url": "2018/Node的二三四五六.html",
    "revision": "6011e119f3456ece35d6e3597065a7c0"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "b386aaeafd182ab58936e1479d5d6ec2"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "a7644ae4612f7958d32b85b6a55cc0ef"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "2c718242e3468f9dd276604e5f9d04ca"
  },
  {
    "url": "2018/web安全之csrf攻击.html",
    "revision": "77252dec0605ac920bfeef1864f54b8c"
  },
  {
    "url": "2018/web安全之xss攻击.html",
    "revision": "7288035a871c1e5b28c9815092b19776"
  },
  {
    "url": "2018/web安全之点击劫持.html",
    "revision": "3cd783db89698a50c0b8c84a231f7486"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "9e22d3b600efe37ae446e581ccc0f622"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "205898809e7e57822e5d2f26d1ad4679"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "a2335cfedc5baf832dd2f4106b55401d"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "54416411aaf622dca5253f3595b98d02"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "62cab7ad90960d7bae68d6f66c322c1f"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "a8ae70bff9d4f7cb12875e929fba59cb"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "4c7bce4ab3770bb699cef575d3fd6bbc"
  },
  {
    "url": "404.html",
    "revision": "624c30f2743cab4645f81e55f75f49fb"
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
    "url": "assets/js/10.5a095354.js",
    "revision": "a1f813ed342565542e30647f3e4ad4d9"
  },
  {
    "url": "assets/js/11.d30e2b25.js",
    "revision": "6dcf9ff2e070a55ef6df426a151f80ac"
  },
  {
    "url": "assets/js/12.ecd946af.js",
    "revision": "a0aa8b858577f98e265bc404e9f2d7b2"
  },
  {
    "url": "assets/js/13.aa8d4d04.js",
    "revision": "9f44bb66078978ed1051f45dda427415"
  },
  {
    "url": "assets/js/14.0971e8f1.js",
    "revision": "364e034dcfa2da320fe72ce9d8ee1f35"
  },
  {
    "url": "assets/js/15.d4a3cf59.js",
    "revision": "590d866c6e6bc8bf4c2e3db75e67f922"
  },
  {
    "url": "assets/js/16.be21c08e.js",
    "revision": "ad9acb6cd77375e3b944dd2db1e4e61d"
  },
  {
    "url": "assets/js/17.c2472501.js",
    "revision": "0895223cf43544cfe78e41490fd6cb78"
  },
  {
    "url": "assets/js/18.c2100abe.js",
    "revision": "66146a3243e48bfd953e6a3ee1d6b753"
  },
  {
    "url": "assets/js/19.5cb717a5.js",
    "revision": "af27947f1902d8c741152196f6f20186"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/20.dc98d9be.js",
    "revision": "9145b23d53478e97f03869f03dfe1c47"
  },
  {
    "url": "assets/js/21.e4d1395a.js",
    "revision": "657016597f73cc4d932e9d5e7cc2e525"
  },
  {
    "url": "assets/js/22.ae33ce28.js",
    "revision": "e0b645e66b8694246f8a22e2eeacd658"
  },
  {
    "url": "assets/js/23.cffb863c.js",
    "revision": "cc35c8a6866c645ef250e45586f3e6ac"
  },
  {
    "url": "assets/js/24.f32e7a4c.js",
    "revision": "bdfb16d2f675393f531d329c60e9ac7e"
  },
  {
    "url": "assets/js/25.d952b75f.js",
    "revision": "3eb33ccfb4698879883090ee4b0e9292"
  },
  {
    "url": "assets/js/26.9c1da6db.js",
    "revision": "42f334b0380922b253128f53ef1ed646"
  },
  {
    "url": "assets/js/27.60e03591.js",
    "revision": "5aca7295f224d7914affcf187b52f166"
  },
  {
    "url": "assets/js/28.2a80473b.js",
    "revision": "1680735230ad9be80f8ed10adf41b5f5"
  },
  {
    "url": "assets/js/29.33ad0679.js",
    "revision": "3765d235339f78c690af1230e347dee7"
  },
  {
    "url": "assets/js/3.7efd6ae6.js",
    "revision": "40fd90bc52bbfe9f356a8752ea1f91e8"
  },
  {
    "url": "assets/js/30.ecebc719.js",
    "revision": "40499f8b904ede4c9d64a00f18c00876"
  },
  {
    "url": "assets/js/31.11589f01.js",
    "revision": "1fa96771f33db9228d65c44c01375085"
  },
  {
    "url": "assets/js/32.34c7610f.js",
    "revision": "e344d4e4093bab7174a8e7562029ff3a"
  },
  {
    "url": "assets/js/33.786b11f7.js",
    "revision": "287da20b0a6a34bb6217bc48f02d91ba"
  },
  {
    "url": "assets/js/4.2b0a2e08.js",
    "revision": "4798fb2593234d1a01caebccd793a7ee"
  },
  {
    "url": "assets/js/5.1ffbd904.js",
    "revision": "d95cb1161a6f765afda575b14411bad3"
  },
  {
    "url": "assets/js/6.22c1e6ff.js",
    "revision": "8a06036ac0a539d8ef3177bc4443a022"
  },
  {
    "url": "assets/js/7.01f19739.js",
    "revision": "471fba4586c10aba9f066569a98d7ac5"
  },
  {
    "url": "assets/js/8.11c0071e.js",
    "revision": "4ca16fb70933a410c0b211dcd30108a4"
  },
  {
    "url": "assets/js/9.92baefa4.js",
    "revision": "44ef8cfc947d1b58bab89622c31688d6"
  },
  {
    "url": "assets/js/app.c6fac8fc.js",
    "revision": "4e705597c7954f034bd3a11736f1727a"
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
    "url": "good-writings.html",
    "revision": "8badbaa64bcc3bbaddfe0afdfa507f86"
  },
  {
    "url": "index.html",
    "revision": "74933c3f75d5e928f2207a2b3d30ca1b"
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
