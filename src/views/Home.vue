<template>
    <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link" v-if="isLoggedIn" @click="setFeed('user');" :class="{ active : activeFeed ==='user' }">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="setFeed('global');" :class="{active: activeFeed ==='global' }">Global Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-if="activeTag" :class="{active: activeFeed ==='tag'}">#{{activeTag}}</a>
            </li>
          </ul>
        </div>
        <div v-if="globalArticles.length>0">
        <ArticlePreview v-for="article in globalArticles" :key="article.slug" :article="article">
        </ArticlePreview>
        </div>
        <div v-else class="article-preview">
          No articles are here... yet.
      </div>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a @click="setTagValue('programming');" class="tag-pill tag-default">programming</a>
            <a @click="setTagValue('javascript');" class="tag-pill tag-default">javascript</a>
            <a @click="setTagValue('emberjs');" class="tag-pill tag-default">emberjs</a>
            <a @click="setTagValue('angularjs');" class="tag-pill tag-default">angularjs</a>
            <a @click="setTagValue('react');" class="tag-pill tag-default">react</a>
            <a @click="setTagValue('mean');" class="tag-pill tag-default">mean</a>
            <a @click="setTagValue('node');" class="tag-pill tag-default">node</a>
            <a @click="setTagValue('rails');" class="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import ArticlePreview from "@/components/ArticlePreview";
export default {
  components: {
    ArticlePreview
  },
  data: function() {
    return {
      activeFeed: "",
      activeTag: null
    };
  },
  methods: {
    setFeed(feedType) {
      this.$store.state.articles.feed = [];
      if (feedType === "global") {
        this.activeFeed = "global";
        this.$store.dispatch("articles/getGlobalFeed");
      } else if (feedType === "user") {
        this.activeFeed = "user";
        this.$store.dispatch("articles/getUserFeed", {
          token: localStorage.getItem("token")
        });
      } else if (feedType === "tag") {
        this.activeFeed = "tag";
        this.$store.dispatch("articles/getGlobalFeed", {
          tag: this.activeTag,
          page: 1
        });
      }
    },
    setTagValue(programming) {
      this.activeTag = programming;
      this.setFeed("tag");
    }
  },
  created() {
    if (this.$store.getters["users/isLoggedIn"]) {
      this.setFeed("user");
    } else {
      this.setFeed("global");
    }
  },
  computed: {
    globalArticles() {
      return this.$store.state.articles.feed || [];
    },
    isLoggedIn() {
      return this.$store.getters["users/isLoggedIn"];
    }
  }
};
</script>
