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
router.get(
    "/students-without-user",
    authMiddleware(["admin"]),
    studentController.getStudentsWithoutUser
);
router.get(
    "/:id",
    authMiddleware(["admin", "manager", "student"]),
    studentController.getStudentById
);

module.exports = router;
