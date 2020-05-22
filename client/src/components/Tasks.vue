<template>
  <div class="tasks">
    <div class="topNav">
      <div @click="setActiveTab('noone')" class="tab" :class="active_tab === 'noone' ? 'active_tab' : ''">All tasks</div>
      <div @click="setActiveTab('person1')" class="tab" :class="active_tab === 'person1' ? 'active_tab' : ''">{{$root.usersOfHousehold[0] ? $root.usersOfHousehold[0].user_name : 'User 1'}}</div>
      <div @click="setActiveTab('person2')" class="tab" :class="active_tab === 'person2' ? 'active_tab' : ''">{{$root.usersOfHousehold[1] ? $root.usersOfHousehold[1].user_name : 'User 2'}}</div>
    </div>
    <div class="listContainer">
      <div class="listItem" v-for="item in filteredTasks" :key="item.task_id">
        <div class="indicator" :class="item.is_done === 1 ? 'done' : ''"></div>
        <div @click="assignTaskToUser($root.usersOfHousehold[0].user_id, item)">{{$root.usersOfHousehold[0] ? $root.usersOfHousehold[0].user_name : 'User 1'}}</div>
        <div class="pillMiddle">
          <p>{{item.task_name}}</p>
          <p>Edit</p>
        </div>
        <div @click="assignTaskToUser($root.usersOfHousehold[1].user_id, item)">{{$root.usersOfHousehold[1] ? $root.usersOfHousehold[1].user_name : 'User 2'}}</div>
      </div>
    </div>
    <div class="addTaskArea">
      <button @click="openNewTaskWindow" class="addTaskButton">+</button>
      <span class="movingCircle1"></span>
      <span class="movingCircle2"></span>
    </div>
    <NewTaskWindow v-if="$root.isnewTaskWindowOpen === true" />
  </div>
</template>

<script>
import NewTaskWindow from '@/components/NewTaskWindow'

export default {
  name: 'Tasks',
  components: {
    NewTaskWindow,
  },
  created(){
  },
  data(){
    return {
      active_tab: 'noone'
    }
  },
  computed:{
    filteredTasks(){
      if(this.active_tab === 'noone'){
        return this.$root.tasks.filter(e => e.assigned_to === 0)
      }
      if(this.active_tab === 'person1'){
        return this.$root.tasks.filter(e => e.assigned_to === this.$root.usersOfHousehold[0].user_id)
      }
      if(this.active_tab === 'person2' && this.$root.usersOfHousehold[1]){
        return this.$root.tasks.filter(e => e.assigned_to === this.$root.usersOfHousehold[1].user_id)
      }
      return ''
    }
  },
  methods: {
    setActiveTab(nameOfTab){
      this.active_tab = nameOfTab
    },
    openNewTaskWindow(){
      this.$root.isnewTaskWindowOpen = true
    },
    assignTaskToUser(user_id, task){
      fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$root.access_token}`
        },
        body: JSON.stringify({
          ...task,
          assigned_to: user_id,
          household_id: this.$root.user.household_id
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
          if(res.code == 1){
            this.$root.toast = {
              message: "successfully changed task",
              icon: "error"
            }
            this.$root.getTasks()
          }
          if(res.code == 0){
            this.$root.toast = {
              message: res.error[0].msg,
              icon: "error"
            }
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks {
  height: 100%;
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
  height: 40px;
}

.tab {
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px 10px;
  background-color: var(--back-color);
  box-shadow: inset 0px 0px 4px rgba(255, 255, 255, .2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0);
  transition: box-shadow .4s ease;
  cursor: pointer;
  color: rgba(68, 68, 68, 0.4);
  text-shadow: 4px 2px 6px var(--shadowColor), -4px -2px 6px #FFFFFF;
}

.tab:first-child {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.tab:last-child {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.active_tab {
  box-shadow: inset 3px 3px 7px var(--shadowColor), inset -3px -3px 7px #FFFFFF;
  transition: all 600ms ease;
}

.addTaskArea {
  position: relative;
  height: 20%;
  width: 100%;
  justify-self: center;
  display: grid;
  justify-items: center;
  align-items: center;
}

.addTaskButton {
  z-index: 3;
  box-shadow: none;
  padding: 5px;
  border-radius: 50%;
  width: 25px;
  height: 25px;

  &:hover, &:active {
    box-shadow: none;
  }
}

.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 80%;
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 18px;
  overflow-y: scroll;
  box-shadow: inset 1px 1px 1px rgba( var(--color-light), 0.4 ), inset -1px -1px 1px rgba( var(--color-shadow), 0.04 ), inset 0 0 0 2px var(--backgroundColor), inset -2px -2px 2px 2px rgba( var(--color-light), 0.4), inset -4px -4px 4px 2px rgba( var(--color-light), 0.4), -1px -1px 4px 0px rgba( var(--color-light), 0.4), -2px -2px 8px 0px rgba( var(--color-light), 0.4), inset 2px 2px 2px 2px rgba( var(--color-shadow), 0.04), inset 4px 4px 4px 2px rgba( var(--color-shadow), 0.04), 1px 1px 4px 0px rgba( var(--color-shadow), 0.04), 2px 2px 8px 0px rgba( var(--color-shadow), 0.04);
}

.indicator {
  position: absolute;
  width: 100px;
  height: 6px;
  background-color: green;
  border-radius: 25px;
  top: 6px;
  left: calc(50% - 50px);

  &.done {
    background-color: rgb(132, 175, 132);
  }

  &.expired {
    background-color: rgb(212, 119, 119);
  }
}

.listItem {
  width: 90%;
  margin: 10px;
  padding: 5px;
  border-radius: 18px;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--shadowColor), -0.2rem -0.2rem 0.5rem var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.movingCircle1, .movingCircle2 {
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  filter: blur(1px);
}

.movingCircle1 {
  box-shadow: .4rem .4rem .8rem var(--shadowColor), -.4rem -.4rem .8rem var(--white);
  background: linear-gradient(to bottom right, var(--shadowColor) 0%, var(--white) 100%);
  animation: waves 4s linear infinite;
  }

.movingCircle2 {
  box-shadow: .4rem .4rem .8rem var(--shadowColor), -.4rem -.4rem .8rem var(--white);
  animation: waves 4s linear 6s infinite;
}

@keyframes waves {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.pillMiddle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
