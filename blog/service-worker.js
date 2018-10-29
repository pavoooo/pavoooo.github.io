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
    "revision": "a8eae599025b5a77fa14f62386e2222c"
  },
  {
    "url": "2017/Mocha中文文档.html",
    "revision": "64a0e3612a26b6450e0372007a0d3066"
  },
  {
    "url": "2017/react-start到co源码系列一.html",
    "revision": "130a4df34c301287b21a0e801491ee9f"
  },
  {
    "url": "2017/react-start到co源码系列三.html",
    "revision": "258c902e890a11b044bb8e316c526cae"
  },
  {
    "url": "2017/react-start到co源码系列二.html",
    "revision": "18afff5ebcc1e853270068e2ac877ec0"
  },
  {
    "url": "2017/ReactDOM详解.html",
    "revision": "4a16be21f0732da4a8375e8f364909e5"
  },
  {
    "url": "2017/redux源码解读--applyMiddleware源码解析.html",
    "revision": "53c78427b37810e5f5372b91fe192887"
  },
  {
    "url": "2017/redux源码解读－－bindActionCreators源码解析.html",
    "revision": "a7e222c16d957dfc93b5c977c2488808"
  },
  {
    "url": "2017/redux源码解读--compose源码解析.html",
    "revision": "b995763142256ef07fea9104b14e0eb4"
  },
  {
    "url": "2017/redux源码解读－－createStore源码解析.html",
    "revision": "b418e20d6a64d8dfc1c0b81579dc899c"
  },
  {
    "url": "2017/redux源码阅读－－主模块.html",
    "revision": "73f7008931e598d2cd7dd73b8989ea91"
  },
  {
    "url": "2017/redux源码阅读－－基本概括.html",
    "revision": "fef0a139db412e9f7c7c24ed158ddc14"
  },
  {
    "url": "2018/MessageChannel那些事.html",
    "revision": "f07650d7fa75f8cf3047dee3ad7508b2"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "970fe2816143b66903ef2a3fe9d8a8cd"
  },
  {
    "url": "2018/Node的二三四五六.html",
    "revision": "8b8322c5d52617b7387275e2c8671fea"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "2cc22de4ba9a7dd35ce59a38b0de9268"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "66e21daf13ba58e214791b295b198b36"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "6a5ad35fb873ae3b674cbf731ba424ef"
  },
  {
    "url": "2018/web安全之csrf攻击.html",
    "revision": "a8e2c1da0cf068f024079aa26b2010ef"
  },
  {
    "url": "2018/web安全之xss攻击.html",
    "revision": "eb0e09005096bf2d7c9ee1ead10006b2"
  },
  {
    "url": "2018/web安全之点击劫持.html",
    "revision": "7677e7ec2046efe4a7f52cde222b1091"
  },
  {
    "url": "2018/XMLHttpRequest.html",
    "revision": "053ba09c58534e17aec7f36dbda0dfa8"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "3f24238e88f0acf646cd9aa05197c2e8"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "673405d24784cf1e79bced344c499faf"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "7f093eaa4975e0b2e360aabe650e1151"
  },
  {
    "url": "2018/小而美的CLI开发记录.html",
    "revision": "ea49371fc5adf57d7dea85c2fcb0326d"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "8b5de74e208996de16c11f4b5f9accc7"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "90838998c185d4ef1ce519496c80de7d"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "400d9a49f6859914f757e17d349d4ddd"
  },
  {
    "url": "2018/缓存那些事.html",
    "revision": "2defc783b4e13205af8cec5ecdbfab1c"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "129ea6c75caa8bfcced09d2b58fd9e48"
  },
  {
    "url": "404.html",
    "revision": "dc50cdf7bb4c90d4386c17a3ab8bb0e6"
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
    "url": "assets/js/10.3de9ca3a.js",
    "revision": "dbed984ab92bb23eba01ed63cf86466d"
  },
  {
    "url": "assets/js/11.0ed34d33.js",
    "revision": "22fcac4fb816a350ab17c4a32783b881"
  },
  {
    "url": "assets/js/12.bc02a431.js",
    "revision": "05453ea626588cdbee8d4c24e55478af"
  },
  {
    "url": "assets/js/13.c5749836.js",
    "revision": "4de031bc76f6c67dd375cc4051686855"
  },
  {
    "url": "assets/js/14.be81a535.js",
    "revision": "cdfac278fa25483e98cdf836083b1006"
  },
  {
    "url": "assets/js/15.29118ddd.js",
    "revision": "e1b0270a291ffcb1f803bdb00d31a16f"
  },
  {
    "url": "assets/js/16.782f952c.js",
    "revision": "7815c2d4ac715a76afdbff053bfeab5e"
  },
  {
    "url": "assets/js/17.1371a2fe.js",
    "revision": "40ac38303a46616fc8d398e440730f8b"
  },
  {
    "url": "assets/js/18.dc2e7d76.js",
    "revision": "a1f62f00ac9702d2b54372d69145ff09"
  },
  {
    "url": "assets/js/19.28602389.js",
    "revision": "08e396bfd37ebae98e7d5d023d30cb03"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/20.6bd43858.js",
    "revision": "223b55d8740ac1b6580a2eb01e57cc84"
  },
  {
    "url": "assets/js/21.1e09c93f.js",
    "revision": "60b9c1906a3cf5dc4c64cf33712e4d7e"
  },
  {
    "url": "assets/js/22.c9d1e55c.js",
    "revision": "4b3e59568ec43bdd022c5af7301d40c3"
  },
  {
    "url": "assets/js/23.b04f481b.js",
    "revision": "6689729002007c057730724956debc9a"
  },
  {
    "url": "assets/js/24.4e7c178b.js",
    "revision": "4307053efe349827934e311ddbc5c4fb"
  },
  {
    "url": "assets/js/25.fdf05f0c.js",
    "revision": "2028a9a47dd9e95324ffaeb39539d9fb"
  },
  {
    "url": "assets/js/26.924ba6a5.js",
    "revision": "00e3a89cfeb4d5fed3c80c986f992d17"
  },
  {
    "url": "assets/js/27.f3d9a921.js",
    "revision": "159802fa8d2fef82dfd481111a8b3d99"
  },
  {
    "url": "assets/js/28.c5aad505.js",
    "revision": "79a3b387b3f42ef8eeb0624983a32262"
  },
  {
    "url": "assets/js/29.7fa14842.js",
    "revision": "d3a5825d18d9c6ccd8db2a70fbd06860"
  },
  {
    "url": "assets/js/3.d353df46.js",
    "revision": "4c2ada3f79b20380808cb125a1a5df25"
  },
  {
    "url": "assets/js/30.d31910b1.js",
    "revision": "f886ea84466dfcb700b563e8f9cc9b6a"
  },
  {
    "url": "assets/js/31.16ac4073.js",
    "revision": "58e0728b4f3e51118ab22832fffa2447"
  },
  {
    "url": "assets/js/32.7ed84a05.js",
    "revision": "535a5a44939fa9b0acb11306b9f4156a"
  },
  {
    "url": "assets/js/33.3887b9d5.js",
    "revision": "3372073e093c266000d5fa2219c88d4d"
  },
  {
    "url": "assets/js/34.03b4b1b1.js",
    "revision": "7dca0a324bd738eb93db95a43c0d636d"
  },
  {
    "url": "assets/js/35.e410513e.js",
    "revision": "165eebe0b831ceb7c5d3dabd56065174"
  },
  {
    "url": "assets/js/36.2b9032ad.js",
    "revision": "684b415f6c9e2ad9c43d7f4342e4b66f"
  },
  {
    "url": "assets/js/4.cd892f38.js",
    "revision": "d52301c15295ecbca348b14d3b2bf716"
  },
  {
    "url": "assets/js/5.8384bed3.js",
    "revision": "c283578c994cebacc33cfa44893bdd9c"
  },
  {
    "url": "assets/js/6.a14a594c.js",
    "revision": "8fc6e0d244e9ad2a87a5da9d6f58f5e2"
  },
  {
    "url": "assets/js/7.91438e3f.js",
    "revision": "def6fa3efdd2eaa21b4aadd3b0b57ebf"
  },
  {
    "url": "assets/js/8.4d6d8262.js",
    "revision": "d2128f718e849b1dd6ebd1998996a7a8"
  },
  {
    "url": "assets/js/9.e3ea5af9.js",
    "revision": "b2e984fe6001e34ff4bdecd10b708ac4"
  },
  {
    "url": "assets/js/app.97de70b7.js",
    "revision": "612905dec56f7d9d3966c8b923ea9793"
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
    "revision": "dcd0cb4a294e932319ab3fd68e4605f1"
  },
  {
    "url": "index.html",
    "revision": "2c38cd1400d38ddcb3bc6c84dab1ccdf"
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
