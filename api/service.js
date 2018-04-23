'use strict';
const debug = require('debug')(require('../components.json').API)
const ERR = require('../errors.json');
const fs = require('fs');

// @todo read from config
const REGISTERED_SERVICES_FILENAME = 'data/services.json';
const DEFAULT_PROTOCOL = 'http';
const DEFAULT_HOST = 'localhost';
const BASE_PORT = 40;
const DEFAULT_SERVICE_VERSION = '01';

function registerService(serviceInfo) {
    return new Promise( (resolve, reject) => {
        debug('registering new service', serviceInfo);
        let ret = {
            name: serviceInfo.name,
            protocol: serviceInfo.host || DEFAULT_PROTOCOL,
            host: serviceInfo.host || DEFAULT_HOST
        };
        if(!serviceInfo.port) ret.port = getNextAvailablePort();
        updateRegisteredServices(ret);
        debug('service registered', ret);
        return resolve(ret);
    })
}

function getService() {
    return new Promise( (resolve, reject) => {
        return reject(ERR.NOT_IMPLEMENTED);
    })
}

function getNextAvailablePort(serviceVersion) {
    let registeredServiceCount = Object.keys(JSON.parse(fs.readFileSync(REGISTERED_SERVICES_FILENAME))).length;
    registeredServiceCount = registeredServiceCount + 1;
    let portMidDigits = (registeredServiceCount < 10) ? '0' + registeredServiceCount : registeredServiceCount;
    console.log(registeredServiceCount);
    return Number(`${BASE_PORT}${portMidDigits}${serviceVersion || DEFAULT_SERVICE_VERSION}`);
}

function updateRegisteredServices(newService) {
    let existingServices = JSON.parse(fs.readFileSync(REGISTERED_SERVICES_FILENAME));
    existingServices[newService.name] = newService;
    delete existingServices[newService.name].name;
    fs.writeFileSync(REGISTERED_SERVICES_FILENAME, JSON.stringify(existingServices, null, 4));
}

module.exports = {
    registerService: registerService,
    getService: getService
}
