<template>
  <v-container fluid class="mt-12" >
    <v-row>
      <v-col cols="12">
        <v-card width="30vw" height="75vh" class="mx-auto" elevation="10" dark>
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
              <v-text-field label="Username" v-model="username" outlined clearable></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" class="mx-auto">
              <v-text-field
                label="Password"
                v-model="password"
                outlined
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" class="mx-auto">
              <v-btn block color="blue" depressed dark @click="entrar">Sign in</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" class="mx-auto">
              <v-btn block dark depressed outlined to="register">Sign up</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-snackbar v-model="snackbar" :timeout="timeout" dark bottom>
        {{ message }}
        <v-btn dark text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data: () => ({
    username: null,
    password: null,
    message: "",
    snackbar: false,
    timeout: 6000,
    show1: false
  }),
  methods: {
    entrar() {
     
      axios

        .post("http://localhost:3000/v1/login", {
          username: this.username,
          password: this.password
        })
        .then(r => {
          this.message = r.data.connected;
          this.snackbar = true;
          localStorage.setItem("token", r.data.token);
        })
        .catch(e => {
          this.message = e.response.data;
          this.snackbar = true;
        })
        
    }
  }
};
</script>

<style scoped>
</style>
