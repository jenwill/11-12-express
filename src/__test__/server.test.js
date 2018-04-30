'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { name: 'Hummingbird', type: 'Tiny Tiny', info: 'Cute but mean.' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());


describe('VALID request to the API', () => {
  describe('POST /api/v1/bird', () => {
    it('should respond with status 201 and created a new bird', () => {
      return superagent.post(`:${testPort}/api/v1/bird`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.type).toEqual(mockResource.type);
          expect(res.body.info).toEqual(mockResource.info);
          expect(res.status).toEqual(201);
        });
    });
    it('should respond with status 400 if the body was invalid', () => {
      return superagent.post(`:${testPort}/api/v1/bird`)
        .send({ nonsense: 'More nonsense' })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with status 400 if no request body was provided.', () => {
      return superagent.post(`:${testPort}/api/v1/bird`)
        .send({})
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
  });
  describe('GET /api/v1/bird?id', () => {
    it('should respond with status 200 and the requested bird.', () => {
      return superagent.get(`:${testPort}/api/v1/bird?id=${mockId}`)
        .then((res) => {
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.type).toEqual(mockResource.type);
          expect(res.body.info).toEqual(mockResource.info);
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with status 200 and the requested bird from file storage.', () => {
      return superagent.get(`:${testPort}/api/v1/bird?id=0ab77629-a6d5-44ac-9780-2c37f3cb4b89`)
        .then((res) => {
          expect(res.body.name).toEqual('turkey');
          expect(res.body.type).toEqual('flappy');
          expect(res.body.info).toEqual('Big. Yummy.');
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with status 404 when an invalid id is requested.', () => {
      return superagent.get(`:${testPort}/api/v1/bird?id=1234`)
        .catch((res) => {
          expect(res.status).toEqual(404);
        });
    });
    it('should respond with status 400 when no id is included in the request.', () => {
      return superagent.get(`:${testPort}/api/v1/bird`)
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
  });
  describe('GET /api/v1/birds/ids', () => {
    it('should respond with status 200', () => {
      return superagent.get(`:${testPort}/api/v1/bird/ids`)
        .then((res) => {
          expect(res.status).toEqual(200);
        });
    });
  });
  describe('DELETE /api/v1/bird?id', () => {
    it('should respond with status 204.', () => {
      return superagent.delete(`:${testPort}/api/v1/bird?id=${mockId}`)
        .then((res) => {
          expect(res.status).toEqual(204);
        });
    });
  });
});
describe('INVALID request to the API', () => {
  describe('/api/v1/nrkreisldkfe', () => {
    it('should respond with status 404', () => {
      return superagent.get(`:${testPort}/api/v1/nrkreisldkfe`)
        .catch((res) => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
