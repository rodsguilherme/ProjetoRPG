<template>
  <v-container fluid class="mt-12">
    <v-row>
      <v-col cols="12">
        <v-card width="30vw" height="75vh" class="mx-auto" elevation="10" dark>
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
              <v-btn block color="blue" depressed dark @click="cadastrar">Sign up</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11" class="mx-auto">
              <v-btn block dark depressed outlined to="login">Sign in</v-btn>
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
  nome: "register",
  data: () => ({
    username: null,
    password: null,
    snackbar: false,
    timeout: 6000,
    message: null,
    show1: false
  }),
  methods: {
    cadastrar() {
      axios
        .post("http://localhost:3000/v1/users/signup", {
          username: this.username,
          password: this.password
        })
        .catch(e => {
          this.message = e.response.data;
          this.snackbar = true;
        })
        .then(r => {
          this.message = r.data;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style scoped>
</style>