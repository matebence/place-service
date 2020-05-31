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
        veh_reg_num: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        code: {
            type: Sequelize.SMALLINT,
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