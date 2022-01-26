export default {
  auth(state, payload = false) {
    state.auth = payload;
  },
  user(state, { id, name, email }) {
    state.user.id = id;
    state.user.name = name;
    state.user.email = email;
  },
};
