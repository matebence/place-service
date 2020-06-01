module.exports = app => {
    const districts = require("../controllers/districts.controller");
    const strings = require("../../resources/strings");
    const {check} = require('express-validator');
    const router = require("express").Router();

    router.post("/", [
        check('name')
            .isLength({min: 3, max: 64}).withMessage(strings.DISTRICT_NAME_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.DISTRICT_NAME_ALPHA),
        check('vehRegNum')
            .isLength({min: 2, max: 2}).withMessage(strings.DISTRICT_VEH_REG_NUM_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.DISTRICT_VEH_REG_NUM_ALPHA),
        check('code')
            .isInt({min: 1}).withMessage(strings.DISTRICT_CODE_INT),
        check('regionId')
            .isInt({min: 1}).withMessage(strings.DISTRICT_REGION_ID_INT),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.DISTRICT_USE_INT)
    ], districts.create);

    router.delete("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.DISTRICT_ID_INT)
    ], districts.delete);

    router.put("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.DISTRICT_ID_INT),
        check('name')
            .isLength({min: 3, max: 64}).withMessage(strings.DISTRICT_NAME_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.DISTRICT_NAME_ALPHA),
        check('vehRegNum')
            .isLength({min: 2, max: 2}).withMessage(strings.DISTRICT_VEH_REG_NUM_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.DISTRICT_VEH_REG_NUM_ALPHA),
        check('code')
            .isInt({min: 1}).withMessage(strings.DISTRICT_CODE_INT),
        check('regionId')
            .isInt({min: 1}).withMessage(strings.DISTRICT_REGION_ID_INT),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.DISTRICT_USE_INT)
    ], districts.update);

    router.get("/:id", [
        check('id')
            .isInt({min: 1}).withMessage(strings.DISTRICT_ID_INT)
    ], districts.get);

    router.get("/page/:pageNumber/limit/:pageSize", [
        check('pageNumber')
            .isInt({min: 1}).withMessage(strings.DISTRICT_PAGE_NUMBER_INT),
        check('pageSize')
            .isInt({min: 1}).withMessage(strings.DISTRICT_PAGE_SIZE_INT)
    ], districts.getAll);

    router.post("/search", districts.search);

    app.use('/api/districts', router);
};