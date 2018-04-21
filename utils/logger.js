function debug() {
    console.log('DBG:', ...arguments);
}

function error() {
    console.log('ERR:', ...arguments);
}

module.exports = {
    debug: debug,
    error: error
}
