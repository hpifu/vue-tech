import Vue from 'vue';
import Vuex from 'vuex';
import articles from './modules/articles';
import account from './modules/account';
import author from './modules/author';
import tag from './modules/tag';
import tagcloud from './modules/tagcloud';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articles,
    author,
    tag,
    account,
    tagcloud,
  },
  strict: process.env.NODE_ENV !== 'production',
});
