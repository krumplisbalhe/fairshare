<template>
  <div class="signup">
    <input v-model="user_name" type="text" placeholder="Name" />
    <input v-model="email" type="text" placeholder="E-mail" />
    <input v-model="password" type="password" placeholder="Password" />
    <Toggle
      :value="have_id"
      @input="val => (have_id = val)"
      :toggleText="'Join a household'"
    />
    <input
      v-model="household_id"
      v-if="have_id"
      type="text"
      placeholder="Household ID"
    />
    <button @click="signUpUser">Sign up</button>
  </div>
</template>

<script>
import Toggle from '@/components/Toggle'

export default {
  name: 'Signup',
  components: {
    Toggle
  },
  data() {
    return {
      have_id: false,
      user_name: '',
      email: '',
      password: '',
      household_id: ''
    }
  },
  methods: {
    signUpUser() {
      fetch(this.have_id ? '/api/signup-join' : '/api/signup-create', {
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
          if (res.code == 1) {
            if (!this.have_id) {
              navigator.clipboard.writeText(res.household_id)
              this.$root.toast = {
                message:
                  'Household ID has been copied to clipboard, send it to your partner to join the household',
                icon: 'info'
              }
              this.$root.usersOfHousehold = res.response
            } else {
              this.$root.toast = {
                message: 'Sign up successful',
                icon: 'success'
              }
            }
          }
          if (res.code == 0) {
            this.$root.toast = {
              message: res.error[0].msg,
              icon: 'error'
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
.fadeIn {
  .signup {
    padding: 20px;
  }
}

.toggle {
  margin-left: 5px;
}
</style>
