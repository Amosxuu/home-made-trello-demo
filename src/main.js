import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DeleteBtn from './components/DeleteBtn.vue'
import NavBar from '@/components/NavBar.vue'

Vue.component('DeleteBtn',DeleteBtn)
Vue.component('NavBar',NavBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
