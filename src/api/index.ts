const axios = require("axios");
import config from '../configs';

export default {
    getArticles({ offset, limit }, callback, fallback) {
        axios.get(config.api.tech + "/article", {
            params: {
                offset: offset,
                limit: limit
            },
            withCredentials: true
        }).then(callback).catch(fallback);
    },
    // ancient(id, callback, fallback) {
    //     axios.get(config.api.ancient + "/ancient/" + id, {
    //         withCredentials: true
    //     }).then(callback).catch(fallback);
    // },
};