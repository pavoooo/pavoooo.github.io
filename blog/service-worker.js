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
    "url": "404.html",
    "revision": "e851c04fdc76dfa29907cf6030427ad3"
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
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.780ad5d9.js",
    "revision": "a0e74dc56677e75e244e484de91aca09"
  },
  {
    "url": "assets/js/4.7af3f30d.js",
    "revision": "ccf1bb10f01340d6ce6d6e415e449c72"
  },
  {
    "url": "assets/js/app.dd9665bf.js",
    "revision": "e4e5caec223a7a336b1086469dd7553c"
  },
  {
    "url": "bdtj.js",
    "revision": "53e092997ed75ab8f6dddf8ee91ba10c"
  },
  {
    "url": "index.html",
    "revision": "ccd85fbebc8f6f7c0d61dffc562755d9"
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
