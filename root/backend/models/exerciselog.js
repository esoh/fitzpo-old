'use strict';
const SchemaError = require('../utils/SchemaError');

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

    ExerciseLog.getExerciseLogs = function(userId) {
        return ExerciseLog.findAll({
            where: { userUuid: userId },
            order: [ ['date', 'DESC'] ],
        })
    }

    ExerciseLog.addExerciseLog = function(userId, date, exerciseName, type, progress){
        return new Promise((resolve, reject) => {
            ExerciseLog.create({
                date,
                exerciseName,
                type,
                progress,
                userUuid:   userId,
            })
                .then(exerciseLog => {
                    return resolve(exerciseLog)
                })
                .catch(err => {
                    if(SchemaError.isSchemaError(err)) return reject(new SchemaError(err));
                    return reject(err);
                })
        });
    }

    ExerciseLog.deleteExerciseLog = function(logId){
        return ExerciseLog.destroy({where: {id: logId}});
    }

    return ExerciseLog;
};
