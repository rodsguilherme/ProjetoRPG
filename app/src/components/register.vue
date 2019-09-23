<template>
  <div class="md-layout md-alignment-center" style="padding-top: 12vh">
    <div class="md-layout-item md-size-25">
      <md-field>
        <label for="username">Username</label>
        <md-input id="username" name="username" type="text"></md-input>
      </md-field>
      <md-field>
        <label for="password">Password</label>
        <md-input id="password" name="password" type="password"></md-input>
      </md-field>
      <div class="md-layout">
          <div class="md-layout-item"></div>
          <md-button class="md-dense md-raised md-accent" @click="cadatrar">Cadastrar</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cadastro",
  methods: {
      cadastrar(){
               
      }
  }
};

</script>

<style scoped>
</style>