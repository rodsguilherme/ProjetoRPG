<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title>
          <v-btn text to="/">{{ title }}</v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text to="/login">
            <span style="color: #6200EA">{{ titleLogin }}</span>
          </v-btn>
          <v-btn text @click="logout">{{ titleLogout }}</v-btn>
          <v-btn text icon to="/card">
            <v-icon>mdi-card</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-container>
      <router-view></router-view>
    </v-container>

    <v-row>
      <v-footer fixed class="flex-grow-1 font-weight-medium" elevation="10" color="#ededf0">
        <v-col cols="12" align="center">
          <v-btn :href="github" target="_blank" text icon :color="colorIconsSocials">
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
          <v-btn :href="linkedin" target="_blank" text icon :color="colorIconsSocials">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </v-col>
      </v-footer>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "ProjetoRpg",
  data: () => ({
    title: "Card Generator",
    titleLogin: "Entrar",
    titleLogout: "Sair",
    github: "https://github.com/GuilhermeRods",
    linkedin:
      "https://www.linkedin.com/in/guilherme-rodrigues-correa-603834179/",
    colorIconsSocials: "#6200EA",
    
  }),

  methods: {
    logout() {
      localStorage.removeItem("token");
    }
  }
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
</style>
