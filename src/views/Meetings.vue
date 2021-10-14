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
export default {
  name: "Home",

  components: {},
  data: () => ({
    search: "",
    headers: [
      {
        text: "Meeting Code",
        align: "start",
        value: "meetingCode",
      },
      { text: "Meeting Name", value: "meetingName" },
      { text: "Meeting Date", value: "meetingDate" },
      { text: "Meeting time", value: "meetingTime" },
    ],
    meetings: [],
  }),
  methods: {
    initialize() {
      this.meetings = [
        {
          meetingCode: "1234",
          meetingName: "Department meeting",
          meetingDate: "12 Oct 2021",
          meetingTime: "1:00 - 2:00 PM",
        },
        {
          meetingCode: "asdf",
          meetingName: "Internal status update",
          meetingDate: "12 Oct 2021",
          meetingTime: "1:00 - 2:00 PM",
        },
        {
          meetingCode: "auyty",
          meetingName: "Semester review",
          meetingDate: "12 Oct 2021",
          meetingTime: "1:00 - 2:00 PM",
        },
      ];
    },
  },
  created() {
    this.initialize();
  },
};
</script>
