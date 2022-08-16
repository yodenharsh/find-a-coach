let timer: number;

export default {
  async login(
    context: {
      dispatch: (
        arg0: string,
        arg1: { mode: string; email: any; password: any }
      ) => void;
    },
    payload: { email: string; password: string }
  ) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(
    context: {
      dispatch: (
        arg0: string,
        arg1: { mode: string; email: string; password: string }
      ) => void;
    },
    payload: { email: string; password: string }
  ) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(
    context: {
      dispatch: any;
      commit: (
        arg0: string,
        arg1: { token: any; userId: any; tokenExpiration: any }
      ) => void;
    },
    payload: { mode: any; email: any; password: any }
  ) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBODV4l987jJZPRitE703WnJsaqniUtdKQ";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBODV4l987jJZPRitE703WnJsaqniUtdKQ";
    }
    const response: Response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error: Error = new Error(
        responseData.message || "Failed to authenticate"
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate.toString());

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: expirationDate,
    });
  },
  tryLogin(context: {
    dispatch: any;
    commit: (
      arg0: string,
      arg1: { token: string; userId: string; tokenExpiration?: null | string }
    ) => void;
  }) {
    const token: string | null = localStorage.getItem("token");
    const userId: string | null = localStorage.getItem("userId");
    const tokenExpiration: string | null =
      localStorage.getItem("tokenExpiration");
    let expiresIn;
    if (tokenExpiration != null) {
      expiresIn = +tokenExpiration - new Date().getTime();
    } else {
      expiresIn = 0;
    }

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context: {
    commit: (
      arg0: string,
      arg1: {
        token: string | null;
        userId: string | null;
        tokenExpiration?: null;
      }
    ) => void;
  }) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context: {
    dispatch: (arg0: string) => void;
    commit: (arg0: string) => void;
  }) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
