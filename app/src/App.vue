<template>
  <v-app>
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
//import /footerComponent from './components/footerComponent'

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    // login,
    menuComponent,
    //home

   // footerComponent
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
#app {
  background-color: rgb(141, 117, 153);
   background-image: url(http://www.photobackgroundhd.com/wp-content/uploads/2019/08/4k-wallpaper-fantasy.jpg);
   background-size: cover
}
</style>