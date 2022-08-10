import requestsActions from "./actions";
import requestsGetters from "./getters";
import requestsMutations from "./mutations";

export default {
  namespaced: true,
  state: {
    requests: [],
  },
  mutations: requestsMutations,
  getters: requestsGetters,
  actions: requestsActions,
};
