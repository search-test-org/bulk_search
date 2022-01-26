<template>
  <div class="backdrop bg-blue-gradient">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title text-start fw-bold">Login</h1>
        <hr />
        <div class="card-text">
          <form class="text-end" @submit.prevent="loginUser">
            <div class="mb-3 text-start">
              <label for="email" class="form-label">Email</label>
              <div class="input-group">
                <input
                  id="email"
                  :class="`form-control ${invalid.email ? 'is-invalid' : ''}`"
                  type="email"
                  name="email"
                  required
                  @input="updateInput($event)"
                />
                <div class="invalid-feedback">Invalid email</div>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="password" class="form-label">Password</label>
              <div class="input-group">
                <input
                  id="password"
                  :class="`form-control ${invalid.password ? 'is-invalid' : ''}`"
                  :type="show ? 'text' : 'password'"
                  name="password"
                  required
                  @input="updateInput($event)"
                />
                <div class="invalid-feedback">Invalid password</div>
                <button
                  v-if="!invalid.password && password"
                  @click="showPassword"
                  type="button"
                  class="input-group-text"
                >
                  <font-awesome-icon v-if="show" icon="eye-slash" />
                  <font-awesome-icon v-else icon="eye" />
                </button>
              </div>
            </div>
            <div class="mb-1 text-start">
              <input
                class="form-check-input me-2"
                type="checkbox"
                name="remember"
                id="remember"
                checked
              />
              <label for="remember" class="form-label"><p>Remember me</p></label>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="this.invalid.email || this.invalid.password"
              >
                LOGIN
              </button>
            </div>
          </form>
          <div class="mt-3 text-start">
            Haven't had an account? <router-link to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    password: '',
    email: '',
    show: false,
    invalid: {
      email: false,
      password: false,
    },
  }),
  methods: {
    async loginUser() {
      const isLoggedIn = await this.login({ email: this.email, password: this.password });
      if (isLoggedIn) {
        this.$router.push('/');
      }
    },
    updateInput(event) {
      this.invalid.email = false;
      this.invalid.password = false;

      switch (event.target.name) {
        case 'email':
          this.email = event.target.value;
          break;
        case 'password':
          this.password = event.target.value;
          break;
        default:
      }
    },
    showPassword() {
      this.show = !this.show;
    },
    ...mapActions('auth', ['login']),
  },
};
</script>

<style lang="scss" scoped></style>
