<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" v-for="(card, i) in cards" :key="i">
        <v-card id="card" class="card mx-auto" max-width="400">
          <v-img class="align-end" :src="card.img" aspect-ratio="0.8" width="100%" height="400"></v-img>
          <v-row>
            <v-col cols="12" offset="4">
              <v-card-title class="purple--text">{{card.name}}</v-card-title>
            </v-col>
          </v-row>
          
              <v-card-actions>
                <v-row class="ml-12">
                   <v-col class="ml-12">
                   <v-btn  dark  text class="deep-purple--text lighten-1" @click="showDetails, dialog = true">Show Details</v-btn>
                   </v-col>
                 </v-row>
              </v-card-actions>
                <v-row justify="center">
                  <v-dialog
                    v-model="dialog"
                    dark
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    
                    <v-card>
                      <v-toolbar class="deep-purple lighten-1">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Card</v-toolbar-title>
                      </v-toolbar>
                      <v-row>
                        <v-col></v-col>
                      </v-row>
                    </v-card>
                  </v-dialog>
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
    dialog: false,
    show: false
  }),
  mounted() {
    axios
      .get("http://localhost:3000/v1/card/saves/1")
      .catch(e => console.log(e))
      .then(res => (this.cards = res.data));
  },
  method: {
    showDetails() {
      this.dialog = true;
      axios.get(`http://localhost:3000/v1/card/saves/${this.cards.idCard}`);
    }
  }
};
</script>

<style scoped>
</style>