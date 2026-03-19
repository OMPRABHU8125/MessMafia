const User = require('../models/User');

// @desc    Auth user & sync with DB
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { name, email, googleId, profilePicture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user info if needed
      user.name = name || user.name;
      user.googleId = googleId || user.googleId;
      user.profilePicture = profilePicture || user.profilePicture;
    } else {
      // Create new user
      user = new User({
        name,
        email,
        googleId,
        profilePicture
      });
    }

    const savedUser = await user.save();
    console.log(`User Logged In/Synced: ${savedUser.email}`);
    res.status(200).json({ success: true, data: savedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
};

module.exports = { loginUser, getUserProfile };
