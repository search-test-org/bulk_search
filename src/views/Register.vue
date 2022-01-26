<template>
  <div class="backdrop bg-blue-gradient">
    <div class="card register_form">
      <div class="card-body">
        <h1 class="card-title text-start fw-bold">Register</h1>
        <hr />
        <div class="card-text">
          <form class="text-end" @submit.prevent="register">
            <div class="mb-3 text-start">
              <label for="name" class="form-label">Name</label>
              <div class="input-group">
                <input
                  id="name"
                  v-model="name"
                  :class="`form-control ${invalid.name ? 'is-invalid' : ''}`"
                  type="name"
                  name="name"
                  required
                />
                <div class="invalid-feedback">Invalid name</div>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="email" class="form-label">Email</label>
              <div class="input-group">
                <input
                  id="email"
                  v-model="email"
                  :class="`form-control ${invalid.email || invalidEmail ? 'is-invalid' : ''} 
                  ${isRequestSent && !invalidEmail ? 'is-valid' : ''}`"
                  type="email"
                  name="email"
                  required
                />
                <div class="invalid-feedback">Invalid email</div>
                <div v-if="loading" class="mx-2">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="password" class="form-label">Password</label>
              <div class="input-group">
                <input
                  id="password"
                  v-model="password"
                  :class="`form-control ${invalid.password ? 'is-invalid' : ''}`"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  required
                />
                <div class="invalid-feedback">Invalid password</div>
                <button
                  v-if="!invalid.password && password"
                  @click="showPassword = !showPassword"
                  type="button"
                  class="input-group-text"
                >
                  <font-awesome-icon v-if="showPassword" icon="eye-slash" />
                  <font-awesome-icon v-else icon="eye" />
                </button>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="confirmPassword" class="form-label">Confirm password</label>
              <div class="input-group">
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :class="`form-control ${invalid.confirmPassword ? 'is-invalid' : ''}`"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  name="confirmPassword"
                  required
                />
                <div class="invalid-feedback">Invalid password</div>
                <button
                  v-if="!invalid.confirmPassword && confirmPassword"
                  @click="showConfirmPassword = !showConfirmPassword"
                  type="button"
                  class="input-group-text"
                >
                  <font-awesome-icon v-if="showConfirmPassword" icon="eye-slash" />
                  <font-awesome-icon v-else icon="eye" />
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="this.invalid.email || this.invalid.password"
              >
                SIGN UP
              </button>
            </div>
          </form>
          <div class="mt-3 text-start">
            Already have an account? <router-link to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    showPassword: false,
    showConfirmPassword: false,
    invalid: {
      email: false,
      password: false,
      confirmPassword: false,
    },
    timer: null,
    loading: false,
    invalidEmail: false,
    isRequestSent: false,
  }),
  watch: {
    password() {
      this.changeStatus();
    },
    confirmPassword() {
      this.changeStatus();
    },
    email(email) {
      this.changeStatus();
      if (email && /.+@.+/g.test(email)) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.loading = true;

        this.timer = setTimeout(() => {
          this.checkEmail(this.email).then((validEmail) => {
            this.invalidEmail = !validEmail;
            this.loading = false;
            this.isRequestSent = true;
          });
        }, 500);
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['auth']),
  },
  mounted() {},
  methods: {
    async register() {
      const { email, name, password, confirmPassword } = this;
      this.changeStatus(true);
      return;
      const isCreated = await this.createUser({ email, name, password, confirmPassword });
      if (isCreated) {
        this.$router.push('/');
      } else {
        this.changeStatus(true);
      }
    },
    changeStatus(valid = false) {
      this.invalid = {
        email: valid,
        password: valid,
        confirmPassword: valid,
      };
      this.loading = false;
      this.invalidEmail = false;
    },
    ...mapActions('auth', ['createUser', 'checkEmail']),
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 576px) {
  .register_form {
    width: 50%;
  }
}
</style>
