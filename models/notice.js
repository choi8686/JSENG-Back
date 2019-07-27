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


        }, {
            timestamps: true
        }
    );
    return notice;
};