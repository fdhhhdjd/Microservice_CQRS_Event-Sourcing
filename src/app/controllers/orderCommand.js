const express = require('express');

const { createNewOrder } = require('@/app/services/orderService');

const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const event = await createNewOrder(orderData);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
