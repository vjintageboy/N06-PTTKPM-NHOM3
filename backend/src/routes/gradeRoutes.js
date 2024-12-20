const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware(["admin"]), gradeController.createGrade);
router.get(
    "/",
    authMiddleware(["admin", "manager"]),
    gradeController.getGrades
);
router.get(
    "/:id",
    authMiddleware(["admin", "manager"]),
    gradeController.getGradeById
);
router.put("/:id", authMiddleware(["admin"]), gradeController.updateGrade);
router.delete("/:id", authMiddleware(["admin"]), gradeController.deleteGrade);

module.exports = router;
