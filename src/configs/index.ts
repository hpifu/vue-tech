const configs: any = {
    production: {
        org: 'HPiFu',
        api: {
            account: 'https://api.account.hatlonely.com',
            cloud: 'https://api.cloud.hatlonely.com',
            tech: 'https://api.tech.hatlonely.com',
        },
    },
    development: {
        org: 'HPiFu',
        api: {
            account: 'http://127.0.0.1:16060',
            cloud: 'http://127.0.0.1:16061',
            tech: 'http://127.0.0.1:16063',
        },
    },
};

export default configs[process.env.NODE_ENV];
