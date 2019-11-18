<template>
  <stepper></stepper>
</template>

<script>
//import axios from "axios";
import stepper from "./stepper";
export default {
  components: { stepper },
  name: "card",
  data: () => ({
    message: null,
    active: null,
    model: null
  })
};
</script>


<style scoped>
</style>