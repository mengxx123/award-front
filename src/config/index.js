let apiDomain
if (process.env.NODE_ENV === 'production') {
    apiDomain = 'http://localhost:3000/'
} else {
    apiDomain = 'http://localhost:3000/'
}

module.exports = {
    apiDomain
}
