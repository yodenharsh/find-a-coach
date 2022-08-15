export default {
  async contactCoach(
    context: {
      commit: (
        arg0: string,
        arg1: {
          coachId: string;
          userEmail: string;
          message: string;
          id: string;
        }
      ) => void;
    },
    payload: { coachId: string; email: string; message: string; id?: string }
  ) {
    const newRequest = {
      coachId: "",
      userEmail: payload.email,
      message: payload.message,
      id: "",
    };
    const response: Response = await fetch(
      `https://vue-htttp-practice-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send requests"
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    context.commit("addRequests", newRequest);
  },
  async fetchRequests(context: {
    rootGetters: { userId: any; token: string };
    commit: (
      arg0: string,
      arg1: { id: string; coachId: any; userEmail: any; message: any }[]
    ) => void;
  }) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    console.log(token);
    const response: Response = await fetch(
      `https://vue-htttp-practice-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error: Error = new Error(
        responseData.message || "Failed to fetch requests"
      );
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
