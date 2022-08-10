export default {
  requests(
    state: { requests: any },
    _: any,
    _2: any,
    rootGetters: { userId: string }
  ) {
    const coachId = rootGetters.userId;
    return state.requests.filter(
      (req: { coachId: string }) => req.coachId === coachId
    );
  },
  hasRequests(
    _: { requests: string | any[] },
    getters: { requests: string | any[] }
  ) {
    return getters.requests && getters.requests.length > 0;
  },
};
