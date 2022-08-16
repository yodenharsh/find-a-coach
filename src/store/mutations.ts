export default {
  setUser(
    state: {
      didAutoLogout: boolean;
      token: any;
      userId: any;
      tokenExpiration: any;
    },
    payload: { token: string; userId: string; tokenExpiration: string }
  ) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state: { didAutoLogout: boolean }) {
    state.didAutoLogout = true;
  },
};
