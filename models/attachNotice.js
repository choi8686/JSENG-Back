module.exports = (sequelize, DataTypes) => {
    const attachNotice = sequelize.define(
        "attachNotice", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileUrl: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true
        }
    );
    return attachNotice;
};