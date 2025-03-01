// controllers/courseRegistrationController.js
const courseRegistrationService = require("../services/courseRegistrationService");

/**
 * GET /api/courseRegistrations/available
 * Trả về danh sách các môn học mà sinh viên chưa đăng ký.
 */
exports.getAvailableCourses = async (req, res) => {
    try {
        const { studentId } = req.params;
        const subjects = await courseRegistrationService.getAvailableCourses(
            studentId
        );
        res.status(200).json({ subjects: subjects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET /api/courseRegistrations/registered
 * Trả về danh sách các môn học mà sinh viên đã đăng ký.
 */
exports.getRegisteredCourses = async (req, res) => {
    try {
        const { studentId } = req.params;

        const registeredSubjects =
            await courseRegistrationService.getRegisteredCourses(studentId);
        res.status(200).json({ registeredCourses: registeredSubjects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * POST /api/courseRegistrations/register
 * Đăng ký môn học mới cho sinh viên.
 * Yêu cầu body: { subjectId: "..." }
 */
exports.registerCourse = async (req, res) => {
    try {
        const { studentId } = req.params;
        // Thay đổi tên biến từ courseId thành subjectId
        const { subjectId } = req.body;
        const registeredSubject =
            await courseRegistrationService.registerCourse(
                studentId,
                subjectId
            );
        res.status(201).json({
            message: "Đăng ký môn học thành công",
            registeredCourse: registeredSubject,
        });
    } catch (error) {
        res.status(
            error.message === "Bạn đã đăng ký môn học này" ? 400 : 500
        ).json({ message: error.message });
    }
};
exports.cancelRegistration = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { subjectId } = req.body;

        const deletedRegistration =
            await courseRegistrationService.cancelRegistration(
                studentId,
                subjectId
            );
        res.status(200).json({
            message: "Hủy đăng ký thành công",
            deletedRegistration,
        });
    } catch (error) {
        res.status(
            error.message === "Không tìm thấy đăng ký của môn học này"
                ? 404
                : 500
        ).json({ message: error.message });
    }
};
