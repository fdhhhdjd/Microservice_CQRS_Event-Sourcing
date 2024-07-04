const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'CREATED',
    },
  },
  { timestamps: true },
);

const OrderRepo = mongoose.model('Order', orderSchema);

module.exports = OrderRepo;
