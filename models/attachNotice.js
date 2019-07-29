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
            timestamps: true
        }
    );
    return attachNotice;
};