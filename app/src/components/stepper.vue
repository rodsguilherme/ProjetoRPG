<template>
  <v-container fluid class="mt-12">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Choose your race</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Set attributes and Choose abilits</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Choose your kind</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12 mt-1" color="grey lighten-1" height="450px">
            <racesComponent @emit-click="getRace"></racesComponent>
          </v-card>

          <v-btn color="blue" dark @click="e1 = 2">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12"  color="grey lighten-1" height="450px"></v-card>

          <v-btn color="blue" dark @click="e1 = 3">Continue</v-btn>

          <v-btn color="blue" text @click="e1 = 1">Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="450px"></v-card>
          <v-btn color="blue" dark @click="e1 = 1">Continue</v-btn>

          <v-btn color="blue" text @click="e1 = 1">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-row>
      <v-col>
        <div class="text-center">
          <v-snackbar v-model="snackbar" class="blue--text" :timeout="timeout">
            Selected {{ message }}
            <v-btn dark text @click="snackbar = false" class="blue--text">Close</v-btn>
          </v-snackbar>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import racesComponent from "./racesComponent";
export default {
  name: "stepper",
  data: () => ({
    e1: 0,
    message: "",
    timeout: 2000,
    snackbar: false,
    raceSelected: null,
    races: [
      {
        id: 1,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/outlander_orig.jpg",
        name: "Warrior"
      },
      {
        id: 2,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/dimitri_orig.jpg",
        name: "Elf"
      },
      {
        id: 3,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/mistrider_orig.jpg",
        name: "Rogue"
      },
      {
        id: 4,
        url:
          "https://www.sketchgoblin.co.nz/uploads/1/1/6/7/116709803/eiland_orig.jpg",
        name: "Mage"
      }
    ]
  }),
  components: {
    racesComponent
  },
  methods: {
    getRace(index) {
      this.snackbar = true;
      this.raceSelected = this.races[index].name;
      this.message = this.raceSelected;
    }
  },
  
};
</script>