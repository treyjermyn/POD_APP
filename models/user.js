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
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false,
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });

    //associations
    User.associate = (models) => {
        //User will associate with Role on Many:Many
        //allowing an user to have multiple roles if needed.
        User.belongsToMany(models.Role, { through: "user_roles", foreignKey: "userId", otherKey: "userId" });
        
    };

    return User;
} 