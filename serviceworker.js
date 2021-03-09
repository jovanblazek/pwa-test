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


const CACHE_NAME = "ehub-pwa-v1";
const assets = [
	"/noInternet.html", 
	"/css/style.css", 
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



/*	WORKING */
/*
const CACHE_NAME = "ehub-pwa-v1";
const assets = ["/", "/index.html", "/css/style.css", "/noInternet.html", "/images/404_orange.png"];
const OFFLINE_URL = "/noInternet.html";

self.addEventListener("install", (installEvent) => {
	installEvent.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", (fetchEvent) => {*/
	/*
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);*/
/*
	fetchEvent.respondWith(
		fetch(fetchEvent.request).catch((error) => {
			// Return the offline page
			console.log("offline pls "+ error);
			return caches.match(OFFLINE_URL);
		})
	);
});
*/
