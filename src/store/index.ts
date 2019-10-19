import Vue from 'vue';
import Vuex from 'vuex';
import articles from './articles';
import account from './account';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articles,
    account,
  },
  strict: process.env.NODE_ENV !== 'production',
});
