<template>
  <div
    class="animatedButton"
    :class="{
      closingMode: $root.isNewTaskWindowOpen || $root.isEditTaskWindowOpen
    }"
  >
    <button @click="handleTaskWindow" class="addTaskButton">
      <Plus></Plus>
    </button>
    <span class="movingCircle1"></span>
    <span class="movingCircle2"></span>
  </div>
</template>

<script>
import Plus from '@/assets/icons/plus.svg'

export default {
  name: 'AnimatedButton',
  components: {
    Plus
  },
  methods: {
    handleTaskWindow() {
      if (this.$root.isNewTaskWindowOpen || this.$root.isEditTaskWindowOpen) {
        this.$root.isNewTaskWindowOpen = false
        this.$root.isEditTaskWindowOpen = false
      } else {
        this.$root.isNewTaskWindowOpen = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addTaskButton {
  z-index: 2;
  box-shadow: none;
  padding: 5px;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;

  &:hover,
  &:active {
    box-shadow: none;
  }
}

.animatedButton {
  position: relative;
  height: 15%;
  width: 100%;
  justify-self: center;
  display: grid;
  justify-items: center;
  align-items: center;

  &.closingMode {
    z-index: 3;

    .addTaskButton {
      z-index: 4;
    }
  }
}

.movingCircle1,
.movingCircle2 {
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  filter: blur(1px);
}

.movingCircle1 {
  box-shadow: 0.4rem 0.4rem 0.8rem var(--shadowColor), -0.4rem -0.4rem 0.8rem var(--white);
  background: linear-gradient(to bottom right, var(--shadowColor) 0%, var(--white) 100%);
  animation: waves 4s linear infinite;
}

.movingCircle2 {
  box-shadow: 0.4rem 0.4rem 0.8rem var(--shadowColor), -0.4rem -0.4rem 0.8rem var(--white);
  animation: waves 4s linear 6s infinite;
}

@keyframes waves {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animatedButton.closingMode .addTaskButton .icon {
  transform: rotate(45deg);
}
</style>
