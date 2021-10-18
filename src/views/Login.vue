<template>
  <v-container fluid class="login_view grey lighten-3">
    <v-card class="login_card">
      <div v-if="$vuetify.breakpoint.mdAndUp"><LoginThumbnail /></div>
      <div><LoginForm /></div>
    </v-card>
  </v-container>
</template>

<script>
import LoginThumbnail from "../components/Login/LoginThumbnail.vue";
import LoginForm from "../components/Login/LoginForm.vue";
export default {
  components: { LoginThumbnail, LoginForm },
};
</script>

<style>
.login_view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: "#EEEEEE";
}
.login_card {
  height: 100%;
  width: 100%;
}
@media screen and (min-width: 1025px) {
  .login_view {
    padding: 10rem 15rem;
  }
  .login_card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
