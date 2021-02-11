const staticPhantom = "phantom-budget-app-v1";
const assets = ["/", "/index.html", "/transactions"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticPhantom).then((cache) => {
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
