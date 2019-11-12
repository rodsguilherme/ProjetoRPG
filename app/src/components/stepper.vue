<template>
  <v-container fluid class="mt-12">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Set your name</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Choose your race</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Set attributes</v-stepper-step>

        <v-divider></v-divider>
        <v-stepper-step step="4">Card Preview</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="300px">
            <namePlayer :disabled="!nameToSave" @get-player="getPlayer"></namePlayer>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12 mt-1" height="300px">
            <racesComponent @emit-click="getRace"></racesComponent>
          </v-card>

          <v-btn color="blue" :disabled="!raceSelected" dark @click="e1 = 3">Continue</v-btn>
          <v-btn color="blue" text @click="e1 = 1">Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" height="300px">
            <attributesComponent @emit-click-attribute="getAttributes"></attributesComponent>
          </v-card>
          <v-btn color="blue" text @click="e1 = 2">Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" height="300px">
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field label="Charisma" :value="charismaToSave" prefix="+" readonly required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field
                  label="Intelligence"
                  :value="intelligenceToSave"
                  prefix="+"
                  readonly
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field
                  label="Dexterity"
                  color="blue"
                  :value="dexterityToSave"
                  prefix="+"
                  readonly
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field label="Winsdow" :value="winsdowToSave" prefix="+" readonly required></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field label="Strength" :value="strengthToSave" prefix="+" readonly required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2">
                <v-text-field label="HP" :value="hp" prefix="+" readonly required></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="blue" dark @click="createCard">Save</v-btn>
          <v-btn color="blue" text @click="e1 = 3">Voltar</v-btn>
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
    raceSelected: null,
    nameToSave: '',
    vacationToSave: '',
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
    hp: 0
  }),
  components: {
    racesComponent,
    attributesComponent,
    namePlayer
  },
  methods: {
    getPlayer(user){
      this.nameToSave = user.name
      this.vacationToSave = user.vacationToSave
      this.e1 = 2
      console.log(user.name)
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
    createCard() {}
  },
  computed: {}
};
</script>