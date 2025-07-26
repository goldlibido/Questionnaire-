const CACHE_NAME = 'le-libido-cache-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/',
        '/pwa-download.html',
        '/le-libido-icon.png',
        OFFLINE_URL
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) =>
        res || caches.match(OFFLINE_URL)
      )
    )
  );
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: 'Le Libido',
    body: 'Someone is checking you out nearby…',
    icon: '/le-libido-icon.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon
    })
  );
});
