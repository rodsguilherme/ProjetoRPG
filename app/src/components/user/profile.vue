<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card width="30%" min-height="700px" dark>
        <v-row justify="center" class="mt-10">
          <v-avatar size="150" v-if="imageExists">
            <v-img :src="user.image"></v-img>
          </v-avatar>

          <v-avatar v-else size="150" color="deep-purple lighten-2">
            <span class="white--text headline">{{name}}</span>
          </v-avatar>
        </v-row>
        <v-row justify="center" class="pt-12">
          <v-col cols="12" lg="11" md="8" class="mx-auto">
            <v-text-field label="Username" v-model="username"></v-text-field>
            <v-text-field label="E-mail" :value="email" readonly></v-text-field>
            <v-file-input label="Avatar" accept="image/*" v-model="image"></v-file-input>
            <v-btn block @click="edit" class="deep-purple lighten-2">Editar</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <div class="text-center">
      <v-snackbar v-model="snackbar" class="white--text" :timeout="timeout">
        {{ message }}
        <v-btn dark text @click="snackbar = false" class="white--text">Close</v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>



<script>
import axios from "axios";
export default {
  data: () => ({
    timeout: 2000,
    user: {},
    password: "",
    passwordConfirm: "",
    username: "",
    email: "",
    image: [],
    imageBase64: "",
    name: "",
    imageExists: "",
    message: "",
    snackbar: false
  }),
  watch: {
    image(val) {
      var file = val;
      var reader = new FileReader();
      reader.onloadend = () => {
        this.imageBase64 = reader.result;
      };
      reader.readAsDataURL(file);
    }
  },
  created() {
    axios
      .get("http://localhost:3000/v1/user", {
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
            if (!this.user.image) {
              this.name = this.user.username.substr(0, 1).toUpperCase();
              this.username = this.user.username;
              this.email = this.user.email;
              this.imageExists = false;
            } else {
              this.username = this.user.username;
              this.email = this.user.email;
              this.image = this.user.image;
              this.imageExists = true;
            }
          });
      });
  },
  methods: {
    edit() {
      axios
        .patch(
          `http://localhost:3000/v1/users/${this.user.idUser}`,
          {
            username: this.username,
            image: this.imageBase64
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user_token")}`
            }
          }
        )
        .catch(e => {
          console.log({ ruim: e.response.data });
        })
        .then(res => {
          this.snackbar = true;
          this.message = res.data;
        });
    }
  }
};
</script>

<style scoped>
</style>