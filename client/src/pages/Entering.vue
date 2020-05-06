<template>
  <div class="entering">
    <EnteringNav @signin="tab='signin'" @signup="tab='signup'" :class="tab"></EnteringNav>
    <div :class="{hidden: true, swimIn: tab}">
      <Signin v-if="tab==='signin'"></Signin>
      <Signup v-if="tab==='signup'"></Signup>
    </div>
  </div>
</template>

<script>
import EnteringNav from '../components/EnteringNav'
import Signin from '../components/Signin'
import Signup from '../components/Signup'

export default {
  name: 'Entering',
  data(){
    return {
      tab: ''
    }
  },
  components: {
    EnteringNav,
    Signin,
    Signup
  }
}
</script>

<style>
.entering {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hidden{
  opacity: 0;
  transition: all 1s linear;
  transition-delay: 0.3s;
}

.swimIn{
  opacity: 1;
}
</style>
