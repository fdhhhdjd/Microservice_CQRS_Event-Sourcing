'use strict';

const express = require('express');
const router = express.Router();

const ProductControllers = require('@/app/v1/controllers/productControllers');
const asyncHandler = require('@/helpers/asyncHandlerHelpers');

router.post('/create', asyncHandler(ProductControllers.createProduct));

router.get('/all', asyncHandler(ProductControllers.getAllProducts));

router.get('/:productId', asyncHandler(ProductControllers.getProductDetails));

module.exports = router;
