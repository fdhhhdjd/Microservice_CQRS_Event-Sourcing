'use strict';

const express = require('express');

const { ReasonPhrases, StatusCodes } = require('@/utils');
const { TestModels } = require('@/redis/models');
const SocketConnection = require('@/dbs/init.socket');

const router = express.Router();

router.get('/', async (_, res, __) => {
  const myTestModel = new TestModels('app');
  const test = await myTestModel.getTest('3105');

  if (test === null) {
    await myTestModel.setTest('3105', { fullname: 'Nguyen Tien Tai 🥰' });
  }
  global.io.sendData({
    eventName: 'client_connected',
    data: { message: 'Welcome To Tai Dev 👌!' },
  });

  const healthCheck = {
    uptime: process.uptime(),
    message: ReasonPhrases.OK,
    timestamp: Date.now(),
    author: test ? test?.fullname : '🤔',
  };

  return res.status(StatusCodes.OK).json(healthCheck);
});

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;
