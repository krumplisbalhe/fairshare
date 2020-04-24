<template>
  <div class="enteringNav">
    <div class="buttonContainer">
      <button @click="$emit('signup')">
        Sign up
      </button>
      <button @click="$emit('signin')">
        Sign in
      </button>
    </div>
<!--Waves Container-->
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
      <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
      <use xlink:href="#gentle-wave" x="48" y="8" fill="rgba(235, 236, 240, 0.3)" />
      </g>
      </svg>
    </div>
<!--Waves end-->
  <div class="textContainer">
    <svg xmlns="http://www.w3.org/2000/svg">
      <clipPath id="path">
        <text alignment-baseline="hanging" x="180" y="20">We like</text>
        <text alignment-baseline="hanging" x="180" y="90">it equal</text>
      </clipPath>
    </svg>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  components: {
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
  height: 50vh;
}

.enteringNav .buttonContainer {
  align-self: flex-end;
}

.enteringNav button {
  margin: 10px;
}

.enteringNav .waveContainer {
  margin-top: 70%;
  transition: all 0.8s linear;
  position: absolute;
  max-width: 100vw;
  clip-path: url(#path);
  left: 50%;
  transform: translateX(-50%);
}

.enteringNav.signup .waveContainer, .enteringNav.signin .waveContainer {
  margin-top: 25vh;
  clip-path: none;
}

.enteringNav.signup .waves, .enteringNav.signin .waves {
  height: 15vh;
}

.enteringNav.signup .parallax > use:nth-child(5), .enteringNav.signin .parallax > use:nth-child(5) {
  fill: rgba(235, 236, 240, 1);
}

.waves {
  position:relative;
  max-width: 100vw;
  height: 25vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
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

#path text {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20vw;
  text-anchor: middle;
}
</style>
