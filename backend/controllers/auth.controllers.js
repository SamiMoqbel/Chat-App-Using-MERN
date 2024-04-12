const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) return res.status(400).json({ error: "Password Dont Match CMOON!!" });

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: "username already Exist FRRR!!" });

        // HASH PASSWORD
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        const maleProfPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male' ? maleProfPic : femaleProfPic
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log(`Error in signup cont ${error.message}`);
        res.status(500).json({error:"Internal server error"});
    }
};

const login = (req, res) => {
    res.send("login");
};

const logout = (req, res) => {
    res.send("logout");
};

module.exports = { signup, login, logout };