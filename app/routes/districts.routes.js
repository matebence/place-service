module.exports = app => {
    const districts = require("../controllers/districts.controller");
    const router = require("express").Router();

    router.post("/", [
        check('name')
            .isLength({min: 3, max: 64}).withMessage('Minimálna dlžka okresu je 3 a maximalná je 64')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov okresu'),
        check('vehRegNum')
            .isLength({min: 2, max: 2}).withMessage('Nesprávna dlžka iniciály okresu, dlžka musí byť 2')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát iniciály okresu'),
        check('code')
            .isInt({min: 1}).withMessage('Nesprávný formát kód okresu'),
        check('regionId')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla kraja'),
        check('use')
            .isInt({min: 0, max: 1}).withMessage('Hodnota musí byť 1 alebo 0')
    ], districts.create);

    router.delete("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla')
    ], districts.delete);

    router.put("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla'),
        check('name')
            .isLength({min: 3, max: 64}).withMessage('Minimálna dlžka okresu je 3 a maximalná je 64')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov okresu'),
        check('vehRegNum')
            .isLength({min: 2, max: 2}).withMessage('Nesprávna dlžka iniciály okresu, dlžka musí byť 2')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát iniciály okresu'),
        check('code')
            .isInt({min: 1}).withMessage('Nesprávný formát kód okresu'),
        check('regionId')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla kraja'),
        check('use')
            .isInt({min: 0, max: 1}).withMessage('Hodnota musí byť 1 alebo 0')
    ], districts.update);

    router.get("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla')
    ], districts.get);

    router.get("/page/:pageNumber/limit/:pageSize", [
        check('pageNumber')
            .isInt({min: 1}).withMessage('Nesprávný formát číslo strany'),
        check('pageSize')
            .isInt({min: 1}).withMessage('Nesprávný formát veľkosť strany')
    ], districts.getAll);

    router.post("/search", districts.search);

    app.use('/api/districts', router);
};