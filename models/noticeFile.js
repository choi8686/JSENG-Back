module.exports = (sequelize, DataTypes) => {
    const noticeFile = sequelize.define(
        "noticeFile", {
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
    noticeFile.associate = function (models) {
        noticeFile.belongsTo(models.notice, {
            foreignKey: "noticeId",
            sourceKey: "id",
            onDelete: "cascade"
        });
    };



    return noticeFile;
};