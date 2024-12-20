const Grade = require("../models/Grade");

const createGrade = async (data) => {
    const grade = new Grade(data);
    return await grade.save();
};

const getGrades = async (query) => {
    return await Grade.find(query).populate("studentId").populate("subjectId");
};

const getGradeById = async (id) => {
    return await Grade.findById(id).populate("studentId").populate("subjectId");
};

const updateGrade = async (id, data) => {
    return await Grade.findByIdAndUpdate(id, data, { new: true });
};

const deleteGrade = async (id) => {
    return await Grade.findByIdAndDelete(id);
};

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade,
};
