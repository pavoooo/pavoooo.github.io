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
    "url": "2018/MessageChannel那些事.html",
    "revision": "330cd94e538ac1e916bf084d5846443c"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "7d778ff650692246c40d31b95aa653bc"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "14d479751fec295d9b7e79a275360fde"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "750c40fca393740e041e3a985947afa8"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "addb9b6efd6b879e4a47c3fd7a0995cd"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "bffe59041c0ff37b777e863190b669a6"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "011c3585477c2c7f8e1d9be438a6e89a"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "56623470a88e5a2103d3f57b12f8fe28"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "404eee64b3260b37b9596409d43a87a4"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "d2ba8d1cc06f41d4560ef83f6b2e9914"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "6363285c6aadabd20123a7e9d4d1a5b8"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "e92420a7227ab7c9a57b064d230c76a6"
  },
  {
    "url": "404.html",
    "revision": "0faae3d6691ff72b2fd5ed8adb545df6"
  },
  {
    "url": "assets/css/0.styles.b82299d2.css",
    "revision": "910a35de972154dd752c37a7a4e30de5"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.df450f41.js",
    "revision": "984c14159952f3e892c42979be164503"
  },
  {
    "url": "assets/js/11.03e3a203.js",
    "revision": "28c29be738b2d8c7b7b03e9a066bbf2a"
  },
  {
    "url": "assets/js/12.6653f774.js",
    "revision": "a42a3f28642e48202ee4b0c5196c262d"
  },
  {
    "url": "assets/js/13.dd87c292.js",
    "revision": "3a15d7aa883eb82d864f1019cb737d4b"
  },
  {
    "url": "assets/js/14.ebf6dd2e.js",
    "revision": "b19e0c8763401ea4d5ff7ab5db6f484f"
  },
  {
    "url": "assets/js/15.211e90db.js",
    "revision": "2ec61833c456478d8d5a571dc8248999"
  },
  {
    "url": "assets/js/16.d3bb9249.js",
    "revision": "a31c06c943bf7efe8a6070f87ce16505"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.6bdd41a5.js",
    "revision": "b7a5ce1de05e61fd5d0793d0b4b82ef5"
  },
  {
    "url": "assets/js/4.e5134bbb.js",
    "revision": "8768ed8891b588471dd03be3b39ca48a"
  },
  {
    "url": "assets/js/5.fcf627b3.js",
    "revision": "fb595b7c5a80d9cd27eb0e02570326ef"
  },
  {
    "url": "assets/js/6.18c0f231.js",
    "revision": "5ff9dd6277cd101dfce2fd574b907f9d"
  },
  {
    "url": "assets/js/7.2c57f0b7.js",
    "revision": "c24a1c77116a20f90f3ff1ecb7e22347"
  },
  {
    "url": "assets/js/8.01a6d13c.js",
    "revision": "d8d4bc3b30494a66c9a93c2accd905ab"
  },
  {
    "url": "assets/js/9.a86269f0.js",
    "revision": "4bb2790e5b1854520dc168fb4f67193e"
  },
  {
    "url": "assets/js/app.132a34a6.js",
    "revision": "d76b5ec095cdd2ad85b0ef78e86a3a36"
  },
  {
    "url": "bdtj.js",
    "revision": "53e092997ed75ab8f6dddf8ee91ba10c"
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
    "url": "index.html",
    "revision": "75c526b83fdae2b343a8c58498307d72"
  },
  {
    "url": "logo.gif",
    "revision": "803bb46a6acef395ed9353de2dcf26f5"
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
