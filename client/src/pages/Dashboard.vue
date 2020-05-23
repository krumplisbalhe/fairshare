<template>
  <div class="dashboard">
    <button class="signOut" @click="signOut()">
      Sign out
    </button>
    <div class="brandWavesArea">
      <Waves />
    </div>
    <div class="panel">
      <Tasks v-if="activeNav === 'tasks'"></Tasks>
      <Balance v-if="activeNav === 'balance'"></Balance>
    </div>
    <BottomNav @setNav="val => activeNav = val" />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav'
import Tasks from '@/components/Tasks'
import Balance from '@/components/Balance'
import Waves from '@/components/Waves'

export default {
  name: 'Dashboard',
  components: {
    BottomNav,
    Tasks,
    Balance,
    Waves
  },
  created(){
    this.$root.getTasks(),
    this.$root.getUsersOfHousehold()
  },
  data(){
    return {
      activeNav: 'tasks'
    }
  },
  methods:{
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

  .brandWavesArea {
    height: 10%;
  }

  .waveContainer{
    & .waves {
      height: 5vh;
      top: 20px;
      min-height: auto;
    }

    & .crossing > use:nth-child(5) {
      fill: var(--backgroundColor);
    }
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
    margin: 10px;
    height: 50px;
  }
}
</style>
