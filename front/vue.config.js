const path = require('path');

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        host: '0.0.0.0',
        https: false,
        port: 8000,
        public: 'http://0.0.0.0:8000'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/')
            }
        }
    }
}