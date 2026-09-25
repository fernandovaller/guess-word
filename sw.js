// ===== Service Worker: cache offline do jogo =====
// Estratégia: cache-first com atualização em segundo plano — abre instantâneo
// e sem internet; em background a próxima visita renovou os arquivos.
// Ao publicar uma versão nova, bumpa o CACHE (ex.: 'gtw-v2') para invalidar.

const CACHE = 'gtw-v1';

const CORE = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.webmanifest',
  // js (raiz)
  './js/main.js',
  './js/audio.js',
  './js/data.js',
  './js/game.js',
  './js/icons.js',
  './js/stats-service.js',
  './js/storage.js',
  './js/utils.js',
  // js/controllers
  './js/controllers/GameController.js',
  './js/controllers/IntroController.js',
  './js/controllers/MenuController.js',
  './js/controllers/ResultController.js',
  './js/controllers/StatsController.js',
  // js/views
  './js/views/ConfirmDialog.js',
  './js/views/GameView.js',
  './js/views/MenuView.js',
  './js/views/ResultView.js',
  './js/views/ScreenManager.js',
  './js/views/StatsView.js',
  './js/views/images.js',
  // imagens dos temas
  './assets/themes/animais.png',
  './assets/themes/esportes.png',
  './assets/themes/frutas.png',
  './assets/themes/objetos.png',
  './assets/themes/paises.png',
  './assets/themes/profissoes.png',
  // ícones do PWA
  './assets/pwa/icon-192.png',
  './assets/pwa/icon-512.png',
  './assets/pwa/icon-512-maskable.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then((hit) => {
      // Em background: busca a versão nova e renova o cache para a próxima visita
      const refresh = fetch(req)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((cache) => cache.put(req, res.clone()));
          return res;
        })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});