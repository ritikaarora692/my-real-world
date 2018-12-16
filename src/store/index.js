import Vue from "vue";
import Vuex from "vuex";
import users from "./module/users";
import articles from "./module/articles";
import comments from "./module/comments";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
    
  },
  actions: {
  },
  modules: {
    users,
    articles,
    comments
  }
});
