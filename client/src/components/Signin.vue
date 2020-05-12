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
            this.$root.user = res.user_data
            this.$root.access_token = res.access_token
            // this.$router.push('/dashboard')
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

<style lang="scss">
</style>
