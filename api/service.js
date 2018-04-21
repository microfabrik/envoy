'use strict';
const ERR = require('../errors.json');

function registerService() {
    return new Promise( (resolve, reject) => {
        return reject(ERR.NOT_IMPLEMENTED);
    })
}

function getService() {
    return new Promise( (resolve, reject) => {
        return reject(ERR.NOT_IMPLEMENTED);
    })
}

module.exports = {
    registerService: registerService,
    getService: getService
}
