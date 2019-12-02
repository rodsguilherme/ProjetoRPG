<template>
  <v-container fluid>
    <div v-if="!connected">
      <v-app-bar dark dense fixed width="100%" elevation="10">
        <v-toolbar-title :class="colorMenu">{{title}}</v-toolbar-title>
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
        <v-toolbar-title :class="colorMenu">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text :class="colorMenu" to="/">HOME</v-btn>
          <v-btn text :class="colorMenu" to="inventory">INVENTORY</v-btn>
          <v-menu bottom offset-y dark class="ml-4">
            <template v-if="imageExists" v-slot:activator="{ on }">
              <v-avatar style="cursor: pointer" v-on="on">
                <v-img :src="user.image"></v-img>
              </v-avatar>
            </template>
            <template v-else v-slot:activator="{ on }">
              <v-avatar color="deep-purple lighten-2" style="cursor: pointer" v-on="on">
                <span class="white--text headline">{{username}}</span>
              </v-avatar>
            </template>

            <v-list>
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
    username: "",
    drawer: null,
    mini: true,
    imageExists: ""
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
          .catch(e => {
            console.log(e.response.status);
            if (e.response.status == 404) {
              localStorage.clear();
            }
          })
          .then(response => {
            if (!response.data[0].image) {
              this.imageExists = false;
              this.username = response.data[0].username
                .substr(0, 1)
                .toUpperCase();
            } else {
              this.imageExists = true;
              this.user = response.data[0];
            }
          });
      });
    this.$eventHub.$on("logged-register", this.register);
    this.$eventHub.$on("login", this.logged);
  },
  methods: {
    logged() {
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
            .catch(e => {
              if (e.response.status == 404) {
                this.$router.push("/");
              }
            })
            .then(response => {
              if (!response.data[0].image) {
                this.imageExists = false;
                this.username = response.data[0].username
                  .substr(0, 1)
                  .toUpperCase();
              } else {
                this.imageExists = true;
                this.user = response.data[0];
              }
            });
        });
      this.connected = true;
    },
    register() {
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
            .catch(e => {
              if (e.response.status == 404) {
                this.$router.push("/");
              }
            })
            .then(response => {
              if (!response.data[0].image) {
                this.imageExists = false;
                this.username = response.data[0].username
                  .substr(0, 1)
                  .toUpperCase();
              } else {
                this.imageExists = true;
                this.user = response.data[0];
              }
            });
        });
      this.connected = true;
    },
    logout() {
      this.username = "";
      this.connected = false;
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>