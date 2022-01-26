import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state: () => ({
    auth: false,
    user: {
      id: '',
      email: '',
      name: '',
    },
  }),
  actions,
  mutations,
  getters,
};
