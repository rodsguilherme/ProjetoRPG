<template>
  <v-container fluid>
    <v-card width="40vw" min-height="90vh" class="mx-auto" elevation="10" dark>
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
        <v-col cols="11" class="mx-auto" lg="11" md="11">
          <v-text-field label="Username"  maxlength="12"
            counter :rules="[rules.required]" v-model="username" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto" lg="11" md="11">
          <v-text-field
            label="E-mail"
            :rules="[rules.required, rules.email]"
            v-model="email"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto" lg="11" md="11">
          <v-text-field
            label="Password"
            :rules="[rules.required, rules.min]"
            v-model="password"
           
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto" lg="11" md="11">
          <v-file-input
            label="Imagem"
            persistent-hint
            hint="Image is not required."
            accept="image/*"
            v-model="image"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row class="pt-10">
        <v-col cols="11" class="mx-auto">
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
        <v-col cols="11" class="mx-auto">
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
    imageBase64: "",
    loader: null,
    loading: false,
    password: "",
    show1: false,
    rules: {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(value).toLowerCase()) || "E-mail inválido.";
      },
      min: value => value.length > 5 || "Minimu characters are 6 ",
      required: value => !!value || "Required."
    }
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
  methods: {
    cadastrar() {
      this.loading = true;

      axios
        .post("http://localhost:3000/v1/users/signup", {
          username: this.username,
          image: this.imageBase64,
          email: this.email,
          password: this.password
        })
        .catch(e => {
          this.message = e.response.data;
          this.snackbar = true;
        })
        .then(res => {
          console.log(res.data.message);
          localStorage.setItem("user_token", res.data.token);
          this.$eventHub.$emit("logged-register");
          this.$router.replace("inventory");
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