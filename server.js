'use strict';
const cfg = require('config');
const hapi = require('hapi');
const log = require('./utils').logger;
const pkg = require('./package.json');
const routes = require('./routes');

function start(cb) {
    try {
        const server = new hapi.Server();
        server.connection(cfg.server);
        server.route(routes);
        server.on('start', () => {
            log.debug(`${pkg.name} service ${pkg.version} started at ${server.info.uri}`);
        });        
        server.on('stop', () => {
            log.debug(`${pkg.name} service ${pkg.version} stopped`);
        });        
        server.start(cb);
    } catch (err) {
        log.debug(`${pkg.name} service ${pkg.version} failed to start ${err.stack}`);
        process.exit(1);
    }
};

module.exports = {
    start: start
};
