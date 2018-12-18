import { api, setToken, clearToken } from "../api";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null,
    isLoggedIn: !!localStorage.getItem("token")
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    user(state) {
      return state.user || null;
    },
    isLoggedIn: state => {
      return state.isLoggedIn;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setProfile(state, profile) {
      state.profile = profile;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    //method to get profile of the logged in user. No Authentication required
    getProfile: async function({ commit }, username) {
      let route = "/profiles/" + username;
      const response = await api.get(route);
      commit("setProfile", response.data.profile);
    },
    //method to handle login of a user. No Authentication required
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
          localStorage.setItem("token", response.data.user.token);
          commit("setUser", response.data.user);
          commit("login");
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    //method to handle logout of logged in user.
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("setUser", null);
      commit("setUsername", null);
      commit("logout");
    },
    //method to register user
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
          localStorage.setItem("token", response.data.user.token);
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    //method to update profile of a user
    updateUser: async function(
      { commit },
      { username, email, bio, image, token }
    ) {
      setToken(token);
      try {
        const response = await api.put("/user", {
          user: {
            email,
            bio,
            username,
            image
          }
        });
        if (response.data.user) {
          commit("setUser", response.data.user);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
