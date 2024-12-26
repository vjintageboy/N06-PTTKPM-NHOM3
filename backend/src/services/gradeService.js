const Grade = require("../models/Grade");
const Student = require("../models/Student");

const createGrade = async (data) => {
    // Tạo một grade mới
    const grade = await Grade.create(data);

    // Cập nhật lại dữ liệu grades trong Student
    const grades = await Grade.find({ student: grade.studentId });

    const gradeData = grades.map((g) => ({
        subject: g.subject,
        score: g.score,
    }));

    await Student.findByIdAndUpdate(grade.student, { grades: gradeData });

    return grade;
};

const getGrades = async (query) => {
    return await Grade.find(query).populate("studentId").populate("subjectId");
};

const getGradeById = async (id) => {
    return await Grade.findById(id).populate("studentId").populate("subjectId");
};

const updateGrade = async (gradeId, data) => {
    // Cập nhật Grade
    const grade = await Grade.findByIdAndUpdate(gradeId, data, { new: true });

    if (!grade) throw new Error("Grade not found");

    // Cập nhật lại dữ liệu grades trong Student
    const grades = await Grade.find({ student: grade.studentId });

    const gradeData = grades.map((g) => ({
        subject: g.subject,
        score: g.score,
    }));

    await Student.findByIdAndUpdate(grade.student, { grades: gradeData });

    return grade;
};

const deleteGrade = async (gradeId) => {
    // Xóa grade
    const grade = await Grade.findByIdAndDelete(gradeId);

    if (!grade) throw new Error("Grade not found");

    // Cập nhật lại dữ liệu grades trong Student
    const grades = await Grade.find({ student: grade.studentId });

    const gradeData = grades.map((g) => ({
        subject: g.subject,
        score: g.score,
    }));

    await Student.findByIdAndUpdate(grade.student, { grades: gradeData });

    return grade;
};

module.exports = {
    createGrade,
    getGrades,
    getGradeById,
    updateGrade,
    deleteGrade,
};
