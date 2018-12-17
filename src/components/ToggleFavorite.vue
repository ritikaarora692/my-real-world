<template>
  <button
    class="btn btn-sm"
    @click="toggleArticleFavorite"
    :class="{'btn-outline-primary': !article.favorited, 'pull-xs-right': isPreview, 'btn-primary':isPreview,'btn-primary': !isPreview }"
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
  props: ["isPreview", "article"],
  methods: {
    toggleArticleFavorite() {
      this.isPreview;
      this.article;
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
  }
};
</script>
