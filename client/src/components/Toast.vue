<template>
  <transition name="slideDown" appear>
    <div v-if="$root.toast" class="toast" :class="{error: $root.toast.icon === 'error', success: $root.toast.icon === 'success', info: $root.toast.icon === 'info'}">
      <Error v-if="$root.toast.icon === 'error'" />
      <Success v-if="$root.toast.icon === 'success'" />
      <Info v-if="$root.toast.icon === 'info'" />
      <div class="verticalDivider"></div>
      <p>{{ $root.toast.message }}</p>
    </div>
  </transition>
</template>

<script>
import Error from '@/assets/icons/error.svg'
import Success from '@/assets/icons/tick.svg'
import Info from '@/assets/icons/info.svg'

export default {
  name: 'Toast',
  components: {
    Error,
    Success,
    Info
  },
  methods:{
  },
  data() {
    return {
    }
  },
  created() {
    setTimeout(() => this.$root.toast = null, this.$root.toast.icon === 'info' ? 20000 : 2500)
  }
}
</script>

<style lang="scss">
.toast {
  z-index: 4;
  position: absolute;
  width: var(--appMaxWidth);
  height: 55px;
  display: flex;
  align-items: center;
  top: 15px;
  box-shadow: -5px -5px 20px var(--white),  5px 5px 20px var(--shadowColor);

  &.error{
    background-color: var(--colorOrange);
  }

  &.success{
    background-color: green;
  }

  &.info{
    background-color: var(--lightBlue);
  }

  .verticalDivider {
    width: 20px;
    margin-left: 20px;
    height: 70%;
    border-left: 1px solid var(--actionTextColor);
    box-shadow: inset 2px 0px 2px -2px var(--shadowColor), inset 2px 0px 2px -2px var(--shadowColor);
  }

  p {
    font-size: 14px;
    color: var(--actionTextColor);
  }

  svg {
    padding-left: 20px;
    height: 30px;
  }
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
