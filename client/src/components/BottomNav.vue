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
  props: [],
  components: {
  },
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
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 4px 2px 12px rgba(136, 165, 191, 0.48), -4px -2px 12px #FFFFFF;

  .bottomTab{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    height: 80%;
    width: 50%;

    &.right.active ~ hr {
      margin-left: 25%;
    }

    &.left.active ~ hr {
      margin-left: -25%;
    }

    p{
      width: 30%;
      text-align: center;
      font-size: 15px;
      color: var(--grey);
      text-shadow: 4px 2px 6px var(--shadowColor), -4px -2px 6px #FFFFFF;
    }
  }

  hr {
    height: 4px;
    bottom: 5px;
    position: absolute;
    width: 25%;
    margin: 0;
    background: var(--lightBlue);
    border: none;
    transition: .3s ease-in-out;
    box-shadow: 0 0 10px var(--lightBlue);

  }
}
</style>
