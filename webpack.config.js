module.exports = {
    entry: './src/app/app.ts',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {enforce: 'pre', test: /\.ts$/, loader: 'tslint-loader', exclude: /node_modules/},
            {test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/},
        ]
    },
    devtool: 'source-maps',
};
