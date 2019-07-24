module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            timestamps: true
        }
    );
    return user;
};