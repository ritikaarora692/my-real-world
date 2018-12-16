<template>
    <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" id="myImage" placeholder="URL of profile picture" :value="userImage">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" id="myUsername" type="text" placeholder="Your Name" :value="user.username">
              </fieldset> 
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" id="myBio" rows="8" placeholder="Short bio about you" :value="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" id="myEmail" type="text" placeholder="Email" :value="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" id="myPassword" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click="updateSettings">
                Update Settings
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
  computed: {
    user() {
      return this.$store.getters["users/user"];
    },
    userImage() {
      if (this.user.image == "") {
        return "https://static.productionready.io/images/smiley-cyrus.jpg";
      } else {
        return this.user.image;
      }
    }
  },
  methods: {
    updateSettings() {
      this.$store
        .dispatch("users/updateUser", {
          username: document.getElementById("myUsername").value,
          email: document.getElementById("myEmail").value,
          bio: document.getElementById("myBio").value,
          image: document.getElementById("myImage").value,
          token: localStorage.getItem("token")
        })
        .then(() => {
          this.$router.push({
            path: "/@" + document.getElementById("myUsername").value
          });
        });
    }
  }
};
</script>
