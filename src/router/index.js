import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../views/Users.vue";
import Meetings from "../views/Meetings.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Users",
    component: Users,
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (to.fullPath === "/login") {
    if (loggedIn == 1) {
      next("/");
    }
  }
  if (to.fullPath !== "/login") {
    if (loggedIn == 0 || !loggedIn) {
      next("/login");
    }
  }
  next();
});

export default router;
