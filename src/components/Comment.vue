<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href class="comment-author">
        <img :src="comment.author.image" class="comment-author-img">
      </a>
      &nbsp;
      <a href class="comment-author">{{comment.author.username}}</a>
      <span class="date-posted">{{formatDate(comment.createdAt)}}</span>
      <span class="mod-options" :v-if="username == comment.author.username">
        <i class="ion-edit"></i>
        <i class="ion-trash-a " @click="deleteComment"></i>
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["comment"],
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    deleteComment(){
      debugger
      this.$store
            .dispatch("comments/deleteComment", {
              slug:  this.$store.state.articles.article.slug,
              commentId : this.comment.id,
              token: this.$store.getters["users/user"].token
            }).then(() => {
          this.$store.dispatch("comments/getComments", {
        slug: this.$store.state.articles.article.slug
      })});
    }
  },
  computed: {
    username() {
      return this.$store.getters["users/username"];
  }
  }
}
</script>
