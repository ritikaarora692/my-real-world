<template>
  <button
    class="btn btn-sm"
    @click="toggleArticleFavorite"
    :class="{'btn-outline-primary': !article.favorited, 'pull-xs-right': isPreview, 'btn-primary':isPreview,'btn-primary': article.favorited }"
  >
    <i class="ion-heart"></i>
    <span v-if="this.isPreview">  {{article.favoritesCount}}</span>
    <span v-else>
      &nbsp;
      Favorite Post
      <span class="counter">({{article.favoritesCount}})</span>
    </span>
  </button>
</template>
<script>
export default {
  props: ["isPreview", "article", "activeFeed"],
  methods: {
    toggleArticleFavorite() {
      if (this.$store.getters["users/isLoggedIn"]) {
        if (this.article.favorited == false) {
          this.$store
            .dispatch("articles/favoriteArticle", {
              slug: this.article.slug,
              token: localStorage.getItem("token")
            })
            .then(() => {
              if (this.activeFeed == "global") {
                this.$store.dispatch("articles/getGlobalFeed", {
                  offset: 0,
                  limit: 10
                });
              } else if (this.activeFeed == "author") {
                this.$store
                  .dispatch("articles/getGlobalFeed", {
                    author: this.$store.getters["users/username"],
                    offset: 0,
                    limit: 10
                  })
                  .catch(() => {
                    this.error = "Error while loading feed.";
                  });
              } else if (this.activeFeed == "favorite") {
                this.$store.dispatch("articles/getGlobalFeed", {
                  favorited: this.$store.getters["users/username"],
                  offset: 0,
                  limit: 10
                });
              }
            });
        } else {
          this.$store
            .dispatch("articles/unfavoriteArticle", {
              slug: this.article.slug,
              token: localStorage.getItem("token")
            })
            .then(() => {
              if (this.activeFeed == "global") {
                this.$store.dispatch("articles/getGlobalFeed", {
                  offset: 0,
                  limit: 10
                });
              } else if (this.activeFeed == "author") {
                this.$store
                  .dispatch("articles/getGlobalFeed", {
                    author: this.$store.getters["users/username"],
                    offset: 0,
                    limit: 10
                  })
                  .catch(() => {
                    this.error = "Error while loading feed.";
                  });
              } else if (this.activeFeed == "favorite") {
                this.$store.dispatch("articles/getGlobalFeed", {
                  favorited: this.$store.getters["users/username"],
                  offset: 0,
                  limit: 10
                });
              }
            });
        }
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    }
  }
};
</script>
