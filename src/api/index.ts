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
    getArticle(id: number, callback: any, fallback: any) {
        axios.get(config.api.tech + '/article/' + id, {
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
};
