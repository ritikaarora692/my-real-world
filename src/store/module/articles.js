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
      debugger;
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        // route += page ? `?offset=${(page - 1) * 10} & limit=10` : "";
        route += page ? `?offset=${page - 1}` : "";
        debugger;
        setToken(payload.token);
      }
      debugger;
      const response = await api.get(route);
      debugger;
      commit("setArticles", response.data);
    },
    async getArticle({ commit }) {
      debugger;
      let route = "/articles";
      route += `/slug.slug`;
      const response = await api.get(route);
      debugger;
      commit("setArticle", response.data);
      debugger;
    }
  }
};
