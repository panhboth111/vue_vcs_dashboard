<template>
  <v-container fluid class="mt-2">
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="1" lg="1">
            <div>
              <v-toolbar-title
                class="font-weight-bold mt-1 text-center headline"
                >Meetings</v-toolbar-title
              >
            </div>
          </v-col>
          <v-col cols="12" md="11" lg="11"
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
        </v-row>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="meetings"
          :items-per-page="5"
          class="elevation-0"
          height="77vh"
        ></v-data-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",

  components: {},
  data: () => ({
    search: "",
    headers: [
      {
        text: "Meeting Code",
        align: "start",
        value: "id",
      },
      { text: "Meeting Name", value: "title" },
      { text: "Meeting Date", value: "start_date" },
      { text: "Meeting time", value: "end_date" },
    ],
    meetings: [],
  }),
  methods: {
    async initialize() {
      try {
        const access_token = localStorage.getItem("access_token");
        const res = await axios.get("/admin/meeting/all?page=1&limit=10", {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        this.meetings = res.data["meetings"];
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
