const CACHE_NAME = 'btc-price-chart-v1';
const urlsToCache = [
    'https://sangraphic.github.io/btc/Untitled-1.html',
    'https://sangraphic.github.io/btc/manifest.json', 
    'https://sangraphic.github.io/btc/icon-192.png',
    'https://sangraphic.github.io/btc/icon-512.png',
    // Add other assets you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
}); 
