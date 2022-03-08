const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // where to start compiling code
    entry: path.join(__dirname, "src", "index.js"),
    // where compiled code goes
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    // for deciding between development or production builds
    mode: process.env.NODE_ENV || "development",
    // 
    resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
    // tells dev server that it needs to serve everythhing from the src folder
    devServer: { static: path.join(__dirname, "src") },
    module: {
        rules: [
            // run js and jsx files through babel as defined in .babelrc
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: ["babel-loader"] 
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // inject index.bundle.js into index.html file
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};