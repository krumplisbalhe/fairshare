<template>
  <div class="dashboard">
    <button class="signOut" @click="signOut()">
      Sign out
    </button>
    <div class="date">
          <div class="waveContainer">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="var(--classicBlue)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="var(--lightBlue)" />
            <use xlink:href="#gentle-wave" x="48" y="4" fill="rgba(235, 236, 240, 0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255, 255, 255, 0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="8" fill="rgba(235, 236, 240, 1)" />
            </g>
            </svg>
          </div>
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
    height: 10%;
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

.waveContainer {
  transition: all 0.8s linear;
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.waves {
  position:relative;
  width: 100%;
  height: 5vh;
  top: 20px;
  margin-bottom:-7px;
  // min-height:100px;
}

.parallax {
  > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
  }

  > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }

  > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }

  > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }

  > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }

  > use:nth-child(5) {
    animation-delay: -6s;
    animation-duration: 10s;
  }
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}

</style>
