export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register(
                    import.meta.env.PROD
                        ? `${import.meta.env.VITE_PROD_CORE_URL}/service-worker.js`
                        : '/service-worker.js'
                )
                .then((registration) => {
                    console.log(
                        'Сервис-воркер зарегистрирован: ',
                        registration.scope
                    )
                })
                .catch((error) => {
                    console.log('Ошибка регистрации сервис-воркера: ', error)
                })
        })
    }
}
