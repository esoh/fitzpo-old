'use strict';

const Filter = require('bad-words')
const filter = new Filter();

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
                validate: {
                    is: /^(?=.*[A-Za-z])[A-Za-z0-9d._-]{1,}$/,
                    isNotProfane(value) {
                        if(filter.isProfane(value)) {
                            throw new Error('Inappropriate Username')
                        }
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$!.%*#?&]{8,}/
                }
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
