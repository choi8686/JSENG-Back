module.exports = (sequelize, DataTypes) => {
    const notice = sequelize.define(
        "notice", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contents: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true
        }
    );

    notice.associate = function (models) {
        notice.hasMany(models.noticeFile, {
            foreignKey: "noticeId",
            sourceKey: "id",
            onDelete: "cascade"
        });
    };

    return notice;
};