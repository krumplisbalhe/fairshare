<template>
  <transition name="slideDown" appear>
    <div
      v-if="$root.toast"
      class="toast"
      :class="{
        error: $root.toast.icon === 'error',
        success: $root.toast.icon === 'success',
        info: $root.toast.icon === 'info'
      }"
    >
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
  created() {
    setTimeout(
      () => (this.$root.toast = null),
      this.$root.toast.icon === 'info' ? 6000 : 2000
    )
  }
}
</script>

<style lang="scss" scoped>
.toast {
  z-index: 4;
  width: 100%;
  box-sizing: border-box;
  max-width: calc(var(--appMaxWidth) - 20px);
  position: absolute;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  top: 15px;
  box-shadow: -5px -5px 20px var(--white), 5px 5px 20px var(--shadowColor);
  color: var(--backgroundColor);
  padding: 10px;

  &.error {
    background-color: var(--paprika);
  }

  &.success {
    background-color: var(--classicBlue);
  }

  &.info {
    background-color: var(--classicBlue);
  }

  .verticalDivider {
    width: 20px;
    margin-left: 20px;
    height: 70%;
    border-left: 1px solid var(--backgroundColor);
    box-shadow: inset 2px 0 2px -2px var(--shadowColor), inset 2px 0 2px -2px var(--shadowColor);
  }

  p {
    font-size: 14px;
    line-height: 1.4;
    padding-right: 10px;
  }

  svg {
    padding-left: 10px;
    height: 30px;
    width: 30px;
    fill: var(--backgroundColor);
    flex-shrink: 0;

    path {
      fill: var(--backgroundColor);
    }
  }
}

.slideDown-enter-active,
.slideDown-leave-active {
  transform: translateY(0);
  transition: all 0.8s linear;
}

.slideDown-enter,
.slideDown-leave-to {
  transform: translateY(-80px);
  transition: all 0.8s linear;
}
</style>
