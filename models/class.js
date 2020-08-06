module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("Class", {
        //defining fields for User model
        class_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    //associations
    Class.associate = (models) => {
        //Class associates with many users and lessons
        Class.belongsToMany(models.User, { through: "users_classes", foreignKey: "classId", otherKey: "userId" });
        //class hasMany lessons.
        Class.hasMany(models.Lesson, {
            onDelete: "cascade"
        });
    };

    return Class;
} 