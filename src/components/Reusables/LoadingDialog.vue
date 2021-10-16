<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card class="d-flex justify-center pa-12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="ml-5">Loading....</span>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
  },
};
</script>

<style></style>
