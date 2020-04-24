import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  data: {
    toast: null
  },
  render: h => h(App),
}).$mount('#app')
