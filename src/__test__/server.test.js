'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Bird from '../model/bird';
import {startServer, stopServer } from '../lib/server';
import './lib/test.env';

const apiURL = `http://localhost:${process.env.PORT}/api/v1/bird`;

const createBirdMock = () => {
  return new Bird({
    name: faker.lorem.words(10),
    type: faker.lorem.words(10),
    info: faker.lorem.words(25),
  }).save();
};

describe('/api/v1/bird', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Bird.remove({}));
  test('POST - It should respond with a 200 status', () => {
    const birdToPost = {
      name: faker.lorem.words(10),
      info: faker.lorem.words(50),
    };
    return superagent.post(apiURL)
      .send(birdToPost)
      .then((response) => {
        expect (response.status).toEqual(200);
      });
  });
});
