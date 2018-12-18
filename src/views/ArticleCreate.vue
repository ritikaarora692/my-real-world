<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <div class="error-messages">{{error}}</div>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tagList">
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                @click="createArticle"
                type="button"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      title: "",
      description: "",
      body: "",
      tagList: [],
      error: ""
    };
  },
  methods: {
    createArticle() {
      if (this.tagList.length > 0) {
        var tags = this.tagList.split(",");
      }
      this.$store
        .dispatch("articles/createArticle", {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: tags,
          token: localStorage.getItem("token")
        })
        .then(() => {
          this.$router.push({
            path: "/articles/" + this.$store.state.articles.article.slug
          });
        })
        .catch(() => {
          this.error = "Article Title, Body And Description are mandatory.";
        });
    }
  }
};
</script>
