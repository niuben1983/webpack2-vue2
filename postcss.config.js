module.exports = {
    plugins: [
        require('postcss-px2rem')({remUnit: 75}),
        require('autoprefixer'),
        // require('cssnano')
    ]
}