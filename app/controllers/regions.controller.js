const {validationResult, check} = require('express-validator/check');
const crypto = require('crypto-js');

const strings = require('../../resources/strings');
const database = require("../models");

const Warehouses = require('../component/resilient.component');
const Regions = database.regions;
const Districts = database.districts;
const Villages = database.villages;
const Op = database.Sequelize.Op;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

exports.create = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER'])) {
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
            .isLength({min: 3, max: 64}).withMessage(strings.REGION_NAME_ALPHA)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_NAME_ALPHA),
        check('shortcut')
            .isLength({min: 2, max: 2}).withMessage(strings.REGION_SHORTCUT_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_SHORTCUT_ALPHA),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.REGION_USE_INT),

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
            return Regions.create(req.body, {transaction: t});
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
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next();
    },
    validate: [
        check('id')
            .isInt({min: 1}).withMessage(strings.REGION_ID_INT),

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
            return Promise.all([
                Regions.destroy({where: {id: req.params.id}}, {transaction: t}),
                Districts.destroy({where: {regionId: req.params.id}}, {transaction: t}),
                Villages.destroy({where: {regionId: req.params.id}}, {transaction: t})
            ]);
        }).then(num => {
            if (num.every(number => number > 0)) {
                return res.status(200).json({});
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_REGION_ERR,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.DELETE_REGION_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.update = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER'])) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                message: strings.AUTH_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        }
        next();
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
            .isInt({min: 1}).withMessage(strings.REGION_ID_INT),
        check('name')
            .isLength({min: 3, max: 64}).withMessage(strings.REGION_NAME_ALPHA)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_NAME_ALPHA),
        check('shortcut')
            .isLength({min: 2, max: 2}).withMessage(strings.REGION_SHORTCUT_LENGHT)
            .isAlpha(['sk-SK']).withMessage(strings.REGION_SHORTCUT_ALPHA),
        check('use')
            .isInt({min: 0, max: 1}).withMessage(strings.REGION_USE_INT),

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
                message: strings.UPDATE_REGION_ERR,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};

exports.get = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CLIENT', 'ROLE_COURIER'])) {
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
            .isInt({min: 1}).withMessage(strings.REGION_ID_INT),

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
            return Regions.findByPk(req.params.id,
                {transaction: t});
        }).then(data => {
            if (data) {
                req.regions = data;
                req.hateosLinks = [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                    {rel: "all-regions", method: "GET", href: `${req.protocol}://${req.get('host')}/api/regions/page/${DEFAULT_PAGE_NUMBER}/limit/${DEFAULT_PAGE_SIZE}`}];
                next();
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.GET_REGION_ERR,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.REGION_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    },
    fetchDataFromService: (req, res, next) => {
        const proxy = Warehouses.resilient("WAREHOUSE-SERVICE");
        const regionId = req.regions.id;

        proxy.post('/warehouses/join/regions', {data: [req.regions.id]}).then(response => {
            if (response.status >= 300 && !'error' in response.data) return new Error(strings.PROXY_ERR);
            database.redis.setex(crypto.MD5(`warehouses-${regionId}`).toString(), 3600, JSON.stringify(response.data));

            const regions = [req.regions].map(e => {
                const {name, country, address} = response.data.find(x => x.regions.includes(e.id));
                return {...e.dataValues, warehouse: {name: name, address: `${country} ${address}`}};
            }).pop();

            return res.status(200).json(regions, req.hateosLinks);
        }).catch(err => {
            req.cacheId = regionId;
            next();
        });
    },
    fetchDataFromCache: (req, res, next) => {
        database.redis.get(crypto.MD5(`warehouses-${req.cacheId}`).toString(), (err, data) => {
            if (!data) {
                return res.status(500).json({
                    timestamp: new Date().toISOString(),
                    message: strings.REGION_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            } else{
                try{
                    const regions = [req.regions].map(e => {
                        const {name, country, address} = JSON.parse(data).find(x => x.regions.includes(e.id));
                        return {...e.dataValues, warehouse: {name: name, address: `${country} ${address}`}};
                    }).pop();

                    return res.status(200).json(regions, req.hateosLinks);
                }catch (err){
                    return res.status(500).json({
                        timestamp: new Date().toISOString(),
                        message: strings.REGION_NOT_FOUND,
                        error: true,
                        nav: `${req.protocol}://${req.get('host')}`
                    });
                }
            }
        });
    }
};

exports.getAll = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CLIENT', 'ROLE_COURIER'])) {
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
            .isInt({min: 1}).withMessage(strings.REGION_PAGE_NUMBER_INT),
        check('pageSize')
            .isInt({min: 1}).withMessage(strings.REGION_PAGE_SIZE_INT),

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
            return Regions.findAll({
                offset: (Number(req.params.pageNumber) - 1) * Number(req.params.pageSize),
                limit: Number(req.params.pageSize),
                order: [['name', 'ASC']]
            }, {transaction: t});
        }).then(data => {
            if (data.length > 0 || data !== undefined) {
                req.regions = data;
                req.hateosLinks = [
                    {rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl},
                    {rel: "next-range", method: "GET", href: `${req.protocol}://${req.get('host')}/api/regions/page/${1 + Number(req.params.pageNumber)}/limit/${req.params.pageSize}`}];
                next();
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.REGION_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.REGION_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    },
    fetchDataFromService: (req, res, next) => {
        const proxy = Warehouses.resilient("WAREHOUSE-SERVICE");
        const regiondIds = req.regions.filter(e => e.id).map(x => x.id);

        proxy.post('/warehouses/join/regions', {data: regiondIds}).then(response => {
            if (response.status >= 300 && !'error' in response.data) return new Error(strings.PROXY_ERR);
            response.data.forEach(e => {
                const intersection = regiondIds.filter(element => e.regions.includes(element));
                intersection.forEach(x => {database.redis.setex(crypto.MD5(`warehouses-${x}`).toString(), 3600, JSON.stringify(e))});
            });

            const regions = req.regions.map(e => {
                const {name, country, address} = response.data.find(x => x.regions.includes(e.id));
                return {...e.dataValues, warehouse: {name: name, address: `${country} ${address}`}};
            });

            return res.status(206).json({data: regions}, req.hateosLinks);
        }).catch(err => {
            req.cacheId = regiondIds;
            next();
        });
    },
    fetchDataFromCache: (req, res, next) => {
        database.redis.mget(req.cacheId.map(e => {return crypto.MD5(`warehouses-${e}`).toString()}), (err, data) => {
            if (!data) {
                return res.status(500).json({
                    timestamp: new Date().toISOString(),
                    message: strings.REGION_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            } else {
                try{
                    data = JSON.stringify(data.map(e => {return JSON.parse(e)}));
                    const regions = req.regions.map(e => {
                        const {name, country, address} = JSON.parse(data).find(x => x.regions.includes(e.id));
                        return {...e.dataValues, warehouse: {name: name, address: `${country} ${address}`}};
                    });

                    return res.status(206).json({data: regions}, req.hateosLinks);
                } catch(err) {
                    return res.status(500).json({
                        timestamp: new Date().toISOString(),
                        message: strings.REGION_NOT_FOUND,
                        error: true,
                        nav: `${req.protocol}://${req.get('host')}`
                    });
                }
            }
        });
    }
};

exports.search = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_CLIENT', 'ROLE_COURIER'])) {
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
        let order = [];
        let search = [];
        let hateosLinks = [];

        if (req.body.orderBy) {
            for (let key in req.body.orderBy) {
                order.push([key, req.body.orderBy[key]]);
            }
        }
        if (req.body.search) {
            for (let key in req.body.search) {
                if (isNaN(req.body.search[key])){
                    search.push({[key]: database.sequelize.where(database.sequelize.fn('lower', database.sequelize.col(key)), {[Op.like]: `%${req.body.search[key].toLowerCase()}%`})});
                } else{
                    search.push({[key]: Number(req.body.search[key])});
                }
            }
        }
        Regions.count({where: search}).then(count => {
            hateosLinks.push({rel: "self", method: "GET", href: req.protocol + '://' + req.get('host') + req.originalUrl});
            if (Number(pagination.pageNumber) > 1) hateosLinks.push({rel: "has-prev", method: "POST", href: `${req.protocol}://${req.get('host')}/api/regions/search`});
            if ((Number(pagination.pageNumber) * Number(pagination.pageSize)) < count) hateosLinks.push({rel: "has-next", method: "POST", href: `${req.protocol}://${req.get('host')}/api/regions/search`});
        });

        return database.sequelize.transaction((t) => {
            return Regions.findAll({
                offset: (Number(pagination.pageNumber ? pagination.pageNumber : DEFAULT_PAGE_NUMBER) - 1) * Number(pagination.pageSize ? pagination.pageSize : DEFAULT_PAGE_SIZE),
                limit: Number(pagination.pageSize ? pagination.pageSize : DEFAULT_PAGE_SIZE),
                order: order,
                where: search
            }, {transaction: t});
        }).then(data => {
            if (data.length > 0 || data !== undefined) {
                req.regions = data;
                req.hateosLinks = hateosLinks;
                next();
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.REGION_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.REGION_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    },
    fetchDataFromService: (req, res, next) => {
        const proxy = Warehouses.resilient("WAREHOUSE-SERVICE");
        const regiondIds = req.regions.filter(e => e.id).map(x => x.id);

        proxy.post('/warehouses/join/regions', {data: regiondIds}).then(response => {
            if (response.status >= 300 && !'error' in response.data) return new Error(strings.PROXY_ERR);
            response.data.forEach(e => {
                const intersection = regiondIds.filter(element => e.regions.includes(element));
                intersection.forEach(x => {database.redis.setex(crypto.MD5(`warehouses-${x}`).toString(), 3600, JSON.stringify(e))});
            });

            const regions = req.regions.map(e => {
                const {name, country, address} = response.data.find(x => x.regions.includes(e.id));
                return {...e.dataValues, warehouse: {name: name, address: `${country} ${address}`}};
            });

            return res.status(200).json({data: regions}, req.hateosLinks);
        }).catch(err => {
            req.cacheId = regiondIds;
            next();
        });
    },
    fetchDataFromCache: (req, res, next) => {
        database.redis.mget(req.cacheId.map(e => {return crypto.MD5(`warehouses-${e}`).toString()}), (err, data) => {
            if (!data) {
                return res.status(500).json({
                    timestamp: new Date().toISOString(),
                    message: strings.REGION_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            } else {
                try{
                    data = JSON.stringify(data.map(e => {return JSON.parse(e)}));
                    const regions = req.regions.map(e => {
                        const {name, country, address} = JSON.parse(data).find(x => x.regions.includes(e.id));
                        return {...e.dataValues, warehouse: {name: name, address: `${country} ${address}`}};
                    });

                    return res.status(200).json({data: regions}, req.hateosLinks);
                } catch(err) {
                    return res.status(500).json({
                        timestamp: new Date().toISOString(),
                        message: strings.REGION_NOT_FOUND,
                        error: true,
                        nav: `${req.protocol}://${req.get('host')}`
                    });
                }
            }
        });
    }
};

exports.join = {
    authorize: (req, res, next) => {
        if (!req.hasRole(['ROLE_SYSTEM'])) {
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
        check('columnName')
            .isAlpha().withMessage(strings.REGION_COLUMN_NAME_ALPHA),

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
        let ids = [];
        if (req.body) {
            for (const element of req.body) {
                ids.push({[req.params.columnName]: {[Op.eq]: Number(element)}});
            }
        }

        return database.sequelize.transaction((t) => {
            return Regions.findAll({where: {[Op.or]: ids}}, {transaction: t});
        }).then(data => {
            if (data.length > 0 || data !== undefined) {
                return res.status(200).json(data);
            } else {
                return res.status(400).json({
                    timestamp: new Date().toISOString(),
                    message: strings.VILLAGE_NOT_FOUND,
                    error: true,
                    nav: `${req.protocol}://${req.get('host')}`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                message: strings.VILLAGE_NOT_FOUND,
                error: true,
                nav: `${req.protocol}://${req.get('host')}`
            });
        });
    }
};