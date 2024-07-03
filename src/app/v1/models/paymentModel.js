const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const paymentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'PROCESSED',
    },
  },
  { timestamps: true },
);

const PaymentRepo = mongoose.model('Payment', paymentSchema);

module.exports = PaymentRepo;
