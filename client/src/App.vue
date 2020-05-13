<template>
  <div id="app">
    <Toast v-if="$root.toast" />
    <Entering v-if="!$root.user"></Entering>
    <Dashboard v-if="$root.user"></Dashboard>
  </div>
</template>

<script>
import Entering from './pages/Entering'
import Toast from './components/Toast'
import Dashboard from './pages/Dashboard'

export default {
  name: 'App',
  components: {
    Entering,
    Toast,
    Dashboard
  }
}
</script>

<style lang="scss">
@import './assets/global.css';
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: var(--appMaxWidth);
  margin: auto;
  border-radius: 18px;
  box-shadow: 4px 2px 16px var(--shadowColor), -4px -2px 16px var(--white);
}
</style>
