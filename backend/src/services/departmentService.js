// services/departmentService.js
const Department = require("../models/Department");

const getAllDepartments = async () => {
    return await Department.find(); // Lấy tất cả các khoa
};

const getDepartmentById = async (id) => {
    return await Department.findById(id); // Lấy thông tin khoa theo id
};

const createDepartment = async (data) => {
    const department = new Department(data);
    return await department.save(); // Tạo khoa mới
};

const updateDepartment = async (id, data) => {
    return await Department.findByIdAndUpdate(id, data, { new: true }); // Cập nhật thông tin khoa
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
