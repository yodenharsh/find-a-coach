import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../pages/NotFound.vue";
//import CoachDetail from "../pages/coaches/CoachDetails.vue";
import CoachList from "../pages/coaches/CoachList.vue";
//import CoachRegisteration from "../pages/coaches/CoachRegisteration.vue";
//import ContactCoach from "../pages/requests/ContactCoach.vue";
//import RequestRecieved from "../pages/requests/RequestRecieved.vue";
//import UserAuth from "../pages/auth/UserAuth.vue";
import store from "../store/index";

const CoachDetail = () => import("../pages/coaches/CoachDetails.vue");
const CoachRegisteration = () =>
  import("../pages/coaches/CoachRegisteration.vue");
const ContactCoach = () => import("../pages/requests/ContactCoach.vue");
const RequestRecieved = () => import("../pages/requests/RequestRecieved.vue");
const UserAuth = () => import("../pages/auth/UserAuth.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  {
    path: "/register",
    component: CoachRegisteration,
    meta: { requiresAuth: true },
  },
  {
    path: "/requests",
    component: RequestRecieved,
    meta: { requiresAuth: true },
  },
  { path: "/coaches", component: CoachList },
  { path: "/auth", component: UserAuth, meta: { requiresUnAuth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
