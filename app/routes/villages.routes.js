module.exports = app => {
    const villages = require("../controllers/villages.controller");
    const router = require("express").Router();

    router.post("/", [
        check('fullName')
            .isLength({min: 3, max: 64}).withMessage('Minimálna dlžka obce/mesta je 3 a maximalná je 64')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov obce/mesta'),
        check('shortName')
            .isLength({min: 3, max: 32}).withMessage('Minimálna dlžka obce/mesta je 3 a maximalná je 32, (kratký názov)')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov obce/mesta, (kratký názov)'),
        check('zip')
            .isAlphanumeric(['sk-SK']).withMessage('Nesprávný formát PSČ'),
        check('districtId')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla kraja'),
        check('regionId')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla kraja'),
        check('use')
            .isInt({min: 0, max: 1}).withMessage('Hodnota musí byť 1 alebo 0')
    ], villages.create);

    router.delete("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla')
    ], villages.delete);

    router.put("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla'),
        check('fullName')
            .isLength({min: 3, max: 64}).withMessage('Minimálna dlžka obce/mesta je 3 a maximalná je 64')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov obce/mesta'),
        check('shortName')
            .isLength({min: 3, max: 32}).withMessage('Minimálna dlžka obce/mesta je 3 a maximalná je 32, (kratký názov)')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov obce/mesta, (kratký názov)'),
        check('zip')
            .isAlphanumeric(['sk-SK']).withMessage('Nesprávný formát PSČ'),
        check('districtId')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla kraja'),
        check('regionId')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla kraja'),
        check('use')
            .isInt({min: 0, max: 1}).withMessage('Hodnota musí byť 1 alebo 0')
    ], villages.update);

    router.get("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla')
    ], villages.get);

    router.get("/page/:pageNumber/limit/:pageSize", [
        check('pageNumber')
            .isInt({min: 1}).withMessage('Nesprávný formát číslo strany'),
        check('pageSize')
            .isInt({min: 1}).withMessage('Nesprávný formát veľkosť strany')
    ], villages.getAll);

    router.post("/search", villages.search);

    app.use('/api/villages', router);
};