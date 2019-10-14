import axios from 'axios';

import config from '../configs';

export default {
    getArticles({ offset, limit }: { offset: number, limit: number }, callback: any, fallback: any) {
        axios.get(config.api.tech + '/article', {
            params: {
                offset,
                limit,
            },
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
    getArticle(id: number | string, callback: any, fallback: any) {
        axios.get(config.api.tech + '/article/' + id, {
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
    delArticle({ token, id }: { token: any, id: number | string }, callback: any, fallback: any) {
        axios.delete(config.api.tech + '/article/' + id, {
            headers: {
                Authorization: token,
            },
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
    putArticle(
        { token, title, tags, content, id }: {
            token: any, id: string | number,
            title: string | undefined,
            tags: string[] | undefined,
            content: string | undefined,
        },
        callback: any, fallback: any,
    ) {
        axios.put(config.api.tech + '/article/' + id, {
            title,
            tags,
            content,
        }, {
            headers: {
                Authorization: token,
            },
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
    postArticle(
        { token, title, tags, content }: {
            token: any, title: string | undefined,
            tags: string[] | undefined,
            content: string | undefined,
        },
        callback: any, fallback: any,
    ) {
        axios.post(config.api.tech + '/article', {
            title,
            tags,
            content,
        }, {
            headers: {
                Authorization: token,
            },
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
};


