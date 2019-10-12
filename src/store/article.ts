import api from '../api';

const states: any = {
    offset: 0,
    limit: 18,
    articles: [],
    done: false,
};

const mutations = {
    setOffset(state: any, value: number) {
        state.offset = value;
    },
    setDone(state: any, value: boolean) {
        state.done = value;
    },
    setArticles(state: any, value: any[]) {
        state.articles = value;
    },
    appendArticles(state: any, as: any[]) {
        state.articles.push(...as);
    },
    reset(state: any) {
        state.offset = 0;
        state.done = false;
        state.articles = [];
    },
};

const actions = {
    loadMore({ commit, state }: { commit: any, state: any }, callback: any) {
        if (state.Done) {
            return;
        }
        api.getArticles({
            limit: state.limit,
            offset: state.offset,
        }, (res: any) => {
            if (res.status === 204) {
                // nothing to do
            }
            if (res.status === 200) {
                commit('appendArticles', res.data);
                if (res.data.length !== state.limit) {
                    commit('setDone', true);
                }
            }
            commit('setOffset', state.offset + state.limit);
            callback();
        }, (err: any) => {
            // console.log(err);
        });
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
