const CACHE_NAME = 'linknet-cache-v6'; // 🔥 troque o número sempre que atualizar
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',

  // CSS / JS (se existirem separados)
  // '/style.css',
  // '/script.js',

  // Imagens principais
  '/images/favicon.png',
  '/images/banner-linknet.jpg',
  '/images/fundo-site.jpg',
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg'
];

/* =============================
   INSTALAÇÃO
============================= */
self.addEventListener('install', event => {
  self.skipWaiting(); // força nova versão
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

/* =============================
   ATIVAÇÃO (limpa cache antigo)
============================= */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* =============================
   FETCH (offline first)
============================= */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match('/index.html')
        )
      );
    })
  );
});




