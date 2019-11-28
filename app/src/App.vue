<template>
  <v-app>
   
      <menuComponent v-if="!connected"></menuComponent>
    <menuCompLogged v-else></menuCompLogged>
    <v-container>
      <router-view></router-view>
    </v-container>
   
   
<div> {{connected}}</div>
  </v-app>
</template>

<script>

import menuCompLogged from './components/menuCompLogged'
import menuComponent from "./components/menuComponent";


export default {
  name: "App",

  data: () => ({
    connected: false
  }),
  components: {
    
    menuComponent,
    menuCompLogged
  },
  created() {
    this.$eventHub.$on('logged', this.logged)
    this.$eventHub.$on('logout', this.logout)
     
  }, methods: {
    logged(){
      this.connected = true
    },
    logout(){
      this.connected = false
    }
  },
  beforeDestroy() {
    this. this.$eventHub.$off('logged', this.logged)
  },
  
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