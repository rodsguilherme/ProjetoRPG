import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      dark: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: '#2196F3'
      }
    }
  }
});
