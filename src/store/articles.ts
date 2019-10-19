import axios from 'axios';
import config from '@/configs';

const states: any = {
    offset: 0,
    limit: 2,
    articles: [],
    done: false,
    busy: false,
}

const mutations: any = {
    setBusy(state: any, value: boolean) {
        state.busy = value
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
        const offset = state.offset
        const limit = state.limit
        console.log(offset, limit)

        try {
            const res = await axios.get(config.api.tech + '/article', {
                params: {
                    offset,
                    limit,
                },
                withCredentials: true,
            });

            commit('appendArticles', res.data);
            commit('addOffset', res.data.length);
            if (res.data.length !== state.limit) {
                commit('allDone');
                console.log("done", state.done)
            }
        } catch (err) {
            console.log(err)
        } finally {
            commit('setBusy', false);
            console.log(state.busy)
        }
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
