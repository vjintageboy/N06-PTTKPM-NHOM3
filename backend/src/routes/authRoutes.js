const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Đăng nhập
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role, department: user.department },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
