let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let validate = require('./utils');

router.get('/calories/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'hourlyCalories', function (err, details) {
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

router.get('/intensity/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'hourlyIntensities', function (err, details) {
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

router.get('/steps/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'hourlySteps', function (err, details) {
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