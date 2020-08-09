const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        //defining fields for User model
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmed: {
            //used for email verification. field will update 
            //once user activates its account via registration email link
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false,
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allownull: true
        }
    }, {timestamps: true});

    User.beforeCreate = ('save', function(next) {
        const user = this

        if(!user.changed('password')) {
            return next()
        }

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err)
            }

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                }

                user.password = hash
                next()
            })
        })
    })

    User.prototype.comparePassword = function(password) {
        return bcrypt.compareSync(password, this.password)
    }

    User.prototype.generateJWT = function() {
        const today = new Date()
        const expDate = new Date(today)
        expDate.setDate(today.getDate() + 60)

        let payload = {
            id: this._id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email
        }

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: parseInt(expDate.getTime() / 1000, 10)
        })
    }

    User.prototype.generatePasswordReset = function() {
        this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
        this.resetPasswordExpires = Date.now() + 360000
    }

  //associations
  User.associate = (models) => {
    //User will associate with Role on Many:Many
    //allowing an user to have multiple roles if needed.
    User.belongsToMany(models.Role, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId",
    });
    //association to course model
    User.belongsToMany(models.Course, {
      through: models.Users_Courses,
      foreignKey: "userId",
      otherKey: "courseId",
    });
    //association to lesson model
    User.belongsToMany(models.Lesson, {
      through: models.Users_Lessons,
      foreignKey: "userId",
      otherKey: "lessonId",
    });
  };

  return User;
};
