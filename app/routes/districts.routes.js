module.exports = app => {
    const districts = require("../controllers/districts.controller");
    const router = require("express").Router();

    router.post("/", districts.validate('create'), districts.create);

    router.delete("/:id", districts.validate('delete'), districts.delete);

    router.put("/:id", districts.validate('update'), districts.update);

    router.get("/:id", districts.validate('get'), districts.get);

    router.get("/page/:pageNumber/limit/:pageSize", districts.validate('getAll'), districts.getAll);

    router.post("/search", districts.search);

    app.use('/api/districts', router);
};