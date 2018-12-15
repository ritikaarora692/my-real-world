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
      state.article = article;
    }
  },
  actions: {
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favourited = null,
          page = 1
        } = payload;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favourited ? `?favourited=${favourited}&` : "";
        route += page ? `?offset=${page - 1}` : "";
        //route += page ? page : "";
      }
      const response = await api.get(route);
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
          commit("setArticle", response.data);
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
};
