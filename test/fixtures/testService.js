'use strict';
const hapi = require('hapi');
const debug = require('debug')(require('../../components.json').TEST)

const server = hapi.server({
    "host": "localhost",
    "port": 3000
});

async function start(cb) {
    try {
        await server.register(require('inert'));
        server.route({
            handler: function (req, h) {
                return h.file('test/fixtures/testService.yaml');
            },
            method: 'GET',
            path: '/api'
        });
        server.events.on('start', () => {
            console.log(`test service started`);
            return cb(null, { msg: 'service started'});
        });        
        server.start(cb);
    } catch (err) {
        console.log(`test service failed to start ${err.stack}`);
        return cb(err, { msg: 'service failed to start'});
    }
};

function stop(cb) {
    try {
        server.events.on('stop', () => {
            console.log(`test service stopped`);
            return cb(null, { msg: 'service stopped'});
        });        
        server.stop();
    } catch(err) {
        console.log(`test service failed to stop ${err.stack}`);
        return cb(err, { msg: 'service failed to stop' });
    }
};

module.exports = {
    start: start,
    stop: stop
};
