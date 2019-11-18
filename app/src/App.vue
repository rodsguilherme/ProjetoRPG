<template>
  <v-app style="backgroundColor: #212121">
    <menuComponent></menuComponent>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
//import login from './components/login'
import menuComponent from "./components/menuComponent";
//import home from "./components/home";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    // login,
    menuComponent
    //home

    //footerComponent
  },
  computed: {

  }
};
</script>
<style >
*{
  margin: 0;
  padding: 0
}
</style>