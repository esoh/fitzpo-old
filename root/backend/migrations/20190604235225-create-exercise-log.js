'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ExerciseLogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            exerciseName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            progress: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ExerciseLogs');
    }
};
