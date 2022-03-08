const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // where to start compiling code
    entry: path.join(__dirname, "src", "App.tsx"),
    // where compiled code goes
    output: { 
        path: path.join(__dirname, "build"), 
        filename: "index.bundle.js"
    },
    // for deciding between development or production builds (passed as --mode production in webpack cli)
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    // tells dev server that it needs to serve everythhing from the src folder
    devServer: { static: path.join(__dirname, "src") },
    module: {
        // Note: rules run from bottom to top, because... reasons.
        rules: [
            // run js and jsx files through babel as defined in .babelrc (might not need if we don't have any js files)
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: ["babel-loader"] 
            },
            // run ts and tsx files through ts-loader
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
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