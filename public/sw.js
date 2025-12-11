const CACHE_NAME = 'webnfc-cache-v1';
const urlsToCache = [
    '/',
    '/offline.html',
    '/vcard',
    '/upi',
    '/read-nfc',
    '/write-nfc',
    '/blog',
    '/logo.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    // NOTE: You should add other important static assets like CSS files,
    // other images, or JS chunks here for a more complete offline experience.
];

// On install, cache the core assets.
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate worker immediately
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and caching core assets');
                return cache.addAll(urlsToCache);
            })
    );
});

// On activate, clean up old caches.
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of all open pages
    );
});

// On fetch, serve from cache first, then network, with an offline fallback.
self.addEventListener('fetch', (event) => {
    // We only want to cache GET requests.
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // If the request is in the cache, return it.
                if (response) {
                    return response;
                }
                // If the request is not in the cache, fetch it from the network.
                return fetch(event.request).catch(() => {
                    // If the network request fails (e.g., user is offline),
                    // return the offline fallback page for navigation requests.
                    if (event.request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});