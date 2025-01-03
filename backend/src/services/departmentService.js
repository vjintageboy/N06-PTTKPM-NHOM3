// services/departmentService.js
const Department = require("../models/Department");
const User = require("../models/User");

const getAllDepartments = async () => {
    return await Department.find()
        .populate("manager", "name email role") // Lấy thông tin từ User (chỉ lấy trường name, email, role)
        .exec(); // Lấy tất cả các khoa
};

const getDepartmentById = async (id) => {
    return await Department.findById(id); // Lấy thông tin khoa theo id
};

const createDepartment = async (data) => {
    const department = new Department(data);
    return await department.save(); // Tạo khoa mới
};

const updateDepartment = async (id, data) => {
    const { code, name, manager } = data;

    // Cập nhật khoa
    const department = await Department.findByIdAndUpdate(
        id,
        { code, name, manager },
        { new: true }
    );

    if (!department) throw new Error("Khoa không tồn tại!");

    // Cập nhật thông tin của User quản lý khoa
    if (manager) {
        // Đảm bảo user cũ không còn liên kết với khoa này
        await User.updateMany(
            { department: id },
            { $unset: { department: "" } }
        );

        // Gán khoa cho user mới
        await User.findByIdAndUpdate(manager, { department: id });
    }

    return department;
};

const deleteDepartment = async (id) => {
    return await Department.findByIdAndDelete(id); // Xóa khoa
};
module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
