module.exports = (sequelize, DataTypes) => {
    const newProduct = sequelize.define(
        "newProduct", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photoUrl: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true
        }
    );
    return newProduct;
};