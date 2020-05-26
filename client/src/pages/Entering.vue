<template>
  <div class="entering">
    <EnteringNav :class="$route.path.substr(1)"></EnteringNav>
    <div :class="{ hidden: true, fadeIn: $route.path !== '/' }">
      <router-view />
    </div>
  </div>
</template>

<script>
import EnteringNav from '@/components/EnteringNav'

export default {
  name: 'Entering',
  components: {
    EnteringNav
  }
}
</script>

<style lang="scss">
.entering {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hidden {
  opacity: 0;
  transition: all 1s linear;
  transition-delay: 0.3s;
}

.fadeIn {
  opacity: 1;
}
</style>
