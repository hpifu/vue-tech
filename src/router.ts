import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Articles.vue'),
    }, {
      path: '/article/:id',
      component: () => import('./views/Article.vue'),
    }, {
      path: '/edit/:id',
      component: () => import('./components/Edit.vue'),
    }, {
      path: '/newpost',
      component: () => import('./components/NewPost.vue'),
    }, {
      path: '/tagcloud',
      component: () => import('./views/TagCloud.vue'),
    }, {
      path: '/author/:author',
      name: 'author',
      component: () => import('./views/Author.vue'),
    }, {
      path: '/tag/:tag',
      name: 'tag',
      component: () => import('./views/Tag.vue'),
    },
  ],
});
