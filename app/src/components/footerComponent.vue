<template>
  <v-footer dark padless fixed>
    <v-card class="flex" flat tile>
      <v-card-title class="deep-purple lighten-1">
        <strong class="subheading">Alguma sugestão? Entre em contato com a gente!</strong>

        <v-spacer></v-spacer>

        <v-btn
          class="mx-4"
          href="https://github.com/GuilhermeRods"
          target="_blank"
          rel="noopener"
          dark
          icon
        >
          <v-icon size="24px">mdi-github-face</v-icon>
        </v-btn>
        <v-btn
          class="mx-4"
          href="https://www.instagram.com/rodsguilherme_/"
          target="_blank"
          rel="noopener"
          dark
          icon
        >
          <v-icon size="24px">mdi-instagram</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>Guilherme Rodrigues</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
  
  })
};
</script>


<style lang="stylus" scoped></style>