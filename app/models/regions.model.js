module.exports = (sequelize, Sequelize) => {
    return sequelize.define("region", {
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
        shortcut: {
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
                fields: ['name', 'shortcut']
            }
        }
    });
};