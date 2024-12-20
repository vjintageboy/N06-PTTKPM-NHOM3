const studentService = require("../services/studentService");

// Thêm sinh viên mới
const addStudent = async (req, res) => {
    try {
        const newStudent = await studentService.addStudent(req.body);
        res.status(201).json({
            message: "Student added successfully",
            student: newStudent,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Lấy danh sách sinh viên
const getStudents = async (req, res) => {
    try {
        const students = await studentService.getStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Lấy thông tin sinh viên theo ID
const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student)
            return res.status(404).json({ message: "Student not found" });

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Cập nhật thông tin sinh viên
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await studentService.updateStudent(
            req.params.id,
            req.body
        );
        if (!updatedStudent)
            return res.status(404).json({ message: "Student not found" });

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Xóa sinh viên
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await studentService.deleteStudent(
            req.params.id
        );
        if (!deletedStudent)
            return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
module.exports = {
    addStudent,
    getStudentById,
    getStudents,
    updateStudent,
    deleteStudent,
};
