<template>
  <v-app>
    <menuComponent ></menuComponent>
  </v-app>
</template>

<script>

import menuComponent from "./components/menuComponent";
export default {
  name: "App",
  data: () => ({
    connected: false
  }),
  components: {
    menuComponent,

  },
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
#app {
  background-color: rgb(141, 117, 153);
  background-image: url(http://www.photobackgroundhd.com/wp-content/uploads/2019/08/4k-wallpaper-fantasy.jpg);
  background-size: cover;
}
</style>