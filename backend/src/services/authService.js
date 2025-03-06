const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (email, password) => {
    try {
        // Tìm user trong cơ sở dữ liệu
        const user = await User.findOne({ email }).populate("student", "image");
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "Không tìm thấy tài khoản",
            };
        }
        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                success: false,
                status: 401,
                message: "Mật khẩu không đúng",
            };
        }

        // Tạo token
        const token = jwt.sign(
            { id: user._id, role: user.role, department: user.department },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        // Trả về token
        return { success: true, token, user };
    } catch (err) {
        console.error(err);
        throw new Error("Lỗi khi xử lý đăng nhập");
    }
};
const getUserById = async (userId) => {
    try {
        // Tìm user dựa vào userId
        const user = await User.findById(userId); //.select("-password"); // Ẩn mật khẩu khi trả về
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};
const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("Người dùng không tồn tại");

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Mật khẩu hiện tại không đúng");

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới
    user.password = hashedPassword;
    await user.save();

    return { message: "Đổi mật khẩu thành công!" };
};
module.exports = { login, getUserById, changePassword };
