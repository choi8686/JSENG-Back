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
            },
            fileUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            sex: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            timestamps: true
        }
    );
    return notice;
};