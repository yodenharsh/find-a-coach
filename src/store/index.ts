import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import coachModule from "./modules/coaches/index";
import requestsModule from "./modules/requests/index";

export default createStore({
  state: {
    userId: "c3",
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    coaches: coachModule,
    requests: requestsModule,
  },
});
