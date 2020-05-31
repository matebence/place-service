module.exports = app => {
    const villages = require("../controllers/villages.controller");
    const router = require("express").Router();

    router.post("/", villages.create);

    router.delete("/:id", villages.delete);

    router.put("/:id", villages.update);

    router.get("/:id", villages.get);

    router.get("/page/:pageNumber/limit/:pageSize", villages.getAll);

    router.post("/search", villages.search);

    app.use('/api/villages', router);
};