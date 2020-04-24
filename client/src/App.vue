<template>
  <div id="app">
    <Toast v-if="$root.toast" />
    <Entering></Entering>
  </div>
</template>

<script>
import Entering from './pages/Entering'
import Toast from './components/Toast'

export default {
  name: 'App',
  components: {
    Entering,
    Toast
  }
}
</script>

<style>
@import './assets/global.css';
</style>
