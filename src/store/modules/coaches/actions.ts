interface coachData {
  id?: string;
  last: string;
  first: string;
  desc: string;
  rate: number;
  areas: string[];
}

export default {
  async registerCoach(context: any, data: coachData) {
    const userId = context.rootGetters.userId;
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const response = await fetch(
      `https://vue-htttp-practice-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );
    //const responseData = await response.json();
    if (!response.ok) {
      //error
    }
    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
};
