'use strict';
const Joi = require('joi');
const log = require('./utils').logger;

let validate = {
    registerService: {
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
    validate: validate
}
