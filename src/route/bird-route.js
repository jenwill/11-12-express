'use strict';

const logger = require('../lib/logger');
const Bird = require('../model/bird');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeBird(router) {
  router.post('/api/v1/bird', (req, res) => {
    try {
      const newBird = new Bird(req.body.name, req.body.type, req.body.info);
      storage.create('Bird', newBird)
        .then((bird) => {
          response.sendJSON(res, 201, bird);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `BIRD-ROUTE: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/bird', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 400, 'Your request requires an id');
      return undefined;
    }
    storage.fetchOne('Bird', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        return undefined;
      });
    return undefined;
  });
  router.delete('/api/v1/bird', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 400, 'Your request requires an id');
      return undefined;
    }
    storage.deleteOne('Bird', req.url.query.id)
      .then(() => {
        response.sendText(res, 204);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        return undefined;
      });
    return undefined;
  });
  router.get('/api/v1/bird/ids', (req, res) => {
    storage.fetchAll('Bird')
      .then((items) => {
        response.sendJSON(res, 200, items);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        return undefined;
      });
    return undefined;
  });
};
