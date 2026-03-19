const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ["PLACED", "PREPARING", "READY", "COLLECTED"],
    default: "PLACED"
  },
  statusHistory: [
    {
      status: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
