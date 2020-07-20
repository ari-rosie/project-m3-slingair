'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const func = require('./data/handlers');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })

  .use(morgan('dev'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .get('/seat-select', func.handleFlightInput)
  .get('/flights/:number', func.handleFlightNum)
  .get('/confirmation/:id', func.handleConfirmation)
  .get('/admin', func.handleAdmin)
  // .post('/reservation', func.handleReservation) endpoint replaced with a fetch to live server from FE (seat-select.js)

  .use((req, res) => res.send('Not Found'))
  .listen(8000, () => console.log(`Listening on port 8000`));
