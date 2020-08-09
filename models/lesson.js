module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define("Lesson", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  //associations
  Lesson.associate = (models) => {
    Lesson.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false,
      },
    });
    Lesson.belongsToMany(models.Content, {
      through: "lesson_content",
      foreignKey: "lessonId",
      otherKey: "contentId",
    });
    //association to user model
    Lesson.belongsToMany(models.User, {
      through: models.Users_Lessons,
      foreignKey: "lessonId",
      otherKey: "userId",
    });
  };
  return Lesson;
};
