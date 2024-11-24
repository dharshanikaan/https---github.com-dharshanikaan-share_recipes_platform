
const User = require('../models/user');
const Follow = require('../models/follow');

// Follow another user
exports.followUser = async (req, res) => {
    const { userId } = req.params;

    try {
        if (req.userId === parseInt(userId)) {
            return res.status(400).json({ message: 'Cannot follow yourself' });
        }

        const userToFollow = await User.findByPk(userId);
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        await req.user.addFollowed(userToFollow);
        res.json({ message: `Now following ${userToFollow.username}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get the activity of users the current user is following
exports.getFollowingActivity = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{
                model: User,
                as: 'Followed',
                include: [{ model: Recipe, include: Review }] // Include their recipes and reviews
            }]
        });
        res.json(user.Followed);  // Returning followed users and their recipes
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
