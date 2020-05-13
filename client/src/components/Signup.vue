<template>
  <div class="signup">
    <input v-model="user_name" type="text" placeholder="Name">
    <input v-model="email" type="text" placeholder="E-mail">
    <input v-model="password" type="password" placeholder="Password">
    <Toggle :value="have_id" @input="val => have_id = val" :toggleText="'Join a household'" />
    <input v-model="household_id" v-if="have_id" type="text" placeholder="Household ID">
    <button @click="signUpUser">Sign up</button>
  </div>
</template>

<script>
import Toggle from '../components/Toggle'

export default {
  name: 'Signup',
  components: {
    Toggle
  },
  data () {
		return {
      have_id: false,
      user_name:'',
      email:'',
      password:'',
      household_id: ''
		}
  },
  methods: {
    signUpUser(){
    fetch(this.have_id ? '/signup-join' : '/signup-create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: this.user_name,
        email: this.email,
        password: this.password,
        household_id: this.household_id
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
        if(res.code == 1){
            this.$root.user = res.user_data
            // this.$router.push('/dashboard')
          console.log(res)
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
.signup {
  padding: 20px;
}
</style>
