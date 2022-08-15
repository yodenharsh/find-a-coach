export default {
  setUser(
    state: { token: any; userId: any; tokenExpiration: any },
    payload: { token: string; userId: string; tokenExpiration: string }
  ) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
    console.log(state.token);
  },
};
