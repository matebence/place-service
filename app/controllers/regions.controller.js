const {validationResult} = require('express-validator');
const strings = require('../../resources/strings');
const database = require("../models");
const Regions = database.regions;
const Op = database.Sequelize.Op;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

exports.create = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_REQUEST_ERR,
            error: true,
            nav: `${req.protocol}://req.get('host')`
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_VALIDATION_ERR,
            error: true,
            validations: errors.array(),
            nav: `${req.protocol}://req.get('host')`
        });
    }

    return database.sequelize.transaction((t) => {
        return Regions.create({
            name: req.body.name,
            shortcut: req.body.shortcut,
            use: req.body.use
        }, {transaction: t});
    }).then(data => {
        return res.status(201).json(data, [
            {rel: "region", method: "GET", href: `${req.protocol}://${req.get('host')}/api/regions/${data.id}`}]);
    }).catch(err => {
        const [ValidationErrorItem] = err.errors;
        if (ValidationErrorItem.validatorKey !== 'not_unique') throw err;
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_UNIQUE_ERR + ValidationErrorItem.value.replace('-', ', '),
            error: true,
            nav: `${req.protocol}://req.get('host')`
        });
    }).catch(err => {
        return res.status(500).json({
            timestamp: new Date().toISOString(),
            message: strings.CREATE_REGION_ERR,
            error: true,
            nav: `${req.protocol}://req.get('host')`
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
            validations: errors.array(),
            nav: `${req.protocol}://req.get('host')`
        });
    }

    return database.sequelize.transaction((t) => {
        return Regions.destroy({
            where: {id: req.params.id}
        }, {transaction: t});
    }).then(num => {
        if (num === 1) {
            return res.status(200).json({});
        } else {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.GET_REGION_ERR,
                error: true,
                nav: `${req.protocol}://req.get('host')`
            });
        }
    }).catch(err => {
        return res.status(500).json({
            timestamp: new Date().toISOString(),
            message: strings.DELETE_REGION_ERR,
            error: true,
            nav: `${req.protocol}://req.get('host')`
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
            validations: errors.array(),
            nav: `${req.protocol}://req.get('host')`
        });
    }

    return database.sequelize.transaction((t) => {
        return Regions.update(req.body, {
            where: {id: req.params.id}
        }, {transaction: t});
    }).then(num => {
        if (num === 1) {
            return res.status(200).json({});
        } else {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.GET_REGION_ERR,
                error: true,
                nav: `${req.protocol}://req.get('host')`
            });
        }
    }).catch(err => {
        const [ValidationErrorItem] = err.errors;
        if (ValidationErrorItem.validatorKey !== 'not_unique') throw err;
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_UNIQUE_ERR + ValidationErrorItem.value.replace('-', ', '),
            error: true,
            nav: `${req.protocol}://req.get('host')`
        });
    }).catch(err => {
        return res.status(500).json({
            timestamp: new Date().toISOString(),
            message: strings.CREATE_REGION_ERR,
            error: true,
            nav: `${req.protocol}://req.get('host')`
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
            validations: errors.array(),
            nav: `${req.protocol}://req.get('host')`
        });
    }

    return database.sequelize.transaction((t) => {
        return Regions.findByPk(req.params.id,
            {transaction: t});
    }).then(data => {
        if (data) {
            return res.status(200).json(data, [
                {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                {rel: "all-regions", method: "GET", href: `${req.protocol}://${req.get('host')}/api/regions/page/${DEFAULT_PAGE_NUMBER}/${DEFAULT_PAGE_SIZE}`}]);
        } else {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.GET_REGION_ERR,
                error: true,
                nav: `${req.protocol}://req.get('host')`
            });
        }
    }).catch(err => {
        return res.status(500).json({
            timestamp: new Date().toISOString(),
            message: strings.REGION_NOT_FOUND,
            error: true,
            nav: `${req.protocol}://req.get('host')`
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
            validations: errors.array(),
            nav: `${req.protocol}://req.get('host')`
        });
    }

    return database.sequelize.transaction((t) => {
        return Regions.findAll({
            offset: (Number(req.params.pageNumber) - 1) * Number(req.params.pageSize),
            limit: Number(req.params.pageSize),
            order: [['name', 'ASC']]
        }, {transaction: t});
    }).then(data => {
        if (data.length > 0 || data !== undefined) {
            return res.status(206).json({data}, [
                {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                {rel: "next-range", method: "GET", href: `${req.protocol}://${req.get('host')}/api/regions/page/${1 + Number(req.params.pageNumber)}/${pagreq.params.pageSizeeSize}`}]);
        } else {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.REGION_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://req.get('host')`
            });
        }
    }).catch(err => {
        return res.status(500).json({
            timestamp: new Date().toISOString(),
            message: strings.REGION_NOT_FOUND,
            error: true,
            nav: `${req.protocol}://req.get('host')`
        });
    });
};

exports.search = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            message: strings.SERVER_REQUEST_ERR,
            error: true,
            nav: `${req.protocol}://req.get('host')`
        });
    }

    const pagination = req.body.pagination;
    const search = [];
    const order = [];

    if (req.body.orderBy) {
        for (let key in req.body.orderBy) {
            order.push([key, req.body.orderBy[key]]);
        }
    }
    if (req.body.search) {
        for (let key in req.body.search) {
            search.push({[key]: {[Op.like]: `%${req.body.search[key]}%`}});
        }
    }

    return database.sequelize.transaction((t) => {
        return Regions.findAll({
            offset: (Number(pagination.pageNumber ? pagination.pageNumber : DEFAULT_PAGE_NUMBER) - 1) * Number(pagination.pageSize ? pagination.pageSize : DEFAULT_PAGE_SIZE),
            limit: Number(pagination.pageSize ? pagination.pageSize : DEFAULT_PAGE_SIZE),
            order: order,
            where: search
        }, {transaction: t});
    }).then(data => {
        if (data.length > 0 || data !== undefined) {
            return res.status(200).json(data, [
                {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl}]);
        } else {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.REGION_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://req.get('host')`
            });
        }
    }).catch(err => {
        return res.status(500).json({
            timestamp: new Date().toISOString(),
            message: strings.REGION_NOT_FOUND,
            error: true,
            nav: `${req.protocol}://req.get('host')`
        });
    });
};