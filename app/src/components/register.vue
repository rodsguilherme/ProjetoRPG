<template>
  <v-container gutter class="mt-12">
    <v-card max-width="500px" min-height="565px" class="mx-auto" elevation="10" dark>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center white--text">Register</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="mx-auto">
          <v-text-field label="Username" :rules="[rules.required]" v-model="username" clearable></v-text-field>
        </v-col>
        <v-col>
          <v-file-input
            label="Avatar"
            accept
            type="file"
            @change="onSelect"
            :rules="[rules.required]"
            v-model="image"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-text-field
            label="E-mail"
            :rules="[rules.required, rules.email]"
            v-model="email"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-text-field
            label="Password"
            :rules="[rules.required]"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="pt-12">
        <v-col cols="10" class="mx-auto">
          <v-btn
            block
            color="deep-purple lighten-2"
            :loading="loading"
            :disabled="loading"
            dark
            @click="cadastrar"
          >Sign up</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" class="mx-auto">
          <v-btn block dark outlined to="login">Login</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  nome: "register",
  data: () => ({
    email: "",
    username: "",
    image: [],
    imagetoSave: "",
    loader: null,
    loading: false,
    password: "",
    show1: false,
    rules: {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(value).toLowerCase()) || "E-mail inválido.";
      },
      required: value => !!value || "Required."
    }
  }),
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.image = file;
    },
    cadastrar() {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.image)
      axios
        .post("http://localhost:3000/v1/users/signup", {
          username: this.username,
          image: this.image,
          email: this.email,
          password: this.password
        })
        .catch(e => {
          console.log(e.data);
          this.snackbar = true;
        })
        .then(res => {
          console.log(res.data.message);
          localStorage.setItem("user_token", res.data.token);
          this.$eventHub.$emit("logged-register");
          this.$router.push("inventory");
        })
        .finally(() => {
          this.loading = false;
          this.username = "";
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style scoped>
</style>