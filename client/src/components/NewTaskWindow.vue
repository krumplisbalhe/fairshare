<template>
  <!-- <transition name="slideDown" appear> -->
    <div class="newTaskWindow">
      <button @click="closeNewTaskWindow">Close</button>
      <input v-model="formData.task_name" type="text" placeholder="Task name">
      <input v-model="formData.deadline" type="text" placeholder="Deadline">
      <input v-model="formData.point" type="text" placeholder="Point">
      <input v-model="formData.category" type="text" placeholder="Category">
      <input v-model="formData.description" type="text" placeholder="Description">
      <input v-model="formData.frequency" type="text" placeholder="Frequency">
      <button @click="createTask">Create task</button>
      {{this.$root.user}}
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'NewTaskWindow',
  components: {
  },
  methods:{
    closeNewTaskWindow(){
      this.$root.isnewTaskWindowOpen = false
    },
    createTask(){
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.$root.access_token}`
      },
      body: JSON.stringify(this.formData)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
        if(res.code == 1){
          this.$root.toast = {
            message: res.response,
            icon: "error"
          }
          this.$root.getTasks()
          this.$root.isnewTaskWindowOpen = false
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
  data() {
    return {
      formData: {
        task_name: '',
        deadline: '',
        point: '',
        category: '',
        description: '',
        frequency: '',
        household_id: this.$root.user.household_id
      }
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
.newTaskWindow {
  position: absolute;
  width:100%;
  height: 90vh;
  top: 5vh;
  background-color: red;
  z-index: 3;
}
</style>
