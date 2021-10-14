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
              dialogTitle="Creating a new user"
              :editing="false"
            />
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
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
          <template v-slot:[`item.active`]="{ item }">
            <v-chip
              class="white--text font-weight-light"
              :color="item.active ? 'green' : 'amber'"
            >
              {{ item.active ? "activated" : "disabled" }}
            </v-chip>
          </template>
        </v-data-table>
      </v-container>
      <UserDialog
        :dialog="editDialog"
        :userObj="editingUser"
        :closeDialog="closeEditDialog"
        :dialogConfirm="submitEditForm"
        dialogTitle="Editing user information"
        :editing="true"
      />
    </v-card>
  </v-container>
</template>

<script>
import UserDialog from "../components/Home/UserDialog.vue";
export default {
  name: "Home",

  components: {
    UserDialog,
  },
  data: () => ({
    createDialog: false,
    editDialog: false,
    newUser: {
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    editingUser: {},
    search: "",
    roles: ["admin", "user"],
    headers: [
      {
        text: "Username",
        align: "start",
        value: "username",
      },
      { text: "Phone", value: "phone" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Status", value: "active" },

      { text: "Action", value: "actions" },
    ],
    users: [],
  }),
  methods: {
    initialize() {
      this.users = [
        {
          username: "noobmaster69",
          phone: "012 123 123",
          email: "noobmaster@gmail.com",
          password: "12345678",
          role: "admin",
          active: true,
          id: 0,
        },
        {
          username: "johncena",
          phone: "012 123 123",
          password: "12345678",
          email: "johncena@gmail.com",
          role: "user",
          active: true,
          id: 1,
        },
        {
          username: "superman",
          phone: "012 123 123",
          email: "supes@gmail.com",
          password: "12345678",
          role: "user",
          active: false,
          id: 2,
        },
        {
          username: "dinosaur",
          phone: "012 123 123",
          email: "dinoboy@gmail.com",
          password: "12345678",
          role: "user",
          active: false,
          id: 3,
        },
      ];
    },
    closeCreateDialog() {
      this.createDialog = false;
      this.newUser = {};
    },
    closeEditDialog() {
      this.editDialog = false;
      this.editingUser = {};
    },
    submitCreateForm() {
      this.createDialog = false;
      this.newUser = { ...this.newUser, id: this.users.length };
      this.users.push(this.newUser);
      this.newUser = {
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
        active: true,
      };
    },
    submitEditForm() {
      this.editDialog = false;
      this.users = this.users.map((u) =>
        u.id !== this.editingUser.id ? u : this.editingUser
      );
      this.editingUser = {};
    },
    editUserBtnClicked(user) {
      this.editingUser = { ...user };
      this.editDialog = true;
    },

    deleteUser(user) {
      this.users = this.users.filter((u) => u.id !== user.id);
    },
  },
  created() {
    this.initialize();
  },
};
</script>
