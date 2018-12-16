<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image">
    </a>
    <div class="info">
      <router-link class="author" :to="`/@${article.author.username}`">{{article.author.username}}</router-link>
      <span class="date">{{formatDate(article.createdAt)}}</span>
    </div>
    <button v-if="article.author.username != username" class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{article.author.username}}
    </button>
    <router-link :to="{path: '/editor/'+ article.slug}" class="preview-link">
      <button v-if="article.author.username == username" class="btn btn-sm btn-outline-secondary">
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
    </router-link>&nbsp;&nbsp;
    <button
      v-if="article.author.username != username"
      class="btn btn-sm btn-outline-primary"
      @click="toggleArticleFavorite"
      :class="{'btn-outline-primary': !article.favorited }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">({{article.favoritesCount}})</span>
    </button>
    <button
      @click="deleteArticle"
      v-if="article.author.username == username"
      class="btn btn-outline-danger btn-sm"
    >
      <i class="ion-trash-a"></i>
      &nbsp;
      Delete Article
    </button>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["article"],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    deleteArticle() {
      debugger;
      this.$store
        .dispatch("articles/deleteArticle", {
          slug: this.article.slug,
          token: localStorage.getItem("token")
        })
        .then(() => {
          this.$router.push({
            path: "/"
          });
        });
    },
    toggleArticleFavorite() {
      if (this.$store.getters["users/isLoggedIn"]) {
        if (this.article.favorited == false) {
          this.$store
            .dispatch("articles/favoriteArticle", {
              slug: this.article.slug,
              token: localStorage.getItem("token")
            })
            .then(() => {
              this.$store.dispatch("articles/getGlobalFeed");
            });
        } else {
          this.$store
            .dispatch("articles/unfavoriteArticle", {
              slug: this.article.slug,
              token: localStorage.getItem("token")
            })
            .then(() => {
              this.$store.dispatch("articles/getGlobalFeed");
            });
        }
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    }
  },
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  }
};
</script>
