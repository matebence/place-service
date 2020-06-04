module.exports = (app, config) => {
    const Sequelize = require("sequelize");
    const Importer = require('mysql-import');
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

    const importer = new Importer({
        host: config.get('node.datasource.host'),
        user: config.get('node.datasource.username'),
        password: config.get('node.datasource.password'),
        database: config.get('node.datasource.database')
    });

    sequelize.sync({force: config.get('node.sequelize.create-drop')})
        .then(result => {
            console.log(strings.DATABASE_STRUCTURE);
            importer.import("./resources/data.sql").then(() => {
                console.log(strings.DATABASE_SEED)
            }).catch(err => {
                console.log(strings.DATABASE_SEED_ERR)
            });
        }).catch(error => {
        console.log(strings.DATABASE_STRUCTURE_ERR)
    });

    const database = {};
    database.Sequelize = Sequelize;
    database.importer = importer;
    database.sequelize = sequelize;

    database.regions = require("./regions.model")(sequelize, Sequelize);
    database.districts = require("./districts.model")(sequelize, Sequelize);
    database.villages = require("./villages.model")(sequelize, Sequelize);

    database.regions.hasMany(database.districts, {constraints: true, onDelete: 'CASCADE'});
    database.regions.hasMany(database.villages, {constraints: true, onDelete: 'CASCADE'});
    database.districts.hasMany(database.villages, {constraints: true, onDelete: 'CASCADE'});

    module.exports = database;
};