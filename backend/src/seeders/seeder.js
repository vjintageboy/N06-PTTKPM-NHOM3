const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User"); // Model User
const connectDB = require("../config/database");

dotenv.config();
connectDB();

// Hàm thêm dữ liệu mẫu
const seedData = async () => {
    try {
        // Xóa tất cả dữ liệu trước khi thêm mới
        await User.deleteMany();

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
        });

        // Lưu người dùng vào database
        await admin.save();
        await manager.save();

        console.log("Admin and Manager users created!");

        // Đóng kết nối sau khi xong
        process.exit();
    } catch (error) {
        console.error("Error seeding data", error);
        process.exit(1);
    }
};

seedData();
