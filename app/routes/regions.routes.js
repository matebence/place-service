module.exports = app => {
    const regions = require("../controllers/regions.controller");
    const {check} = require('express-validator');
    const router = require("express").Router();

    router.post("/", [
        check('name')
            .isLength({min: 3, max: 64}).withMessage('Minimálna dlžka kraja je 3 a maximalná je 64')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov kraja'),
        check('shortcut')
            .isLength({min: 2, max: 2}).withMessage('Nesprávna dlžka iniciály kraja, dlžka musí byť 2')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát iniciály kraja'),
        check('use')
            .isInt({min: 0, max: 1}).withMessage('Hodnota musí byť 1 alebo 0')
    ], regions.create);

    router.delete("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla')
    ], regions.delete);

    router.put("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla'),
        check('name')
            .isLength({min: 3, max: 64}).withMessage('Minimálna dlžka kraja je 3 a maximalná je 64')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát názov kraja'),
        check('shortcut')
            .isLength({min: 2, max: 2}).withMessage('Nesprávna dlžka iniciály kraja, dlžka musí byť 2')
            .isAlpha(['sk-SK']).withMessage('Nesprávný formát iniciály kraja'),
        check('use')
            .isInt({min: 0, max: 1}).withMessage('Hodnota musí byť 1 alebo 0')
    ], regions.update);

    router.get("/:id", [
        check('id')
            .isInt({min: 1}).withMessage('Nesprávný formát identifikacného čísla')
    ], regions.get);

    router.get("/page/:pageNumber/limit/:pageSize", [
        check('pageNumber')
            .isInt({min: 1}).withMessage('Nesprávný formát číslo strany'),
        check('pageSize')
            .isInt({min: 1}).withMessage('Nesprávný formát veľkosť strany')
    ], regions.getAll);

    router.post("/search", regions.search);

    app.use('/api/regions', router);
};