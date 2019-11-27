<template>
  <v-container fluid>{{idUser}}
    <div v-if="show">
      <v-layout fill-height wrap>
      <v-row>
        <v-col sm="6" md="7" lg="3"  v-for="(card, i) in cards" :key="i">
          <v-card id="card" class="card mx-auto mt-10" max-width="320" max-height="700" height="470">
            <v-row>
              <v-card-title class="mx-auto">
                <h4 class="subtitle-1 pb-3 pt-3">
                  <span class="subtitle-1 deep-purple--text">Persona:</span>
                  {{card.name}}
                </h4>
              </v-card-title>
              <v-menu bottom  offset-y transition="scale-transition">
                <v-list>
                  <v-list-item class="pr-6 pl-6" @click="showDetails(card)">
                    <v-list-item-title class="deep-purple--text text--lighten-1">Details</v-list-item-title>
                  </v-list-item>
                </v-list>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" class="deep-purple--text text--lighten-1 pr-2">mdi-dots-vertical</v-icon>
                </template>
              </v-menu>
            </v-row>
            <v-img max-width="390" max-height="360" :src="card.img"></v-img>
            <v-row align="center" justify="center" class="pt-3">
              <v-card-title class="pr-10">
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
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card dark>
          <v-toolbar class="deep-purple lighten-1" dense>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-row align="center" justify="center">
              <v-toolbar-title class="text-center">Card</v-toolbar-title>
            </v-row>
          </v-toolbar>
          <v-row justify="center" align="center" class="pt-12">
            <v-card elevation="20" max-width="500vw" width="80vw" max-height="85vh">
              <v-row class="mx-6">
                <v-row class="mx-auto">
                  <v-col lg="6">
                    <h1 class="title">Attributes</h1>
                    <v-divider inset></v-divider>
                    <v-row>
                      <v-text-field class="pr-3" value="Charisma" solo readonly></v-text-field>
                      <v-text-field :value="cardSelected.charisma" solo readonly></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field class="pr-3" value="Constitution" solo readonly></v-text-field>
                      <v-text-field :value="cardSelected.constitution" solo readonly></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field class="pr-3" value="Dexterity" solo readonly></v-text-field>
                      <v-text-field :value="cardSelected.dexterity" solo readonly></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field class="pr-3" value="Intelligence" solo readonly></v-text-field>
                      <v-text-field :value="cardSelected.intelligence" solo readonly></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field class="pr-3" value="Strength" solo readonly></v-text-field>
                      <v-text-field :value="cardSelected.strength" solo readonly></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field class="pr-3" value="Winsdow" solo readonly></v-text-field>
                      <v-text-field :value="cardSelected.winsdow" solo readonly></v-text-field>
                    </v-row>
                  </v-col>

                  <v-divider vertical class="mx-3"></v-divider>
                  <v-row class="mx-auto">
                    <v-col lg="12">
                      <h1 class="title">Data</h1>
                      <v-divider inset></v-divider>
                      <v-row>
                        <v-text-field class="pr-3" value="Name" solo readonly></v-text-field>
                        <v-text-field value="Nome do jogador" solo readonly></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field class="pr-3" value="Persona" solo readonly></v-text-field>
                        <v-text-field :value="cardSelected.name" solo readonly></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field class="pr-3" value="Alignment" solo readonly></v-text-field>
                        <v-text-field :value="cardSelected.alignment" solo readonly></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field class="pr-3" value="Race" solo readonly></v-text-field>
                        <v-text-field :value="cardSelected.races" solo readonly></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field class="pr-3" value="Kind" solo readonly></v-text-field>
                        <v-text-field :value="cardSelected.kinds" solo readonly></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field class="pr-3" value="Health Points" solo readonly></v-text-field>
                        <v-text-field :value="cardSelected.hp" solo readonly></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </v-row>
              <v-btn fab right absolute bottom small @click="deletar">
                <v-icon class="deep-purple--text text--lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-row>
        </v-card>
      </v-dialog>
     
      </v-layout>

    </div>
     <v-snackbar v-model="snackbar">
        {{ message }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "inventory",
  data: () => ({
    cards: [],
    races: [],
    drawer: null,
    cardSelected: [],
    dialog: false,
    loading: false,
    index: -1,
    i: 0,
    message: "",
    messagePrepare: "",
    snackbar: false,
    idCardSelected: "",
    show: true,
    idUser: '',
    id: '',
  
  }),
  mounted() {
  function render () {
      axios
    .get('http://localhost:3000/v1/user', { headers: {token: localStorage.getItem('user_token')} })
    .then(res => { this.idUser = res.data.id})
    .finally(() => this.id = this.idUser)
   console.log(this.id)
    axios
      .get(`http://localhost:3000/v1/card/saves/${this.id}`)
      .catch(e => console.log(e))
      .then(res => (this.cards = res.data));
    }
    render()
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
            this.idCardSelected = el.idCard;
          });
        })
        .finally(() => {
          this.loading = false;
          this.dialog = true;
        });
    },
    deletar() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        axios
          .delete(`http://localhost:3000/v1/card/delete/${this.idCardSelected}`)
          .catch(e => (this.messagePrepare = e.response.data))
          .then(res => (this.messagePrepare = res.data))
          .finally(() => {
            this.snackbar = true;
            this.message = this.messagePrepare;
            this.dialog = false;
          });
        this.$nextTick(() => {
          axios
            .get("http://localhost:3000/v1/card/saves/1")
            .catch(e => console.log(e))
            .then(res => (this.cards = res.data));
        });
      });
    }
  }
};
</script>

<style scoped>
* {
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