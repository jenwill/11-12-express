'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });


storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Cannot create a new item. Schema required.'));
  if (!item) return Promise.reject(new Error('Cannot create a new item. Item required.'));
  const json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
    .then(() => {
      logger.log(logger.INFO, 'STORAGE: Created a new resource');
      return item;
    })
    .catch(err => Promise.reject(err));
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('Expected schema name.'));
  if (!id) return Promise.reject(new Error('Expected ID.'));


  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};
storage.deleteOne = function deleteOne(schema, id) {
  if (!schema) return Promise.reject(new Error('Expected schema name.'));
  if (!id) return Promise.reject(new Error('Expected ID.'));
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(() => {
      logger.log(logger.INFO, 'STORAGE: Deleted a resource.');
    })
    .catch((err) => {
      Promise.reject(err);
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};
storage.fetchAll = function fetchAll(schemaArg) {
  // use Bird schema if none was specified.
  let schema = 'Bird';
  if (schemaArg) schema = schemaArg;
  return fs.readdirProm(`${__dirname}/../data/${schema}/`)
    .then((fileNames) => {
      try {
        return fileNames;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};
