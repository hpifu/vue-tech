import Vue from 'vue';
import Vuex from 'vuex';
import article from './article';
import account from './account';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    account,
  },
  strict: process.env.NODE_ENV !== 'production',
});
