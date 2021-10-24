<template>
  <div>
    <h1>Hello {{ this.$store.state.user.name }}</h1>
    <button @click="getPokemonData"> Fetch my pokemon! </button>
    <div v-if="user !== null" class="profile">
      <img v-bind:src="pokemonImage" width="200" height="200"> <br>
      <label>Name: {{ pokemonName }}</label> <br>
      <label>Key stats:</label>
      <ul id="example-1">
        <li v-for="stat in status" :key="stat">
          {{stat.stat.name}}:  {{stat.base_stat}}
        </li> <br>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      pokemonName: null,
      pokemonImage: null,
      status: null
    }
  },
  methods: {
    async getPokemonData () {
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.user.authorization}` }
      }

      axios.get(
        'user/pokemon/random',
        config
      ).then(res => {
        this.pokemonName = res.data.data.name
        this.pokemonImage = res.data.data.image
        this.status = res.data.data.stats
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
  }

}
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
    margin-left: 15px;
  }
  input {
    width: 40%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    margin: 15px;
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
