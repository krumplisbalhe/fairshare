<template>
  <div class="tasks">
    <div class="topNav">
      <div @click="setActiveTab('noone')" class="tab" :class="active_tab === 'noone' ? 'active_tab' : ''">Unassigned</div>
      <div @click="setActiveTab('person1')" class="tab" :class="active_tab === 'person1' ? 'active_tab' : ''">{{$root.usersOfHousehold[0] ? $root.usersOfHousehold[0].user_name : 'User 1'}}</div>
      <div @click="setActiveTab('person2')" class="tab" :class="active_tab === 'person2' ? 'active_tab' : ''">{{$root.usersOfHousehold[1] ? $root.usersOfHousehold[1].user_name : 'User 2'}}</div>
    </div>
    <div class="listContainer">
      <div class="listItem" v-for="item in filteredTasks" :key="item.task_id">
        <div class="listItemTopRow">
          <Close @click="$root.deleteTask(item.task_id)"></Close>
          <div v-if="item.assigned_to ===0" @click="assignTaskToUser($root.usersOfHousehold[0].user_id, item)">{{$root.usersOfHousehold[0] ? $root.usersOfHousehold[0].user_name : 'User 1'}}</div>
        </div>
        <div class="listItemMiddleRow">
          <p>{{item.task_name}}</p>
          <Done @click="openTimeWindow(item)" v-if="item.assigned_to !== 0" :class="{done: item.is_done !== 0, undone: item.is_done === 0}"></Done>
        </div>
          <div class="listItemBottomRow">
          <Edit @click="openEditTaskWindow(item)"></Edit>
          <div v-if="item.assigned_to ===0" @click="assignTaskToUser($root.usersOfHousehold[1].user_id, item)">{{$root.usersOfHousehold[1] ? $root.usersOfHousehold[1].user_name : 'User 2'}}</div>
        </div>
      </div>
    </div>
    <div class="addTaskArea">
      <button @click="openNewTaskWindow" class="addTaskButton">
        <Plus></Plus>
      </button>
      <span class="movingCircle1"></span>
      <span class="movingCircle2"></span>
    </div>
    <TaskWindow :editingTask="editingTask" v-if="$root.isNewTaskWindowOpen === true || $root.isEditTaskWindowOpen === true || $root.isAddingTimeWindowOpen" />
  </div>
</template>

<script>
import TaskWindow from '@/components/TaskWindow'
import Plus from '@/assets/icons/plus.svg'
import Close from '@/assets/icons/close.svg'
import Edit from '@/assets/icons/edit.svg'
import Done from '@/assets/icons/done.svg'

export default {
  name: 'Tasks',
  components: {
    TaskWindow,
    Plus,
    Close,
    Edit,
    Done
  },
  created(){
  },
  data(){
    return {
      active_tab: 'noone',
      editingTask: null
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
      this.$root.isNewTaskWindowOpen = true
    },
    openEditTaskWindow(item){
      this.$root.isEditTaskWindowOpen = true
      this.editingTask = item
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
    },
    openTimeWindow(item){
      this.$root.isAddingTimeWindowOpen = true
      this.editingTask = item
    }
    // moveItemToDone(item){
    //   fetch('/api/tasks', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${this.$root.access_token}`
    //   },
    //   body: JSON.stringify({...item, is_done: 1, household_id: this.$root.user.household_id})
    // })
    // .then(res => res.json())
    // .then(res => {
    //   console.log(res)
    //     if(res.code == 1){
    //       this.$root.getTasks()
    //     }
    //     if(res.code == 0){
    //       this.$root.toast = {
    //         message: res.error[0].msg,
    //         icon: "error"
    //       }
    //     }
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }
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
  width: 360px;
  background-color: var(--backgroundColor);
  margin-bottom: 15px;
  height: 40px;

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
    color: var(--grey);
    text-shadow: 4px 2px 6px var(--shadowColor), -4px -2px 6px var(--white);
  }

    &:first-child {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }

    &:last-child {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }

  .active_tab {
    box-shadow: inset 3px 3px 7px var(--shadowColor), inset -3px -3px 7px #FFFFFF;
    transition: all 600ms ease;
  }
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
  height: 80%;
  width: 340px;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 18px;
  overflow-y: scroll;
  box-shadow: inset 1px 1px 1px rgba( var(--color-light), 0.4 ), inset -1px -1px 1px rgba( var(--color-shadow), 0.04 ), inset 0 0 0 2px var(--backgroundColor), inset -2px -2px 2px 2px rgba( var(--color-light), 0.4), inset -4px -4px 4px 2px rgba( var(--color-light), 0.4), -1px -1px 4px 0px rgba( var(--color-light), 0.4), -2px -2px 8px 0px rgba( var(--color-light), 0.4), inset 2px 2px 2px 2px rgba( var(--color-shadow), 0.04), inset 4px 4px 4px 2px rgba( var(--color-shadow), 0.04), 1px 1px 4px 0px rgba( var(--color-shadow), 0.04), 2px 2px 8px 0px rgba( var(--color-shadow), 0.04);
}

.listItem {
  width: 90%;
  margin: 10px;
  padding: 5px;
  border-radius: 18px;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--shadowColor), -0.2rem -0.2rem 0.5rem var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .listItemTopRow, .listItemBottomRow{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  svg{
    width: 10px;
    height: 10px;
  }

  .listItemMiddleRow{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    justify-content: space-between;
  }

    .done, .undone{
      width: 30px;
      height: 30px;
    }

    .done {
      pointer-events: none;
    }

    .done path{
      fill: green;
    }

    .undone {
      cursor: pointer;
    }
    .undone path{
      fill: var(--grey);
    }
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

</style>
