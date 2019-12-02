<template>
  <v-container fluid>
    <v-card min-height="10vh" width="100vw" dark>
      <v-row class="mx-auto ml-10">
        <v-card-title
          class="display-1 font-weight-bold deep-purple--text text--lighten-2"
        >Opa, parece que você ainda não tem cards salvos :(</v-card-title>
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
  border-bottom: 1px solid #875fd181;
}
</style>