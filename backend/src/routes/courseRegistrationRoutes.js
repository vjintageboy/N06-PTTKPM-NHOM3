// routes/courseRegistrationRoutes.js
const express = require("express");
const router = express.Router();
const courseRegistrationController = require("../controllers/courseRegistrationController");
const authMiddleware = require("../middleware/authMiddleware");

// Route lấy danh sách các môn học chưa đăng ký
router.get(
    "/available/:studentId",
    authMiddleware(["admin", "manager", "student"]),
    courseRegistrationController.getAvailableCourses
);

// Route lấy danh sách các môn học đã đăng ký
router.get(
    "/registered/:studentId",
    authMiddleware(["admin", "manager", "student"]),
    courseRegistrationController.getRegisteredCourses
);

// Route đăng ký môn học mới
router.post(
    "/register/:studentId",
    authMiddleware(["admin", "manager", "student"]),
    courseRegistrationController.registerCourse
);
// Hủy đăng ký môn học
router.delete(
    "/cancel/:studentId",
    authMiddleware(["admin", "manager", "student"]),
    courseRegistrationController.cancelRegistration
);
module.exports = router;
