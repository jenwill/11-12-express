'use strict';

const url = require('url');

module.exports = function urlParser(req) {
  req.url = url.parse(req.url, true);
  return Promise.resolve(req);
};
