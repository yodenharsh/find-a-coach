export default {
  registerCoach(state: { coaches: any[] }, payload: any) {
    state.coaches.push(payload);
  },
};
