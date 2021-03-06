import config from '@/configs';
import axios from 'axios';

const states: any = {
    offset: 0,
    limit: 18,
    articles: [],
    done: false,
    busy: false,
};

const mutations: any = {
    setBusy(state: any, value: boolean) {
        state.busy = value;
    },
    addOffset(state: any, value: number) {
        state.offset += value;
    },
    allDone(state: any) {
        state.done = true;
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
    async loadMore({ commit, state }: { commit: any, state: any }) {
        if (state.done) {
            return;
        }
        commit('setBusy', true);
        const offset = state.offset;
        const limit = state.limit;

        try {
            const res = await axios.get(config.api.tech + '/article', {
                params: {
                    offset,
                    limit,
                },
                withCredentials: true,
            });

            if (res.status === 204) {
                commit('allDone');
            }
            if (res.status === 200 && !res.data) {
                commit('allDone');
            }
            if (res.status === 200 && res.data) {
                commit('appendArticles', res.data);
                commit('addOffset', res.data.length);
                if (res.data.length !== state.limit) {
                    commit('allDone');
                }
            }
            commit('setBusy', false);
        } catch (err) {
            setTimeout(() => {
                commit('setBusy', false);
            }, 1000);
        }
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
