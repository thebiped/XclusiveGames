const express = require('express');
const createConnection = require('./conexBD');

const handleError = (res, message, err = null, status = 500) => {
    console.error(message, err);
    res.status(status).send({ message });
};

module.exports = {
    createConnection,
    express,
    handleError
};