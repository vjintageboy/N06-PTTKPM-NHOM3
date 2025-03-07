// routes/departmentRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const subjectController = require("../controllers/subjectController");

// Routes cho các chức năng CRUD subject
router.get(
    "/",
    authMiddleware(["admin", "manager"]),
    subjectController.getAllSubjects
); // Lấy danh sách tất cả mon hoc
router.get(
    "/:id",
    authMiddleware(["admin", "manager"]),
    subjectController.getSubjectById
); // Lấy thông tin chi tiết mon hoc
router.post(
    "/",
    authMiddleware(["admin", "manager"]),
    subjectController.addSubject
); // Thêm mon hoc mới
router.put(
    "/:id",
    authMiddleware(["admin", "manager"]),
    subjectController.updateSubject
); // Cập nhật thông tin mon hoc
router.delete(
    "/:id",
    authMiddleware(["admin", "manager"]),
    subjectController.deleteSubject
); // Xóa mon hoc

module.exports = router;
