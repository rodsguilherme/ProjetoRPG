<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card width="30%" min-height="700px" dark>
        <v-row justify="center" class="mt-10">
          <v-avatar v-if="imageExists">
            <v-img :src="user.image"></v-img>
          </v-avatar>

          <v-avatar v-else size="150" color="deep-purple lighten-2">
            <span class="white--text headline">{{name}}</span>
          </v-avatar>
        </v-row>
        <v-row justify="center" class="pt-12">
          <v-col cols="12" lg="11" md="8" class="mx-auto">
            <v-text-field label="Username" :value="user.username"></v-text-field>
            <v-file-input label="Avatar" v-model="user.image" accept="image/*"></v-file-input>
            <v-btn block @click="edit" class="deep-purple lighten-2">Editar</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>



<script>
import axios from "axios";
export default {
  data: () => ({
    user: {},
    password: "",
    passwordConfirm: "",
    username: "",
    imageBase64: {},
    name: "",
    imageExists: ""
  }),
  watch: {
    image(val) {
      var file = val;
      var reader = new FileReader();
      reader.onloadend = () => {
        console.log("RESULT", reader.result);
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
              this.imageExists = false;
            } else {
              this.image = this.user.image;
              this.imageExists = true;
            }
          });
      });
  },
  methods: {
    edit() {
      axios.put(
        `http://localhost:3000/v1/users/${this.user.idUser}`,
        {
          username: this.user.username,
          image: this.user.image
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`
          }
        }
      );
    }
  }
};
</script>

<style scoped>
</style>