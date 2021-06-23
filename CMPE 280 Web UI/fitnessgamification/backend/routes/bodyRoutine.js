let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let validate = require('./utils');

router.get('/sleepDay/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'sleepDay', function (err, details) {
            if (err){
                res.send({
                    message: err.message,
                    error: err
                });
            } else {
                res.send({
                    message: details,
                    error: null
                });
            }
        });
    }
});

router.get('/weightLog/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'weightLogInfo', function (err, details) {
            if (err){
                res.send({
                    message: err.message,
                    error: err
                });
            } else {
                res.send({
                    message: details,
                    error: null
                });
            }
        });
    }
});

router.get('/heartrateSeconds/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'heartrate_seconds', function (err, details) {
            if (err){
                res.send({
                    message: err.message,
                    error: err
                });
            } else {
                res.send({
                    message: details,
                    error: null
                });
            }
        });
    }
});

module.exports = router;