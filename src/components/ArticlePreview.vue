<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html">
        <img :src="article.author.image">
      </a>
      <div class="info">
        <router-link class="author" :to="`/@${article.author.username}`">{{article.author.username}}</router-link>
        <span class="date">{{formatDate(article.createdAt)}}</span>
      </div>
      <ToggleFavorite :article="article" :isPreview="true" :activeFeed="activeFeed"></ToggleFavorite>
    </div>
    <router-link :to="{path: '/articles/'+ article.slug}" class="preview-link">
      <h1>{{article.title}}</h1> 
      <p>{{article.description}}.</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="tag in article.tagList"
          :key="tag"
        >{{tag}}</li>
      </ul>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
import ToggleFavorite from "@/components/ToggleFavorite.vue";
export default {
  props: ["article", "activeFeed"],
  components: {
    ToggleFavorite
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
