const {validationResult} = require('express-validator');
const database = require("../models");
const Villages = database.villages;
const Op = database.Sequelize.Op;

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            timestamp: new Date().toISOString(),
            message: "Prázdna požiadavka",
            error: true,
            nav: req.protocol + '://' + req.get('host')
        });
        return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            timestamp: new Date().toISOString(),
            message: "Údaje boli nesprávne vyplnené",
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const villages = {
        fullName: req.body.fullName,
        shortName: req.body.shortName,
        zip: req.body.zip,
        districtId: req.body.districtId,
        regionId: req.body.regionId,
        use: req.body.use
    };

    Villages.create(villages)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                timestamp: new Date().toISOString(),
                message: "Vytvorenie mesta/obce sa nepodarilo, skúste znova",
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.delete = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            timestamp: new Date().toISOString(),
            message: "Údaje boli nesprávne vyplnené",
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const id = req.params.id;

    Villages.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({});
            } else {
                res.status(400).send({
                    timestamp: new Date().toISOString(),
                    message: `Ľutujeme ale mesto/obec s identifikačním číslom ${id} neexistuje`,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                timestamp: new Date().toISOString(),
                message: "Odstránenie mesta/obce sa nepodarilo, skúste znova",
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.update = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            timestamp: new Date().toISOString(),
            message: "Údaje boli nesprávne vyplnené",
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const id = req.params.id;

    Villages.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({});
            } else {
                res.status(400).send({
                    timestamp: new Date().toISOString(),
                    message: `Ľutujeme ale mesto/obec s identifikačním číslom ${id} neexistuje`,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                timestamp: new Date().toISOString(),
                message: "Aktualizácia mesta/obce sa nepodarilo, skúste znova",
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.get = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            timestamp: new Date().toISOString(),
            message: "Údaje boli nesprávne vyplnené",
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const id = req.params.id;

    Villages.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({
                    timestamp: new Date().toISOString(),
                    message: `Ľutujeme ale mesto/obec s identifikačním číslom ${id} neexistuje`,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                timestamp: new Date().toISOString(),
                message: `Ľutujeme ale nenašlo sa žiadne mesto/obec`,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.getAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            timestamp: new Date().toISOString(),
            message: "Údaje boli nesprávne vyplnené",
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const pageNumber = req.params.pageNumber;
    const pageSize = req.params.pageSize;

    Villages.findAll({
        offset: (Number(pageNumber) - 1) * Number(pageSize),
        limit: Number(pageSize),
        order: ['name', 'ASC']
    })
        .then(data => {
            if (data.length > 0 || data !== undefined) {
                res.status(206).send(data);
            } else {
                res.status(400).send({
                    timestamp: new Date().toISOString(),
                    message: `Ľutujeme ale nenašlo sa žiadne mesto/obec`,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                timestamp: new Date().toISOString(),
                message: `Ľutujeme ale nenašlo sa žiadne mesto/obec`,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.search = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            timestamp: new Date().toISOString(),
            message: "Prázdna požiadavka",
            error: true,
            nav: req.protocol + '://' + req.get('host')
        });
        return;
    }

    const pagination = req.body.pagination;
    const pageNumber = pagination.pageNumber ? pagination.pageNumber : 1;
    const pageSize = pagination.pageSize ? pagination.pageSize : 10;

    const order = [];
    if (req.body.orderBy) {
        for (let key in req.body.orderBy) {
            order.push([key, req.body.orderBy[key]]);
        }
    }

    const search = [];
    if (req.body.search) {
        for (let key in req.body.search) {
            search.push({[key]: {[Op.like]: `%${req.body.search[key]}%`}});
        }
    }

    Villages.findAll({
        offset: (Number(pageNumber) - 1) * Number(pageSize),
        limit: Number(pageSize),
        order: order,
        where: search
    })
        .then(data => {
            if (data.length > 0 || data !== undefined) {
                res.status(200).send(data);
            } else {
                res.status(400).send({
                    timestamp: new Date().toISOString(),
                    message: `Ľutujeme ale nenašlo sa žiadne mesto/obec`,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                timestamp: new Date().toISOString(),
                message: `Ľutujeme ale nenašlo sa žiadne mesto/obec`,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};