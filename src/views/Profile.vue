<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{profile.username}}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link" :class="{active: !isFavorite}" @click="authorFeed();">My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{active: isFavorite}" @click="favoriteFeed();">Favorited Articles</a>
            </li>
          </ul>
        </div>

        <ArticlePreview v-for="article in userfeed" :key="article.slug" :article="article">
        </ArticlePreview>

      </div>

    </div>
  </div>

</div>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview";
export default {
  props: ["username"],
  data: function() {
    return {
      isFavorite: false
    };
  },
  components: {
    ArticlePreview
  },
  created() {
    this.$store.dispatch("users/getProfile", this.username);
    this.$store.dispatch("articles/getGlobalFeed", {
      author: this.username,
      page: 1
    });
  },
  computed: {
    profile() {
      return this.$store.state.users.profile;
    },
    userfeed() {
      return this.$store.state.articles.feed;
    }
  },
  methods: {
    favoriteFeed() {
      this.isFavorite = true;
      this.$store.dispatch("articles/getGlobalFeed", {
        favorited: this.username,
        page: 1
      });
    },
    authorFeed() {
      this.isFavorite = false;
      this.$store.dispatch("articles/getGlobalFeed", {
      author: this.username,
      page: 1
    });
    }
  }
};
</script>
