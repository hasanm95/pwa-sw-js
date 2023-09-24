
function main(workbox) {
    const {
      cacheableResponse: { CacheableResponsePlugin },
      core: { clientsClaim },
      expiration: { ExpirationPlugin },
      precaching: { cleanupOutdatedCaches },
      routing: { registerRoute },
      strategies: { NetworkFirst },
    } = workbox;
  
    console.log("service worker", registerRoute)
  
    clientsClaim();
  
    self.skipWaiting();
  
    cleanupOutdatedCaches();
  
    registerRoute(
      ({ request }) => request.mode === "navigate",
      new NetworkFirst({
        cacheName: "pages",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      })
    );
  
    registerRoute(
      ({ request }) => ["script", "style"].includes(request.destination),
      new NetworkFirst({
        cacheName: "static-resources",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      })
    );
  
    registerRoute(
      ({ request }) => request.destination === "image",
      new NetworkFirst({
        cacheName: "image-cache",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      })
    );
  
    registerRoute(
      ({ url }) =>
        url.origin === self.location.origin &&
        url.pathname.startsWith("/_next/static/"),
      new NetworkFirst({
        cacheName: "static-caches",
      })
    );
  }
  
  if (typeof importScripts === "function") {
    importScripts(
      "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
    );
      console.log("==>", workbox)
    if (workbox) {
      main(workbox);
    }
  }
