let configs = {
    production: {
        org: "HPiFu",
        api: {
            tech: "https://api.tech.hatlonely.com",
        },
    },
    development: {
        org: "HPiFu",
        api: {
            tech: "http://127.0.0.1:16063",
        },
    },
};

export default configs[process.env.NODE_ENV];