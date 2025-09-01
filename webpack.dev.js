const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
        static: './dist',
        hot: true,
        port: 3000,
        open: {
            app: {
                name: 'google-chrome',  
                arguments: ['--incognito', '--new-window', '--disable-extensions']
            } 
        }
    }
    
});