let apiDomain
if (process.env.NODE_ENV === 'production') {
    apiDomain = 'http://120.78.177.9:3000'
} else {
    apiDomain = 'http://localhost:3000'
}

module.exports = {
    apiDomain
}
