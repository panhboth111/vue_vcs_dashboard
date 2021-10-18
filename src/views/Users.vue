<template>
  <v-container fluid class="mt-2">
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="1" lg="1">
            <div>
              <v-toolbar-title
                class="font-weight-bold mt-1 text-center headline"
                >USERS</v-toolbar-title
              >
            </div>
          </v-col>
          <v-col cols="12" md="9" lg="9"
            ><v-text-field
              class="mr-4"
              v-model="search"
              dense
              append-icon="mdi-magnify"
              label="Search"
              single-line
              outlined
            ></v-text-field
          ></v-col>
          <v-col cols="12" md="2" lg="2">
            <v-btn block dark color="primary" @click="createDialog = true"
              >CREATE A NEW USER</v-btn
            >
            <UserDialog
              :dialog="createDialog"
              :userObj="newUser"
              :closeDialog="closeCreateDialog"
              :dialogConfirm="submitCreateForm"
              :errorMessage="errorMessage"
              dialogTitle="Creating a new user"
              :editing="false"
            />
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="15"
          :search="search"
          class="elevation-0"
          height="77vh"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon class="mr-2 " @click="editUserBtnClicked(item)"
              ><v-icon small> mdi-pencil </v-icon></v-btn
            >

            <v-btn icon @click="deleteUser(item)">
              <v-icon small>
                mdi-delete
              </v-icon></v-btn
            >
          </template>
          <template v-slot:[`item.role`]="{ item }">
            <div v-if="item.role == 0">ALPHA</div>
            <div v-else-if="item.role == 1">ADMIN</div>
            <div v-else-if="item.role == 2">USER</div>
          </template>
          <template v-slot:[`item.isActive`]="{ item }">
            <v-chip
              class="white--text font-weight-light"
              :color="item.isActive ? 'green' : 'amber'"
            >
              {{ item.isActive ? "activated" : "disabled" }}
            </v-chip>
          </template>
        </v-data-table>
      </v-container>
      <UserDialog
        :dialog="editDialog"
        :userObj="editingUser"
        :closeDialog="closeEditDialog"
        :dialogConfirm="submitEditForm"
        :errorMessage="errorMessage"
        dialogTitle="Editing user information"
        :editing="true"
      />
      <LoadingDialog :dialog="loadingDialog" />
    </v-card>
  </v-container>
</template>

<script>
import UserDialog from "../components/Home/UserDialog.vue";
import LoadingDialog from "../components/Reusables/LoadingDialog.vue";
import axios from "axios";
export default {
  name: "Home",

  components: {
    UserDialog,
    LoadingDialog,
  },
  data: () => ({
    createDialog: false,
    editDialog: false,
    loadingDialog: false,
    errorMessage: {
      display: false,
      message: "",
    },
    newUser: {
      username: "",
      email: "",
      displayName: "",
      phone: "",
      role: 2,

      password: "",
      confirmPassword: "",
    },
    editingUser: {},
    search: "",
    roles: [
      { name: "ALPHA", id: 0 },
      { name: "ADMIN", id: 1 },
      { name: "USER", id: 2 },
      { name: "ROUGE", id: 3 },
    ],
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      {
        text: "Username",
        value: "username",
      },
      {
        text: "Display Name",
        value: "displayName",
      },
      { text: "Phone", value: "phone" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Status", value: "isActive" },
      { text: "Status", value: "isActive", align: " d-none" },
      { text: "Action", value: "actions" },
    ],
    users: [],
  }),
  methods: {
    async initialize() {
      const access_token = localStorage.getItem("access_token");
      const res = await axios.get("/admin/user/all", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      this.users = res.data;
    },
    closeCreateDialog() {
      this.createDialog = false;
      this.errorMessage = {
        display: false,
        message: "",
      };
      this.newUser = {};
    },
    closeEditDialog() {
      this.editDialog = false;
      this.errorMessage = {
        display: false,
        message: "",
      };
      this.editingUser = {};
    },
    async submitCreateForm() {
      try {
        this.loadingDialog = true;
        const access_token = localStorage.getItem("access_token");
        const { confirmPassword, ...data } = this.newUser;
        const res = await axios.post("/admin/user", data, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        console.log(res.data);
        if (res.status == 201) {
          this.users.push(res.data);
          this.createDialog = false;
        }
        this.loadingDialog = false;

        this.newUser = {
          username: "",
          email: "",
          phone: "",
          role: "",
          password: "",
          confirmPassword: "",
          active: true,
        };
      } catch (error) {
        console.log(error.message);
        this.errorMessage.display = true;
        this.errorMessage.message = "Something went wrong. Please try again.";
        this.loadingDialog = false;
      }
    },
    async submitEditForm() {
      try {
        this.loadingDialog = true;
        const access_token = localStorage.getItem("access_token");
        const { displayName, phone, email, isActive, role } = this.editingUser;
        const res = await axios.put(
          `/admin/user/${this.editingUser.id}`,
          { displayName, phone, email, isActive, role },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        console.log(res.data);
        this.loadingDialog = false;
        this.editDialog = false;

        this.users = this.users.map((u) =>
          u.id !== this.editingUser.id ? u : this.editingUser
        );
        this.editingUser = {};
      } catch (error) {
        this.errorMessage.display = true;

        this.errorMessage.message = "Something went wrong. Please try again.";
        this.loadingDialog = false;
      }
    },
    editUserBtnClicked(user) {
      this.editingUser = { ...user };
      this.editDialog = true;
    },

    async deleteUser(user) {
      try {
        const access_token = localStorage.getItem("access_token");
        const res = await axios.delete(`/admin/user/${user.id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        this.users = this.users.filter((u) => u.id !== user.id);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.initialize();
  },
};
</script>
