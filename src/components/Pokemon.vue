<template>
  <div v-if="this.$store && this.$store.state.user">
    <h2>{{ this.$store.state.user.name }}'s pokebrary</h2>
    <button @click="getPokemonData"> Fetch my pokemon! </button>
    <div v-if="pokemonImage !== null" class="profile">
      <div>
        <img v-bind:src="pokemonImage" width="200" height="200"> <br>
      </div>
      <div class="data">
        <label>Name: {{ pokemonName }}</label> <br>
        <label>Key stats:</label>
        <label class="flex">
          <li v-for="{stat, base_stat, idx} in status" :key="idx">
            {{stat.name}}:  {{base_stat}}
          </li> <br>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pokemonName: null,
      pokemonImage: null,
      status: null
    }
  },

  computed: {
    ...mapGetters([
      'isLogged'
    ])
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
        console.log(err.body.error)
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
  }
  input {
    width: 40%;
    padding: 12px 20px;
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
    padding: 15px 35px;
    margin: 10px 10px 10px 0px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  .profile {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    /* flex-direction: column; */
  }
  .data {
    margin-left: 15px;
  }
  label, ul, li {
    font-size: 20px;
  }
  ul {
    display: flex;
    
  }
  ul, li {
    padding-left: -10px;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    /* max-width: 32em; */
    /* height: 30em; */
    /* margin: 1em auto; */
  }
  
</style>
