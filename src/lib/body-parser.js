'use strict';

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = '';
    // add chunks of data to 'message' as they arrive.
    req.on('data', (data) => {
      message += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(message);
        return resolve(req);
      } catch (err) {
        return reject(err);
      }
    });
    req.on('error', err => reject(err));
    return undefined;
  });
};
