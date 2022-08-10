interface coachData {
  id: string;
  last: string;
  first: string;
  desc: string;
  rate: number;
  areas: string[];
}

export default {
  registerCoach(context: any, data: coachData) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    context.commit("registerCoach", coachData);
  },
};
