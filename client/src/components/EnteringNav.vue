<template>
  <div class="enteringNav">
    <div class="buttonContainer">
      <router-link to="/signup">
        <button>
          Sign up
        </button>
      </router-link>
      <router-link to="/signin">
        <button>
          Sign in
        </button>
      </router-link>
    </div>
  <div :class="$route.path === '/' ? 'mask' : ''">
    <div class="waveContainer">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
      <use xlink:href="#gentle-wave" x="48" y="0" fill="var(--classicBlue)" />
      <use xlink:href="#gentle-wave" x="48" y="3" fill="var(--lightBlue)" />
      <use xlink:href="#gentle-wave" x="48" y="4" fill="rgba(235, 236, 240, 0.3)" />
      <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255, 255, 255, 0.3)" />
      <use xlink:href="#gentle-wave" x="48" y="8" fill="rgba(235, 236, 240, 0.3)" />
      </g>
      </svg>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <clipPath id="path" text-anchor="middle">
        <text x="50%" y="30%">
          WE
        </text>
        <text x="50%" y="42%">
          LIKE IT
        </text>
        <text x="50%" y="54%">
          EQUAL
        </text>
      </clipPath>
    </svg>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data(){
    return {
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.enteringNav {
  height: 100%;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  &.signup, &.signin {
    height: calc(45vh - 10px);

    .waves {
      height: 13vh;
      transition: all 0.8s linear;
    }

    .parallax > use:nth-child(5) {
      fill: rgba(235, 236, 240, 1);
    }
  }

  .buttonContainer {
    align-self: flex-end;
    padding-top: 20px;
    padding-right: 10px;
  }

  button {
    margin: 10px;
    font-weight: 500;
  }
}

.waveContainer {
  transition: all 0.8s linear;
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.mask {
  clip-path: url(#path);
  height: 90vh;
  font-size: 11vh;
}

text {
  font-weight: bold;
}

.waves {
  position:relative;
  width: 100%;
  height: 50vh;
  top: 15vh;
  margin-bottom:-7px;
  min-height:100px;
}

.parallax {
  > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
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

@keyframes move-forever {
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
</style>
