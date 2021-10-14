import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#054da1",
        secondary: "#ff0000",
        accent: "#e3bd00",
        error: "#b71c1c",
      },
    },
  },
});
