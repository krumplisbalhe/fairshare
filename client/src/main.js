import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  data: {
    user: '',
    access_token: '',
    toast: null
  },
  render: h => h(App),
}).$mount('#app')
