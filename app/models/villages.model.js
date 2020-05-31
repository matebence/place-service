module.exports = (sequelize, Sequelize) => {
    return sequelize.define("village", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shortname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        zip: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        district_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        region_id: {
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