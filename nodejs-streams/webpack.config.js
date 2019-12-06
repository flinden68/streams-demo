const CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require('path');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './server/server.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js',
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },{
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.html?$/,
                loader: "file-loader?name=[name].[ext]"
            }]
    },
    plugins: [
        new CopyWebpackPlugin([
                {
                    from: './server/index.html',
                    to: __dirname + '/dist'
                }]
        )
    ],
    target: 'node',
    externals: nodeModules,
    devServer: {
        publicPath: "/",
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000,
        hot: true
    }
};
