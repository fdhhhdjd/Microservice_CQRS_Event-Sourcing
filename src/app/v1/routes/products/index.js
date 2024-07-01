'use strict';

const express = require('express');
const router = express.Router();

const ProductControllers = require('@/app/v1/controllers/productControllers');
const asyncHandler = require('@/helpers/asyncHandlerHelpers');

router.post('/create', asyncHandler(ProductControllers.createProduct));

module.exports = router;
