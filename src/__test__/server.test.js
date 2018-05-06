'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Bird from '../model/bird';
import { startServer, stopServer } from '../lib/server';
import './lib/test.env';

const apiURL = `http://localhost:${process.env.PORT}/api/v1/bird`;

const createBirdMock = () => {
  return new Bird({
    name: faker.lorem.words(10),
    type: faker.lorem.words(10),
    habitat: faker.lorem.words(25),
    info: faker.lorem.words(25),
  }).save();
};

describe('VALID request to the API', () => {
  describe('/api/v1/bird', () => {
    beforeAll(startServer);
    afterAll(stopServer);
    afterEach(() => Bird.remove({}));
    test('POST - 200 for successful resource creation', () => {
      const birdToPost = {
        name: faker.lorem.words(10),
        type: faker.lorem.words(10),
        habitat: faker.lorem.words(25),
        info: faker.lorem.words(50),
      };
      return superagent.post(apiURL)
        .send(birdToPost)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(birdToPost.name);
          expect(response.body.info).toEqual(birdToPost.info);
          expect(response.body._id).toBeTruthy();
        });
    });
    test('POST - 400 for bad request', () => {
      const birdToPost = {
        info: faker.lorem.words(50),
      };
      return superagent.post(apiURL)
        .send(birdToPost)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(400);
        });
    });
    describe('GET /api/v1/bird', () => {
      test('GET - 200 for successful retrieval by resource id', () => {
        let birdToTest = null;
        return createBirdMock()
          .then((bird) => {
            birdToTest = bird;
            return superagent.get(`${apiURL}/${bird._id}`);
          })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual(birdToTest.name);
            expect(response.body.type).toEqual(birdToTest.type);
            expect(response.body.info).toEqual(birdToTest.info);
            expect(response.body.habitat).toEqual(birdToTest.habitat);
          });
      });
      test('GET - 200 for successful retrieval of all resources', () => {
        return createBirdMock()
          .then(() => {
            return superagent.get(apiURL);
          })
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      });
      test('GET - 404 for resource not found', () => {
        return superagent.get(`${apiURL}/ABunchOfNonsense`)
          .then(Promise.reject)
          .catch((response) => {
            expect(response.status).toEqual(404);
          });
      });
    });
    describe('DELETE /api/v1/bird', () => {
      test('DELETE - 404 for id not found', () => {
        return superagent.delete(`${apiURL}/ThisIsABadID`)
          .then(Promise.reject)
          .catch((error) => {
            expect(error.status).toEqual(404);
          });
      });
      test('DELETE - 204 for successful deletion', () => {
        return createBirdMock()
          .then((bird) => {
            return superagent.delete(`${apiURL}/${bird._id}`);
          })
          .then((response) => {
            expect(response.status).toEqual(204);
          });
      });
    });
  });
});

