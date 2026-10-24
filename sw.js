const C="hs-v4";self.addEventListener("install",()=>self.skipWaiting());self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.hostname.includes("firebaseio")||u.pathname.includes(".lp"))return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==="opaque"){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window"}).then(l=>l[0]?l[0].focus():clients.openWindow("./")))});
