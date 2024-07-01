const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const orderCommand = require('@/app/controllers/orderCommand');
const products = require('@/app/controllers/productControllers');

const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.enable();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//* GLOBAL
require('@/globals/globals');

//* ROUTES

// Model: CURD
app.use('/api', products);

// Model: CQRS-ES
app.use('/commands', orderCommand);

module.exports = app;
