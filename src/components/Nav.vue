<template>
  <nav class="nav justify-content-between bg-blue">
    <div>
      <router-link to="/" class="home_link">
        <h1 class="text-white ms-4">SEARCH</h1>
      </router-link>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button class="btn btn-outline-scondary d-block" @click="userLogout">
        <font-awesome-icon icon="sign-out-alt" class="text-white" />
        <span class="ms-2 text-white">LOGOUT</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    async userLogout() {
      const isLoggedOut = await this.logout();
      if (isLoggedOut) {
        this.$router.go(0);
      }
    },
    ...mapActions('auth', ['logout']),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  top: 0;
}

.home_link {
  text-decoration: none;
}
</style>
