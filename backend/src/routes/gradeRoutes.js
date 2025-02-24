const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/",
    authMiddleware(["admin", "manager"]),
    gradeController.addGrade
);
// router.get(
//     "/",
//     authMiddleware(["admin", "manager"]),
//     gradeController.getGrades
// );
// router.get(
//     "/:id",
//     authMiddleware(["admin", "manager"]),
//     gradeController.getGradeById
// );
router.get(
    "/student/:studentId",
    authMiddleware(["admin", "manager", "student"]),
    gradeController.getGradesByStudent
);
router.put(
    "/:id",
    authMiddleware(["admin", "manager"]),
    gradeController.updateGrade
);
router.delete(
    "/:id",
    authMiddleware(["admin", "manager"]),
    gradeController.deleteGrade
);
router.get(
    "/statistics/:studentId",
    authMiddleware(["admin", "manager", "student"]),
    gradeController.getStatistics
);

module.exports = router;
