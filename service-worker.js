const CACHE_NAME = 'btc-cache-v1';
const urlsToCache = [
    '/',
    '/btc/index.html',
    '/btc/manifest.json',
    '/btc/icon-192.png',
    '/btc/icon-512.png',
    '/btc/service-worker.js',
    // Add other assets you want to cache
];

// Install the service worker and cache the specified files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event to serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if available, otherwise fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
