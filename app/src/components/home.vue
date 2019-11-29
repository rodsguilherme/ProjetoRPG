<template>
  <stepper v-if="!connected"></stepper>
  <stepperLogged v-else></stepperLogged>
</template>

<script>
//import axios from "axios";
import stepper from "./stepper";
import stepperLogged from './stepperLogged'
export default {
  components: { stepper, stepperLogged },
  name: "card",
  data: () => ({
    connected: false

  }),
  created() {
    this.$eventHub.$on("logged", this.logged);
    this.$eventHub.$on("logout", this.logout);
    if(localStorage.getItem('user_token')) {
      this.connected = true
    }
  },
  beforeDestroy() {
    this.$eventHub.$off("logged");
  },

  methods: {
    logged() {
      this.connected = true;
    },
    logout() {
      this.connected = false;
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>


<style scoped>
</style>