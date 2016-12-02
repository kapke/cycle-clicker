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
            {test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/},
        ]
    },
    devtool: 'source-maps',
};