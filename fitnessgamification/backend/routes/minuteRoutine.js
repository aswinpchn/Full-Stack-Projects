let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let validate = require('./utils');

router.get('/caloriesNarrow/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteCaloriesNarrow', function (err, details) {
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

router.get('/caloriesWide/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteCaloriesWide', function (err, details) {
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

router.get('/intensityNarrow/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteIntensitiesNarrow', function (err, details) {
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

router.get('/intensityWide/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteIntensitiesWide', function (err, details) {
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

router.get('/stepsNarrow/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteStepsNarrow', function (err, details) {
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

router.get('/stepsWide/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteStepsWide', function (err, details) {
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

router.get('/METsNarrow/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteMETsNarrow', function (err, details) {
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

router.get('/sleep/skip/:skip/limit/:limit', function(req, res, next) {
    let data = {};
    let validator = validate.validateParameter(req.params.limit, req.params.skip);
    if (validator.error != null){
        res.send({
            message: null,
            error: validator.error
        });
    } else {
        database.findMany(data, validator.filter, 'minuteSleep', function (err, details) {
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