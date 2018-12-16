<template>
    <div class="article-preview"> 
          <div class="article-meta">
            <a href="profile.html"><img :src="article.author.image" /></a>
            <div class="info">
              <a href="" class="author">{{article.author.username}}</a>
              <span class="date">{{formatDate(article.createdAt)}}</span>
            </div>
            <button @click="toggleArticleFavorite" class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
         <router-link :to="{path: '/articles/'+ article.slug}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}.</p>
            <span >Read more...</span>
         </router-link>
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
    toggleArticleFavorite() {
      debugger;
      if (this.$store.getters["users/user"]) {
        if (this.article.favorited == false) {
          debugger;
          this.$store
            .dispatch("articles/favoriteArticle", {
              slug: this.article.slug,
              token: this.$store.getters["users/user"].token
            })
            .then(() => {
              debugger;
              this.$store.dispatch("articles/getGlobalFeed");
            });
        } else {
          debugger;
          this.$store
            .dispatch("articles/unfavoriteArticle", {
              slug: this.article.slug,
              token: this.$store.getters["users/user"].token
            })
            .then(() => {
              debugger;
              this.$store.dispatch("articles/getGlobalFeed");
            });
        }
      } else {
        debugger;
        this.$router.push({
          path: "/register"
        });
      }
    }
  }
};
</script>
