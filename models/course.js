module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    //defining fields for User model
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  //associations
  Course.associate = (models) => {
    //Class associates with many users and lessons
    Course.belongsToMany(models.User, {
      through: models.Users_Classes,
      foreignKey: "courseId",
      otherKey: "userId",
    });
    //class hasMany lessons.
    Course.hasMany(models.Lesson, {
      onDelete: "cascade",
    });
  };

  return Course;
};
