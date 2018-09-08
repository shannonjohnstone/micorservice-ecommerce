const init = () => {
  const { NODE_ENV = 'development' } = process.env;
  require('dotenv').config('../.env');
};

module.exports = { init };
