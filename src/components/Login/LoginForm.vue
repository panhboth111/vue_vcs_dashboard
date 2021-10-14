<template>
  <v-container class="form_container">
    <v-form>
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
      ></v-text-field>
      <v-text-field
        type="password"
        id="password"
        placeholder="password"
        outlined
        dense
        hide-details=""
        class="mb-3"
      ></v-text-field>
      <v-btn block color="primary" small link to="/">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.form_container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
