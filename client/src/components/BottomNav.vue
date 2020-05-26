<template>
  <div class="bottomNav">
    <div @click="setNavActive('tasks')" class="bottomTab left" :class="active === 'tasks' ? 'active' : ''">
      <p>Tasks</p>
    </div>
    <div @click="setNavActive('balance')" class="bottomTab right" :class="active === 'balance' ? 'active' : ''">
      <p>Balance</p>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  data () {
		return {
      active: 'tasks'
		}
  },
  methods:{
    setNavActive(nameOfNav){
      this.$emit('setNav', nameOfNav)
      this.active = nameOfNav
    }
  }
}
</script>

<style lang="scss" scoped>
.bottomNav {
  width: 360px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .bottomTab{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 80%;

    &.right.active ~ hr {
      margin-left: calc(25% - 5px);
    }

    &.left.active ~ hr {
      margin-left: calc(-25% + 5px);
    }

    p{
      text-align: center;
      font-size: 15px;
      color: var(--actionTextColor);
    }
  }

  hr {
    bottom: 10px;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    position: absolute;
    margin: 0;
    background: var(--paprika);
    border: none;
    transition: var(--transition);
    box-shadow: 0 0 10px var(--paprika);
  }

  &.disabled{
    pointer-events: none;
  }
}
</style>
