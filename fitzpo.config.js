module.exports = {
    apps: [{
        name: 'node-api-app',
        script: './root/backend/app.js',
        watch: true,
        env : {
            'NODE_ENV' : 'development',
        },
        env_production : {
            'NODE_ENV' : 'production',
        },
    }]
}
