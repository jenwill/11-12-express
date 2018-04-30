'use strict';

const uuid = require('uuid/v4');
const logger = require('../lib/logger');

module.exports = class {
  constructor(name, type, info) {
    if (!name || !type || !info) throw new Error('POST request requires name, type, and info.');
    this.name = name;
    this.type = type;
    this.info = info;
    this.id = uuid();
    logger.log(logger.INFO, `BIRD: created a new bird ${JSON.stringify(this)}`);
  }
};

