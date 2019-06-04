module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define('Exercise', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // used to tell where this exercise was pulled from
        // ex: Lying tricep extension: from: Mark Rippetoe
        from: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['name', 'from'],
            }
        ],
    });

    Exercise.associate = function(models) {
        // has a creatorId field
        Exercise.belongsTo(models.User, {
            as: 'creator',
        })
    }

    return Exercise;
}
