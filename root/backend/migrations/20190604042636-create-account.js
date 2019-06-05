'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Accounts', {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,// TODO: split into username_display and username_id = lower(username_display)
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            userUuid: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Accounts');
    }
};
