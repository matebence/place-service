module.exports = app => {
    const districts = require("../controllers/districts.controller");
    const router = require("express").Router();

    router.post("/", districts.create);

    router.delete("/:id", districts.delete);

    router.put("/:id", districts.update);

    router.get("/:id", districts.get);

    router.get("/page/:pageNumber/limit/:pageSize", districts.getAll);

    router.post("/search", districts.search);

    app.use('/api/districts', router);
};