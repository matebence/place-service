module.exports = (app, config) => {
    const Sequelize = require("sequelize");
    const strings = require('../../resources/strings');

    const sequelize = new Sequelize(config.get('node.datasource.database'), config.get('node.datasource.username'), config.get('node.datasource.password'), {
        host: config.get('node.datasource.host'),
        dialect: config.get('node.datasource.dialect'),
        define: {
            charset: config.get('node.datasource.charset'),
            collate: config.get('node.datasource.encoding'),
            timestamps: true,
            paranoid: true
        }
    });

    sequelize.sync({force: config.get('node.sequelize.create-drop')})
        .then(result => {
            console.log(strings.DATABASE_STRUCTURE);
        }).catch(error => {
        console.log(strings.DATABASE_STRUCTURE_ERR)
    });

    const database = {};
    database.Sequelize = Sequelize;
    database.sequelize = sequelize;

    database.regions = require("./regions.model")(sequelize, Sequelize);
    database.districts = require("./districts.model")(sequelize, Sequelize);
    database.villages = require("./villages.model")(sequelize, Sequelize);

    database.regions.hasMany(database.districts);
    database.regions.hasMany(database.villages);
    database.districts.hasMany(database.villages);

    database.districts.belongsTo(database.regions);
    database.villages.belongsTo(database.regions);
    database.villages.belongsTo(database.districts);

    module.exports = database;
};