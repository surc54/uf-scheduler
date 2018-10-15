const path = require('path');

module.exports = {
    mode: "development",
    entry: './scheduler/modules/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "scheduler", "dist")
    }
};