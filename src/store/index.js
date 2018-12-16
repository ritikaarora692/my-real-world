import Vue from "vue";
import Vuex from "vuex";
import users from "./module/users";
import articles from "./module/articles";
import comments from "./module/comments";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: localStorage
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  plugins: [vuexPersist.plugin],
  modules: {
    users,
    articles,
    comments
  }
});
