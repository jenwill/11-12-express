'use strict';

import bodyParser from 'body-parser';
import { Router } from 'express';
import logger from '../lib/logger';
import Bird from '../model/bird';

const jsonParser = bodyParser.json();
const birdRouter = new Router();

birdRouter.post('/api/v1/bird', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return response.sendStatus(400);
  }
  return new Bird(request.body).save()
    .then((bird) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(bird);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

birdRouter.get('/api/v1/bird/:id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');

  return Bird.findById(request.params.id)
    .then((bird) => {
      if (!bird) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!bird)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(bird);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - objectId not found');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});
birdRouter.get('/api/v1/bird', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');

  return Bird.find()
    .then((birds) => {
      if (!birds) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!birds)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(birds);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to objectid failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code');

        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default birdRouter;

/*
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

*/
