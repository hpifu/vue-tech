import axios from 'axios';

import config from '../configs';

export default {
    getAccount(token: string, callback: any, fallback: any) {
        axios.get(config.api.account + '/account/token/' + token, {
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
};

