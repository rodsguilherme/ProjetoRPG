<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" @click.prevent="submit">
      <v-row class="mx-auto">
        <v-col cols="3">
          <v-select
            label="Dexterity"
            v-model="form.dexterity"
            color="blue" 
            :rules="[v => !!v || 'Item is required']"
            :items="items"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Constitution"
            v-model="form.constitution"
            color="blue" 
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Winsdow"
            v-model="form.winsdow"
            color="blue" 
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Intelligence"
            v-model="form.intelligence"
            color="blue" 
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Charisma"
            color="blue" 
            :items="items"
            v-model="form.charisma"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            label="Strength"
            :items="items"
            color="blue" 
            v-model="form.strength"
            :rules="[v => !!v || 'Item is required']"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" offset="1">
          <v-radio-group v-model="form.options" :rules="[v => !!v || 'Item is required']" row>
            <v-radio value="rogue" label="Rogue"></v-radio>
            <v-radio value="mage" label="Mage"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" offset="5">
          <v-card-actions>
            <v-btn color="blue" dark  :disabled="!valid" @click="getAttribute">Continue</v-btn>
            <v-btn text class="blue--text"  @click="resetForm">Reset</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


<script>
export default {
  name: "attributes",
  data: () => ({
    dialog: false,
    form: {
      charisma: "",
      intelligence: "",
      winsdow: "",
      constitution: "",
      dexterity: "",
      strength: "",
      options: ""
    },

    valid: false,
    items: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ]
  }),
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    getAttribute() {
      this.dialog = false;
      this.$emit("emit-click-attribute", this.form);
    }
  }
};
</script>

<style scoped>
</style>