<template>
  <v-app>
    <menuComponent></menuComponent>
    <v-btn style="margin-bottom: 30vh" class="blue" dark fab absolute bottom right to="home">
      <v-icon>mdi-file-document-box</v-icon>
    </v-btn>
      <router-view></router-view>

    
  </v-app>
</template>

<script>
//import login from './components/login'
import menuComponent from "./components/menuComponent";
import home from "./components/home";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    // login,
   menuComponent,
   home,

    //footerComponent
  }
};
</script>
