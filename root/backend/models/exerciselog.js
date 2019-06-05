'use strict';
module.exports = (sequelize, DataTypes) => {
    const ExerciseLog = sequelize.define('ExerciseLog', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        exerciseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        progress: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});

    ExerciseLog.associate = function(models) {
        ExerciseLog.belongsTo(models.User, {
            as: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    ExerciseLog.getExerciseHistory = function(userId) {
        return ExerciseLog.findAll({ where: { userUuid: userId } })
    }

    return ExerciseLog;
};
