module.exports = app => {
    const regions = require("../controllers/regions.controller");
    const strings = require("../../resources/strings");
    const {check} = require('express-validator');
    const router = require("express").Router();

    router.post("/", [
        check('name')
            .isLength({min: 3, max: 64}).withMessage(strings.REGION_NAME_ALPHA)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_NAME_ALPHA),
        check('shortcut')
            .isLength({min: 2, max: 2}).withMessage(strings.REGION_SHORTCUT_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_SHORTCUT_ALPHA),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.REGION_USE_INT)
    ], regions.create);

    router.delete("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.REGION_ID_INT)
    ], regions.delete);

    router.put("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.REGION_ID_INT),
        check('name')
            .isLength({min: 3, max: 64}).withMessage(strings.REGION_NAME_ALPHA)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_NAME_ALPHA),
        check('shortcut')
            .isLength({min: 2, max: 2}).withMessage(strings.REGION_SHORTCUT_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_SHORTCUT_ALPHA),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.REGION_USE_INT)
    ], regions.update);

    router.get("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.REGION_ID_INT)
    ], regions.get);

    router.get("/page/:pageNumber/limit/:pageSize", [
        check('pageNumber')
            .isInt({min: 1}).withMessage(strings.REGION_PAGE_NUMBER_INT),
        check('pageSize')
            .isInt({min: 1}).withMessage(strings.REGION_PAGE_SIZE_INT)
    ], regions.getAll);

    router.post("/search", regions.search);

    app.use('/api/regions', router);
};