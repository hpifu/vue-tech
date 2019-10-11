import api from '../api';

const state = {
    offset: 0,
    limit: 20,
    articles: [],
    done: false,
};

const mutations = {
    setOffset(state, value) {
        state.offset = value;
    },
    setDone(state, value) {
        state.done = value;
    },
    setArticles(state, value) {
        state.articles = value;
    },
    appendArticles(state, as) {
        state.articles.push(...as);
    },
    reset(state) {
        state.offset = 0;
        state.done = false;
        state.articles = [];
    },
}

const actions = {
    loadMore({ commit, state }, callback) {
        if (state.Done) {
            return;
        }
        api.getArticles({
            limit: state.limit,
            offset: state.offset,
        }, res => {
            if (res.status == 204) {
                // nothing to do
            }
            if (res.status == 200) {
                commit("appendArticles", res.data);
                if (res.data.length != state.limit) {
                    commit("setDone", true);
                }
            }
            commit("setOffset", state.offset + state.limit);
            callback()
        }, err => {
            console.log(err);
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
