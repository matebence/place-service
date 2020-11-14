module.exports = (sequelize, Sequelize) => {
    return sequelize.define("district", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vehRegNum: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        code: {
            type: Sequelize.SMALLINT,
            allowNull: false,
        },
        use: {
            type: Sequelize.TINYINT,
            defaultValue: 1,
            allowNull: false,
        }
    });
};