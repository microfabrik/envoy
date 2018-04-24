'use strict';
const debug = require('debug')(require('../components.json').API)
const ERR = require('../errors.json');
const fs = require('fs');
const request = require('request');
const s = require("underscore.string");
const url = require('url');
const yaml = require('js-yaml');

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
        if(!!serviceInfo.swagger) {
            getEndpoints(serviceInfo.swagger)
            .then(endpoints => {
                ret.endpoints = endpoints;
                updateRegisteredServices(ret);
                debug('service registered', ret);
                return resolve(ret);
            })
            .catch(reject);
        }
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
    return Number(`${BASE_PORT}${portMidDigits}${serviceVersion || DEFAULT_SERVICE_VERSION}`);
}

function getEndpoints(swagger) {
    return new Promise( (resolve, reject) => {
        let ret;
        let isUrl = false;
        try {
            url.parse(swagger);
            isUrl = true;
        } catch (err) {
            // swagger should be a json object
        }
        if(isUrl) {
            request.get(swagger, (err, res) => {
                if(err) return reject(err);
                var doc = yaml.safeLoad(res.body);
                console.log(doc);
                // @todo add support for multiple servers
                let baseUrl = doc.servers[0].url;
                // @todo version lookup
                ret = {};
                Object.keys(doc.paths).forEach( path => {
                    Object.keys(doc.paths[path]).forEach( method => {
                        let endpointName = s.camelize(doc.paths[path][method].summary) || Date.now(); // @todo find a better strategy for anonymous keys
                        let endpointUrl = baseUrl + path;
                        ret[endpointName] = endpointUrl
                    });
                });
                return resolve(ret);
            });
        }
    });
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
