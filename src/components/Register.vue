<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="email" name="email" placeholder="email" v-model="email"> <br>
      <input type="text" name="name" placeholder="name" v-model="name"> <br>
      <input type="password" name="password" placeholder="password" v-model="password"> <br>
      <button type="submit">Register</button>
      <button>
        <router-link to="/login">Login</router-link>
      </button> <br>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      name: ''
    }
  },

  methods: {
    register () {
      this.$store
        .dispatch('register', {
          email: this.email,
          password: this.password,
          name: this.name
        })
        .then(() => {
          this.$swal('Register', this.$store.state.alert, this.$store.state.status)

          if (this.$store && this.$store.state && this.$store.state.user.authorization) {
            this.$router.push({ name: 'Pokemon' })
          }
        })
    }
  }
}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  input {
    width: 40%;
    padding: 20px;
    margin: 10px 10px 10px 0px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    width: 15%;
    padding: 5px;
    margin: 10px 10px 10px 0px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  .profile {
    padding: 16px;
  }
  label, ul, li {
    font-size: 20px;
  }
  ul, li {
    padding-left: -10px;
  }
  
</style>
