const makeMissing = require('./missing');
const validator = require('../utils/validator');

module.exports = {
  Missing: makeMissing(validator),
};
