// Controller (controllers/subjectController.js)
const subjectService = require("../services/subjectService");

// Add a new subject
const addSubject = async (req, res) => {
    try {
        const subjectData = req.body;
        const savedSubject = await subjectService.createSubject(subjectData);
        res.status(201).json({
            message: "Subject added successfully",
            data: savedSubject,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to add subject",
            error: error.message,
        });
    }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await subjectService.getAllSubjects();
        res.status(200).json({ data: subjects });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch subjects",
            error: error.message,
        });
    }
};

// Get a single subject by ID
const getSubjectById = async (req, res) => {
    try {
        const subject = await subjectService.getSubjectById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch subject",
            error: error.message,
        });
    }
};

// Update a subject by ID
const updateSubject = async (req, res) => {
    try {
        const updatedSubject = await subjectService.updateSubject(
            req.params.id,
            req.body
        );
        if (!updatedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({
            message: "Subject updated successfully",
            data: updatedSubject,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update subject",
            error: error.message,
        });
    }
};

// Delete a subject by ID
const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await subjectService.deleteSubject(
            req.params.id
        );
        if (!deletedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({
            message: "Subject deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete subject",
            error: error.message,
        });
    }
};
module.exports = {
    addSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};
