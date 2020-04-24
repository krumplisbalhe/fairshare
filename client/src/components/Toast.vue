<template>
  <transition name="slideDown" appear>
    <div v-if="$root.toast" class="toast">
      <div></div>
      <p>{{ $root.toast.message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  components: {
  },
  methods:{
  },
  data() {
    return {
    }
  },
  created() {
    setTimeout(() => this.$root.toast = null, 4000)
  }
}
</script>

<style>
.toast{
  z-index: 2;
  position: absolute;
  width: 200px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--shadowColor), -0.2rem -0.2rem 0.5rem var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--backgroundColor)
}

.toast p{
  font-size: 14px;
  color: var(--actionTextColor);
}

.slideDown-enter-active, .slideDown-leave-active {
  transform: translateY(0px);
  transition: all 0.8s linear;
}

.slideDown-enter, .slideDown-leave-to {
  transform: translateY(-80px);
  transition: all 0.8s linear;
}
</style>
