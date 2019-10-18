import Vue from 'vue';
import Vuex from 'vuex';
import article from './articles';
import account from './account';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    account,
  },
  strict: process.env.NODE_ENV !== 'production',
});
