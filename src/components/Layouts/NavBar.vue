<template>
  <v-app-bar app color="primary" dark dense elevation="0" class="px-8">
    <v-toolbar-title>ADMIN</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon v-if="$vuetify.breakpoint.mdAndDown" @click="toggleDrawer">
      <v-icon>{{ icons.bars }}</v-icon></v-btn
    >
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn link text v-for="(i, n) in navItems" :key="n" :to="i.to">
        {{ i.title }}
      </v-btn>
    </div>

    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          elevation="0"
          color="white"
          outlined
          class="ml-7"
        >
          <v-icon left dense>
            {{ icons.account }}
          </v-icon>
          {{ $store.state.user.user.username }}
          <v-icon right>
            {{ icons.dropdown }}
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn block text link to="/profile">Profile</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block text @click="logout">Log Out</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import {
  mdiAccount as account,
  mdiMenuDown as dropdown,
  mdiMenu as bars,
} from "@mdi/js";
export default {
  props: {
    toggleDrawer: Function,
  },
  data: () => ({
    icons: {
      account,
      dropdown,
      bars,
    },
    navItems: [
      { title: "Users", to: "/" },
      { title: "Meetings", to: "/meetings" },
    ],
  }),
  methods: {
    logout() {
      localStorage.setItem("loggedIn", 0);
      localStorage.setItem("access_token", null);
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
