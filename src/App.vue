<template>
  <v-app>
    <NavBar v-if="$route.name !== 'Login'" :toggleDrawer="toggleDrawer" />
    <v-navigation-drawer app fixed right temporary v-model="drawer">
      <v-list>
        <v-list-item
          v-for="(item, n) in drawerItems"
          :key="n"
          link
          :to="item.to"
          class="text-center"
        >
          <v-list-item-content>
            <v-list-item-title class="primary--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
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
    drawer: false,
    drawerItems: [
      { title: "Users", to: "/" },
      { title: "Meetings", to: "/meetings" },
    ],
  }),
  methods: {
    toggleDrawer() {
      console.log("triggered");
      this.drawer = !this.drawer;
    },
    logout() {
      localStorage.setItem("loggedIn", 0);
      localStorage.setItem("access_token", null);
      this.$router.push("/login");
    },
  },
  async created() {
    await this.$store.dispatch("user/init");
  },
};
</script>
