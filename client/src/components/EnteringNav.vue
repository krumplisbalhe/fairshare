<template>
  <div class="enteringNav">
    <div class="buttonContainer">
      <button @click="onButtonClick('signup')">
        Sign up
      </button>
      <button @click="onButtonClick('signin')">
        Sign in
      </button>
    </div>
  <div :class="masked ? 'mask' : ''">
    <div class="waveContainer">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
      <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(148, 121, 170, 0.3)" />
      <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(239, 150, 116, 0.3)" />
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
      masked: true
    }
  },
  components: {
  },
  methods: {
    onButtonClick(action){
      this.$emit(action)
      this.masked = false
    }
  }
}
</script>

<style scoped>
.enteringNav {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.enteringNav.signup, .enteringNav.signin{
  height: calc(45vh - 10px);
}

.enteringNav .buttonContainer {
  align-self: flex-end;
}

.enteringNav button {
  margin: 10px;
}

.enteringNav .waveContainer {
  transition: all 0.8s linear;
  position: absolute;
  max-width: var(--appMaxWidth);
  left: 50%;
  transform: translateX(-50%);
}

.mask{
  clip-path: url(#path);
  height: 100vh;
  font-size: 11vh;
}
text{
  font-weight: bold;
}

.enteringNav.signup .waves, .enteringNav.signin .waves {
  height: 15vh;
  transition: all 0.8s linear;
}

.enteringNav.signup .parallax > use:nth-child(5), .enteringNav.signin .parallax > use:nth-child(5) {
  fill: rgba(235, 236, 240, 1);
}

.waves {
  position:relative;
  max-width: var(--appMaxWidth);
  height: 50vh;
  top: 15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
.parallax > use:nth-child(5) {
  animation-delay: -6s;
  animation-duration: 10s;
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
