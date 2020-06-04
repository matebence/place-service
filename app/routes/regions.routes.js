module.exports = app => {
    const regions = require("../controllers/regions.controller");
    const router = require("express").Router();

    router.post("/", regions.create.authorize, regions.create.checkBody, regions.create.validate, regions.create.inDatabase);

    router.delete("/:id",  regions.delete.authorize, regions.delete.validate, regions.delete.inDatabase);

    router.put("/:id", regions.update.authorize, regions.update.checkBody, regions.update.validate, regions.update.inDatabase);

    router.get("/:id",  regions.get.authorize, regions.get.validate, regions.get.inDatabase);

    router.get("/page/:pageNumber/limit/:pageSize", regions.getAll.authorize, regions.getAll.validate, regions.getAll.inDatabase);

    router.post("/search", regions.search.authorize, regions.search.checkBody, regions.search.inDatabase);

    app.use('/api/regions', router);
};