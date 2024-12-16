const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User"); // Model User
const Student = require("../models/Student"); // Model Student
const connectDB = require("../config/database");

dotenv.config();
connectDB();

// Hàm thêm dữ liệu mẫu
const seedData = async () => {
    try {
        // Xóa tất cả dữ liệu trước khi thêm mới
        await User.deleteMany();
        await Student.deleteMany();

        // Tạo người dùng mẫu (admin và manager)
        const admin = new User({
            name: "Admin User",
            email: "admin@example.com",
            password: "password123", // Bạn nên băm mật khẩu khi thực tế
            role: "admin",
        });

        const manager = new User({
            name: "Manager User",
            email: "manager@example.com",
            password: "password123", // Bạn nên băm mật khẩu khi thực tế
            role: "manager",
            department: "Computer Science", // Khoa của quản lý
        });

        // Lưu người dùng vào database
        await admin.save();
        await manager.save();

        console.log("Admin and Manager users created!");

        // Tạo sinh viên mẫu
        const student1 = new Student({
            name: "Nguyen Van A",
            studentId: "12345",
            department: "Computer Science",
        });

        const student2 = new Student({
            name: "Tran Thi B",
            studentId: "67890",
            department: "Mathematics",
        });

        // Lưu sinh viên vào database
        await student1.save();
        await student2.save();

        console.log("Students created!");

        // Đóng kết nối sau khi xong
        process.exit();
    } catch (error) {
        console.error("Error seeding data", error);
        process.exit(1);
    }
};

seedData();
