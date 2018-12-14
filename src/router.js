import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/Settings.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("@/views/ArticleCreate.vue")
    },
    {
      path: "/editor/:article-slug",
      name: "editor-edit",
      component: () => import("@/views/EditArticle.vue")
    },
    {
      path: "/articles/:slug",
      name: "Article",
      component: () => import("@/views/Article.vue"),
      props: true
    },
    {
      path: "/@:username",
      name: "profile",
      component: () => import("@/views/Profile.vue")
    }
  ]
});
