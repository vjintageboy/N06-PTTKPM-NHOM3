const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["manager", "admin", "student"],
        required: true,
        default: "student",
    }, // manager: quản lý khoa, admin: phòng đào tạo
    // Liên kết tới Department // Chỉ áp dụng cho quản lý khoa
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    // Thêm trường liên kết đến model Student cho user có role "student"
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});
// Trước khi lưu User, nếu role là "student" và có liên kết tới Student,
// tự động cập nhật lại email của User từ email của Student.
userSchema.pre("save", async function (next) {
    if (this.role === "student" && this.student) {
        try {
            // Sử dụng require bên trong hook để tránh circular dependency
            const Student = require("./Student");
            const student = await Student.findById(this.student);
            if (student) {
                this.email = student.email;
            }
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("User", userSchema);
