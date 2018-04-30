const server = require('./lib/server');
const logger = require('./lib/logger');

const PORT = 3000;

server.start(PORT, () => logger.log(logger.INFO, `MAIN: listening on port ${PORT}`));
