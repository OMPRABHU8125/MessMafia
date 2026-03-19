const Order = require('../models/Order');
const Menu = require('../models/Menu');

// @desc    Create new order
// @route   POST /api/orders/create
// @access  Private
const createOrder = async (req, res) => {
  const { items, totalPrice: clientTotalPrice } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in order' });
  }

  try {
    let backendTotalPrice = 0;
    const orderItems = [];

    // Recalculate price and validate items on backend
    for (const item of items) {
      const dbItem = await Menu.findById(item.itemId);
      if (!dbItem) {
        return res.status(404).json({ success: false, message: `Item ${item.itemId} not found` });
      }
      
      backendTotalPrice += dbItem.price * item.quantity;
      orderItems.push({
        itemId: dbItem._id,
        name: dbItem.name,
        price: dbItem.price,
        quantity: item.quantity
      });
    }

    // Security check: Compare backend total with client total
    if (Math.abs(backendTotalPrice - clientTotalPrice) > 0.01) {
      return res.status(400).json({ 
        success: false, 
        message: 'Price mismatch detected. Order rejected.' 
      });
    }

    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      totalPrice: backendTotalPrice,
      statusHistory: [{ status: 'PLACED', timestamp: new Date() }]
    });

    const createdOrder = await order.save();
    console.log(`Order Created: ${createdOrder._id} for ${req.user.email}`);

    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort('-createdAt');
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getMyOrders };
