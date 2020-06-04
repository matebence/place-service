const {validationResult, check} = require('express-validator/check');

const strings = require('../../resources/strings');
const database = require("../models");

const Districts = database.districts;
const Op = database.Sequelize.Op;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

exports.create = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER']) && !req.hasPrivilege(['CREATE_DISTRICTS'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    checkBody: (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_REQUEST_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    validate: [
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
            .isInt({min: 0, max: 1}).withMessage(strings.DISTRICT_USE_INT),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    timestamp: new Date().toISOString(),
                    message: strings.SERVER_VALIDATION_ERR,
                    error: true,
                    validations: errors.array(),
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
            next()
        }
    ],
    inDatabase: (req, res, next) => {
        return database.sequelize.transaction((t) => {
            return Districts.create({
                name: req.body.name,
                vehRegNum: req.body.vehRegNum,
                code: req.body.code,
                regionId: req.body.regionId,
                use: req.body.use
            }, {transaction: t});
        }).then(data => {
            return res.status(201).json(data, [
                {rel: "district", method: "GET", href: `${req.protocol}://${req.get('host')}/api/districts/${data.id}`}]);
        }).catch(err => {
            const [ValidationErrorItem] = err.errors;
            if (ValidationErrorItem.validatorKey !== 'not_unique') throw err;
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_UNIQUE_ERR + ValidationErrorItem.value.replace('-', ', '),
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.CREATE_REGION_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.delete = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN']) && !req.hasPrivilege(['DELETE_DISTRICTS'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    validate: [
        check('id')
            .isInt({min: 1}).withMessage(strings.DISTRICT_ID_INT),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    timestamp: new Date().toISOString(),
                    message: strings.SERVER_VALIDATION_ERR,
                    error: true,
                    validations: errors.array(),
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
            next()
        }
    ],
    inDatabase: (req, res, next) => {
        return database.sequelize.transaction((t) => {
            Districts.destroy({
                where: {id: req.params.id}
            }, {transaction: t});
        }).then(num => {
            if (num === 1) {
                return res.status(200).json({});
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_DISTRICT_ERR,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DELETE_DISTRICT_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.update = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER']) && !req.hasPrivilege(['UPDATE_DISTRICTS'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    checkBody: (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_REQUEST_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    validate: [
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
            .isInt({min: 0, max: 1}).withMessage(strings.DISTRICT_USE_INT),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    timestamp: new Date().toISOString(),
                    message: strings.SERVER_VALIDATION_ERR,
                    error: true,
                    validations: errors.array(),
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
            next()
        }
    ],
    inDatabase: (req, res, next) => {
        return database.sequelize.transaction((t) => {
            return Districts.update(req.body, {
                where: {id: req.params.id}
            }, {transaction: t});
        }).then(num => {
            if (num === 1) {
                return res.status(200).json({});
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_DISTRICT_ERR,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            const [ValidationErrorItem] = err.errors;
            if (ValidationErrorItem.validatorKey !== 'not_unique') throw err;
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_UNIQUE_ERR + ValidationErrorItem.value.replace('-', ', '),
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.CREATE_REGION_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.get = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CLIENT', 'ROLE_COURIER']) && !req.hasPrivilege(['VIEW_DISTRICTS'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    validate: [
        check('id')
            .isInt({min: 1}).withMessage(strings.DISTRICT_ID_INT),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    timestamp: new Date().toISOString(),
                    message: strings.SERVER_VALIDATION_ERR,
                    error: true,
                    validations: errors.array(),
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
            next()
        }
    ],
    inDatabase: (req, res, next) => {
        return database.sequelize.transaction((t) => {
            return Districts.findByPk(req.params.id,
                {include: [database.regions], transaction: t});
        }).then(data => {
            if (data) {
                return res.status(200).json(data, [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                    {rel: "all-districts", method: "GET", href: `${req.protocol}://${req.get('host')}/api/districts/page/${DEFAULT_PAGE_NUMBER}/${DEFAULT_PAGE_SIZE}`}]);
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_DISTRICT_ERR,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DISTRICT_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.getAll = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CLIENT', 'ROLE_COURIER']) && !req.hasPrivilege(['VIEW_DISTRICTS'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    validate: [
        check('pageNumber')
            .isInt({min: 1}).withMessage(strings.DISTRICT_PAGE_NUMBER_INT),
        check('pageSize')
            .isInt({min: 1}).withMessage(strings.DISTRICT_PAGE_SIZE_INT),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    timestamp: new Date().toISOString(),
                    message: strings.SERVER_VALIDATION_ERR,
                    error: true,
                    validations: errors.array(),
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
            next()
        }
    ],
    inDatabase: (req, res, next) => {
        return database.sequelize.transaction((t) => {
            return Districts.findAll({
                offset: (Number(req.params.pageNumber) - 1) * Number(req.params.pageSize),
                limit: Number(req.params.pageSize),
                order: [['name', 'ASC']],
                include: [database.regions]
            }, {transaction: t});
        }).then(data => {
            if (data.length > 0 || data !== undefined) {
                return res.status(206).json({data}, [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                    {rel: "next-range", method: "GET", href: `${req.protocol}://${req.get('host')}/api/districts/page/${1 + Number(req.params.pageNumber)}/${req.params.pageSize}`}]);
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.DISTRICT_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DISTRICT_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.search = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CLIENT', 'ROLE_COURIER']) && !req.hasPrivilege(['VIEW_DISTRICTS'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    checkBody: (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                message: strings.SERVER_REQUEST_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next()
    },
    inDatabase: (req, res, next) => {
        const pagination = req.body.pagination;
        const order = [];
        const search = [];

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
            return Districts.findAll({
                offset: (Number(pagination.pageNumber ? pagination.pageNumber : DEFAULT_PAGE_NUMBER) - 1) * Number(pagination.pageSize ? pagination.pageSize : DEFAULT_PAGE_SIZE),
                limit: Number(pagination.pageSize ? pagination.pageSize : DEFAULT_PAGE_SIZE),
                order: order,
                where: search,
                include: [database.regions]
            }, {transaction: t});
        }).then(data => {
            if (data.length > 0 || data !== undefined) {
                return res.status(200).json(data, [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl}]);
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.DISTRICT_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DISTRICT_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};