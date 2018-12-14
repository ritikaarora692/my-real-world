import Vue from "vue";
import Vuex from "vuex";
import users from "./module/users";
import articles from "./module/articles";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    articles
  }
});
