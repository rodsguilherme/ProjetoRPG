<template>
  <v-btn  block raised>{{names}}</v-btn>
</template>

<style  scoped>
</style>

<script>
export default {
props: ['names'],
  name: "buttonLogin",
  data: () => ({
     
  })
};
</script>