const CACHE_NAME = 'le-libido-cache-v3';
const OFFLINE_URL = '/fallback.html';

const FILES_TO_CACHE = [
  '/',
  '/pwa-download.html',
  '/quiz-new.html',
  '/le-libido-icon.png',
  '/fallback.html',
  '/share-icon.png',
  '/golden-le-libido-logo.png',
  '/install-step-1.jpg',
  '/install-step-2.jpg',
  '/install-step-3.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => res || caches.match(OFFLINE_URL))
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