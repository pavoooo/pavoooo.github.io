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
    "revision": "6b842a3a4f0a3cd647a09bf94fdc1171"
  },
  {
    "url": "2018/关于JavaScript的一些Tips.html",
    "revision": "216834701c694954fc4e1c9e87e39b5b"
  },
  {
    "url": "2018/写一个webpack的plugin--实战篇.html",
    "revision": "2e1f43ee9113ca791ad88b5ed4bbdde1"
  },
  {
    "url": "2018/写一个webpack的plugin--理论篇.html",
    "revision": "25ad098769afe36fc0123483e6d06fa5"
  },
  {
    "url": "2018/探探scrollIntoView.html",
    "revision": "2c19dadef689f32203c84b9f4ffcc732"
  },
  {
    "url": "2018/浏览器异步处理之MutationObserver.html",
    "revision": "1f26e4b021617c7c1b1e17c630f1510b"
  },
  {
    "url": "2018/跨域解决方案.html",
    "revision": "860bfacbdb8f9d9d147fb6c36f02e57c"
  },
  {
    "url": "404.html",
    "revision": "5347fe867f4e6541269461bdbe5d6698"
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
    "url": "assets/js/10.da9407f9.js",
    "revision": "eeecfb37b415ca82dcfe89bf0a8d1e4f"
  },
  {
    "url": "assets/js/11.36f0219e.js",
    "revision": "d3913ec987d46d0cad0930e4d87d77f0"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.780ad5d9.js",
    "revision": "a0e74dc56677e75e244e484de91aca09"
  },
  {
    "url": "assets/js/4.d040136a.js",
    "revision": "4749916e1eabdfd185f4dd5d2f800b72"
  },
  {
    "url": "assets/js/5.cb6ee70c.js",
    "revision": "a9af175157763e2f15414548e6340fa2"
  },
  {
    "url": "assets/js/6.e2583229.js",
    "revision": "6679fab96e6815f22ac6796c1362c810"
  },
  {
    "url": "assets/js/7.60e3883f.js",
    "revision": "aa888978f46131a2dd40a055e2faa527"
  },
  {
    "url": "assets/js/8.4167c1f5.js",
    "revision": "24108bd506d1f07d2ca323a5a0b71a68"
  },
  {
    "url": "assets/js/9.7cb25a34.js",
    "revision": "293f49aa88c0fbaacafca0f4a6c058f0"
  },
  {
    "url": "assets/js/app.0ad6857f.js",
    "revision": "6ac380280cd0a479c77a9ee307af3b87"
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
    "revision": "7ff82e5e655ad227a69bd4827388e4ed"
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
