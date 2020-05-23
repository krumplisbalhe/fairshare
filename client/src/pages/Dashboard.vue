<template>
  <div class="dashboard">
    <button class="signOut" @click="signOut()">
      Sign out
    </button>
    <div class="date">
      Date
    </div>
    <div class="panel">
      <Tasks v-if="activeNav === 'tasks'"></Tasks>
      <Balance v-if="activeNav === 'balance'">balance</Balance>
    </div>
    <BottomNav @setNav="val => activeNav = val" />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav'
import Tasks from '@/components/Tasks'
import Balance from '@/components/Balance'

export default {
  name: 'Dashboard',
  components: {
    BottomNav,
    Tasks,
    Balance
  },
  created(){
    this.$root.getTasks(),
    this.getUsersOfHousehold()
  },
  data(){
    return {
      activeNav: 'tasks'
    }
  },
  methods:{
    getUsersOfHousehold(){
			fetch(`/api/usersOfHousehold?household_id=${this.$root.user.household_id}`, {
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${this.$root.access_token}`
        }
			})
			.then(res => res.json())
			.then(res => {
        console.log(res.response)
        this.$root.usersOfHousehold = res.response
			}).catch(error => {
        console.log(error)
        this.$root.toast = {
            message: 'Problem with getting data.',
            icon: "error"
          }
			})
    },
    signOut(){
      localStorage.setItem("user_data", '')
      localStorage.setItem("access_token", '')
      this.$router.push('/')
      location.reload()
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .date {
    height: 8%;
  }

  .panel {
    height: 80%;
    width: 100%;
  }

  .signOut {
    margin: 10px;
    font-weight: 500;
    align-self: flex-end;
  }

  .bottomNav {
    margin: 5px;
  }
}

</style>
