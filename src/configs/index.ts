const configs: any = {
    production: {
        org: 'HPiFu',
        api: {
            tech: 'https://api.tech.hatlonely.com',
            account: 'https://api.account.hatlonely.com',
        },
    },
    development: {
        org: 'HPiFu',
        api: {
            tech: 'http://127.0.0.1:16063',
            account: 'http://127.0.0.1:16061',
        },
    },
};

export default configs[process.env.NODE_ENV];
