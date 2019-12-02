<template>
  <v-container fluid>
    <v-app-bar dark dense fixed width="100%" elevation="10">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title :class="colorMenu">{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :class="colorMenu" to="/">HOME</v-btn>
        <v-btn text :class="colorMenu" to="inventory">INVENTORY</v-btn>
        <v-btn text :class="colorMenu" @click="logout">LOGOUT</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      :mini-variant.sync="mini"
      mini-variant-width="95"
      dark
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar size="80">
          <v-img :src="user.image"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ user.username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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