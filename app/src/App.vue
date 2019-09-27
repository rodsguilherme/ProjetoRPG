<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title> <strong>{{ title }}</strong></v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text to="/login">
         <span style="color: #6200EA">{{titleLogin}}</span>
           </v-btn>
          <v-btn icon>
            <v-icon>mdi-card</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-container>
      <router-view></router-view>
    </v-container>

    <v-row>
      <v-footer absolute class="flex-grow-1 font-weight-medium" color="#E0E0E0">
          <strong>rodsguilherme@gmail.com</strong>
          <v-col offset="3">
            <strong>https://github.com/GuilhermeRods</strong>
          </v-col>
      <v-spacer></v-spacer>&copy;2019
      </v-footer>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "ProjetoRpg",
  data: () => ({
    title: 'Card Generator',
    titleLogin: 'Entrar'
  })
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
</style>
