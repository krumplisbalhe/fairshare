<template>
  <div class="signin">
    <input type="text" v-model="email" placeholder="E-mail">
    <input type="password" v-model="password" placeholder="Password" @keyup.enter="signInUser">
    <button @click="signInUser">Sign in</button>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  components: {
  },
  data(){
    return {
      email: '',
      password: '',
      feedbackMessage:'',
      // feedbackImage: 0
    }
  },
  methods: {
    signInUser(){
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
        if(res.code == 1){
            // this.$root.user = json.data
            // this.$router.push('/dashboard')
          console.log('Good stuff')
          }
        if(res.code == 0){
          this.$root.toast = {
            message: res.error[0].msg
          }
          // this.feedbackImage = 0
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
