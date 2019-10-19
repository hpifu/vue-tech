import Vue from 'vue';
import Vuex from 'vuex';
import articles from './articles';
import account from './account';
import author from './author';
import tag from './tag';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articles,
    author,
    tag,
    account,
  },
  strict: process.env.NODE_ENV !== 'production',
});
