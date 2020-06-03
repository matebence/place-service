module.exports = app => {
    const villages = require("../controllers/villages.controller");
    const router = require("express").Router();

    router.post("/", villages.validate('create'), villages.create);

    router.delete("/:id", villages.validate('delete'), villages.delete);

    router.put("/:id", villages.validate('update'), villages.update);

    router.get("/:id", villages.validate('get'), villages.get);

    router.get("/page/:pageNumber/limit/:pageSize", villages.validate('getAll'), villages.getAll);

    router.post("/search", villages.search);

    app.use('/api/villages', router);
};