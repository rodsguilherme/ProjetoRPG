<template>
  <v-container fluid class="mt-12">
    <v-stepper v-model="e1" dark style="backgroundColor: #212121">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="red darken-4">Set your name</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" color="red darken-4">Choose your race</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" color="red darken-4">Set attributes</v-stepper-step>

        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 4" step="4" color="red darken-4">Card Preview</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <namePlayer @get-player="getPlayer"></namePlayer>
        </v-stepper-content>

        <v-stepper-content step="2">
          <racesComponent @emit-click="getRace"></racesComponent>

          <v-btn color="red darken-4" dark :disabled="!raceSelected" @click="e1 = 3">Continue</v-btn>
          <v-btn :color="colorButton" text @click="e1 = 1">Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <attributesComponent @emit-click-attribute="getAttributes"></attributesComponent>
          <v-btn :color="colorButton" text @click="e1 = 2">Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mx-auto mb-12" elevation="15" height="300px" width="50vw" style="backgroundColor: #212121" dark>
            <v-row class="mx-auto">
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field label="Charisma" :value="charismaToSave" readonly required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field label="Intelligence" :value="intelligenceToSave" readonly required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field
                  label="Dexterity"
                  color="blue"
                  :value="dexterityToSave"
                  readonly
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field label="Winsdow" :value="winsdowToSave" readonly required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field label="Strength" :value="strengthToSave" readonly required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field label="Strength" :value="constitutionToSave" readonly required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="4">
                <v-text-field label="HP" :value="hp" readonly required></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="red darken-4" dark @click="createCard">Save</v-btn>
          <v-btn :color="colorButton" text @click="e1 = 3">Voltar</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-row>
      <v-col>
        <div class="text-center">
          <v-snackbar v-model="snackbar" class="red--text darken-4" :timeout="timeout">
            Selected {{ message }}
            <v-btn dark text @click="snackbar = false" class="red--text darken-4">Close</v-btn>
          </v-snackbar>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import racesComponent from "./racesComponent";
import attributesComponent from "./attributesComponent";
import namePlayer from "./namePlayer";
export default {
  name: "stepper",
  data: () => ({
    e1: 0,
    selected: false,
    message: "",
    timeout: 2000,
    snackbar: false,
    colorButton: "red--text darken-4",
    raceSelected: null,
    nameToSave: "",
    vacationToSave: "",
    racesToSave: [
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
    ],
    charismaToSave: "",
    intelligenceToSave: "",
    winsdowToSave: "",
    constitutionToSave: "",
    dexterityToSave: "",
    strengthToSave: "",
    optionsToSave: "",
    hp: 0,
    valid: false
  }),
  components: {
    racesComponent,
    attributesComponent,
    namePlayer
  },
  methods: {
    getPlayer(user) {
      this.nameToSave = user.name;
      this.vacationToSave = user.vacationToSave;
      this.e1 = 2;
      console.log(this.nameToSave);
    },
    getRace(index) {
      this.snackbar = true;
      this.selected = true;
      this.raceSelected = this.racesToSave[index].name;
      this.message = this.raceSelected;
    },
    getAttributes(form) {
      this.e1 = 4;
      this.$emit("emit-attribute", form);
      this.charismaToSave = form.charisma;
      this.intelligenceToSave = form.intelligence;
      this.dexterityToSave = form.dexterity;
      this.winsdowToSave = form.winsdow;
      this.constitutionToSave = form.constitution;
      this.strengthToSave = form.strength;
      this.optionsToSave = form.options;

      if (this.raceSelected == "Elf") {
        this.dexterityToSave += 2;
      }
      if (this.optionsToSave == "mage") {
        this.hp = 6;
      }
    },
    createCard() {},
    setStatus(status) {
      console.log(status);
    }
  }
};
</script>