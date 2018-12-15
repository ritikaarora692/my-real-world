<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image">
    </a>
    <div class="info">
      <a href class="author">{{article.author.username}}</a>
      <span class="date">{{formatDate(article.createdAt)}}</span>
    </div>
    <button v-if="article.author.username != username" class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{article.author.username}}
    </button>
    <router-link :to="{path: '/editor/'+ article.slug}" class="preview-link">
      <button
        v-if="article.author.username == username"
        class="btn btn-sm btn-outline-secondary"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        Edit Article
      </button>
    </router-link>
    &nbsp;&nbsp;
    <button
      v-if="article.author.username != username"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">(29)</span>
    </button>
    <button
      @click="deleteArticle"
      v-if="article.author.username == username"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
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
    }
  },
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  }
};
</script>
