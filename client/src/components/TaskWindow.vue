<template>
  <!-- <transition name="slideDown" appear> -->
    <div :class="{newTaskWindow: $root.isNewTaskWindowOpen, editTaskWindow: $root.isEditTaskWindowOpen}" class="taskWindow">
      <Close v-if="$root.isNewTaskWindowOpen || $root.isEditTaskWindowOpen"  @click="closeTaskWindow"></Close>
      <div v-if="$root.isNewTaskWindowOpen || $root.isEditTaskWindowOpen" class="formContainer">
        <input v-model="dynamicValues.task_name" type="text" placeholder="Task name">
        <input v-model="dynamicValues.deadline" type="text" placeholder="Deadline">
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
      <div v-if="$root.isAddingTimeWindowOpen">
        It took me
        <input v-model="time" type="number" placeholder="Time">
        minutes
        <button @click="moveItemToDone(editingTask)"></button>
      </div>
    </div>
  <!-- </transition> -->
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
      method: this.editingTask ? 'PUT' :'POST',
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
      fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$root.access_token}`
      },
      body: JSON.stringify({...item, is_done: 1,time_spent: this.time, household_id: this.$root.user.household_id})
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
    return this.editingTask || this.formData
  }
  },
  data() {
    return {
      formData: {
        task_name: '',
        deadline: '',
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
  background-color: var(--lightBlue);
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
    padding-top: 3vh;

    button{
      margin-top: 15px;
    }
  }
}


</style>
