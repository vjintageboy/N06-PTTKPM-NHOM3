const studentService = require("../services/studentService");
const multer = require("multer");

// Thêm sinh viên mới
const addStudent = async (req, res) => {
    try {
        // Kiểm tra nếu có file ảnh
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        const newStudent = await studentService.addStudent({
            ...req.body,
            image: imageUrl, // Lưu đường dẫn ảnh
        });
        res.status(201).json({
            message: "Student added successfully",
            data: newStudent,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Lấy danh sách sinh viên
const getStudents = async (req, res) => {
    try {
        const students = await studentService.getStudents();
        res.status(200).json({ data: students });
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
        // Kiểm tra nếu có file ảnh
        console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
        console.log("Received file:", req.file); // Kiểm tra file ảnh nhận được
        const existingStudent = await studentService.getStudentById(
            req.params.id
        );
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        let imageUrl = existingStudent.image;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        const updatedStudent = await studentService.updateStudent(
            req.params.id,
            {
                ...req.body,
                image: imageUrl,
            }
        );

        if (!updatedStudent)
            return res.status(404).json({ message: "Student not found" });

        res.status(200).json({
            message: "Student updated successfully",
            data: updatedStudent,
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

const getStudentsWithoutUser = async (req, res) => {
    try {
        const students = await studentService.getStudentsWithoutUser();
        res.status(200).json({ data: students });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    addStudent,
    getStudentById,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentsWithoutUser,
};
