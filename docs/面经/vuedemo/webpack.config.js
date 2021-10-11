const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 配置入口
    entry: './src/index.js',
    // 配置输出
    output: {
        // 文件名称
        filename: 'bundle.js',
        // 配置路径
        path: path.resolve(__dirname, 'dist')
    },
    // 配置 source-map ，打包出错定位到源码上
    devtool: 'source-map',
    // 路径从根目录下找，从数组左边（同级）开始，如果左边的没有找到，就下一项继续找
    resolve: {
        modules: [path.resolve(__dirname, ''), path.resolve(__dirname, 'node_modules')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    mode: 'development',
}
