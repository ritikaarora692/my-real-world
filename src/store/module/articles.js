import { api, setToken, clearToken } from "../api";

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
      debugger;
      state.article = article;
    }
  },
  actions: {
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";
      debugger;
      if (payload) {
        const {
          tag = null,
          author = null,
          favorited = null,
          page = 1
        } = payload;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favorited ? `?favorited=${favorited}&` : "";
        route += page ? `?offset=${page - 1}` : "";
        //route += page ? page : "";
      }
      debugger;
      const response = await api.get(route);
      debugger;
      commit("setArticles", response.data);
    },
    async getUserFeed({ commit }, payload = { page: 1 }) {
      clearToken();
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        // route += page ? `?offset=${(page - 1) * 10} & limit=10` : "";
        route += page ? `?offset=${page - 1}` : "";
        setToken(payload.token);
      }
      const response = await api.get(route);
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
          debugger;
          commit("setArticle", response.data);
          this.$router.push({
            path: "/articles/" + response.data.slug
          });
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
      debugger;
      let route = "/articles/";
      route += slug;
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
          debugger;
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
        let route = "/articles/";
        route += slug;
        route += "/favorite";
        debugger;
        const response = await api.post(route);
        if (response.data) {
          debugger;
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
        let route = "/articles/";
        route += slug;
        route += "/favorite";
        debugger;
        const response = await api.delete(route);
        if (response.data) {
          debugger;
          commit("setArticle", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
