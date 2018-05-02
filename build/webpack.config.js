let path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: __dirname + '/../website/main',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('website')
        }
    },
    output: {
        path: __dirname + "/../dist",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ]
            }
        ]
    }
}