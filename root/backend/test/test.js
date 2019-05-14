const chai = require('chai')
const app = require('../models')

before(() => {
    return app.sequelize.sync()
})

after(() => {
    app.sequelize.connectionManager.close()
        .then(() => console.log('Tests finished. Closing connection.'));
})
