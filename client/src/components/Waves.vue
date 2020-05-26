<template>
  <div class="waveContainer" :class="$route.path === '/' ? 'highWaves' : ''">
    <svg
      class="waves"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="waving"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="crossing">
        <use xlink:href="#waving" x="48" y="0" fill="var(--classicBlue)" />
        <use xlink:href="#waving" x="48" y="3" fill="var(--paprika)" />
        <use
          xlink:href="#waving"
          x="48"
          y="4"
          fill="rgba(235, 236, 240, 0.3)"
        />
        <use
          xlink:href="#waving"
          x="48"
          y="5"
          fill="rgba(255, 255, 255, 0.3)"
        />
        <use
          xlink:href="#waving"
          x="48"
          y="8"
          fill="rgba(235, 236, 240, 0.3)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Waves'
}
</script>

<style scoped lang="scss">
.waveContainer {
  transition: all 0.8s linear;
  position: absolute;
  width: 100%;
  left: 0;
  pointer-events: none;

  .waves {
    position: relative;
    width: 100%;
    top: 100px;
  }

  .crossing {
    > use {
      animation: waveAnimation 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    }

    > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }

    > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }

    > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }

    > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
    }

    > use:nth-child(5) {
      animation-delay: -6s;
      animation-duration: 10s;
    }
  }
}

@keyframes waveAnimation {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.highWaves {
  bottom: 75px;
  transition: all 0.8s linear;
}
</style>
