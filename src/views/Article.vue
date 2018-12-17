<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{article.title}}</h1>
        <ArticleHeader :article="article"></ArticleHeader>
      </div>
      <div class="container" v-else>Please wait while we are loading</div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-if="article">
          <p>{{article.body}}</p>
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="tag in article.tagList"
              :key="tag"
            >{{tag}}</li>
          </ul>
        </div>
      </div>

      <hr>

      <div class="article-actions">
        <div v-if="article">
          <ArticleHeader :article="article"></ArticleHeader>
        </div>
        <div v-else>Please wait while we are loading</div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                v-model="commentText"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer" v-if="isLoggedIn">
              <img :src="user.image" v-if="user" class="comment-author-img">
              <button @click="postComment" class="btn btn-sm btn-primary">Post Comment</button>
            </div>
            <div class="card-footer" v-else>
              <router-link class="nav-link" to="/login">Sign in</router-link>or
              <router-link class="nav-link" to="/register">Sign up</router-link>to post comment.
            </div>
          </form>
          <template v-if="areCommentsLoading">
            <p>Please wait while we are loading Comments</p>
          </template>
          <template v-else>
            <Comment v-for="comment in comments" :key="comment.id" :comment="comment"></Comment>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Comment from "@/components/Comment.vue";
import ArticleHeader from "@/components/ArticleHeader.vue";
export default {
  components: {
    Comment,
    ArticleHeader
  },
  props: ["slug"],
  data: function() {
    return {
      areCommentsLoading: true,
      commentText: ""
    };
  },
  created() {
    this.$store.dispatch("articles/getArticle", this.slug);

    this.$store
      .dispatch("comments/getComments", {
        slug: this.slug
      })
      .then(() => {
        this.areCommentsLoading = false;
      });
  },
  computed: {
    comments() {
      return this.$store.state.comments.comments || [];
    },
    article() {
      return this.$store.state.articles.article;
    },
    user() {
      return this.$store.getters["users/user"];
    },
    isLoggedIn() {
      return this.$store.getters["users/isLoggedIn"];
    }
  },
  methods: {
    postComment() {
      this.areCommentsLoading = true;
      this.$store
        .dispatch("comments/addNewComment", {
          slug: this.slug,
          body: this.commentText,
          token: localStorage.getItem("token")
        })
        .then(() => {
          this.$store.dispatch("comments/getComments", {
            slug: this.slug
          });
          this.areCommentsLoading = false;
          this.commentText = "";
        });
    }
  }
};
</script>
