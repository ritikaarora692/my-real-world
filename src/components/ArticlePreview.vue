<template>
    <div class="article-preview"> 
          <div class="article-meta">
            <a href="profile.html"><img :src="article.author.image" /></a>
            <div class="info">
              <router-link class="author" :to="`/@${article.author.username}`">{{article.author.username}}
              </router-link>
              <span class="date">{{formatDate(article.createdAt)}}</span>
            </div>
            <button @click="toggleArticleFavorite" class="btn btn-sm pull-xs-right btn-primary" :class="{'btn-outline-primary': !this.article.favorited }">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
         <router-link :to="{path: '/articles/'+ article.slug}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}.</p>
            <span >Read more...</span>
            <ul class="tag-list" >
            <li class="tag-default tag-pill tag-outline"  v-for="tag in article.tagList" :key="tag">
              {{tag}}
            </li>
          </ul>
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
      if (this.$store.getters["users/user"]) {
        if (this.article.favorited == false) {
          this.$store
            .dispatch("articles/favoriteArticle", {
              slug: this.article.slug,
              token: this.$store.getters["users/user"].token
            })
            .then(() => {
              this.$store.dispatch("articles/getGlobalFeed");
            });
        } else {
          this.$store
            .dispatch("articles/unfavoriteArticle", {
              slug: this.article.slug,
              token: this.$store.getters["users/user"].token
            })
            .then(() => {
              this.$store.dispatch("articles/getGlobalFeed");
            });
        }
      } else {
        this.$router.push({
          path: "/register"
        });
      }
    }
  }
};
</script>
