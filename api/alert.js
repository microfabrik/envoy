'use strict';
const ERR = require('../errors.json');

function createAlert() {
    return new Promise( (resolve, reject) => {
        return reject(ERR.NOT_IMPLEMENTED);
    })
}

module.exports = {
    createAlert: createAlert
}
