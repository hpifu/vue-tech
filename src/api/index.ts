import axios from 'axios';
import config from '../configs';

export default {
    getArticles({ offset, limit }, callback, fallback) {
        axios.get(config.api.tech + '/article', {
            params: {
                offset,
                limit,
            },
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
    getArticle(id, callback, fallback) {
        axios.get(config.api.tech + '/article/' + id, {
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
};
