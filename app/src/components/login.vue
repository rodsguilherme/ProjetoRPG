<template>
  <v-row>
    <v-col cols="12">
      <v-card width="28vw" height="70vh" class="mx-auto" elevation="10" color="#4A148C">
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
          <v-row>
            <v-col cols="10" offset="1">
              <v-text-field dark v-model="username" label="Usuário" type="text" clearable></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" offset="1">
              <v-text-field dark v-model="password" label="Senha" type="password" clearable></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" offset="1">
              <v-btn @click="entrar" block raised>Entrar</v-btn>
            </v-col>
            <v-col cols="10" raised offset="1">
              <v-btn block outlined dark to="/register">Cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-row>

        <v-snackbar v-model="snackbar" :timeout="timeout" dark bottom>
          {{ message }}
          <v-btn dark text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data: () => ({
    username: "",
    password: "",
    message: "",
    snackbar: false,
    timeout: 6000
  }),
  methods: {
    entrar(username, password) {
      axios

        .post("http://localhost:3000/api/user/login", {
          username: this.username,
          password: this.password
        })
        .catch(e => {
          this.message = e.response.data.err;
          this.snackbar = true;
        })
        .then(r => {
          this.message = r.data.sucess;
          this.snackbar = true;
          localStorage.setItem("token", r.data.token)
        });
    }
  }
};
</script>

<style scoped>
</style>
