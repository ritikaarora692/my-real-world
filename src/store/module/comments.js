import { api, setToken } from "../api";

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    setComments(state, { comments }) {
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
    addNewComment: async function({ commit }, { body, slug, token }) {
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
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    deleteComment: async function({ commit }, { slug, commentId, token }) {
      setToken(token);
      try {
        let route = "/articles/";
        route += slug + "/comments/" + commentId;
        await api.delete(route);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
