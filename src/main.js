import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuesax from 'vuesax'
import 'boxicons'
import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax, {
  colors: {
    primary:'#FF8577',
    secondary: "#f2f2f2",
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
