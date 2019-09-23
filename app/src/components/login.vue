<template>
  <div class="md-layout md-alignment-center" style="padding-top: 12vh">
    <div class="md-layout-item md-size-25">
      <div class="md-layout-item">
        <md-field>
          <label for="username">Username</label>
          <md-input v-model="username" id="username" type="text"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label for="password">Password</label>
          <md-input v-model="password" id="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="md-layout">
        <div class="md-layout-item"></div>
        <md-button class="md-dense md-raised md-accent" @click="entrar" id="loginButton">Entrar</md-button>
        <md-button class="md-dense md-raised md-accent" id="loginButton">
          <router-link to="/register" style="color: white; text-decoration: none;">Cadastrar</router-link>
        </md-button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "login",
  data: () => ({
    username: "guilherme",
    password: "1234"
  }),

  methods: {
    entrar() {
      if (this.username === "guilherme" && this.password === "1234") {
        this.connected = true;
      } else this.connected = false;
    }
  }
};
</script>

<style  lang="scss" scoped>
#loginButton:hover {
  background-color: #cf000f;
}
</style>