<template>
  <div class="tasks">
    <div class="topNav">
      <div @click="setActiveTab('all')" class="tab" :class="active_tab === 'all' ? 'active_tab' : ''">All tasks</div>
      <div @click="setActiveTab('person1')" class="tab" :class="active_tab === 'person1' ? 'active_tab' : ''">{{$root.usersOfHousehold[0] || 'User 1'}}</div>
      <div @click="setActiveTab('person2')" class="tab" :class="active_tab === 'person2' ? 'active_tab' : ''">{{$root.usersOfHousehold[1] || 'User 2'}}</div>
    </div>
    <div class="list">
      List
    </div>
    <div class="addTaskBtn">
      Add task button
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  components: {
  },
  created(){
  },
  data(){
    return {
      active_tab: 'all'
    }
  },
  methods:{
    setActiveTab(nameOfTab){
      this.active_tab = nameOfTab
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks {
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.topNav {
  display: flex;
  justify-content: space-around;
  border: 4px solid var(--backgroundColor);
  width: 80%;
  background-color: var(--backgroundColor);
  border-radius: 15px;
  margin-bottom: 15px;
}

.tab {
  width: 100%;
  text-align: center;
  padding: 10px 10px;
  background-color: var(--back-color);
  box-shadow: inset 0px 0px 4px rgba(255, 255, 255, .2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0);
  transition: box-shadow .4s ease;
  cursor: pointer;
  color: rgba(68, 68, 68, 0.4);
  text-shadow: 4px 2px 6px var(--shadowColor), -4px -2px 6px #FFFFFF;
}

.tab:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.tab:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.active_tab {
  box-shadow: inset 3px 3px 7px var(--shadowColor), inset -3px -3px 7px #FFFFFF;
  transition: all 600ms ease;
}

</style>
