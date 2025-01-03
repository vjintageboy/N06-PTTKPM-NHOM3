const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Đăng nhập
router.post("/login", authController.loginController);
router.get("/login", authMiddleware(), authController.getCurrentUser);

module.exports = router;
