module.exports = (app, config) => {
    const Sequelize = require("sequelize");
    const strings = require('../../resources/strings');
    const redis = require("redis");

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

    const redisClient = redis.createClient({
        host: config.get('node.datasource.redis.host'),
        port: config.get('node.datasource.redis.port'),
        password: config.get('node.datasource.redis.password')
    }).on("error", (error) => {
        console.log(`${strings.REDIS_DATABASE_CONNECTION_ERROR} ${config.get('node.datasource.redis.host')}:${config.get('node.datasource.redis.port')}`);
    });

    sequelize.sync({force: config.get('node.sequelize.create-drop')}).then(result => {
        console.log(strings.MYSQL_DATABASE_STRUCTURE)
    }).catch(error => {
        console.log(strings.MYSQL_DATABASE_STRUCTURE_ERR)
    });

    const database = {};
    database.Sequelize = Sequelize;
    database.sequelize = sequelize;
    database.redis = redisClient;

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