<template>
    <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input :value="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
                
            </fieldset>
            <fieldset class="form-group">
                <input :value="article.description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea :value="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input :value="article.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button @click="updateArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ["slug"],
  computed: {
    article() {
      return this.$store.state.articles.article;
    }
  },
  methods: {
    updateArticle() {
      this.$store
        .dispatch("articles/updateArticle", {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList,
          slug: this.article.slug,
          token: this.$store.getters["users/user"].token
        })
        .then(() => {
          this.$router.push({
            path: "/articles/" + this.article.slug
          });
        });
    }
  }
};
</script>
