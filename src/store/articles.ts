import axios from 'axios';

import config from '../configs';

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Articles extends VuexModule {
    public busy = false;
    public offset = 0;
    public limit = 18;
    public articles: any[] = [];
    public done = false;

    @Mutation
    public reset() {
        this.offset = 0;
        this.done = false;
        this.articles = [];
    }

    @Mutation
    public setBusy(busy: boolean) {
        this.busy = busy
    }

    @Mutation
    public updateArticles(articles: any[]) {
        console.log("updateArticlues")
        this.articles.push(...articles);
        this.offset += articles.length;
        if (articles.length !== this.limit) {
            this.done = true;
        }
        this.busy = false;
    }

    @Action({ commit: 'updateArticles' })
    public async loadMore() {
        if (this.done) {
            return;
        }
        this.context.commit("setBusy", true)

        const offset = this.offset;
        const limit = this.limit;
        const res = await axios.get(config.api.tech + '/article', {
            params: {
                offset,
                limit,
            },
            withCredentials: true,
        });

        return res.data;
    }
}
