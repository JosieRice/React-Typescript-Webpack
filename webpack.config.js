const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
/** uncomment and run a build to get an analysis of your bundles :) */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** create styled components transformer */
const styledComponentsTransformer = createStyledComponentsTransformer();

var babelOptions = {
    presets: [
        /** compiling modern js to older browsers (as defined in our browser support matrix) */
        '@babel/env',
        /** compiling react to ES5 */
        '@babel/react',
        /** compiling typescript to javascript */
        '@babel/preset-typescript',
    ],
    /** improves minification of styled-components code */
    plugins: ['babel-plugin-styled-components'],
};

/** common build options */
const config = {
    /** where to start/entry point for compiling code */
    entry: path.join(__dirname, 'src', 'index.tsx'),
    /** where compiled code goes */
    output: {
        /** base path for everything in this build */
        publicPath: '/',
        /** directory build goes to */
        path: path.join(__dirname, 'build'),
        /** output file name into above dir */
        filename: '[name].[contenthash].bundle.js',
        /** on fresh builds, delete everything in the build folder first */
        clean: true,
    },
    optimization: {
        splitChunks: {
            /** DO NOT ADD TO THIS BUNDLE: manually makes a vender chunk for react, react-dom, and styled-components */
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|styled-components)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
            /** dynamically splits the rest of the code into separate bundles based on webpack defaults */
            chunks: 'all',
        },
    },
    /** for deciding between development or production builds (passed as --mode production in webpack cli) */
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        /**
         * alias is used to avoid always using relative imports
         * must have matching paths rules in tsconfig.json for Typescript to not complain
         */
        alias: {
            icons: path.resolve(__dirname, 'src/assets/icons'),
            routes: path.resolve(__dirname, 'src/routes'),
        },
    },
    module: {
        /** Note: rules run from bottom to top, because... reasons. */
        rules: [
            /** run ts and tsx files through ts-loader and babel-loader to compile code */
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            /** improves build time by turning off type checking because we moved it to after each build */
                            transpileOnly: true,
                            /** adds name of styled component to className for better debugging */
                            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
                        },
                    },
                ],
            },
            /** allows us to import SVG's are React Components */
            {
                test: /\.svg$/i,
                issuer: /\.tsx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        /** inject index.bundle.js into index.html file */
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        /** move typescript type check until after build (will get important quickly as codebase grows) */
        new ForkTsCheckerWebpackPlugin(),
        /** uncomment and run a build to get an analysis of your bundles :) */
        // new BundleAnalyzerPlugin(),
    ],
};

module.exports = (env, argv) => {
    /** development specific build options */
    if (argv.mode === 'development') {
        /** adding recommended source mapping to dev build */
        config.devtool = 'inline-source-map';
        /** tells dev server that it needs to serve everything from the src folder */
        config.devServer = { static: path.join(__dirname, 'src') };
        /** redirects 404's to /index.html (so react-router can take over) on the dev server */
        config.devServer.historyApiFallback = true;
        /**
         * Keep these asset and entry point sizes around 5500000
         * adds a warning to dev builds when bundles are getting large
         * ideally this would line up with the production build, but that's impossible with the differences in dev and prod builds
         */
        config.performance = {
            hints: 'warning',
            maxAssetSize: 5500000,
            maxEntrypointSize: 5500000,
        };
    }

    /** production specific build options */
    if (argv.mode === 'production') {
        config.devtool = 'source-map';
        /** upgrades the default webpack warnings to errors that will kill the build */
        config.performance = {
            hints: 'error',
            /** doesn't check the vendor bundles size, it's cool, don't even trip dawg */
            assetFilter: function assetFilter(assetFilename) {
                return !/^vendor/.test(assetFilename);
            },
        };
    }

    return config;
};