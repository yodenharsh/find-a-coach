import requestsActions from "./actions";
import requestsGetters from "./getters";
import requestsMutations from "./mutations";

export default {
  namespaced: true,
  state: {},
  mutations: requestsMutations,
  getters: requestsGetters,
  actions: requestsActions,
};
