import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';
import articles from './modules/articles';
import author from './modules/author';
import search from './modules/search';
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
    search,
  },
  strict: process.env.NODE_ENV !== 'production',
});
