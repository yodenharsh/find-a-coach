interface coachData {
  id?: string;
  last: string;
  first: string;
  desc: string;
  rate: number;
  areas: string[];
}

export default {
  registerCoach(state: { coaches: any[] }, payload: any) {
    state.coaches.push(payload);
  },
  setCoaches(state: { coaches: coachData }, payload: coachData) {
    state.coaches = payload;
  },
  setFetchTime(state: { lastFetch: number }) {
    state.lastFetch = new Date().getTime();
  },
};
