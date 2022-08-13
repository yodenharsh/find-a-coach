interface request {
  id: string;
  coachId: string;
  userEmail: string;
  message: string;
}
export default {
  addRequests(state: { requests: request[] }, payload: request) {
    state.requests.push(payload);
  },
  setRequests(state: { requests: any }, payload: any) {
    state.requests = payload;
  },
};
