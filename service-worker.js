var cacheName = 'cache_version_1';
var cacheFiles = [
   '/',
   'index.html',
   './css/modern-business.css',
   './font-awesome/css/font-awesome.min.css',
   './font-awesome/fonts/FontAwesome.otf',
   './font-awesome/fonts/fontawesome-webfont.eot',
   './font-awesome/fonts/fontawesome-webfont.svg',
   './font-awesome/fonts/fontawesome-webfont.ttf',
   './font-awesome/fonts/fontawesome-webfont.woff',
   './img/img-0.png',
   './img/no-internet.png',
   './img/pwa.png',
   './img/service-worker.png',
   './img/web-app.jpeg',
   './img/addtohomescreen.jpg',
   './img/apicall.jpg',
   './img/gooffline.png',
   './img/homescreen.jpg',
   './img/homescreenprompt.png',
   './img/offlineapicall.jpg'
];
self.addEventListener('install',function(e){
   console.log("[Service Worker] Installed");
   e.waitUntil(
       caches.open(cacheName).then(function(cache){
           console.log("[ServiceWorker] Caching cacheFiles");
           cache.addAll(cacheFiles);
       }).then(function() {
           return self.skipWaiting();
     })
   )
})

self.addEventListener('activate', function(e){
   console.log("[Service Worker] Activated");
   e.waitUntil(
    caches.keys().then(function(cacheNames){
     return Promise.all(cacheNames.map(function(thisCacheName){
     if(thisCacheName != cacheName)
     {
      console.log("[Service Worker] Removing Cached Files from", thisCacheName);
      return caches.delete(thisCacheName);
     }
     }))
     }).then(function(){
       return self.clients.claim();
     })
   )
})

self.addEventListener('fetch',function(e){
   console.log("[Service Worker] Fetching REQUEST URL",e. request.url);
   e.respondWith(
   caches.match(e.request).then(function(resp) {
       console.log("Response from Cache",resp)
       return resp || fetch(e.request)
       .then(function(response) {
           return caches.open(cacheName).then(function(cache)
           {
            cache.put(e.request,response.clone());
            return response;
           });  
      });
   })
   .catch(function() {
     return console.log("Error Fallback");
   })
 );
})

self.addEventListener('push',function(e){
   // console.log("[Service Worker] Push ",e. request.url);
   fetch("https://api.myjson.com/bins/e5b7j").then(function(response){
      return response.json();
   }).then(function(data){
      console.log("DATA",data.data);
      return self.registration.showNotification(data.data.title,{
         body: data.data.body,
         tag: data.data.tag,
         data: {url: data.data.url}
      });
   });
 })

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});

