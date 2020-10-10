import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { RippleDirective } from './directives'
import { unregisterServiceWorker } from './registerServiceWorker'

// Global styles
import './assets/styles/global.scss'

unregisterServiceWorker()

createApp(App)
  .use(store)
  .use(router)
  .directive('ripple', RippleDirective)
  .mount('#app')
