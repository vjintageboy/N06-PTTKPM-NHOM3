// controllers/departmentController.js
const departmentService = require("../services/departmentService");

const getAllDepartments = async (req, res) => {
    try {
        const departments = await departmentService.getAllDepartments();
        res.status(200).json({ data: departments });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const department = await departmentService.getDepartmentById(
            req.params.id
        );
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const createDepartment = async (req, res) => {
    try {
        const department = await departmentService.createDepartment(req.body);
        res.status(201).json({ data: department });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const department = await departmentService.updateDepartment(
            req.params.id,
            req.body
        );
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ data: department });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const result = await departmentService.deleteDepartment(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const searchDepartments = async (req, res) => {
    try {
        const { query } = req.query;
        const result = await departmentService.searchDepartments(query);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({
                success: false,
                message: "Không tìm thấy dữ liệu",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Có lỗi xảy ra khi tìm kiếm",
        });
    }
};
module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    searchDepartments,
};
