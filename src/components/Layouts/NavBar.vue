<template>
  <v-app-bar app color="primary" dark dense elevation="0" class="px-8">
    <v-toolbar-title>ADMIN</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn link text v-for="(i, n) in navItems" :key="n" :to="i.to">
      {{ i.title }}
    </v-btn>
    <v-menu transition="slide-y-transition" bottom offset-y>
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
          NEAK PANHBOTH
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
          <v-btn block text link to="/login">Log Out</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mdiAccount as account, mdiMenuDown as dropdown } from "@mdi/js";
export default {
  data: () => ({
    icons: {
      account,
      dropdown,
    },
    navItems: [
      { title: "Users", to: "/" },
      { title: "Meetings", to: "/meetings" },
    ],
  }),
};
</script>

<style></style>
