'use strict';

const express = require('express');
const router = express.Router();

const OrderControllers = require('@/app/v1/controllers/orderControllers');
const asyncHandler = require('@/helpers/asyncHandlerHelpers');

router.post('/create', asyncHandler(OrderControllers.createOrder));

module.exports = router;
