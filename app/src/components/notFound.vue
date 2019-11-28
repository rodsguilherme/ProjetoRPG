<template>
  <v-container fluid>
    <v-card dark height="100vh">
      <v-row justify="center" class="pt-12">
        <v-card-title
          class=" card deep-purple--text text--lighten-2"
        >Opa, parece que você não tem cards salvos ainda :(</v-card-title>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "notFound"
};
</script>

<style scoped>
.card {
  border-bottom: 1px solid #d1c4e9;
}
</style>