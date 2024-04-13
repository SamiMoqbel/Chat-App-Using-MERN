const jwt= require('jsonwebtoken');
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
    try {
        
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthenticated1" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ error: "Unauthenticated2" });
        }

        const user = await User.findById(verified.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(`Error in protectRoute middleware, ${error.message}`);
        res.status(401).json({ error: "Unauthenticated3" });
    }
};

module.exports = protectRoute;