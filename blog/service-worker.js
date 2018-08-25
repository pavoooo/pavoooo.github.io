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
    "revision": "25f3c3469eff59a0f970321aa97b7be4"
  },
  {
    "url": "2017/Mocha中文文档.html",
    "revision": "3c8af2bdcc7fbc7cf818d099f7489a4e"
  },
  {
    "url": "2017/react-start到co源码系列一.html",
    "revision": "cf4c78fae63f59430205d6ac35a14146"
  },
  {
    "url": "2017/react-start到co源码系列三.html",
    "revision": "1770c13e8c03720bd217448af242829d"
  },
  {
    "url": "2017/react-start到co源码系列二.html",
    "revision": "3674543135f575fd6ec3e8e867c0eb9e"
  },
  {
    "url": "2017/ReactDOM详解.html",
    "revision": "d069befc1fc1be556e3dacc1472299a0"
  },
  {
    "url": "2017/redux源码解读--applyMiddleware源码解析.html",
    "revision": "3cec5d636c6b93e8de1cb047443eca97"
  },
  {
    "url": "2017/redux源码解读－－bindActionCreators源码解析.html",
    "revision": "1c5e3ff546f6a21fac9e8b385d05255a"
  },
  {
    "url": "2017/redux源码解读--compose源码解析.html",
    "revision": "968ba8bea91c4ab6a7e1a854b6e6d586"
  },
  {
    "url": "2017/redux源码解读－－createStore源码解析.html",
    "revision": "0d966a8f0cf26e96c89e42baa77b2d78"
  },
  {
    "url": "2017/redux源码阅读－－主模块.html",
    "revision": "1b15ced3259569d5ee96903939bad9d9"
  },
  {
    "url": "2017/redux源码阅读－－基本概括.html",
    "revision": "6e3c92bb258151ab693f77ec654626c0"
  },
  {
    "url": "2018/MessageChannel那些事.html",
    "revision": "20ec318dc217cd53f6286f9a1d497692"
  },
  {
    "url": "2018/Node常见加密方法.html",
    "revision": "f2101b227e7e957bc52fc7f9e464bb77"
  },
  {
    "url": "2018/Vue源码之nextTick.html",
    "revision": "e7118dce463bf10c829133232be2ffb8"
  },
  {
    "url": "2018/Vue源码之工具函数.html",
    "revision": "f07ca6e2928a2e0479f4d0ce888baf72"
  },
  {
    "url": "2018/Vue源码之错误处理.html",
    "revision": "cccb376cda3628386eedb74b71a17924"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "538e0863097b6e58c1560e34da04e6ae"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "75b52b14288f05bd0ef6321ba620c6f8"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "bb9a8cd7f47958d33c04181bf439bedc"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "8a8abbdb50878d42ef1e2b716b8327c3"
  },
  {
    "url": "2018/模拟call方法.html",
    "revision": "bae3ca78aec9d39266f0cdce9e543c6b"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "3fe1000e65ece8c87ba91f21d609f542"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "f72301b34626b442a7f9a632ad111866"
  },
  {
    "url": "404.html",
    "revision": "9cc6d8b4d392f5d5f06c60aed64ae141"
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
    "url": "assets/js/10.451c1aaa.js",
    "revision": "8c4d15b53bfa9de4a36e566bab4754a8"
  },
  {
    "url": "assets/js/11.99c4ef31.js",
    "revision": "2ad40ba11babf785f9f9218561c3cbd7"
  },
  {
    "url": "assets/js/12.8005b29f.js",
    "revision": "c17132d1835c96423792a2f46c99cd02"
  },
  {
    "url": "assets/js/13.4e1f0edd.js",
    "revision": "49e739f663a48397086624f33d563e24"
  },
  {
    "url": "assets/js/14.a8d25cc4.js",
    "revision": "273c779cae32069a09ce59b8f596a9e8"
  },
  {
    "url": "assets/js/15.3ed319b5.js",
    "revision": "9e36caf84cbd637c5d164f900a582b92"
  },
  {
    "url": "assets/js/16.fa12773c.js",
    "revision": "70627cf2b6754dea49e735f031c88f18"
  },
  {
    "url": "assets/js/17.e62491be.js",
    "revision": "48f03e7b9eb9d870f3fb3e70b4242089"
  },
  {
    "url": "assets/js/18.0ec9ccd3.js",
    "revision": "4dae69240bee967e7903af0ab3409b87"
  },
  {
    "url": "assets/js/19.e071ffb2.js",
    "revision": "8f3ea7354caa3bde2843fc2c6615eb7c"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/20.8edca5d2.js",
    "revision": "d309fce0a5c9d0536587c4d6e0d4e93d"
  },
  {
    "url": "assets/js/21.cd60f1ff.js",
    "revision": "687329bb7181cdf607b2e404cb52d914"
  },
  {
    "url": "assets/js/22.c524b1af.js",
    "revision": "bf72344f6f313164208066216f7ab8f6"
  },
  {
    "url": "assets/js/23.0277f4ac.js",
    "revision": "8d4bb33f7512501d5f0a36df21265aa1"
  },
  {
    "url": "assets/js/24.e36b5c5c.js",
    "revision": "1376d709d52ee66d40ce7c6d1e28f303"
  },
  {
    "url": "assets/js/25.188fe514.js",
    "revision": "ec7d3018dafde4504308d898370ae069"
  },
  {
    "url": "assets/js/26.0b4af5bd.js",
    "revision": "ea482d900f3f472e7b94a83a91127cbd"
  },
  {
    "url": "assets/js/27.9f79d98e.js",
    "revision": "bdfbbca63284ae2f90d8bc8c3c211bd4"
  },
  {
    "url": "assets/js/28.5171818d.js",
    "revision": "949405062e262d626256b3951ed51bec"
  },
  {
    "url": "assets/js/3.5844eef0.js",
    "revision": "f4b02d8a09815fe655ff77a52dc94bdc"
  },
  {
    "url": "assets/js/4.cbe6d518.js",
    "revision": "c2b75d8bab69c4c7b1962e79b01f40c4"
  },
  {
    "url": "assets/js/5.64506512.js",
    "revision": "f8c02b53f8bae3d3d511a4702bb8b160"
  },
  {
    "url": "assets/js/6.a63687ce.js",
    "revision": "06e35413487ec121ca664638b7fc9bb0"
  },
  {
    "url": "assets/js/7.9126320d.js",
    "revision": "98394bba35b96dd2962a714a28ef1670"
  },
  {
    "url": "assets/js/8.b8ed2b4a.js",
    "revision": "d4d8e3d2fae3860b8fab7e75bc095fe6"
  },
  {
    "url": "assets/js/9.915fa5a7.js",
    "revision": "d6b0336e8337e76d659f4716174bb005"
  },
  {
    "url": "assets/js/app.4e8ca317.js",
    "revision": "0a7e8127c9f96d9fd5aa155850130bc5"
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
    "revision": "fd3b074c217e7c7b548157f8369c2bbe"
  },
  {
    "url": "logo.gif",
    "revision": "803bb46a6acef395ed9353de2dcf26f5"
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
