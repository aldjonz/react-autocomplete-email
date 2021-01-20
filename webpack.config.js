var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/components/react-autocomplete-email.js",
    output: {
        path: path.resolve("build"),
        filename: "react-autocomplete-email.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    externals: {
        react: "react"
    }
};