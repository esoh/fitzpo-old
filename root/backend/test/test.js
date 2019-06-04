const chai = require('chai')
const app = require('../models')

after(() => {
    app.sequelize.connectionManager.close()
        .then(() => console.log('Tests finished. Closing connection.'));
})
