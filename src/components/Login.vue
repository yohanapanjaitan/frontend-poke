<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="alert" v-if="error !== null">{{error}}</div>
      <input type="email" name="email" placeholder="email" v-model="email"> <br>
      <input type="password" name="password" placeholder="password" v-model="password"> <br>
      <button type="submit">Login</button>
      <button>
        <router-link to="/register">Register</router-link>
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
      error: ''
    }
  },

  mounted: function () {
    console.log('Mounted!')
  },
  methods: {
    login () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$swal('Login', this.$store.state.alert, this.$store.state.status)
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
    width: 10%;
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
