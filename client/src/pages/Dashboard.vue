<template>
  <div class="dashboard">
    <div class="date">
      Date
    </div>
    <div class="panel">
      <Tasks v-if="activeNav === 'tasks'"></Tasks>
      <h1 v-if="activeNav === 'balance'">balance</h1>
    </div>
    <BottomNav @setNav="val => activeNav = val" />
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
import Tasks from '../components/Tasks'

export default {
  name: 'Dashboard',
  components: {
    BottomNav,
    Tasks
  },
  created(){
    this.getTasks(),
    this.getUsersOfHousehold()
  },
  data(){
    return {
      activeNav: 'tasks'
    }
  },
  methods:{
    getTasks(){
			fetch(`/tasks?household_id_fk=${this.$root.user.household_id}`, {
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${this.$root.access_token}`
        }
			})
			.then(res => res.json())
			.then(res => {
				console.log(res)
			}).catch(error => {
        console.log(error)
        this.$root.toast = {
            message: 'Problem with authorization.',
            icon: "error"
          }
			})
    },
    getUsersOfHousehold(){
			fetch(`/usersOfHousehold?household_id=${this.$root.user.household_id}`, {
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${this.$root.access_token}`
        }
			})
			.then(res => res.json())
			.then(res => {
        console.log(res.response)
        this.$root.usersOfHousehold = res.response.map(({user_name}) => user_name)
			}).catch(error => {
        console.log(error)
        this.$root.toast = {
            message: 'Problem with getting data.',
            icon: "error"
          }
			})
		},
  }
}
</script>

<style lang="scss">
.dashboard {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 20%;
  width: 100%;
}

.panel {
  height: 70%;
  width: 100%;
}

.bottomNav {
  height: 10%;
  width: 100%;
}

.date {
  height: 20%;
}

</style>
