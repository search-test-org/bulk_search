export default {
  async createUser({ commit, dispatch, rootGetters }, { email, name, password, confirmPassword }) {
    const { register } = rootGetters['endpoint/auth'];
    try {
      const { status, message, data } = await fetch(register, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, confirmPassword }),
      }).then((res) => res.json());

      if (!/2.*/g.test(status)) {
        throw new Error(message);
      }

      commit('auth', true);
      commit('user', { id: data.id, email, name });

      return true;
    } catch (error) {
      console.log('something went wrong when create new user');
      console.log(error);
    }
    return false;
  },
  async checkEmail({ commit, dispatch, rootGetters }, email) {
    const { checkEmail } = rootGetters['endpoint/auth'];
    try {
      const { status, message } = await fetch(checkEmail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).then((res) => res.json());

      if (!/2.*/g.test(status)) {
        throw new Error(message);
      }

      return true;
    } catch (error) {
      console.log('something went wrong when checking if email is in use');
      console.log(error);
    }
    return false;
  },
  async auth({ commit, dispatch, rootGetters }) {
    const { auth } = rootGetters['endpoint/auth'];
    try {
      const { status, errorMessage, data } = await fetch(auth, { credentials: 'include' }).then(
        (res) => res.json()
      );

      if (!/2.*/g.test(status)) {
        throw new Error(errorMessage);
      }

      commit('auth', true);
      commit('user', { ...data });
      return true;
    } catch (error) {
      console.log('something went wrong when authenticating');
      console.log(error.message);
    }

    return false;
  },
  async login({ commit, dispatch, rootGetters }, { email, password }) {
    const { login } = rootGetters['endpoint/auth'];
    try {
      const response = await fetch(login, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json());

      if (!/2.*/g.test(response.status)) {
        throw new Error(message);
      }

      commit('auth', true);
      return response;
    } catch (error) {
      console.log('something went wrong when login');
      console.log(error);
    }

    return false;
  },
  async logout({ commit, dispatch, rootGetters }) {
    const { logout } = rootGetters['endpoint/auth'];
    try {
      const { status, message } = await fetch(logout, { credentials: 'include' }).then((res) =>
        res.json()
      );

      if (!/2.*./g.test(status)) {
        throw new Error(message);
      }

      commit('auth');
      commit('user', { id: '', email: '', name: '' });

      return true;
    } catch (error) {
      console.log('something went wrong when logout');
      console.log(error);
    }

    return false;
  },
};
