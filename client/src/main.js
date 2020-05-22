import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  data: {
    user: '',
    tasks: [],
    access_token: '',
    toast: null,
    usersOfHousehold: [],
    isnewTaskWindowOpen: false
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.access_token = localStorage.getItem('access_token');
    console.log(this.user, this.access_token)
  },
  methods: {
    getTasks(){
			fetch(`/api/tasks?household_id_fk=${this.user.household_id}`, {
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${this.access_token}`
        }
			})
			.then(res => res.json())
			.then(res => {
        console.log(res)
				this.tasks = res.response
			}).catch(error => {
        console.log(error)
        this.toast = {
            message: 'Problem with authorization.',
            icon: "error"
          }
			})
    }
  },
  router,
  render: h => h(App),
}).$mount('#app')
