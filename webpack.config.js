const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// uncomment and run a build to get an analysis of your bundles :)
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// common build options
var config = {
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
        // inject index.bundle.js into index.html file
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        // move typescript type check until after build (will get important quickly as codebase grows)
        new ForkTsCheckerWebpackPlugin(),
        // uncomment and run a build to get an analysis of your bundles :)
        // new BundleAnalyzerPlugin(),
    ],
};

module.exports = (env, argv) => {
    // development specific build options
    if (argv.mode === "development") {
        // watch for changes in dev build to trigger a re-build
        config.watch = true;
        config.watchOptions = {
            ignored: ['**/node_modules', '**/build']
        }
        /**
         * test all files to make sure they're not over the max size set
         * this isn't a hard limit, but it's here so that we know when the bundle grows and can analyse what happened and if we're okay with the increase
         */
        config.performance = {
            hints: 'error',
            maxAssetSize: 1400000,
            maxEntrypointSize: 1400000,
        }
    }
    // production specific build options
    if (argv.mode === "production") {
        /**
         * test all files to make sure they're not over the max size set
         * this isn't a hard limit, but it's here so that we know when the bundle grows and can analyse what happened and if we're okay with the increase
         */
        config.performance = {
            hints: 'error',
            maxAssetSize: 140000,
            maxEntrypointSize: 140000,
        }
    }

    return config;
}