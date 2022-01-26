import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Store from '@/store'; // vuex store

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// indicates that if the route need be authed to access
const authRoutes = {
  login: false,
  register: false,
  home: true,
  about: true,
};

router.beforeEach(async (to, _from, next) => {
  // check if the user is logged in
  const isAuthed = Store.getters['auth/auth'];
  if (isAuthed) {
    const { status } = await Store.dispatch('auth/auth');
    let loggedIn = false;
    if (status === 200) {
      loggedIn = true;
    }
    Store.commit('auth/auth', loggedIn);
  }

  if (isAuthed) {
    if (!authRoutes[to.name]) {
      next('/');
    } else {
      next();
    }
  } else if (authRoutes[to.name]) {
    next('/login');
  } else {
    next();
  }
});

export default router;
