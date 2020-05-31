const Sequelize = require("sequelize");
const databseConfig = require("../config/database.config");

const sequelize = new Sequelize(databseConfig.DB, databseConfig.USER, databseConfig.PASSWORD, {
    host: databseConfig.HOST,
    dialect: databseConfig.dialect,
});

const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.regions = require("./regions.model")(sequelize, Sequelize);
database.districts = require("./districts.model")(sequelize, Sequelize);
database.villages = require("./villages.model")(sequelize, Sequelize);

database.regions.hasMany(database.districts, {constraints: true, onDelete: 'CASCADE'});
database.regions.hasMany(database.villages, {constraints: true, onDelete: 'CASCADE'});
database.districts.hasMany(database.villages, {constraints: true, onDelete: 'CASCADE'})

module.exports = database;