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
    },
    deleteComment() {}
  },
  actions: {
    //method to load comments of an article. No Authentication required
    async getComments({ commit }, { slug }) {
      let route = "/articles/" + slug + "/comments";
      const response = await api.get(route);
      commit("setComments", response.data);
    },
    //method to add new comment on an article. Authentication required
    addNewComment: async function({ commit }, { body, slug, token }) {
      setToken(token);
      let route = "/articles/" + slug + "/comments";
      try {
        await api.post(route, {
          comment: {
            body
          }
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
      commit("deleteComment");
    },
    //method to delete own comment on an article. Authentication required
    deleteComment: async function({ commit }, { slug, commentId, token }) {
      setToken(token);
      try {
        let route = "/articles/" + slug + "/comments/" + commentId;
        await api.delete(route);
      } catch (e) {
        console.error(e);
        throw e;
      }
      commit("deleteComment");
    }
  }
};
