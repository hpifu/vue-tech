import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./components/Articles.vue'),
    },
    {
      path: '/article/:id',
      component: () => import('./components/Article.vue'),
    },
  ],
});
