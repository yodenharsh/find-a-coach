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
    const userId: string = context.rootGetters.userId;
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-htttp-practice-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=` +
        token,
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
  async loadCoaches(
    context: {
      getters: { shouldUpdate: any };
      commit: (
        arg0: string,
        arg1?:
          | {
              id: string;
              firstName: any;
              lastName: any;
              description: any;
              hourlyRate: any;
              areas: any;
            }[]
          | undefined
      ) => void;
    },
    payload: { forceRefresh: any }
  ) {
    if (payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-htttp-practice-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch data from server"
      );
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit("setCoaches", coaches);
    context.commit("setFetchTime");
  },
};
