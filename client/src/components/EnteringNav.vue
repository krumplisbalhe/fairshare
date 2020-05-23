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
    <Waves />
    <svg width="100%" height="100%">
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

.mask {
  clip-path: url(#path);
  height: 90vh;
  font-size: 11vh;

  text {
  font-weight: bold;
  }
}
</style>
