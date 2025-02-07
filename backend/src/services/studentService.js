const Student = require("../models/Student");
const User = require("../models/User");
const moment = require("moment-timezone");

// Thêm sinh viên mới
const addStudent = async (studentData) => {
    // Kiểm tra nếu có dateOfBirth thì chuyển về múi giờ Việt Nam
    if (studentData.dateOfBirth) {
        studentData.dateOfBirth = moment
            .tz(studentData.dateOfBirth, "Asia/Ho_Chi_Minh")
            .startOf("day") // 🔥 Đặt về 00:00:00 để không bị lệch giờ
            .toDate();
    }
    console.log("Processed dateOfBirth:", studentData.dateOfBirth); // ✅ Kiểm tra giá trị trước khi lưu

    const newStudent = new Student(studentData);
    return await newStudent.save();
};

// Lấy danh sách tất cả sinh viên
const getStudents = async () => {
    return await Student.find().populate("department"); /*.populate("grades");*/
};

// Lấy thông tin sinh viên theo ID
const getStudentById = async (studentId) => {
    return await Student.findById(studentId)
        .populate("department")
        .populate("grades");
};

// Cập nhật thông tin sinh viên
const updateStudent = async (studentId, studentData) => {
    // Kiểm tra nếu có dateOfBirth thì chuyển về múi giờ Việt Nam
    if (studentData.dateOfBirth) {
        studentData.dateOfBirth = moment
            .tz(studentData.dateOfBirth, "Asia/Ho_Chi_Minh")
            .toDate();
    }
    return await Student.findByIdAndUpdate(studentId, studentData, {
        new: true,
    });
};

// Xóa sinh viên
const deleteStudent = async (studentId) => {
    return await Student.findByIdAndDelete(studentId);
};
const getStudentsWithoutUser = async () => {
    // Lấy danh sách ID của Student đã có tài khoản User
    const userStudentIds = await User.find({
        student: { $exists: true },
    }).distinct("student");
    // Lọc các Student chưa có tài khoản User
    return Student.find({ _id: { $nin: userStudentIds } });
};

module.exports = {
    addStudent,
    getStudentById,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentsWithoutUser,
};
