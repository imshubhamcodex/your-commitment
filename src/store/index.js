import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    openTab: "DASHBOARD",
    UID: null,
    people: [],
    notifications: -1,
    allCommitments: [],
    allConnections: [],
    allConnectRequest: [],
    random: 1,
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
        email: payload.email,
        image_id: payload.image_id,
        location_state_index: payload.state_index,
        location_country_index: payload.country_index,
        commitments: 0,
        connections: 0,
        starsCount: 0,
        seenCount: 0,
        replicatedCount: 0,
        sharedCount: 0,
        last_active: 0,
        allCommitments: [],
        allConnections: [],
        connectRequestSend: [],
        connectRequestReceived: [],
      };
      if (payload.id === state.UID) {
        state.people.unshift(data);
      } else {
        state.people.push(data);
      }
    },
    setCommitment(state, payload) {
      let starsCount = 0;
      let seenCount = 0;
      let replicatedCount = 0;
      let sharedCount = 0;
      payload.forEach((commitment) => {
        starsCount += commitment.stars.length;
        seenCount += commitment.seen.length;
        replicatedCount += commitment.replicated.length;
        sharedCount += commitment.shared.length;
      });

      state.people.forEach((person) => {
        if (payload.length === 0) return;
        if (person.id === payload[0].id) {
          person.commitments = payload.length;
          person.allCommitments = payload;
          person.starsCount = starsCount;
          person.seenCount = seenCount;
          person.replicatedCount = replicatedCount;
          person.sharedCount = sharedCount;
          return;
        }
      });
    },
    setConnection(state, payload) {
      if (payload.length === 0) return;

      state.people.forEach((person) => {
        if (person.id === payload[0].id) {
          person.connections = payload.length;
          person.allConnections = payload;
          return;
        }
      });
    },
    setConnectionRequest(state, payload) {
      if (payload.length === 0) {
        state.notifications = 0;
        return;
      }

      payload.forEach((request) => {
        state.people.forEach((person) => {
          if (person.id === request.from) {
            person.connectRequestSend.push(request.to);
          }
          if (person.id === request.to) {
            person.connectRequestReceived.push(request.from);
          }
          if (person.id === state.UID) {
            state.notifications = person.connectRequestReceived.length;
          }
        });
      });
    },
    setIndividual(state, payload) {
      state.people.forEach((person) => {
        if (person.id === payload.id) {
          person = payload;
          return;
        }
      });
    },
    setLastActive(state, payload) {
      state.people.forEach((person) => {
        if (person.id === state.UID) {
          person.last_active = payload;
          return;
        }
      });
    },
    setNotifications(state, payload) {
      state.notifications = Number(payload);
    },
    setAllCommitments(state, payload) {
      state.allCommitments = payload;
    },
    setAllConnections(state, payload) {
      state.allConnections = payload;
    },
    setAllConnectRequest(state, payload) {
      state.allConnectRequest = payload;
    },
    setUID(state, payload) {
      state.UID = payload;
    },
    setLastActive(state, payload) {
      state.people.forEach((person) => {
        if (person.id === state.UID) {
          person.last_active = payload;
          return;
        }
      });
    },
    addConnectRequestReceived(state, payload) {
      state.people.forEach((person) => {
        if (person.id === state.UID) {
          person.connectRequestReceived.push(payload);
        }
      });
    },
    removeConnectRequestReceived(state, payload) {
      state.people.forEach((person) => {
        if (person.id === state.UID) {
          person.connectRequestReceived.splice(payload, 1);
        }
      });
    },
    removeCommitment(state, payload) {
      state.people.forEach((person) => {
        if (person.id === payload) {
          person.commitments = 0;
          person.allCommitments = [];
          person.starsCount = 0;
          person.seenCount = 0;
          person.replicatedCount = 0;
          person.sharedCount = 0;
          return;
        }
      });
    },
  },
});
