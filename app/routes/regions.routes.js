module.exports = app => {
    const regions = require("../controllers/regions.controller");
    const router = require("express").Router();

    router.post("/", regions.validate('create'), regions.create);

    router.delete("/:id", regions.validate('delete'), regions.delete);

    router.put("/:id", regions.validate('update'), regions.update);

    router.get("/:id", regions.validate('get'), regions.get);

    router.get("/page/:pageNumber/limit/:pageSize", regions.validate('getAll'), regions.getAll);

    router.post("/search", regions.search);

    app.use('/api/regions', router);
};