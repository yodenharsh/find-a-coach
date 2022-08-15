export default {
  async login(
    context: {
      commit: (
        arg0: string,
        arg1: { token: any; userId: any; tokenExpiration: any }
      ) => void;
    },
    payload: { email: any; password: any }
  ) {
    const response: Response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBODV4l987jJZPRitE703WnJsaqniUtdKQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(response);
      const error: Error = new Error(
        responseData.message || "Failed to authenticate"
      );
      throw error;
    }
    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async signup(
    context: {
      commit: (
        arg0: string,
        arg1: { token: any; userId: any; tokenExpiration: any }
      ) => void;
    },
    payload: { email: any; password: any }
  ) {
    const response: Response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBODV4l987jJZPRitE703WnJsaqniUtdKQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log(response);
      const error: Error = new Error(
        responseData.message || "Failed to authenticate"
      );
      throw error;
    }
    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  logout(context: {
    commit: (
      arg0: string,
      arg1: { token: null; userId: null; tokenExpiration: null }
    ) => void;
  }) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
