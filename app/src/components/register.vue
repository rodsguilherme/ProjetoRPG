<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" width="28vw" height="70vh" elevation="20" color="#4A148C">
        <v-row>
          <v-col cols="12">
            <h1 class="text-center white--text">Cadastro</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field
              dark
              v-model="username"
              id="username"
              label="Usuário"
              type="text"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field
              dark
              v-model="password"
              id="password"
              label="Senha"
              type="password"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-btn block @click="cadastrar">Cadastrar</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-btn dark block to="login" outlined>Entrar</v-btn>
          </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" :timeout="timeout" dark bottom>
          {{ errorMessage }}
          <v-btn dark text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  nome: "register",
  data: () => ({
    username: "",
    password: "",
    snackbar: false,
    timeout: 6000,
    errorMessage: ''
  }),
  methods: {
    cadastrar(username, password) {
      axios
        .post("http://localhost:3000/api/user/", {
          username: this.username,
          password: this.password
        })
        .catch(e => {
          this.errorMessage = e.response.data.err;
          this.snackbar = true;
        })
        .then(r => {
            this.errorMessage = r.data.sucess;
            this.snackbar = true;
        })
    }
  }
};
</script>

<style scoped>
</style>