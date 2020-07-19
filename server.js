'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const func = require('./data/handlers');
const path = require('path');

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
  .get('/confirmation', func.handleConfirmation)
  .post('/reservation', func.handleReservation)

  .use((req, res) => res.send('Not Found'))
  .listen(8000, () => console.log(`Listening on port 8000`));
