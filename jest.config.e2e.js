const config = require('./jest.config');

// noinspection JSConstantReassignment
module.exports = {
  ...config,
  roots: ['test'],
};
