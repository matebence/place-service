module.exports = app => {
    const villages = require("../controllers/villages.controller");
    const router = require("express").Router();

    router.post("/", villages.create.authorize, villages.create.checkBody, villages.create.validate, villages.create.inDatabase);

    router.delete("/:id", villages.delete.authorize, villages.delete.validate, villages.delete.inDatabase);

    router.put("/:id", villages.update.authorize, villages.update.checkBody, villages.update.validate, villages.update.inDatabase);

    router.get("/:id", villages.get.authorize, villages.get.validate, villages.get.inDatabase);

    router.get("/page/:pageNumber/limit/:pageSize", villages.getAll.authorize, villages.getAll.validate, villages.getAll.inDatabase);

    router.post("/search", villages.search.authorize, villages.search.checkBody, villages.search.inDatabase);

    router.post("/join/:columnName", villages.join.authorize, villages.join.checkBody, villages.join.validate, villages.join.inDatabase);

    app.use('/api/villages', router);
};