const gradeService = require("../services/gradeService");

const createGrade = async (req, res) => {
    try {
        const grade = await gradeService.createGrade(req.body);
        res.status(201).json(grade);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getGrades = async (req, res) => {
    try {
        const grades = await gradeService.getGrades(req.query);
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getGradeById = async (req, res) => {
    try {
        const grade = await gradeService.getGradeById(req.params.id);
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateGrade = async (req, res) => {
    try {
        const grade = await gradeService.updateGrade(req.params.id, req.body);
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const deleteGrade = async (req, res) => {
    try {
        const grade = await gradeService.deleteGrade(req.params.id);
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        res.status(200).json({ message: "Grade deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade,
};
