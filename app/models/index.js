const Sequelize = require("sequelize");
const Importer = require('mysql-import');
const strings = require('../../resources/strings');
const databseConfig = require("../config/database.config");

const sequelize = new Sequelize(databseConfig.DB, databseConfig.USER, databseConfig.PASSWORD, {
    host: databseConfig.HOST,
    dialect: databseConfig.dialect,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});

const importer = new Importer({host: databseConfig.HOST, user: databseConfig.USER, password: databseConfig.PASSWORD, database: databseConfig.DB});
const database = {};

sequelize.sync({force: true})
    .then(result => {
        console.log(strings.DATABASE_STRUCTURE);
        importer.import("./resources/data.sql").then(() => {
            console.log(strings.DATABASE_SEED)
        }).catch(err => {
            console.log(strings.DATABASE_SEED_ERR)
        });
    })
    .catch(error => {
        console.log(strings.DATABASE_STRUCTURE_ERR)
    });

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