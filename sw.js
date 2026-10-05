/* Sahod offline support.
   Change VERSION whenever you upload new files, so phones fetch the new copy. */
const VERSION = "sahod-4";
const SHELL = [
  "./", "index.html", "config.js", "manifest.json",
  "lib/chart.umd.min.js",
  "lib/fonts/bricolage-grotesque-latin-opsz-normal.woff2",
  "lib/fonts/bricolage-grotesque-latin-ext-opsz-normal.woff2",
  "lib/fonts/figtree-latin-wght-normal.woff2",
  "lib/fonts/figtree-latin-ext-wght-normal.woff2",
  "lib/fonts/figtree-latin-wght-italic.woff2",
  "lib/fonts/figtree-latin-ext-wght-italic.woff2",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, {cache: "reload"})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  /* Opening the app: serve the saved copy right away (works offline), refresh it in the background. */
  if (req.mode === "navigate"){
    e.respondWith(caches.open(VERSION).then(async c => {
      const cached = await c.match("index.html");
      const fresh = fetch(req).then(r => { if (r.ok) c.put("index.html", r.clone()); return r; }).catch(() => null);
      return cached || (await fresh) || new Response("Sahod is offline and hasn't been saved on this device yet.", {headers: {"Content-Type": "text/plain"}});
    }));
    return;
  }
  /* config.js: always try the latest from GitHub first, so a new client ID takes effect right away. */
  if (url.pathname.endsWith("/config.js")){
    e.respondWith(caches.open(VERSION).then(c => fetch(req, {cache: "no-store"}).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => c.match(req, {ignoreSearch: true}))));
    return;
  }
  e.respondWith(caches.open(VERSION).then(async c => {
    const cached = await c.match(req, {ignoreSearch: true});
    const fresh = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
    return cached || (await fresh) || Response.error();
  }));
});
