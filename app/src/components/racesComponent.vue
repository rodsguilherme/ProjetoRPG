<template>
  <v-sheet class="mx-auto" max-width="100%" mx-height="130%">
    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-item v-for="(race, i) in races" :key="i">
        <v-card
          class="ma-4 blue--text text--darken-4 card"
          elevation="15"
          height="38vh"
          width="15vw"
          @click="raceSelected(race)"
        >
          <img :src="race.img" width="100%" height="100%" />
        </v-card>
      </v-slide-item>
    </v-slide-group>
        
  </v-sheet>
</template>

<script>
import axios from 'axios'
export default {
  name: "racesComponent",
  data: () => ({
    model: null,
    races: [],
    nameRace: '',
  }),
  methods: {
    raceSelected(race) {
      this.model = race.idRace;
  
      this.$emit("emit-click", race);
    }
  },
  mounted (){
    axios 
    .get('http://localhost:3000/v1/races')
    .then(res => this.races = res.data);
  }
};
</script> 

<style scoped>
.card img:hover {
  height: 38vh;
  width: 15vw;
}

.card:focus {
  border: 8px solid #d1c4e9;
}
.card:hover {
  border: 8px solid #d1c4e9;
}
.card {
  background-color: #d1c4e9;
}
</style>