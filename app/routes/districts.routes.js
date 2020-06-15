module.exports = app => {
    const districts = require("../controllers/districts.controller");
    const router = require("express").Router();

    router.post("/", districts.create.authorize, districts.create.checkBody, districts.create.validate, districts.create.inDatabase);

    router.delete("/:id", districts.delete.authorize, districts.delete.validate, districts.delete.inDatabase);

    router.put("/:id", districts.update.authorize, districts.update.checkBody, districts.update.validate, districts.update.inDatabase);

    router.get("/:id", districts.get.authorize, districts.get.validate, districts.get.inDatabase);

    router.get("/page/:pageNumber/limit/:pageSize", districts.getAll.authorize, districts.getAll.validate, districts.getAll.inDatabase);

    router.post("/search", districts.search.authorize, districts.search.checkBody, districts.search.inDatabase);

    router.post("/join/:columnName", districts.join.authorize, districts.join.checkBody, districts.join.validate, districts.join.inDatabase);

    app.use('/api/districts', router);
};