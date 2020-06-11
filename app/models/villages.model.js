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
        use: {
            type: Sequelize.TINYINT,
            defaultValue: 1,
            allowNull: false,
        }
    }, {
        uniqueKeys: {
            Items_unique: {
                fields: ['fullName', 'shortName', 'zip']
            }
        }
    });
};