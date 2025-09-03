const CACHE_NAME = "lista-tarefas-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Instala o service worker e faz cache dos arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta requisições e retorna do cache se offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
});
