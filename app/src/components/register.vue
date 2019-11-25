<template>
  <v-container fluid class="mt-8">
    <v-card width="30vw" height="85vh" class="mx-auto" elevation="10" dark>
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
        <v-col cols="11" class="mx-auto">
          <v-text-field label="Username" :rules="[rules.required]" v-model="username" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-text-field label="E-mail" :rules="[rules.required, rules.email]" v-model="email" clearable></v-text-field>
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
          {{email}} {{password}} {{username}}
        </v-col>
      </v-row>
      
      <v-row class="pt-12">
        <v-col cols="11" class="mx-auto">
          <v-btn block color="deep-purple lighten-2"  :loading="loading"
      :disabled="loading" depressed dark @click="cadastrar">Sign up</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-btn block dark depressed outlined to="login">Sign in</v-btn>
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
  nome: "register",
  data: () => ({
    email: '',
    username: '',
    loader: null,
    loading: false,
    password: '',
    snackbar: false,
    timeout: 6000,
    message: null,
    show1: false,
    rules: {
       email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return  pattern.test(String(value).toLowerCase()) || 'E-mail inválido.'
          },
       required: value => !!value || 'Required.',
    }
  }),
  methods: {
    cadastrar() {
            this.loading = true
      axios

        .post("http://localhost:3000/v1/users/signup", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .catch(e => {
          this.message = e.response.data;
          this.snackbar = true;
        })
        .then(r => {
          this.message = r.data;
          this.snackbar = true;
        })
        .finally(() => {this.loading = false
        this.username = ''
        this.email = ''
        this.password = ''})
    }
  }
};
</script>

<style scoped>
</style>