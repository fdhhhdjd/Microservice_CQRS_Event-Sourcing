'use strict';

const express = require('express');

const { ReasonPhrases, StatusCodes } = require('@/utils');

const router = express.Router();

router.get('/', async (_, res, __) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: ReasonPhrases.OK,
    timestamp: Date.now(),
  };
  return res.status(StatusCodes.OK).json(healthCheck);
});

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;
