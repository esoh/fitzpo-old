'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        var standardExerciseNames = ['Bench Press', 'Lying Tricep Extension', 'Machine Flies', 'Dips', 'Incline Dumbbell Press (30 degrees)', 'Calf raises', 'Tricep Pulldown'];
        var standardExercises = standardExerciseNames.map(name => {
            return {
                name,
                from: 'fitzpo',
                public: true,
                verified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        return queryInterface.bulkInsert('Exercises', standardExercises)
            .catch(err => {
                if(!(err instanceof Sequelize.ValidationError)){
                    throw err;
                }
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Exercises', null);
    }
};
