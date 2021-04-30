const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "/indexedDb.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];
const STATIC_CACHE = "static-cache-v1";
// install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then( cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  console.log('Install');
  self.skipWaiting();
});

// retrieve assets from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then( response => {
      return response || fetch(event.request);
    })
  );
});
 