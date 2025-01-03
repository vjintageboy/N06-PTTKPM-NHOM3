const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["manager", "admin", "student"],
        required: true,
        default: "student",
    }, // manager: quản lý khoa, admin: phòng đào tạo
    department: { type: String }, // Chỉ áp dụng cho quản lý khoa
});

// // Mã hóa mật khẩu trước khi lưu
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// // Xác minh mật khẩu
// userSchema.methods.matchPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model("User", userSchema);
