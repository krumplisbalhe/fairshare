<template>
  <div class="tasks">
    <div class="topNav">
      <div @click="setActiveTab('noone')" class="tab noone" :class="active_tab === 'noone' ? 'active_tab' : ''">Unassigned</div>
      <div @click="setActiveTab('person1')" class="tab person1" :class="active_tab === 'person1' ? 'active_tab' : ''">{{$root.usersOfHousehold[0] ? $root.usersOfHousehold[0].user_name : 'User 1'}}</div>
      <div @click="setActiveTab('person2')" class="tab person2" :class="active_tab === 'person2' ? 'active_tab' : ''">{{$root.usersOfHousehold[1] ? $root.usersOfHousehold[1].user_name : 'User 2'}}</div>
      <hr />
    </div>
    <transition-group class="listContainer" name="taskItemsAnimation" tag="div" mode="out-in">
      <div class="listItem" v-for="item in filteredTasks" :key="item.task_id">
        <div class="listItemTopRow">
          <Close :class="{invisible: item.is_done !== 0}" @click="$root.deleteTask(item.task_id)"></Close>
          <div class="assignTo" v-if="item.assigned_to ===0" @click="assignTaskToUser($root.usersOfHousehold[0].user_id, item)">
            Assign to {{$root.usersOfHousehold[0] ? $root.usersOfHousehold[0].user_name : 'User 1'}}
          </div>
        </div>
        <div class="listItemMiddleRow">
          <div class="iconAndTitle">
            <CategoryIcon :category="item.category" />
            {{item.task_name}}
            <div class="points">{{item.point}}p</div>
          </div>
          <Done @click="openTimeWindow(item)" v-if="item.assigned_to !== 0" :class="{done: item.is_done !== 0, undone: item.is_done === 0}"></Done>
        </div>
          <div class="listItemBottomRow">
          <Edit :class="{invisible: item.is_done !== 0}" @click="openEditTaskWindow(item)"></Edit>
          <div class="assignTo" v-if="item.assigned_to ===0" @click="assignTaskToUser($root.usersOfHousehold[1].user_id, item)">
            Assign to {{$root.usersOfHousehold[1] ? $root.usersOfHousehold[1].user_name : 'User 2'}}
          </div>
        </div>
      </div>
    </transition-group>
    <AnimatedButton />
    <TaskWindow :editingTask="editingTask" v-if="$root.isNewTaskWindowOpen === true || $root.isEditTaskWindowOpen === true || $root.isAddingTimeWindowOpen" />
  </div>
</template>

<script>
import TaskWindow from '@/components/TaskWindow'
import Close from '@/assets/icons/close.svg'
import Edit from '@/assets/icons/edit.svg'
import Done from '@/assets/icons/done.svg'
import AnimatedButton from '@/components/AnimatedButton'
import CategoryIcon from '@/components/CategoryIcon'

export default {
  name: 'Tasks',
  components: {
    TaskWindow,
    Close,
    Edit,
    Done,
    AnimatedButton,
    CategoryIcon,
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
          if(res.code === 1){
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

.noone.active_tab ~ hr {
  margin-left: -33%;
}

.person1.active_tab ~ hr {
  margin-left: 0;
}

.person2.active_tab ~ hr {
  margin-left: 33%;
}

.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 340px;
  margin: 30px 0px;
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.listItem {
  width: 90%;
  margin: 10px;
  padding: 10px;
  border-radius: 18px;
  border: var(--solidBorder);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .listItemTopRow, .listItemBottomRow{
    font-size: 12px;
    display: flex;
    flex-direction: row;
    width: 95%;
    align-items: center;
    justify-content: space-between;
  }

  .listItemMiddleRow{
    font-size: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    justify-content: space-between;
    color: var(--inputTextColor);

    .categoryIconContainer {
      margin-left: 5px;
      margin-bottom: 10px;
    }

    .iconAndTitle {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 50%;
      position: relative;

      .points {
        background-color: var(--classicBlue);
        color: var(--backgroundColor);
        min-width: 20px;
        height: 20px;
        padding: 5px;
        border-radius: 25px;
        position: absolute;
        top: -15px;
        right: 22px;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .done {
      pointer-events: none;
      stroke: var(--green);
    }

    .undone {
      cursor: pointer;
    }
  }
}

.assignTo {
  cursor: pointer;
  color: var(--actionTextColor);


  svg {
    vertical-align: middle;
  }
}

.invisible{
  opacity: 0;
  pointer-events: none;
}

.taskItemsAnimation-enter-active, .taskItemsAnimation-leave-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s;
  transition-delay: 0.3s;
}

.taskItemsAnimation-enter{
  opacity: 0;
  transform: translateX(-40vw);
  transition: all 0.3s;
}

.taskItemsAnimation-leave-to {
  opacity: 0;
  transform: translateX(40vw);
  transition: all 0.3s;
}
</style>
