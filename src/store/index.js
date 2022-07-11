import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openTab: "DASHBOARD",
    UID: "f4snii",
    people: [],
  },
  getters: {
    getOpenTab: (state) => state.openTab,
    getPeople: (state) => state.people,
    getPerson: (state) =>
      state.people.filter((person) => person.id === state.UID),
    getUID: (state) => state.UID,
  },
  mutations: {
    setTab(state, payload) {
      state.openTab = payload;
    },
    setPeople(state, payload) {
      const data = {
        id: payload.id,
        name: payload.name,
        image_id: payload.image_id,
        location_state_index: payload.state_index,
        location_country_index: payload.country_index,
        commitments: 0,
        connections: 0,
        stars: 0,
      };
      state.people.push(data);
    },
    setCommitment(state, payload) {
      let stars = 0;
      payload.forEach((commitment) => {
        stars += commitment.stars;
      });

      state.people.forEach((person) => {
        if (person.id === payload[0].id) {
          person.commitments = payload.length;
          person.allCommitments = payload;
          person.stars = stars;
          return;
        }
      });
    },
    setConnection(state, payload) {
      state.people.forEach((person) => {
        if (person.id === payload[0].id) {
          person.connections = payload.length;
          person.allConnections = payload;
          return;
        }
      });
    },
  },
});
