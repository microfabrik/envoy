'use strict';
const controller = require('./controller');
const validator = require('./validator');

module.exports = [
    {
        handler: controller.getHealth,
        method: 'GET',
        path: '/health'
    }, {
        config: {
            validate: validator.validate.registerService.requestModel()
        },
        handler: controller.registerService,
        method: 'POST',
        path: '/services'
    }, {
        config: {
            validate: validator.validate.getService.requestModel()
        },
        handler: controller.getService,
        method: 'GET',
        path: '/services/{name}'
    }, {
        config: {
            validate: validator.validate.createAlert.requestModel()
        },
        handler: controller.createAlert,
        method: 'POST',
        path: '/alerts'
    }
];
