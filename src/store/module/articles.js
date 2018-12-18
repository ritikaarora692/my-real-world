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
    async getGlobalFeed({ commit }, payload) {
      let route = "/articles";
      debugger;
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
      debugger;
      const response = await api.get(route);
      debugger;
      commit("setArticles", response.data);
    },
    async getUserFeed({ commit }, payload) {
      debugger;
      setToken(payload.token);
      let route = "/articles/feed";
      if (payload) {
        const { limit = null, offset = null } = payload;
        route += limit ? `?limit=${limit}&` : "";
        route += offset ? `?offset=${offset}` : "";
      }
      debugger;
      const response = await api.get(route);
      debugger;
      commit("setArticles", response.data);
    },
    async getArticle({ commit }, slug) {
      let route = "/articles/";
      route += slug;
      const response = await api.get(route);
      commit("setArticle", response.data);
    },
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
