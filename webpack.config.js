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
        filename: 'index.[contenthash].bundle.js',
        /** on fresh builds, delete everything in the build folder first */
        clean: true,
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
         * test all files to make sure they're not over the max size set
         * this isn't a hard limit, but it's here so that we know when the bundle grows and can analyse what happened and if we're okay with the increase
         */
        config.performance = {
            hints: 'error',
            maxAssetSize: 3900000,
            maxEntrypointSize: 3900000,
        };
    }

    /** production specific build options */
    if (argv.mode === 'production') {
        config.devtool = 'source-map';
        /**
         * test all files to make sure they're not over the max size set
         * this isn't a hard limit, but it's here so that we know when the bundle grows and can analyse what happened and if we're okay with the increase
         */
        config.performance = {
            hints: 'error',
            maxAssetSize: 200000,
            maxEntrypointSize: 200000,
        };
    }

    return config;
};