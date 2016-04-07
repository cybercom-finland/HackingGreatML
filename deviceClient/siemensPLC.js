"use strict";

const settings = require('./settings.json');
const S7Client = require('./s7Client.js');

module.exports.S7Client = S7Client;
module.exports.settings = settings;
