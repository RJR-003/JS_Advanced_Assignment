//webpack.config.js
const path = require('path');
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: [
        './src/filterAndSearchFun', './src/script', './src/SortFun', './src/tableActionButton',
        './src/constants', './src/type', './src/addUpdateEmployee', './src/deleteEmployee',
        './src/updateEmployee', './src/viewEmployee'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js" // <--- Will be compiled to this single file
    },
    watch: true,
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    }
};

// entry: [
//     './src/filterAndSearchFun', './src/script', './src/SortFun', './src/tableActionButton'
// ],