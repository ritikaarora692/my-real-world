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
    <ToggleFavorite v-if="article.author.username != username" :article="article" :isPreview="false">
      </ToggleFavorite>
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
import ToggleFavorite from "@/components/ToggleFavorite";
export default {
  props: ["article"],
  components: {
    ToggleFavorite
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    deleteArticle() {
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
    }
  },
  computed: {
    username() {
      debugger;
      return this.$store.getters["users/username"];
    }
  }
};
</script>
