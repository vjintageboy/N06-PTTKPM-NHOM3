const Subject = require("../models/subject");

const createSubject = async (subjectData) => {
    const subject = new Subject(subjectData);
    return await subject.save();
};

const getAllSubjects = async () => {
    return await Subject.find();
};

const getSubjectById = async (id) => {
    return await Subject.findById(id);
};

const updateSubject = async (id, updateData) => {
    return await Subject.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

const deleteSubject = async (id) => {
    return await Subject.findByIdAndDelete(id);
};
module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};
