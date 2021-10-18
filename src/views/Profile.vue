<template>
  <div>
    <div class="profile-cover d-flex justify-center align-center">
      <div>
        <v-avatar color="primary" size="150">
          <span class="white--text text-h2">{{ user.username[0] }}</span>
        </v-avatar>
      </div>
    </div>

    <div class="d-flex justify-center mt-5 pa-6">
      <div>
        <div>
          <span class="text-h4 font-weight-bold mr-2">User Information</span
          ><v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon class="mb-2" @click="toggleEdit" v-on="{ ...tooltip }"
                ><v-icon>{{ icons.edit }}</v-icon></v-btn
              >
            </template>
            <span>Edit user information</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                icon
                class="mb-2"
                @click="changePasswordDialog = !changePasswordDialog"
                v-on="{ ...tooltip }"
                ><v-icon>{{ icons.password }}</v-icon></v-btn
              >
            </template>
            <span>Change Password</span>
          </v-tooltip>
          <v-dialog v-model="changePasswordDialog" width="400">
            <v-card>
              <div class="text-h5 px-3 py-2 primary white--text">
                Change Password
              </div>
              <v-container>
                <v-form @submit.prevent="changePassword">
                  <v-text-field
                    type="password"
                    placeholder="current password"
                    v-model="changePasswordObj.password"
                    outlined
                    dense
                    hide-details
                    class="mb-1"
                  ></v-text-field>
                  <v-text-field
                    v-model="changePasswordObj.newPassword"
                    type="password"
                    placeholder="New password"
                    outlined
                    dense
                    hide-details
                    class="mb-1"
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    v-model="changePasswordObj.confirmPassword"
                    placeholder="Confirm new password"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                  <div class="red--text">{{ errorMsg }}</div>
                  <v-btn type="submit" block color="primary" class="mt-2">
                    Save
                  </v-btn>
                </v-form>
              </v-container>
            </v-card>
          </v-dialog>
        </div>

        <div class="mt-4">
          <v-form @submit.prevent="submit">
            <v-text-field
              v-for="(f, n) in fields"
              :key="n"
              :type="f.type"
              :name="f.property"
              :id="f.property"
              :placeholder="f.label"
              :value="user[f.property]"
              v-model="user[f.property]"
              :disabled="disabled"
              outlined
              hide-details
              dense
              class="mb-2"
            >
            </v-text-field>
            <v-btn class="primary" block type="submit" v-if="!disabled"
              >Save</v-btn
            >
            <v-btn
              outlined
              color="red"
              class="mt-2"
              block
              v-if="!disabled"
              @click="cancelEdit"
              >Cancel</v-btn
            >
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiPencil as edit, mdiLock as password } from "@mdi/js";
import axios from "axios";
export default {
  data: () => ({
    icons: { edit, password },
    fields: [
      { label: "Email", property: "email", type: "text" },
      { label: "Phone", property: "phone", type: "text" },
    ],
    disabled: true,
    changePasswordDialog: false,
    changePasswordObj: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    errorMsg: null,
  }),
  computed: {
    user() {
      return this.$store.state.user.displayUser;
    },
  },
  methods: {
    toggleEdit() {
      if (!this.disabled) {
        this.$store.dispatch("user/resetUser");
      }
      this.disabled = !this.disabled;
    },

    cancelEdit() {
      this.$store.dispatch("user/resetUser");

      this.disabled = true;
    },
    async changePassword() {
      try {
        if (
          this.changePasswordObj.newPassword !==
          this.changePasswordObj.confirmPassword
        ) {
          this.errorMsg = "new password and confirm password must match";
        } else {
          const access_token = localStorage.getItem("access_token");
          const res = await axios.put(
            "/user/changepassword",
            this.changePasswordObj,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );
          this.changePasswordDialog = false;
          this.changePasswordObj = {
            password: "",
            newPassword: "",
            confirmPassword: "",
          };
        }
      } catch (error) {
        this.errorMsg = "Incorrect password";
      }
    },
    async submit() {
      try {
        const {
          username,
          ...submitUserData
        } = this.$store.state.user.displayUser;
        const access_token = localStorage.getItem("access_token");
        const res = await axios.put("/user", submitUserData, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        this.disabled = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {},
};
</script>

<style>
.profile-cover {
  background: grey;
  width: 100%;
  height: 250px;
}
</style>
