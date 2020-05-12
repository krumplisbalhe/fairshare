<template>
  <div class="bottomNav">
    <div @click="$emit('setNav', 'tasks')">Tasks</div>
    <div @click="$emit('setNav', 'balance')">Balance</div>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: [],
  components: {
  },
  data () {
		return {
		}
  },
}
</script>

<style lang="scss">
.bottomNav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

</style>
