const path = require('path')

module.exports = {
    mode: 'development',
    entry: './public/App.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    }
}