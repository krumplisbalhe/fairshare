<template>
  <div class="bottomNav">
    <div @click="setNavActive('tasks')" class="tab btn left" :class="active === 'tasks' ? 'active' : ''">
      <p>Tasks</p>
    </div>
    <div @click="setNavActive('balance')" class="tab btn right" :class="active === 'balance' ? 'active' : ''">
      <p>Balance</p>
    </div>
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 4px 2px 12px rgba(136, 165, 191, 0.48), -4px -2px 12px #FFFFFF;
}

.tab{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
  width: 50%;
  &.left{
    border-bottom-left-radius: 16px;
  }
  &.right{
    border-bottom-right-radius: 16px;
  }
  p{
    font-size: 15px;
    color: rgba(68, 68, 68, 0.4);
    text-shadow: 4px 2px 6px var(--shadowColor), -4px -2px 6px #FFFFFF;
  }
}

.btn.active{
  box-shadow: inset 3px 3px 7px var(--shadowColor), inset -3px -3px 7px #FFFFFF;
  transition: all 0.3s ease-in-out;
}
</style>
