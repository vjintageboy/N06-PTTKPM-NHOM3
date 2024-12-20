const Student = require("../models/Student");

// Thêm sinh viên mới
const addStudent = async (studentData) => {
    const newStudent = new Student(studentData);
    return await newStudent.save();
};

// Lấy danh sách tất cả sinh viên
const getStudents = async () => {
    return await Student.find().populate("department").populate("grades");
};

// Lấy thông tin sinh viên theo ID
const getStudentById = async (studentId) => {
    return await Student.findById(studentId)
        .populate("department")
        .populate("grades");
};

// Cập nhật thông tin sinh viên
const updateStudent = async (studentId, studentData) => {
    return await Student.findByIdAndUpdate(studentId, studentData, {
        new: true,
    });
};

// Xóa sinh viên
const deleteStudent = async (studentId) => {
    return await Student.findByIdAndDelete(studentId);
};

module.exports = {
    addStudent,
    getStudentById,
    getStudents,
    updateStudent,
    deleteStudent,
};
