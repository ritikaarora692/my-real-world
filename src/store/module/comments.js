import { api, setToken, clearToken } from "../api";
import { debug } from "util";

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    setComments(state, {comments }) {
      state.comments = comments;
    },
    addComment(state, { comment }) {
      state.comments.push(comment);
    }
  },
  actions: {
    async getComments({ commit }, { slug }) {
      let route = "/articles/";
      route += slug;
      route += "/comments";
      const response = await api.get(route);
      commit("setComments", response.data);
    },
    addNewComment: async function({ commit }, { body,slug,token }) {
      setToken(token);
      let route = "/articles/";
      route += slug;
      route += "/comments";
      try {
        const response = await api.post(route, {
          comment: {
            body
          }
        });
        if (response.data) {
          commit("addComment", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
