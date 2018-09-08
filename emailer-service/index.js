const seneca = require('seneca')();
const Web = require('seneca-web');
const express = require('express');
const bodyParser = require('body-parser');
const { init } = require('./config');

init();

const { PORT } = process.env;

const { emailPlugin } = require('./plugin');

const routes = [
  {
    pin: 'area:email,action:*',
    prefix: '/email',
    map: {
      send: { GET: false, POST: true },
    },
  },
];

seneca.use(Web, {
  routes: routes,
  context: express(),
  adapter: require('seneca-web-adapter-express'),
});

// seneca.use('entity');
seneca.use(emailPlugin);

seneca.ready(() => {
  const app = seneca.export('web/context')();
  app.use(bodyParser.json());

  app.listen(PORT, () =>
    console.log(`email service started on http://localhost:${PORT}`),
  );
});
