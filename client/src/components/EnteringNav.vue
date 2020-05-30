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
    <div v-if="$route.path === '/'" class="text">
      <span>WE</span>
      <br />
      <span>LIKE IT</span>
      <br />
      <div class="fullText">
        <span class="equal">EQUAL</span>
      </div>
    </div>
    <Waves />
  </div>
</template>

<script>
import Waves from '@/components/Waves'

export default {
  name: 'Nav',
  components: {
    Waves
  }
}
</script>

<style lang="scss">
.enteringNav {
  height: calc(100vh - 120px);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;

  &.signup,
  &.signin {
    height: 200px;

    .waves {
      top: 100px;
      transition: all 0.8s linear;
    }
  }

  .buttonContainer {
    align-self: flex-end;
    padding-top: 20px;
    padding-right: 10px;
    height: 6vh;
  }

  button {
    margin: 10px;
    font-weight: 500;
  }
}

.text{
  font-weight: bold;
  font-size: 11vh;
  align-self: center;
  text-align: center;
  padding-top: 100px;
  background: linear-gradient(-10deg, var(--backgroundColor) 20%, var(--classicBlue) 45%, var(--backgroundColor) 65%, var(--paprika) 75%);
  background-size: 100% 400%;
  background-clip: text;
  -webkit-text-stroke: 4px transparent;
  color: var(--backgroundColor);
  animation: textAnimation 15s;
  animation-iteration-count: 1;
  height: 50vh;
  width: 100%;
}

.fullText{
  background: var(-backgroundColor);
  background-size: cover;
}

.equal {
  text-align: center;
  color: #fff;
  background-size: 100%;
  background-position: 0%, 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes textAnimation {
  0% {
    background-position: 0% 100%;
  }
  100%{
    background-position: 0% 0%;
  }
}
</style>
