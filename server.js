'use strict';
const cfg = require('config');
const hapi = require('hapi');
const debug = require('debug')(require('./components.json').SERVER)
const pkg = require('./package.json');
const routes = require('./routes');

function start(cb) {
    try {
        const server = hapi.server({
            "host": cfg.server.host,
            "port": cfg.server.port
        });
        server.route(routes);
        server.events.on('start', () => {
            console.log(`${pkg.name} service ${pkg.version} started at ${server.info.uri}`);
        });        
        server.events.on('stop', () => {
            console.log(`${pkg.name} service ${pkg.version} stopped`);
        });        
        server.start(cb);
    } catch (err) {
        console.log(`${pkg.name} service ${pkg.version} failed to start ${err.stack}`);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.log(`${pkg.name} service ${pkg.version} error ${err.stack}`);
    process.exit(1);
});

module.exports = {
    start: start
};
