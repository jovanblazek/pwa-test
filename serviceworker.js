/*
const CACHE_NAME = "version-1";
const urlsToCache = [ '/noInternet.html', '/css/style.css', '/images/404_orange.png'];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request.url)
            .then(() => {
                return fetch(event.request.url) 
                    .catch(() => caches.match('/noInternet.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});
*/

// This is the "Offline page" service worker
/*
importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "/noInternet.html";

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

self.addEventListener("install", async (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage)));
});

if (workbox.navigationPreload.isSupported()) {
	workbox.navigationPreload.enable();
}

self.addEventListener("fetch", (event) => {
	if (event.request.mode === "navigate") {
		event.respondWith(
			(async () => {
				try {
					const preloadResp = await event.preloadResponse;

					if (preloadResp) {
						return preloadResp;
					}

					const networkResp = await fetch(event.request);
					return networkResp;
				} catch (error) {
					const cache = await caches.open(CACHE);
					const cachedResp = await cache.match(offlineFallbackPage);
					return cachedResp;
				}
			})()
		);
	}
});
*/

self.addEventListener("install", function (event) {
	var offlineRequest = new Request("noInternet.html");
	event.waitUntil(
		fetch(offlineRequest).then(function (response) {
			return caches.open("offline").then(function (cache) {
				console.log("[oninstall] Cached offline page", response.url);
				return cache.put(offlineRequest, response);
			});
		})
	);
});
self.addEventListener("fetch", function (event) {
	var request = event.request;
	if (request.method === "GET") {
		event.respondWith(
			fetch(request).catch(function (error) {
				console.error("[onfetch] Failed. Serving cached offline fallback " + error);
				return caches.open("offline").then(function (cache) {
					return cache.match("noInternet.html");
				});
			})
		);
	}
});
