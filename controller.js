'use strict';
const alertApi = require('./api/alert');
const serviceApi = require('./api/service');

function getHealth (req, reply) {
    return reply({
        uptime: process.uptime()
    });
}

function registerService (req, reply) {
    let responseModel;
    serviceApi.registerService()
    .then( service => {
        responseModel = service; // @todo map
        return reply(responseModel);
    })
    .catch( err => {
        responseModel = err; // @todo map
        return reply(responseModel);
    })
}

function getService (req, reply) {
    let responseModel;
    serviceApi.getService()
    .then( service => {
        responseModel = service; // @todo map
        return reply(responseModel);
    })
    .catch( err => {
        responseModel = err; // @todo map
        return reply(responseModel);
    })
}

function createAlert (req, reply) {
    let responseModel;
    alertApi.createAlert()
    .then( alert => {
        responseModel = alert; // @todo map
        return reply(responseModel);
    })
    .catch( err => {
        responseModel = err; // @todo map
        return reply(responseModel);
    })
}

module.exports = {
    getHealth: getHealth,
    registerService: registerService,
    getService: getService,
    createAlert: createAlert
}
