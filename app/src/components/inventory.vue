<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" v-for="(card, i) in cards" :key="i">
        <v-card id="card" class="card mx-auto" max-width="360" max-height="700">
          <v-row align="center" justify="center">
            <v-card-title>
            <h4 class="subtitle-1">
             <span class="subtitle-1 deep-purple--text">Personagem:</span> 
                {{card.name}}
              </h4>
            </v-card-title>
          </v-row>
          <v-img width="360" height="400" :src="card.img"></v-img>
          <v-divider></v-divider>
          <v-row align="center" justify="center">
            <v-card-title >
              <h4 class="subtitle-1">
                <span class="subtitle-1 deep-purple--text">Race:</span>
                {{card.races}}
              </h4>
            </v-card-title>
        
            <v-card-title>
              <h4 class="subtitle-1">
                <span class="subtitle-1 deep-purple--text">Kind:</span>
                {{card.kinds}}
              </h4>
            </v-card-title>
          </v-row>

          <v-divider></v-divider>
          <v-card-actions>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-btn
                  block
                  outlined
                  :loading="loading && i==index"
                  class="white--text"
                  color="purple darken-2"
                  @click="showDetails(card); index = i"
                >Details</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <v-row justify="center">
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card dark>
              <v-toolbar class="deep-purple lighten-1">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-row align="center" justify="center">
                  <v-toolbar-title class="text-center">Card</v-toolbar-title>
                </v-row>
              </v-toolbar>
              <v-row justify="center" align="center" class="mt-10">
                <v-card elevaiton="20" width="80vh" height="73vh">
                  <v-row class="mx-auto">
                    <v-col col="6" lg="6">
                      <v-row class="mx-auto">
                        <v-col>
                          <h1 class="title">Attributes</h1>
                          <v-divider inset></v-divider>
                        </v-col>
                      </v-row>
                      <v-text-field :value="cardSelected.charisma" label="Charisma" readonly></v-text-field>

                      <v-text-field
                        :value="cardSelected.constitution"
                        label="Constitution"
                        readonly
                      ></v-text-field>

                      <v-text-field :value="cardSelected.dexterity" label="Dexterity" readonly></v-text-field>
                      <v-text-field
                        :value="cardSelected.intelligence"
                        label="Intelligence"
                        readonly
                      ></v-text-field>
                      <v-text-field :value="cardSelected.strength" label="Strength" readonly></v-text-field>
                      <v-text-field :value="cardSelected.winsdow" label="Winsdow" readonly></v-text-field>
                    </v-col>

                    <v-row class="mx-auto">
                      <v-col col="6" lg="12">
                        <v-row class="mx-auto">
                          <v-col>
                            <h1 class="title">Data</h1>
                            <v-divider inset></v-divider>
                          </v-col>
                        </v-row>
                        <v-text-field :value="cardSelected.name" label="Name" readonly></v-text-field>
                        <v-text-field :value="cardSelected.alignment" label="Alignment" readonly></v-text-field>
                        <v-text-field :value="cardSelected.races" label="Race" readonly></v-text-field>
                        <v-text-field :value="cardSelected.kinds" label="Kind" readonly></v-text-field>
                        <v-text-field :value="cardSelected.hp" label="Health Points" readonly></v-text-field>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-card>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "inventory",
  data: () => ({
    cards: [],
    races: [],
    cardSelected: [],
    dialog: false,
    show: false,
    loading: false,
    index: -1
  }),
  mounted() {
    axios
      .get("http://localhost:3000/v1/card/saves/1")
      .catch(e => console.log(e))
      .then(res => (this.cards = res.data));
  },
  methods: {
    showDetails(card) {
      this.loading = true;
      axios
        .get(`http://localhost:3000/v1/card/saveCard/${card.idCard}`)
        .catch(e => console.log(e))
        .then(res => {
          res.data.forEach(el => {
            this.cardSelected = el;
          });
        })
        .finally(() => {
          this.loading = false;
          this.dialog = true;
        });
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>