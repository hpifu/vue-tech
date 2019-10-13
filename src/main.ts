import Vue from 'vue';
import VueConfig from 'vue-config';
import VueCookies from 'vue-cookies';
import infiniteScroll from 'vue-infinite-scroll';

import App from './App.vue';
import config from './configs';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';


Vue.config.productionTip = false;
Vue.use(infiniteScroll);
Vue.use(VueCookies);
Vue.use(VueConfig, config);


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
