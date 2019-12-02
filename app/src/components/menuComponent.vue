<template>
  <v-container fluid>
    <div v-if="!connected">
      <v-app-bar dark dense fixed width="100%" elevation="10">
        <v-toolbar-title :class="colorMenu">{{connected}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text :class="colorMenu" to="/">HOME</v-btn>
          <v-btn text :class="colorMenu" to="inventory">INVENTORY</v-btn>
          <v-btn text :class="colorMenu" to="login">login</v-btn>
          <v-btn text :class="colorMenu" to="register">SIGN UP</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>
    <div v-else>
      <v-app-bar app clipped-left dark dense absolute elevation="10">
        <v-toolbar-title :class="colorMenu">{{connected}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text :class="colorMenu" to="/">HOME</v-btn>
          <v-btn text :class="colorMenu" to="inventory">INVENTORY</v-btn>
          <v-menu bottom offset-y dark class="ml-4">
            <template  v-slot:activator="{ on }">
              <v-avatar  style="cursor: pointer"  v-on="on">
                <v-img :src="user.image"></v-img>
              </v-avatar>
            </template>
            <v-list >
              <v-list-item @click="logout">
                <v-list-item-title>Exit</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>
    </div>
    </v-container>
</template>



<script>
import axios from "axios";
export default {
  name: "componentMenu",
  data: () => ({
    title: "GENERATE CARD",
    colorMenu: "deep-purple--text text--lighten-2",
    connected: false,
    user: [],
    drawer: null,
    mini: true
  }),
  updated() {
    if (localStorage.getItem("user_token")) {
      this.connected = true;
    } else {
      this.connected = false;
    }
  },
  created() {
    if (localStorage.getItem("user_token")) {
      this.connected = true;
    } else {
      this.connected = false;
    }
    this.$eventHub.$on('logged-register', this.register)
     this.$eventHub.$on('login', this.logged)
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
    logged(){
      this.connected = true
    },
    register(){
     this.connected = true
    },
    logout() {
      this.connected = false;
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>