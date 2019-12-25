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
            },
            avatarname: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true

        }
    );
    return user;
};