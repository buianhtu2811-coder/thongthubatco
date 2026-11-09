var CACHE_NAME = 'thong-thu-bat-co-v20';
var ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './battu.js',
  './phongthuy.js',
  './logic_thongthu.js',
  './lunar.js',
  './tuoi.js',
  './data_phongthuy.js',
  './data_tuoi.js',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  './tuvi/index.html',
  './tuvi/style.css',
  './tuvi/calendar.js',
  './tuvi/engine.js',
  './tuvi/star_kb.js',
  './tuvi/saoduyen_luan.js',
  './tuvi/app.js',
  './tuvi/ai.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-first strategy so code & layout updates always appear immediately
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        return response;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
