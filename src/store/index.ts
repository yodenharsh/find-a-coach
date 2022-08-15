import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import coachModule from "./modules/coaches/index";
import requestsModule from "./modules/requests/index";

export default createStore({
  state: {
    userId: null as null | string,
    token: null as null | string,
    tokenExpiration: null as null | string,
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    coaches: coachModule,
    requests: requestsModule,
  },
});
