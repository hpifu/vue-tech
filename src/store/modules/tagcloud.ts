import axios from 'axios';
import config from '@/configs';

const states: any = {
    tagcloud: [],
};

const mutations: any = {
    setTagCloud(state: any, as: any[]) {
        state.tagcloud = as;
    },
};

const actions = {
    async getTagCloud({ commit, state }: { commit: any, state: any }) {
        try {
            const res = await axios.get(config.api.tech + '/tagcloud', {
                withCredentials: true,
            });
            if (res.status === 200 && res.data) {
                commit('setTagCloud', res.data);
            }
        } catch (err) {
            // nothing to do
        }
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
