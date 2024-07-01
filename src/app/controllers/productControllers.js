const express = require('express');
const { createProduct } = require('../services/productService');
const router = express.Router();

router.post('/product', async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
