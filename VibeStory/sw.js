// Service Worker for VibeStory
const CACHE_NAME = 'vibeStory-v1.0.0';
const STATIC_CACHE = 'vibeStory-static-v1.0.0';
const AUDIO_CACHE = 'vibeStory-audio-v1.0.0';

// 需要缓存的静态资源
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// 音频资源域名
const AUDIO_DOMAINS = [
    'https://www.soundjay.com',
    'https://assets.mixkit.co'
];

// 安装事件
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Failed to cache static assets:', error);
            })
    );
});

// 激活事件
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // 删除旧版本的缓存
                        if (cacheName !== STATIC_CACHE && cacheName !== AUDIO_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// 拦截请求
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // 只处理GET请求
    if (request.method !== 'GET') {
        return;
    }
    
    // 处理静态资源
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(response => {
                            // 缓存成功的响应
                            if (response && response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(STATIC_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        });
                })
        );
        return;
    }
    
    // 处理音频资源
    if (AUDIO_DOMAINS.some(domain => url.href.startsWith(domain))) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(response => {
                            // 只缓存成功的音频响应
                            if (response && response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(AUDIO_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        })
                        .catch(error => {
                            console.warn('Audio fetch failed:', error);
                            // 返回一个空的音频响应，避免页面崩溃
                            return new Response('', {
                                status: 404,
                                statusText: 'Audio not found'
                            });
                        });
                })
        );
        return;
    }
    
    // 处理字体资源
    if (url.href.includes('fonts.googleapis.com') || url.href.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(response => {
                            if (response && response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(STATIC_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        });
                })
        );
        return;
    }
    
    // 其他请求直接通过
    event.respondWith(fetch(request));
});

// 消息处理
self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'CACHE_AUDIO':
            // 预缓存音频文件
            if (data.urls && Array.isArray(data.urls)) {
                event.waitUntil(
                    caches.open(AUDIO_CACHE)
                        .then(cache => {
                            const cachePromises = data.urls.map(url => 
                                fetch(url)
                                    .then(response => {
                                        if (response.ok) {
                                            return cache.put(url, response);
                                        }
                                    })
                                    .catch(error => {
                                        console.warn(`Failed to cache audio: ${url}`, error);
                                    })
                            );
                            return Promise.allSettled(cachePromises);
                        })
                );
            }
            break;
            
        case 'CLEAR_CACHE':
            // 清理缓存
            event.waitUntil(
                caches.keys()
                    .then(cacheNames => {
                        return Promise.all(
                            cacheNames.map(cacheName => caches.delete(cacheName))
                        );
                    })
            );
            break;
            
        case 'GET_CACHE_SIZE':
            // 获取缓存大小
            event.waitUntil(
                caches.keys()
                    .then(cacheNames => {
                        const sizePromises = cacheNames.map(cacheName =>
                            caches.open(cacheName)
                                .then(cache => cache.keys())
                                .then(requests => requests.length)
                        );
                        return Promise.all(sizePromises);
                    })
                    .then(sizes => {
                        event.ports[0].postMessage({
                            type: 'CACHE_SIZE',
                            data: sizes
                        });
                    })
            );
            break;
    }
});

// 后台同步
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // 执行后台同步任务
            console.log('Background sync triggered')
        );
    }
});

// 推送通知
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'VibeStory有新内容！',
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '查看故事',
                icon: '/icon.png'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('VibeStory', options)
    );
});

// 通知点击
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 