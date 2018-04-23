'use strict';
const alertApi = require('./api/alert');
const serviceApi = require('./api/service');

function getHealth (req, h) {
    return {
        uptime: process.uptime()
    };
}

function registerService (req, h) {
    return new Promise( (resolve, reject) => {
        let requestModel = req.payload;
        let responseModel = {};
        serviceApi.registerService(requestModel)
        .then( service => {
            responseModel = service; // @todo map
            return resolve(responseModel);
        })
        .catch( err => {
            responseModel = {
                error: err
            };
            return resolve(responseModel);
        })
    });
}

function getService (req, h) {
    return new Promise( (resolve, reject) => {
        let responseModel;
        serviceApi.getService()
        .then( service => {
            responseModel = service; // @todo map
            return resolve(responseModel);
        })
        .catch( err => {
            responseModel = {
                error: err
            };
            return resolve(responseModel);
        })
    });
}

function createAlert (req, h) {
    return new Promise( (resolve, reject) => {
        let responseModel;
        alertApi.createAlert()
        .then( alert => {
            responseModel = alert; // @todo map
            return responseModel;
        })
        .catch( err => {
            responseModel = {
                error: err
            };
            return resolve(responseModel);
        })
    });
}

module.exports = {
    getHealth: getHealth,
    registerService: registerService,
    getService: getService,
    createAlert: createAlert
}
