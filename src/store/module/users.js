import { api, setToken, clearToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return state.user || null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  actions: {
    getUser: async function({ commit }) {
      const user = await api.get("/user");
      commit("setUser", user);
    },
    getProfile: async function({ commit }, username) {
      debugger;
      let route = "/profiles/";
      route += username;
      const response = await api.get(route);
      commit("setProfile", response.data.profile);
    },
    loginUser: async function({ commit }, { email, password }) {
      clearToken();
      try {
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    registerUser: async function({ commit }, { email, password, username }) {
      clearToken();
      try {
        const response = await api.post("/users", {
          user: {
            email,
            password,
            username
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
