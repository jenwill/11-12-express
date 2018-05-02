'use strict';

import bodyParser from 'body-parser';
import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Bird from '../model/bird';

const jsonParser = bodyParser.json();
const birdRouter = new Router();

birdRouter.post('/api/v1/bird', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.name) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return next(new HttpErrors(400, 'name is required'));
  }
  return new Bird(request.body).save()
    .then((bird) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(bird);
    })
    .catch(next);
});

birdRouter.get('/api/v1/bird/:id', (request, response, next) => {
  logger.log(logger.INFO, 'GET - processing a request');
  return Bird.findById(request.params.id)
    .then((bird) => {
      if (!bird) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!bird)');
        return next(new HttpErrors(404, 'bird not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(bird);
    })
    .catch(next);
});

birdRouter.delete('/api/v1/bird/:id', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'id is required'));
  }
  const options = { runValidators: true };

  return Bird.findByIdAndRemove(request.params.id, options)

    .then(() => {
      // return response.sendText(response, 204);
      return response();
    })
    .catch(next);
});

export default birdRouter;

