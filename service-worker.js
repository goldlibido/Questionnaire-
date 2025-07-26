const CACHE_NAME = 'le-libido-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/pwa-download.html',
        '/quiz-new.html',
        '/le-libido-icon.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) =>
      res || fetch(event.request)
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