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
};
