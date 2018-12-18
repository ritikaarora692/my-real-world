import { api, setToken } from "../api";

export default {
  namespaced: true,
  state: {
    feed: [],
    count: 0,
    article: null
  },
  mutations: {
    setArticles(state, { articles, articlesCount }) {
      state.feed = articles;
      state.count = articlesCount;
    },
    setArticle(state, { article }) {
      state.article = article;
    },
    deleteArticle() {}
  },
  actions: {
    //method to get global feed. No authentication required
    async getGlobalFeed({ commit }, payload) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favorited = null,
          limit = null,
          offset = null
        } = payload;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favorited ? `?favorited=${favorited}&` : "";
        route += limit ? `?limit=${limit}&` : "";
        route += `offset=${offset}`;
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },
    //method to get user feed. authentication required
    async getUserFeed({ commit }, payload) {
      setToken(payload.token);
      let route = "/articles/feed";
      if (payload) {
        const { limit = null, offset = null } = payload;
        route += limit ? `?limit=${limit}&` : "";
        route += offset ? `?offset=${offset}` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },
    //method to get details of an article. Authentication required
    async getArticle({ commit }, slug) {
      let route = "/articles/";
      route += slug;
      const response = await api.get(route);
      commit("setArticle", response.data);
    },
    //method to create new Article. Authentication required
    createArticle: async function(
      { commit },
      { title, description, body, tagList, token }
    ) {
      setToken(token);
      try {
        const response = await api.post("/articles", {
          article: {
            title,
            description,
            body,
            tagList
          }
        });
        if (response.data) {
          commit("setArticle", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    //method to update contents of an article. Authentication required
    updateArticle: async function(
      { commit },
      { title, description, body, tagList, slug, token }
    ) {
      let route = "/articles/" + slug;
      setToken(token);
      try {
        const response = await api.put(route, {
          article: {
            title,
            description,
            body,
            tagList
          }
        });
        if (response.data) {
          commit("setArticle", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    //method to favorite an article. Authentication required
    favoriteArticle: async function({ commit }, { slug, token }) {
      setToken(token);
      try {
        let route = "/articles/" + slug + "/favorite";
        const response = await api.post(route);
        if (response.data) {
          commit("setArticle", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    //method to unfavorite an article. Authentication required
    unfavoriteArticle: async function({ commit }, { slug, token }) {
      setToken(token);
      try {
        let route = "/articles/" + slug + "/favorite";
        const response = await api.delete(route);
        if (response.data) {
          commit("setArticle", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    //method to delete an article. Authentication required
    deleteArticle: async function({ commit }, { slug, token }) {
      setToken(token);
      try {
        let route = "/articles/" + slug;
        await api.delete(route);
      } catch (e) {
        console.error(e);
        throw e;
      }
      commit("deleteArticle");
    }
  }
};
