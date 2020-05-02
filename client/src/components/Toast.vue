<template>
  <transition name="slideDown" appear>
    <div v-if="$root.toast" class="toast">
      <Error v-if="$root.toast.icon === 'error'" />
      <div class="verticalDivider"></div>
      <p>{{ $root.toast.message }}</p>
    </div>
  </transition>
</template>

<script>
import Error from '../assets/icons/error.svg'

export default {
  name: 'Toast',
  components: {
    Error,
  },
  methods:{
  },
  data() {
    return {
    }
  },
  created() {
    setTimeout(() => this.$root.toast = null, 2500)
  }
}
</script>

<style>
.toast{
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  background-color: var(--colorOrange);
  top: 15px;
  box-shadow: -5px -5px 20px var(--white),  5px 5px 20px var(--shadowColor);
}

.toast svg{
  padding-left: 20px;
  height: 30px;
}

.toast .verticalDivider {
  width: 20px;
  margin-left: 20px;
  height: 70%;
  border-left: 1px solid var(--actionTextColor);
  box-shadow: inset 2px 0px 2px -2px var(--shadowColor), inset 2px 0px 2px -2px var(--shadowColor);

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
