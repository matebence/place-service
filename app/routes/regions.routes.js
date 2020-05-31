module.exports = app => {
    const regions = require("../controllers/regions.controller");
    const router = require("express").Router();

    router.post("/", regions.create);

    router.delete("/:id", regions.delete);

    router.put("/:id", regions.update);

    router.get("/:id", regions.get);

    router.get("/page/:pageNumber/limit/:pageSize", regions.getAll);

    router.post("/search", regions.search);

    app.use('/api/regions', router);
};