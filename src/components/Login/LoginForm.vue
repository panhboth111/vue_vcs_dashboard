<template>
  <v-container class="form_container   ">
    <v-form @submit.prevent="login">
      <div class="text-center mb-7">
        <div class="display-2 font-weight-bold primary--text mb-7">SARKH</div>
        <div class="headline font-weight-light">VIDEO CONFERENCING SYSTEM</div>
      </div>
      <v-text-field
        type="text"
        id="username"
        placeholder="username"
        outlined
        dense
        hide-details=""
        class="mb-2"
        v-model="username"
      ></v-text-field>
      <v-text-field
        type="password"
        id="password"
        placeholder="password"
        outlined
        dense
        hide-details=""
        class="mb-3"
        v-model="password"
      ></v-text-field>
      <div v-if="!loginStatus.success">{{ loginStatus.message }}</div>
      <v-btn block color="primary" type="submit" small>Login</v-btn>
    </v-form>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card class="d-flex justify-center pa-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        <span class="ml-5">Loading....</span>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    username: "",
    password: "",
    dialog: false,
    loginStatus: {
      success: true,
      message: "",
    },
  }),
  methods: {
    async login() {
      try {
        this.dialog = true;
        const res = await axios.post("/auth/login", {
          username: this.username,
          password: this.password,
        });

        if (res.status == 201) {
          const access_token = res.data["access_token"];
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("loggedIn", 1);
          window.location.replace("/");
        }
        this.dialog = false;
      } catch (error) {
        this.dialog = false;
        this.loginStatus.success = false;
        this.loginStatus.message = "Something went wrong";
        console.log(error.message);
      }
    },
  },
};
</script>

<style>
.form_container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
