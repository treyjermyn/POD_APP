module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define("Lesson", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    //associations
    Lesson.associate = (models) => {
        Lesson.belongsTo(models.Class, {
            foreignKey: {
                allowNull: false,
            }
        });
    };
    return Lesson;
}