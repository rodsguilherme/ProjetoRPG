<template>
  <v-container gutter class="mt-12">
    <v-card max-width="500px"  min-height="565px"  class="mx-auto" elevation="20" dark>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center white--text">Login</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-text-field label="E-mail"  :rules="[rules.required, rules.email]" v-model="email" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-text-field
            label="Password"
            v-model="password"
            :rules="[rules.required]"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="pt-12">
        <v-col cols="11" class="mx-auto">
          <v-btn block color="deep-purple lighten-2 " depressed dark @click="entrar">Login</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-btn block dark depressed outlined to="register">Sign up</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="timeout" dark bottom>
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data: () => ({
    email: '',
    password: '',
    message: "",
    snackbar: false,
    timeout: 6000,
    show1: false,
    rules: {
       email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return  pattern.test(value) || 'E-mail inválido.'
          },
       required: value => !!value || 'Required.',
    }
  }),
  methods: {
    entrar() {
      axios

        .post("http://localhost:3000/v1/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.message = res.data.connected;
          this.snackbar = true;
          localStorage.setItem("user_token", res.data.token);
          this.$eventHub.$emit('logged')
          this.$router.push('inventory')
        })
        .catch(e => {
          this.message = e.response.data;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style scoped>
</style>
