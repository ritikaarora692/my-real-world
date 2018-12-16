<template>
   <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <router-link to="/login">Have an account?
              </router-link>
        </p>

        <ul class="error-messages">
          <li v-for="error in errors" :key="error.message">{{error.message}}</li>
        </ul>

        <form>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="username">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
          </fieldset>
          <button  @click="signup" class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
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
      password: "",
      email: "",
      username: "",
      errors: []
    };
  },
  methods: {
    signup() {
      this.$store
        .dispatch("users/registerUser", {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => {
          this.errors = [];
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  }
};
</script>
