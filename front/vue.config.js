module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        devServer: {
            host: '0.0.0.0',
            https: false,
            port: 8000,
            public: 'http://0.0.0.0:8000'
        },
    },
}