export default {
  contactCoach(
    context: {
      commit: (
        arg0: string,
        arg1: {
          id: string;
          coachId: string;
          userEmail: string;
          message: string;
        }
      ) => void;
    },
    payload: { coachId: string; email: string; message: string }
  ) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    console.log(newRequest);
    context.commit("addRequests", newRequest);
  },
};
