'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Exercises', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            from: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
            },
            public: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
            creatorUuid: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
        })
            .then(() => {
                queryInterface.addIndex('Exercises', {
                    fields: ['name', 'from'],
                    type: 'UNIQUE',
                })
            });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Exercises');
    }
};
