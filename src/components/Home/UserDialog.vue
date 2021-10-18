<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        {{ dialogTitle }}
      </v-card-title>

      <v-form @submit.prevent="dialogConfirm">
        <v-container>
          <v-text-field
            dense
            hide-details
            outlined
            placeholder="Username"
            v-model="userObj.username"
            v-if="!editing"
            type="text"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            dense
            hide-details
            outlined
            placeholder="Display Name"
            v-model="userObj.displayName"
            type="text"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            dense
            hide-details
            outlined
            v-if="!editing"
            placeholder="Password*"
            v-model="userObj.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-remove'"
            @click:append="() => (show = !show)"
            :type="show ? 'text' : 'password'"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            dense
            hide-details
            outlined
            placeholder="Confirm password*"
            v-model="userObj.confirmPassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-remove'"
            @click:append="() => (show = !show)"
            :type="show ? 'text' : 'password'"
            class="mb-3"
            v-if="!editing"
          ></v-text-field>
          <v-text-field
            dense
            hide-details
            outlined
            placeholder="Email"
            v-model="userObj.email"
            type="email"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            dense
            hide-details
            outlined
            placeholder="Phone"
            v-model="userObj.phone"
            type="text"
            class="mb-3"
          ></v-text-field>
          <v-select
            :items="roles"
            :item-text="'name'"
            :item-value="'id'"
            label="Role"
            v-model="userObj.role"
            outlined
            dense
          ></v-select>
          <v-switch
            v-if="editing"
            v-model="userObj.isActive"
            readonly
            :label="userObj.isActive ? 'activated' : 'disabled'"
          ></v-switch>

          <div v-if="errorMessage.display" class="red--text mb-2">
            {{ errorMessage.message }}
          </div>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="red" text @click="closeDialog">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text type="submit">
              {{ editing ? "Confirm" : "Create" }}
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiEye as visible, mdiEyeRemove as hide } from "@mdi/js";
export default {
  props: {
    dialog: Boolean,
    dialogTitle: String,
    dialogConfirm: Function,
    closeDialog: Function,
    userObj: Object,
    editing: Boolean,
    errorMessage: Object,
  },
  data: () => ({
    roles: [
      { name: "ALPHA", id: 0 },
      { name: "ADMIN", id: 1 },
      { name: "USER", id: 2 },
    ],
    show: false,
    icons: {
      visible,
      hide,
    },
  }),
};
</script>

<style></style>
