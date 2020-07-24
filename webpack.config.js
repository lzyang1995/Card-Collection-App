var path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src/main/js/index.js'),
        register: path.join(__dirname, 'src/main/js/register.js'),
        registerSuccess: path.join(__dirname, 'src/main/js/registerSuccess.js'),
        login: path.join(__dirname, 'src/main/js/login.js'),
        modifyInfo: path.join(__dirname, 'src/main/js/modifyInfo.js'),
        modifyPassword: path.join(__dirname, 'src/main/js/modifyPassword.js'),
        modifyPasswordSuccess: path.join(__dirname, 'src/main/js/modifyPasswordSuccess.js'),
        modifyInfoSuccess: path.join(__dirname, 'src/main/js/modifyInfoSuccess.js'),
        promotionDetail: path.join(__dirname, 'src/main/js/promotionDetail.js'),
        invite: path.join(__dirname, 'src/main/js/invite.js'),
    },
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: path.join(__dirname, 'src/main/resources/static/built'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};