const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Lấy danh sách tất cả người dùng
router.get("/", authMiddleware(["admin"]), userController.getAllUsers);

// Thêm người dùng mới
router.post("/", authMiddleware(["admin"]), userController.addUser);

// Cập nhật thông tin người dùng
router.put("/:id", authMiddleware(["admin"]), userController.updateUser);

// Xóa người dùng
router.delete("/:id", authMiddleware(["admin"]), userController.deleteUser);

// lấy danh sách người dùng có role là manager còn trống
router.get(
    "/managers/available",
    authMiddleware(["admin"]),
    userController.getAvailableManagers
);

module.exports = router;
