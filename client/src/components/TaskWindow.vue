<template>
  <transition name="taskWindowAnimation" appear>
    <div :class="{newTaskWindow: $root.isNewTaskWindowOpen, editTaskWindow: $root.isEditTaskWindowOpen}" class="taskWindow">
      <Close v-if="$root.isNewTaskWindowOpen || $root.isEditTaskWindowOpen"  @click="closeTaskWindow"></Close>
        <div v-if="$root.isNewTaskWindowOpen || $root.isEditTaskWindowOpen" class="formContainer">
          <input v-model="dynamicValues.task_name" type="text" placeholder="Task name">
          <input v-model="dynamicValues.point" type="text" placeholder="Point">
          <label for="Category">Category</label>
          <select v-model="dynamicValues.category" type="text" name="Category">
            <option value=bathroom>Bathroom</option>
            <option value="livingroom">Livingroom</option>
            <option value="kitchen">Kitchen</option>
            <option value="bedroom">Bedroom</option>
            <option value="laundry">Laundry</option>
            <option value="cleaning">Cleaning</option>
            <option value="dishes">Dishes</option>
            <option value="floor">Floor</option>
            <option value="trash">Trash</option>
            <option value="outside">Outside</option>
            <option value="other">Other</option>
          </select>
          <label for="Frequency">Frequency</label>
          <select v-model="dynamicValues.frequency" type="text" name="Frequency">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="once">Only once</option>
          </select>
          <button @click="saveTask">{{$root.isNewTaskWindowOpen ? 'Create task' : 'Edit task'}}</button>
        </div>
      <div v-if="$root.isAddingTimeWindowOpen" class="taskWindow">
        <div class="formContainer">
          <p>It took me</p>
          <input v-model="time" type="number" max="100" class="minuteContainer">
          <p>minutes to finish this task.</p>
          <button @click="moveItemToDone(editingTask)">Done</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Close from '@/assets/icons/close.svg'

export default {
  name: 'TaskWindow',
  props: ['editingTask'],
  components: {
    Close
  },
  methods:{
    closeTaskWindow(){
      this.$root.isNewTaskWindowOpen = false,
      this.$root.isEditTaskWindowOpen = false
    },
    saveTask(){
    fetch('/api/tasks', {
      method: this.$root.isEditTaskWindowOpen ? 'PUT' :'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$root.access_token}`
      },
      body: JSON.stringify({...this.dynamicValues, household_id: this.$root.user.household_id})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
        if(res.code == 1){
          this.$root.getTasks()
          this.$root.isNewTaskWindowOpen = false
          this.$root.isEditTaskWindowOpen = false
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
    moveItemToDone(item){
      fetch('/api/task-done', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$root.access_token}`
      },
      body: JSON.stringify({...item, is_done: 1, time_spent: Number(this.time), modified_at: Math.floor(Date.now() / 1000), household_id: this.$root.user.household_id})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
        if(res.code == 1){
          this.$root.isAddingTimeWindowOpen = false
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
  },
  computed:{
  dynamicValues(){
    return this.$root.isEditTaskWindowOpen ? this.editingTask : this.formData
  }
  },
  data() {
    return {
      formData: {
        task_name: '',
        point: '',
        category: '',
        frequency: ''
      },
      time: null
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
.taskWindow {
  position: absolute;
  width:100%;
  height: 100%;
  top: 0;
  background-color: var(--backgroundColor);
  z-index: 3;
  display: flex;
  flex-direction: column;

  .icon {
    align-self: flex-end;
    cursor: pointer;
    margin: 20px;
  }

  .formContainer{
    padding: 20px;
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: var(--inputTextColor);
    font-size: 12px;

    button{
      margin-top: 15px;
      background-color: var(--classicBlue);
      color: var(--backgroundColor);
    }

    label {
      margin-bottom: 10px;
      margin-left: 5px;
    }

    p{
      font-size: 14px;
    }
  }
}

.taskWindowAnimation-enter-active, .taskWindowAnimation-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s;
}

.taskWindowAnimation-enter, .taskWindowAnimation-leave-to {
  opacity: 0;
  transform: translateY(10vh);
  transition: all 0.3s;
}

</style>
