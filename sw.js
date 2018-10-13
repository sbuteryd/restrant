var staticeCacheName = 'app-cache-v1';
// Cache required files
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticeCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/css/restaurant.css',
                '/css/index.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/img/',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
            ]).then(function () {
                console.log('Cached!');
            }).catch(function (error) {
                console.log("No Cached! and error: " + error);
            })
        })
    );
});
// Setting the cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(
                cacheName.filter(function (cacheName) {
                    return cacheName.startsWith('app-cache-') && cacheName != staticeCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );
});

// Setup request
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request , {
            ignoreSearch: true
        }).then(function (response) {
            return response || fetch(event.request);
        })
    )
});
