// models/Department.js
const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên khoa
    code: { type: String, required: true, unique: true }, // Mã khoa
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Người quản lý khoa
    createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

module.exports = mongoose.model("Department", DepartmentSchema);
