module.exports = app => {
    const villages = require("../controllers/villages.controller");
    const strings = require("../../resources/strings");
    const {check} = require('express-validator');
    const router = require("express").Router();

    router.post("/", [
        check('fullName')
            .isLength({min: 3, max: 64}).withMessage(strings.VILLAGE_FULL_NAME_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.VILLAGE_FULL_NAME_ALPHA),
        check('shortName')
            .isLength({min: 3, max: 32}).withMessage(strings.VILLAGE_SHORT_NAME_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.VILLAGE_SHORT_NAME_ALPHA),
        check('zip')
            .isAlphanumeric(['sk-SK']).withMessage(strings.VILLAGE_ZIP_ALPHA_NUMERIC),
        check('districtId')
            .isInt({min: 1}).withMessage(strings.VILLAGE_DISTRICT_ID_INT),
        check('regionId')
            .isInt({min: 1}).withMessage(strings.VILLAGE_REGION_ID_INT),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.VILLAGE_USE_INT)
    ], villages.create);

    router.delete("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.VILLAGE_ID_INT)
    ], villages.delete);

    router.put("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.VILLAGE_ID_INT),
        check('fullName')
            .isLength({min: 3, max: 64}).withMessage(strings.VILLAGE_FULL_NAME_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.VILLAGE_FULL_NAME_ALPHA),
        check('shortName')
            .isLength({min: 3, max: 32}).withMessage(strings.VILLAGE_SHORT_NAME_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.VILLAGE_SHORT_NAME_ALPHA),
        check('zip')
            .isAlphanumeric(['sk-SK']).withMessage(strings.VILLAGE_ZIP_ALPHA_NUMERIC),
        check('districtId')
            .isInt({min: 1}).withMessage(strings.VILLAGE_DISTRICT_ID_INT),
        check('regionId')
            .isInt({min: 1}).withMessage(strings.VILLAGE_REGION_ID_INT),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.VILLAGE_USE_INT)
    ], villages.update);

    router.get("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.VILLAGE_ID_INT)
    ], villages.get);

    router.get("/page/:pageNumber/limit/:pageSize", [
        check('pageNumber')
            .isInt({min: 1}).withMessage(strings.VILLAGE_PAGE_NUMBER_INT),
        check('pageSize')
            .isInt({min: 1}).withMessage(strings.VILLAGE_PAGE_SIZE_INT)
    ], villages.getAll);

    router.post("/search", villages.search);

    app.use('/api/villages', router);
};