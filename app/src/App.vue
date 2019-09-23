<template>
  <div class="container">
    <md-toolbar class="md-primary" md-elevation="2">
      <span class="md-title" style="flex: 1;">Card Generator</span>

      <md-button class="md-accent">
        <router-link to="/" style="color: white; text-decoration: none;">Home</router-link>
      </md-button>

      <md-button v-if="connected === false">
        <router-link to="/login" style="color: white; text-decoration: none;">Entrar</router-link>
      </md-button>

      <md-button v-else>Sair</md-button>
    </md-toolbar>
    <div>
      <md-button class="md-fab md-fab-bottom-right md-accent" v-if="connected === false" @click="error">
        <md-icon>save</md-icon>
      </md-button>
      <md-button class="md-fab md-fab-bottom-right md-accent" v-else>
        <route-link to="/cards" style="color: white; text-decoration: none;">
          <md-icon>save</md-icon>
        </route-link>
      </md-button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "RpgComponent",
  data: () => ({
    menuVisible: false,
    title: "Card Generator",
    connected: false
  }),

  methods: {
    error() {
      let result = window.confirm("Entre para ver sua ficha!");
      if (this.connected === false) {
        if (result === true) window.open("#/login", "Valeu!");
      } else this.connected = true;
    }
  }
};
</script>

<style lang="scss">
md-app-content {
  width: 100%;
  height: 100%;
}
</style>
