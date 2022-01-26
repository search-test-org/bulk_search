import getters from './getters.js';
const host = 'http://localhost:3001';

export default {
  namespaced: true,
  state: () => ({
    auth: {
      register: `${host}/user`,
      checkEmail: `${host}/user/email`,
      auth: `${host}/auth`,
      login: `${host}/auth/login`,
      logout: `${host}/auth/logout`,
    },
  }),
  getters,
};
