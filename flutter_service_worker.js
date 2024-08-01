'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "cfd2b1c5068c2ecf5d44599b20f6c440",
"assets/AssetManifest.bin.json": "da1f93fa9841c86421fb5cede106a836",
"assets/AssetManifest.json": "d2874fa57b97ef534538183deaba9d1f",
"assets/assets/educations/apa_itu_dbd.jpg": "dd8a23daab164981ddae8e39389318ee",
"assets/assets/educations/cegah_3mplus.jpg": "537056f90c66e9041728e5c0ea6d02f7",
"assets/assets/educations/daur_hidup_nyamuk.jpg": "c0222934cec1086ef443933537c51dc4",
"assets/assets/educations/gejala_dbd.jpg": "77cf7c038f596846c9acf6ae68ea2818",
"assets/assets/educations/gerakan_jumantik.jpg": "5074f7c4edbe77ec6afc110be60b762b",
"assets/assets/educations/mengenal_aedes_aegypti.jpg": "02be8b3dda3a7e275216bf5f59d98a8f",
"assets/assets/educations/tempat_persembunyian_nyamuk.jpg": "e63d8b1fef02543579dd51f290f117c0",
"assets/assets/educations/waspada_dbd.jpg": "b3e01422fdb16d448e795396fb0a3252",
"assets/assets/fonts/Montserrat-Italic-VariableFont_wght.ttf": "87a9f36eac8c031aff3af3957a14e81e",
"assets/assets/fonts/Montserrat-VariableFont_wght.ttf": "e6cb49ef6502d09136c7302d56f4197b",
"assets/assets/images/bg.jpg": "9eca61dd8ba7d605326cc5cf2a50a342",
"assets/assets/images/logo.png": "f20c3274da163eb38863fa5cbcdb57c2",
"assets/assets/privacy_policy.md": "6930abac67de0b57d8cb424abd116787",
"assets/assets/templates/daftar_data_abj.xlsx": "7d2c96389721b31479d7cce108f64912",
"assets/assets/templates/daftar_data_deteksi_dini.xlsx": "2c76c60d1a4fdfba1bd915e7ef381c37",
"assets/FontManifest.json": "102ee5a3d74ca14582f6c7a215b60e08",
"assets/fonts/MaterialIcons-Regular.otf": "8f0689018bc88ae3302ce485815eac83",
"assets/NOTICES": "b86b132fa8707f2737b43464318dadd8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "89ed917f2fef71a32ca21681b7693024",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "ef0467e490038928c1608e8158be413e",
"icons/apple-touch-icon.png": "f8bb5b13a3040a7a33ece694c5bfdfad",
"icons/favicon.ico": "89ed917f2fef71a32ca21681b7693024",
"icons/icon-192-maskable.png": "52572aad73a68fff88d87e8ac6016a73",
"icons/Icon-192.png": "d98f2ca67f88a6b95098dca2262e2d4e",
"icons/icon-512-maskable.png": "e6001b3d3c01ae3f01f2039c2a4e53e8",
"icons/Icon-512.png": "725024efc8fae91f4d6826f883867a3c",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/README.txt": "d3df3991a31f034bfa98afdfa3c622e1",
"index.html": "cdbb29e9b8c35bb0b37be69bc3b48c0c",
"/": "cdbb29e9b8c35bb0b37be69bc3b48c0c",
"main.dart.js": "c56a1ebf17f56f21eb33232878e87e88",
"manifest.json": "667b56ebd324bd4dabe21ad3713a4a7c",
"version.json": "49897ab1de7b1e413f7331759b6a7ddb"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
