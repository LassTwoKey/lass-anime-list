self.addEventListener('install', function () {
    console.log('Установка сервис-воркера')
})

self.addEventListener('activate', function () {
    console.log('Активация сервис-воркера')
})

self.addEventListener('fetch', function (event) {
    console.log('Перехват запроса: ', event.request.url)
})
