const User = require("../models/User");

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Không trả về trường password
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
};

// Thêm người dùng mới
const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "Vui lòng cung cấp đầy đủ email, password, và role.",
        });
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại." });
        }

        // Mã hóa mật khẩu trước khi lưu
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({
            message: "Người dùng đã được tạo thành công.",
            user: newUser,
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    console.log("check data update", { name, email, password, role });

    try {
        // Tìm và cập nhật thông tin người dùng
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            const bcrypt = require("bcrypt");
            updateData.password = await bcrypt.hash(password, 10);
        }
        if (role) updateData.role = role;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedUser) {
            return res
                .status(404)
                .json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({
            message: "Cập nhật thành công.",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res
                .status(404)
                .json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({
            message: "Người dùng đã được xóa.",
            user: deletedUser,
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
};
module.exports = { getAllUsers, addUser, updateUser, deleteUser };
