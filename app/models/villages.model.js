module.exports = (sequelize, Sequelize) => {
    return sequelize.define("village", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shortName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        zip: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        districtId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        regionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        use: {
            type: Sequelize.TINYINT,
            defaultValue: 1,
            allowNull: false,
        }
    });
};