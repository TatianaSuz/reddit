const path = require("path");
const htmlWebpackPlugins = require('html-webpack-plugin')


module.exports = (env) => {
    const {mode} = env
    const isDev = mode === 'development'
    const isProd = mode === 'production'
    function setupDevtool () {
        if (isDev) return 'eval';
        if (isProd) return false
    }
    return {
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
        },
        mode,
        entry: path.resolve(__dirname, 'src/index.jsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "index.js"
        },
        module: {
            rules: [
                {test: /\.[tj]sx?$/,
                    use: ['ts-loader']
                }
            ]
        },
        plugins: [
            new htmlWebpackPlugins({template: path.resolve(__dirname, 'index.html')})
        ],
        devServer: {
            port: 3000,
            open: true,
            hot: isDev
        },
        devtool: setupDevtool(),
    }
}