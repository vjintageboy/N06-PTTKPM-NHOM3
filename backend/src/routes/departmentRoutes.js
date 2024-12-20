// routes/departmentRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const departmentController = require("../controllers/departmentController");

// Routes cho các chức năng CRUD Khoa
router.get(
    "/",
    authMiddleware(["admin"]),
    departmentController.getAllDepartments
); // Lấy danh sách tất cả khoa
router.get(
    "/:id",
    authMiddleware(["admin", "manager"]),
    departmentController.getDepartmentById
); // Lấy thông tin chi tiết khoa
router.post(
    "/",
    authMiddleware(["admin"]),
    departmentController.createDepartment
); // Thêm khoa mới
router.put(
    "/:id",
    authMiddleware(["admin"]),
    departmentController.updateDepartment
); // Cập nhật thông tin khoa
router.delete(
    "/:id",
    authMiddleware(["admin"]),
    departmentController.deleteDepartment
); // Xóa khoa

module.exports = router;
