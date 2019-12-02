<template>
  <v-container fluid>
    <v-app-bar app clipped-left dark dense absolute elevation="10">
      <v-toolbar-title :class="colorMenu">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :class="colorMenu" to="/">HOME</v-btn>
        <v-btn text :class="colorMenu" to="inventory">INVENTORY</v-btn>
        <v-menu bottom offset-y dark>
          <template v-slot:activator="{ on }">
            <v-avatar class="mx-auto" v-on="on">
              <v-img :src="user.image"></v-img>
            </v-avatar>
          </template>
          <v-list style="cursor: pointer">
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>



<script>
import axios from "axios";
export default {
  name: "componentMenulogged",
  data: () => ({
    title: "GENERATE CARD",
    colorMenu: "deep-purple--text text--lighten-2",
    user: [],
    drawer: null,
    mini: true
  }),
  created() {
    axios
      .get(`http://localhost:3000/v1/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
      })
      .then(res => {
        axios
          .get(`http://localhost:3000/v1/users/${res.data.idUser}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
          })
          .then(response => {
            this.user = response.data[0];
          });
      });
  },
  methods: {
    logout() {
      this.$eventHub.$emit("logout");
    }
  }
};
</script>

<style scoped>
</style>