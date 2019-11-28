<template>
  <v-container fluid>
    <v-app-bar dark dense fixed width="100%" elevation="10">
      <v-toolbar-title :class="colorMenu">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :class="colorMenu" to="/">HOME</v-btn>
        <v-btn text :class="colorMenu" to="inventory">INVENTORY</v-btn>
        <v-btn text :class="colorMenu" @click="logout" >LOGOUT</v-btn>
        
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>



<script>
export default {
  name: "componentMenulogged",
  data: () => ({
    title: "GENERATE CARD",
    colorMenu: "deep-purple--text text--lighten-1"
  }),
  methods: {
      logout() {
          this.$eventHub.$emit('logout')
      }
  }
};
</script>

<style scoped>
</style>