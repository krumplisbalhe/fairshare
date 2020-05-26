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
      WE
      <br />
      LIKE IT
      <br />
      EQUAL
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
  height: calc(100% - 20px);
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
      transition: all 0.8s linear;
    }

    .crossing > use:nth-child(5) {
      fill: var(--backgroundColor);
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

.text{
  font-weight: bold;
  font-size: 11vh;
  align-self: center;
  text-align: center;
  padding-top: 100px;
}
</style>
