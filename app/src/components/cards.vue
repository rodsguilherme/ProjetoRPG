<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" v-for="(card, i) in cards" :key="i">
        <v-card id="card" class="card mx-auto" max-width="360" max-height="700">
          <v-row align="center" justify="center">
            <v-card-title class="deep-purple--text title">
              <h3 class="title">{{card.name}}</h3>
            </v-card-title>
          </v-row>
          <v-img width="360" height="400" :src="card.img"></v-img>
                 <v-divider inset></v-divider>
          <v-row align="center" justify="center">
           
            <v-card-title class="deep-purple--text title">
                 <v-divider ></v-divider>
              <h4 class="title">{{card.races}}</h4>
            </v-card-title>
            <v-card-title class="deep-purple--text title">
              <h4 class="title">{{card.kinds}}</h4> 
            </v-card-title>
           
          </v-row>
            <v-divider></v-divider>
          <v-card-actions>
            <v-row align="center" justify="center">
              <v-col>
              <v-btn
                dark
                block
                outlined
                class="deep-purple--text lighten-1"
                @click="showDetails(card)"
              >Details</v-btn>
              </v-col>
              
            </v-row>
          </v-card-actions>
        </v-card>
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
                <v-row align="center" justify="center">
                  <v-toolbar-title class="text-center">Card</v-toolbar-title>
                </v-row>
              </v-toolbar>
              <v-row justify="center" align="center" class="mt-10">
                <v-card elevaiton="20" width="80vh" height="67vh">
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
  name: "card",
  data: () => ({
    cards: [],
    races: [],
    cardSelected: [],
    dialog: false,
    show: false
  }),
  mounted() {
    axios
      .get("http://localhost:3000/v1/card/saves/1")
      .catch(e => console.log(e))
      .then(res => (this.cards = res.data));
  },
  methods: {
    showDetails(card) {
      this.dialog = true
      axios
        .get(`http://localhost:3000/v1/card/saveCard/${card.idCard}`)
        .then(res => {
          res.data.forEach(el => {
            this.cardSelected = el;
            console.log(this.cardSelected);
          });
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
</style>