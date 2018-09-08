const seneca = require('seneca')();
const Web = require('seneca-web');
// const mongoStore = require("seneca-mongo-store")
const express = require('express');
const bodyParser = require('body-parser');

// import defined plugin
const { productPlugin } = require('./plugin/product');

const PORT = '3001';

// config for routes
const routes = [
  {
    pin: 'area:product,action:*',
    prefix: '/products',
    map: {
      barzinga: { GET: true },
      fetch: { GET: true },
      add: { GET: false, POST: true },
      edit: { GET: false, POST: true },
      delete: { GET: false, DELETE: true },
    },
  },
];

seneca.use(Web, {
  routes: routes,
  context: express(),
  adapter: require('seneca-web-adapter-express'),
});

seneca.use('entity');
seneca.use(productPlugin);
seneca.use('mongo-store', {
  name: 'seneca',
  host: '127.0.0.1',
  port: 27017,
  options: {},
});

seneca.ready(() => {
  const app = seneca.export('web/context')();
  app.use(bodyParser.json());

  app.listen(PORT, () =>
    console.log(`product manager service started on http://localhost:${PORT}`),
  );
});
