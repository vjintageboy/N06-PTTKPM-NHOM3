const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

// Các route quản lý sinh viên
router.post(
    "/",
    authMiddleware(["admin", "manager"]),
    studentController.addStudent
);
router.get(
    "/",
    authMiddleware(["admin", "manager"]),
    studentController.getStudents
);
router.get(
    "/:id",
    authMiddleware(["admin", "manager"]),
    studentController.getStudentById
);
router.put(
    "/:id",
    authMiddleware(["admin", "manager"]),
    studentController.updateStudent
);
router.delete(
    "/:id",
    authMiddleware(["admin"]),
    studentController.deleteStudent
);

module.exports = router;
