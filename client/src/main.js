import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chart from 'vue2-frappe'

Vue.config.productionTip = false

Vue.use(Chart)

new Vue({
  data: {
    user: '',
    tasks: [],
    access_token: '',
    toast: null,
    usersOfHousehold: [],
    isNewTaskWindowOpen: false,
    isEditTaskWindowOpen: false,
    isAddingTimeWindowOpen: false
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user_data') || '{}')
    this.access_token = localStorage.getItem('access_token')
    console.log(this.user, this.access_token)
  },
  methods: {
    getTasks() {
      fetch(`/api/tasks?household_id_fk=${this.user.household_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.access_token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.code === 1) {
            this.tasks = res.response
          }
        })
        .catch(error => {
          console.log(error)
          this.toast = {
            message: 'Problem with authorization.',
            icon: 'error'
          }
        })
    },
    deleteTask(id) {
      fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.access_token}`
        },
        body: JSON.stringify({
          task_id: id,
          household_id: this.user.household_id
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.code === 1) {
            this.getTasks()
          }
        })
        .catch(error => {
          console.log(error)
          this.toast = {
            message: 'Problem with deleting task.',
            icon: 'error'
          }
        })
    },
    getUsersOfHousehold() {
      fetch(`/api/usersOfHousehold?household_id=${this.user.household_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.access_token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.code === 1) {
            this.$root.usersOfHousehold = res.response
          }
        })
        .catch(error => {
          console.log(error)
          this.$root.toast = {
            message: 'Problem with getting data.',
            icon: 'error'
          }
          this.$router.push('/')
          location.reload()
        })
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
