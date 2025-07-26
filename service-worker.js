const CACHE_NAME = 'le-libido-cache-v1';
const OFFLINE_URL = '/offline.html'; // Optional

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/pwa-download.html',
        '/le-libido-icon.png',
        // Add any other core assets here like stylesheets or scripts
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match(OFFLINE_URL)
        )
      );
    })
  );
});

self.addEventListener('push', function(event) {
  const data = event.data?.json() || {
    title: 'Le Libido',
    body: 'Someone is checking you out nearby...',
    icon: '/le-libido-icon.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon
    })
  );
});
