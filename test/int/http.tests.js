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

describe(`${pkg.name} ver ${pkg.version} http tests`, function() {
    it('should return server health status', done => {
        let query = '/health';
        const url = `${HOST}${query}`;
        log.debug(`GET ${url}`);
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
    it('should register a service', done => {
        let query = '/services';
        let payload = {

        };
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
    it('should retrieve service endpoints given service name', done => {
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
    it('should register a status alert webhook', done => {
        let query = `/alerts`;
        let payload = {

        };
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

after(function(done) {
    done();
});
