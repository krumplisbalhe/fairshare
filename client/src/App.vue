<template>
  <div id="app">
    <Toast v-if="$root.toast" />
    <router-view />
  </div>
</template>

<script>
import Toast from './components/Toast'

export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>

<style lang="scss">
@import "./assets/global.scss";

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: var(--appMaxWidth);
  margin: auto;
}
</style>
