<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" v-for="(card, i) in cards" :key="i">
        <v-card id="card" class="card mx-auto" max-width="400"  >
          <v-img  class="align-end"
     :src="card.img"  aspect-ratio="0.8" width="100%" height="400"  ></v-img>
          <v-card-title class="purple--text">{{card.name}}</v-card-title>
          <v-row>
            <v-col cols="12">
              <v-card-actions>
                <v-btn text>Use</v-btn>
                <v-btn color="purple" text>Details</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "card",
  data: () => ({
    cards: [],
    races: [],
    show: false
  }),
  mounted() {
    axios
      .get("http://localhost:3000/v1/card/saves")
      .catch(e => console.log(e))
      .then(res => (this.cards = res.data));
  }
};
</script>

<style scoped>

</style>