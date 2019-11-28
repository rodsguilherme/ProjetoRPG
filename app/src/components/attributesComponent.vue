<template>
  <v-card dark class="mx-auto" elevation="15" style="backgroundColor: #212121" width="70vw">
    <v-form v-model="valid" @click.prevent="submit">
      <v-row class="mx-auto">
        <v-col cols="4">
          <v-select
            label="Dexterity"
            v-model="form.dexterity"
            :rules="[v => !!v || 'Item is required']"
            :items="items"
            required
            :color="colorSelects"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Constitution"
            v-model="form.constitution"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            :color="colorSelects"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Winsdow"
            v-model="form.winsdow"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            :color="colorSelects"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Intelligence"
            v-model="form.intelligence"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            :color="colorSelects"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Charisma"
            :items="items"
            v-model="form.charisma"
            :rules="[v => !!v || 'Item is required']"
            :color="colorSelects"
            required
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            label="Strength"
            :items="items"
            v-model="form.strength"
            :rules="[v => !!v || 'Item is required']"
            :color="colorSelects"
            required
          ></v-select>
        </v-col>

        <v-col cols="1" v-for="(kind, i) in kinds" :key="i" class="px-12">
          <v-radio-group v-model="form.kind" :rules="[v => !!v || 'Item is required']" row>
            <v-radio :value="kind.idKind" :label="kind.kinds"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" offset="5">
          <v-card-actions>
            <v-btn color="deep-purple lighten-1" dark :disabled="!valid" @click="getAttribute">Generate</v-btn>
            <v-btn text class="deep-purple lighten-1" @click="resetForm">Reset</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>


<script>
import axios from "axios";
export default {
  name: "attributes",
  data: () => ({
    dialog: false,
    colorSelects: "deep-purple lighten-1",
    form: {
      charisma: "",
      intelligence: "",
      winsdow: "",
      constitution: "",
      dexterity: "",
      strength: "",
      kind: ""
    },
    kinds: [],
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
  },
  mounted() {
    axios
      .get("http://localhost:3000/v1/card/kind")

      .then(res => {
        this.kinds = res.data;
      });
  }
};
</script>

<style scoped>
</style>