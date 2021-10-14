<template>
  <v-app>
    <NavBar v-if="$route.name !== 'Login'" />
    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/Layouts/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data: () => ({
    //
  }),
};
</script>
