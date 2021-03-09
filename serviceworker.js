/*
const CACHE_NAME = "version-1";
const urlsToCache = [ '/noInternet.html', '/css/style.css', '/images/404_orange.png', '/site.webmanifest'];

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

/* global self, caches, URL, fetch */
/*
var TO_CACHE = ["/noInternet.html", "/images/404_orange.png"];
var FALLBACKS = { "/index.html": "/noInternet.html" };
var CACHE_NAME = "assets-cache-v1";

self.addEventListener("install", function (event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(TO_CACHE);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			var pathname = new URL(event.request.url).pathname;

			if (response) {
				console.log("serving from cache: ", pathname);
				return response;
			}

			var fallbackUrl = FALLBACKS[pathname];
			if (fallbackUrl) {
				console.log("serving fallback: ", pathname);
				return caches.match(fallbackUrl);
			}

			if (true) {
				// fetch from server
				return fetch(event.request);
			}
		})
	);
});
*/

const CACHE_NAME = "ehub-pwa-v1";
//const assets = ["/", "/index.html", "/css/style.css", "/noInternet.html", "/images/404_orange.png"];
const assets = [
	"/",
	"/css/style.css", 
	"/noInternet.html", 
	"/images/404_orange.png",
	"/images/icons/android-chrome-36x36.png",
	"/images/icons/android-chrome-48x48.png",
	"/images/icons/android-chrome-72x72.png",
	"/images/icons/android-chrome-144x144.png",
	'/site.webmanifest', 
	"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
];
const OFFLINE_URL = "noInternet.html";

self.addEventListener("install", (event) => {
	console.log("Attempting to install service worker and cache static assets");
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", (event) => {
	// request.mode = navigate isn't supported in all browsers
	// so include a check for Accept: text/html header.
	if (
		event.request.mode === "navigate" ||
		(event.request.method === "GET" &&
			event.request.headers.get("accept").includes("text/html"))
	) {
		event.respondWith(
			fetch(event.request.url).catch((error) => {
				// Return the offline page
				return caches.match(OFFLINE_URL);
			})
		);
	} else {
		// Respond with everything else if we can
		event.respondWith(
			caches.match(event.request).then(function (response) {
				return response || fetch(event.request);
			})
		);
	}
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

/*	WORKING

const CACHE_NAME = "ehub-pwa-v1";
const assets = ["/", "/index.html", "/css/style.css", "/noInternet.html", "/images/404_orange.png"];

self.addEventListener("install", (installEvent) => {
	installEvent.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);
});
*/
