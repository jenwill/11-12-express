'use strict';

// import logger from '../lib/logger';
import mongoose from 'mongoose';

// module.exports = class {
//   constructor(name, type, info) {
//     if (!name || !type || !info) throw new Error('POST request requires name, type, and info.');
//     this.name = name;
//     this.type = type;
//     this.info = info;
//     this.id = uuid();
//     logger.log(logger.INFO, `BIRD: created a new bird ${JSON.stringify(this)}`);
//   }
// };

const birdSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
  },
  habitat: {
    type: String,
  },
  info: {
    type: String,
    required: true,
  },
});

export default mongoose.model('bird', birdSchema);
