<template>
  <div class="dashboard">
    <div v-if="$root.usersOfHousehold.length === 1" class="missingHousehold">
      <AddUser />
      <p>Please sign up your household partner before starting using the app</p>
      <p class="smallerText">
        Use the household ID: {{ $root.usersOfHousehold[0].household_id }}
      </p>
    </div>
    <button
      class="signOut"
      :class="{ layerUp: $root.usersOfHousehold.length === 1 }"
      @click="signOut()"
    >
      Sign out
    </button>
    <div class="brandWavesArea">
      <Waves />
    </div>
    <div class="panel">
      <Tasks v-if="activeNav === 'tasks'"></Tasks>
      <Balance v-if="activeNav === 'balance'"></Balance>
    </div>
    <BottomNav
      :class="{ disabled: $root.usersOfHousehold.length === 1 }"
      @setNav="val => (activeNav = val)"
    />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav'
import Tasks from '@/components/Tasks'
import Balance from '@/components/Balance'
import Waves from '@/components/Waves'
import AddUser from '@/assets/icons/addUser.svg'

export default {
  name: 'Dashboard',
  components: {
    BottomNav,
    Tasks,
    Balance,
    Waves,
    AddUser
  },
  created() {
    this.$root.getTasks(), this.$root.getUsersOfHousehold()
  },
  data() {
    return {
      activeNav: 'tasks'
    }
  },
  methods: {
    signOut() {
      localStorage.setItem('user_data', '')
      localStorage.setItem('access_token', '')
      this.$router.push('/')
      location.reload()
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .brandWavesArea {
    height: 10vh;
  }

  .waveContainer {
    & .waves {
      height: 5vh;
      top: 25px;
      min-height: auto;
    }

    & .crossing > use:nth-child(5) {
      fill: var(--backgroundColor);
    }
  }

  .panel {
    height: calc(90vh - (54px + 50px));
    width: 100%;
  }

  .signOut {
    margin: 10px;
    font-weight: 500;
    align-self: flex-end;

    &.layerUp {
      z-index: 5;
    }
  }

  .bottomNav {
    margin: 10px;
    height: 50px;
  }
}

.missingHousehold {
  position: absolute;
  background-color: black;
  opacity: 0.8;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    width: 120px;
    height: 120px;
    margin-bottom: 22px;

    path {
      fill: var(--paprika);
      stroke: black;
      stroke-width: 5px;
    }
  }

  p {
    color: var(--backgroundColor);
    width: 70%;
    text-align: center;
    font-size: 19px;
    line-height: 1.2;
  }

  .smallerText {
    color: var(--paprika);
  }
}
</style>
