'use strict';
const Joi = require('joi');
const log = require('./utils').logger;

const registerServiceResponseSchema = Joi.object({
    name: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required()
});

let validate = {
    registerService: {
        requestModel: () => {
            return {
                headers: {
                },
                options: {
                    allowUnknown: true
                },
                payload: {
                    name: Joi.string().required()
                }
            }
        }
    },
    getService: {
        requestModel: () => {
            return {
                headers: {
                },
                options: {
                    allowUnknown: true
                }
            }
        }
    },
    createAlert: {
        requestModel: () => {
            return {
                headers: {
                },
                options: {
                    allowUnknown: true
                }
            }
        }
    }
}

module.exports = {
    validate: validate,
    schemas: {
        registerService: {
            response: registerServiceResponseSchema
        }
    }
}
