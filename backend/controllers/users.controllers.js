const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const currentId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: currentId } }).select("-password");
        
        if (!filteredUsers) return res.status(404).json({ error: "No users found" });

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log(`Error in getUsers cont ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getUsers };

