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
};
