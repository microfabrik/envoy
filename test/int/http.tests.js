'use strict';
const component = require('../../components.json').TEST;
const cfg = require('config');
const pkg = require('../../package.json');
const log = require('../../utils').logger;
const request = require('supertest');
const should = require('chai').should();

let HOST = `http://${cfg.server.host}:${cfg.server.port}`;
let TEST_SERVICE_NAME = 'test';

before(function(done) {
    done();
});

describe(`envoy health check`, function() {
    it('should return server health status', done => {
        let query = '/health';
        const url = `${HOST}${query}`;
        // log.debug(`GET ${url}`);
        request(HOST)
        .get(query)
        .expect(200)
        .end((err, res)=> {
            if(err) return done(err);
            should.exist(res);
            res.body.should.have.property('uptime');
            return done();
        });
    });
});

describe(`register a service`, function() {
    context(`when payload is missing or empty`, function() {
        it(`should fail`, done => {
            let query = '/services';
            let payload = {};
            const url = `${HOST}${query}`;
            // log.debug(`POST ${url}`);
            request(HOST)
            .post(query)
            .send(payload)
            .expect(400)
            .end((err, res)=> {
                if(err) return done(err);
                should.exist(res);
                res.body.should.have.property('error');
                res.body.should.have.property('message');
                return done();
            });
        })
    })
    context(`when port is missing from the payload`, function() {
        it(`should generate a port for the service`, done => {
            let query = '/services';
            let payload = require('../payloads/registerServiceWithoutAPort.json')
            const url = `${HOST}${query}`;
            log.debug(`POST ${url}`);
            request(HOST)
            .post(query)
            .send(payload)
            .expect(200)
            .end((err, res)=> {
                if(err) return done(err);
                should.exist(res);
                res.body.should.not.have.property('error');
                res.body.should.have.property('host');
                res.body.should.have.property('port');
                return done();
            });
        })
    })
    context(`when name already exists`, function() {
        it.skip(`should fail`, done => {
        });
    })
    it.skip(`should allow the swagger value to be an URL`, done => {
    });
    it.skip(`should allow the swagger value to be a JSON object`, done => {
    });
});

describe(`unregister a service`, function() {
});

describe(`retrieve service info`, function() {
    context(`when service name exists`, function() {
        it('should retrieve service endpoints', done => {
            let query = `/services/${TEST_SERVICE_NAME}`;
            const url = `${HOST}${query}`;
            log.debug(`GET ${url}`);
            request(HOST)
            .get(query)
            .expect(200)
            .end((err, res)=> {
                if(err) return done(err);
                should.exist(res);
                return done();
            });
        });
    });
});

describe(`register a status alert webhook`, function() {
    context(`when payload is valid`, function() {
        it('should return an alert token', done => {
            let query = `/alerts`;
            let payload = {}; //@todo
            const url = `${HOST}${query}`;
            log.debug(`POST ${url}`);
            request(HOST)
            .post(query)
            .send(payload)
            .expect(200)
            .end((err, res)=> {
                if(err) return done(err);
                should.exist(res);
                return done();
            });
        });
    });
});

after(function(done) {
    done();
});
