interface coachObject {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
}

export default {
  coaches(state: { coaches: coachObject[] }) {
    return state.coaches;
  },
  hasCoaches(state: { coaches: coachObject[] }) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(
    _: any,
    getters: { coaches: coachObject | any },
    _2: any,
    rootGetters: { userId: string }
  ) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach: { id: string }) => coach.id === userId);
  },
  shouldUpdate(state: { lastFetch: number | null }): boolean {
    const lastFetch: number | null = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp: number = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
