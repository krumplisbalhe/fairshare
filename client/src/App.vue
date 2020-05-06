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

<style>
@import './assets/global.css';
#app{
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  max-width: var(--appMaxWidth);
  margin: auto;
}
</style>
