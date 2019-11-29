<template>
  <v-container fluid>
      <v-card  min-height="20vh" width="61vw" class="mx-auto" dark>
        <v-row  class="mx-auto pt-12 mt-12" dense>
          <v-card-title
            class="display-1 font-weight-bold deep-purple--text text--lighten-2"
          >Opa, parece que você ainda não tem cards salvos :(</v-card-title>
        </v-row>
       
        <v-row class="mx-auto">
           <v-spacer></v-spacer>
      <v-card-actions >
        <v-btn  text class="deep-purple lighten-2" to="/">Create</v-btn>
      </v-card-actions>
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