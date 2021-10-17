import axios from "axios";
export default {
  namespaced: true,
  state: {
    user: { username: "" },
  },
  getters: {},
  mutations: {
    init: (state, user) => (state.user = user),
  },
  actions: {
    async init(ctx) {
      try {
        const access_token = localStorage.getItem("access_token");
        if (access_token != "null") {
          console.log("here");
          const res = await axios.get("/admin/user", {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          if (res.status == 200) {
            ctx.commit("init", res.data);
            localStorage.setItem("loggedIn", 1);
          } else {
            localStorage.setItem("loggedIn", 0);
          }
        } else {
          localStorage.setItem("loggedIn", 0);
        }
      } catch (error) {
        localStorage.setItem("loggedIn", 0);
      }
    },
  },
};
