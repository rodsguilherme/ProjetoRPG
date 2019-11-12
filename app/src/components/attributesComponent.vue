<template>
  <v-container fluid>
    <v-form ref="form" @click.prevent="submit">
      <v-row class="mx-auto">
        <v-col cols="3">
          <v-text-field
            label="Dexterity"
            v-model="form.dexterity"
            :rules="rules.dexterity"
            type="number"
            dense
            required
            min="1"
            max="18"
    
            hint="Max 18"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Constitution"
            v-model="form.constitution"
            :rules="rules.constitution"
            type="number"
            dense
            required
            min="1"
            max="18"
            hint="Max 18"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Winsdow"
            v-model="form.winsdow"
            type="number"
            :rules="rules.winsdow"
            dense
            required
            min="1"
            max="18"
            hint="Max 18"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Intelligence"
            v-model="form.intelligence"
            :rules="rules.intelligence"
            type="number"
            dense
            required
            min="1"
            max="18"
            hint="Max 18"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Charisma"
            v-model="form.charisma"
            :rules="rules.charisma"
            type="number"
            dense
            required
            min="1"
            max="18"
            hint="Max 18"
          ></v-text-field>
          <v-checkbox
            v-model="form.private"
            color="blue"
            label="Private, other users will not be able to see your card"
          ></v-checkbox>
        </v-col>
        <v-card title shaped elevation="1" class="mx-auto" width="6vw" height="10vh">
        <h1 class="ml-3 mt-2 blue--text">+{{Number(form.charisma)}}</h1>
        </v-card>
      </v-row>
      <v-row>
        <v-col cols="12" offset="5">
          <v-card-actions>
            <v-btn text class="blue--text" @click="resetForm">Reset</v-btn>
            <v-btn @click="getAtt(form)" :disabled="!formIsValid" color="blue">Accept</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>




	




<script>
export default {
  name: "attributes",
  data: () => {
    const defaultForm = Object.freeze({
      charisma: "",
      intelligence: "",
      winsdow: "",
      constitution: "",
      dexterity: "",
      private: false,
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        age: [val => val < 10 || `I don't believe you!`],
        charisma: [val => (val || "").length > 0 || val < 18 || 'Menor 18' || "This field is required"],
        intelligence: [
          val => (val || "").length > 0 || "This field is required"
        ],
        winsdow: [val => (val || "").length > 0 || "This field is required"],
        constitution: [
          val => (val || "").length > 0 || "This field is required"
        ],
        dexterity: [val => (val || "").length > 0 || "This field is required"]
      },
      conditions: false,
      private: false,
      defaultForm
    }
  },
  computed: {
    formIsValid() {
      return (
        this.form.charisma &&
        this.form.intelligence &&
        this.form.dexterity &&
        this.form.constitution &&
        this.form.winsdow &&
        this.form.private
     
      )
      
    },
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    getAtt(form) {
      this.$emit("emit-click-attribute", form);
    }
  }
};
</script>

<style scoped>
</style>