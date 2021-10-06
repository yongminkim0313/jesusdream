module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        host: '0.0.0.0',
        https: false,
        port: 8080,
        public: 'http://0.0.0.0:8080'
    },
}