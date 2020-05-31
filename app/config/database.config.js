module.exports = {
    HOST: "192.168.99.100",
    USER: "plc_user",
    PASSWORD: "7f56c92e9461f07fbcc2ddbef875d120",
    DB: "place_service",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};