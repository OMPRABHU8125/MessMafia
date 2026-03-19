const Menu = require('../models/Menu');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find({});
    res.json(menuItems); // Returning array directly for Next.js consistency if needed, or wrap in {success, data}
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMenu };
