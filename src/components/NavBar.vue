<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <a class="nav-link active" href>Home</a>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link class="nav-link" :to="`/@${username}`">{{username}}</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <a class="nav-link" href @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      debugger;
      return this.$store.getters["users/isLoggedIn"];
    },
    username() {
      debugger;
      return this.$store.getters["users/username"];
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("users/logout")
        .then(() => {
          this.errors = [];
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  }
};
</script>
