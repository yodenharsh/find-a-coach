import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NotFound from "../pages/NotFound.vue";
import CoachDetail from "../pages/coaches/CoachDetails.vue";
import CoachList from "../pages/coaches/CoachList.vue";
import CoachRegisteration from "../pages/coaches/CoachRegisteration.vue";
import ContactCoach from "../pages/requests/ContactCoach.vue";
import RequestRecieved from "../pages/requests/RequestRecieved.vue";
import UserAuth from "../pages/auth/UserAuth.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  { path: "/register", component: CoachRegisteration },
  { path: "/requests", component: RequestRecieved },
  { path: "/coaches", component: CoachList },
  { path: "/auth", component: UserAuth },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
