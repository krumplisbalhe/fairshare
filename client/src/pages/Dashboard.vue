<template>
  <div class="dashboard">
    <div class="header"></div>
    <div class="panel">
      <h1 v-if="activeNav === 'tasks'">task</h1>
      <h1 v-if="activeNav === 'balance'">balance</h1>
    </div>
    <BottomNav @setNav="val => activeNav = val" />
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav'

export default {
  name: 'Dashboard',
  components: {
    BottomNav,
  },
  created(){
		this.getTasks()
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

</style>
