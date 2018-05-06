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
birdRouter.delete('/api/v1/bird/:id', (request, response) => {
  return Bird.findByIdAndRemove(request.params.id)
    .then((bird) => {
      if (!bird) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code - (!bird)');
        return response.sendStatus(404);
      }
      return response.sendStatus(204);
    });
});

export default birdRouter;
