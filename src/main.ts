import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { RippleDirective } from './directives'

// Turn on service-worker later.
// import './registerServiceWorker'

// Global styles
import './assets/styles/global.scss'

createApp(App)
  .use(store)
  .use(router)
  .directive('ripple', RippleDirective)
  .mount('#app')
