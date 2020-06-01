const {validationResult} = require('express-validator');
const strings = require('../../resources/strings');
const database = require("../models");
const Districts = database.districts;
const Op = database.Sequelize.Op;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_REQUEST_ERR,
            error: true,
            nav: req.protocol + '://' + req.get('host')
        });
        return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_VALIDATION_ERR,
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const districts = {
        name: req.body.name,
        vehRegNum: req.body.vehRegNum,
        code: req.body.code,
        regionId: req.body.regionId,
        use: req.body.use
    };

    Districts.create(districts)
        .then(data => {
            res.status(201).json(data, [
                {rel: "district", method: "GET", href: `${req.protocol}://${req.get('host')}/api/districts/${data.id}`}]);
        })
        .catch(err => {
            const [ValidationErrorItem] = err.errors;
            if (ValidationErrorItem.validatorKey !== 'not_unique') throw err;
            res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_UNIQUE_ERR+ValidationErrorItem.value.replace('-', ', '),
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        })
        .catch(err => {
            res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.CREATE_REGION_ERR,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.delete = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_VALIDATION_ERR,
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const id = req.params.id;

    Districts.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).json({});
            } else {
                res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_DISTRICT_ERR,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DELETE_DISTRICT_ERR,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.update = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_VALIDATION_ERR,
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const id = req.params.id;

    Districts.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).json({});
            } else {
                res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_DISTRICT_ERR,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            const [ValidationErrorItem] = err.errors;
            if (ValidationErrorItem.validatorKey !== 'not_unique') throw err;
            res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_UNIQUE_ERR+ValidationErrorItem.value.replace('-', ', '),
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        })
        .catch(err => {
            res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.CREATE_REGION_ERR,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.get = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_VALIDATION_ERR,
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const id = req.params.id;

    Districts.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json(data, [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                    {rel: "all-districts", method: "GET", href: `${req.protocol}://${req.get('host')}/api/districts/page/${DEFAULT_PAGE_NUMBER}/${DEFAULT_PAGE_SIZE}`}]);
            } else {
                res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_DISTRICT_ERR,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DISTRICT_NOT_FOUND,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.getAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_VALIDATION_ERR,
            error: true,
            validations:  errors.array(),
            nav: req.protocol + '://' + req.get('host')
        });
    }

    const pageNumber = req.params.pageNumber;
    const pageSize = req.params.pageSize;

    Districts.findAll({
        offset: (Number(pageNumber) - 1) * Number(pageSize),
        limit: Number(pageSize),
        order: [['name', 'ASC']]
    })
        .then(data => {
            if (data.length > 0 || data !== undefined) {
                res.status(206).json({data}, [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                    {rel: "next-range", method: "GET", href: `${req.protocol}://${req.get('host')}/api/districts/page/${1+Number(pageNumber)}/${pageSize}`}]);
            } else {
                res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.DISTRICT_NOT_FOUND,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DISTRICT_NOT_FOUND,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};

exports.search = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_REQUEST_ERR,
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

    Districts.findAll({
        offset: (Number(pageNumber) - 1) * Number(pageSize),
        limit: Number(pageSize),
        order: order,
        where: search
    })
        .then(data => {
            if (data.length > 0 || data !== undefined) {
                res.status(200).json(data, [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl}]);
            } else {
                res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.DISTRICT_NOT_FOUND,
                    error: true,
                    nav: req.protocol + '://' + req.get('host')
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DISTRICT_NOT_FOUND,
                error: true,
                nav: req.protocol + '://' + req.get('host')
            });
        });
};