<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3" lg="2" >
        <v-text-field label="Name" :rules="rules" v-model="user.name" clearable></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="2">
        <v-text-field label="Vocation" :rules="rules" v-model="user.vocation" clearable></v-text-field>
      </v-col>
    </v-row>
    <v-row class="pt-10">
      <v-col cols="12">
        <v-btn class="blue" dark @click="getPlayer">Continue</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "namePlayer",
  data: () => ({
    user: {
      name: "",
      vocation: ""
    },
    rules: [value => !!value || "Required."]
  }),
  methods: {
      getPlayer() {
          this.$emit('get-player', this.user)
      }
  }
};
</script>

<style scoped>
</style>