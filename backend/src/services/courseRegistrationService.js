// services/courseRegistrationService.js
const CourseRegistration = require("../models/CourseRegistration");
const Subject = require("../models/Subject");

/**
 * Lấy danh sách các môn học mà sinh viên chưa đăng ký.
 * @param {String} studentId - _id của sinh viên.
 * @returns Danh sách các môn học chưa đăng ký.
 */
exports.getAvailableCourses = async (studentId) => {
    // Tìm tất cả các đăng ký của sinh viên
    const registrations = await CourseRegistration.find({ student: studentId });
    // Lấy danh sách subject IDs đã đăng ký (chuyển về dạng chuỗi)
    const registeredSubjectIds = registrations.map((reg) =>
        reg.subject.toString()
    );
    // Tìm các môn học (subject) mà _id không nằm trong danh sách đăng ký
    const availableSubjects = await Subject.find({
        _id: { $nin: registeredSubjectIds },
    });
    return availableSubjects;
};

/**
 * Lấy danh sách các môn học mà sinh viên đã đăng ký.
 * @param {String} studentId - _id của sinh viên.
 * @returns Danh sách các môn học đã đăng ký.
 */
exports.getRegisteredCourses = async (studentId) => {
    // Tìm các đăng ký của sinh viên và populate thông tin subject
    const registrations = await CourseRegistration.find({
        student: studentId,
    }).populate("subject");
    // Trích xuất thông tin môn học từ các đăng ký
    const registeredSubjects = registrations.map((reg) => reg.subject);
    return registeredSubjects;
};

/**
 * Đăng ký một môn học cho sinh viên.
 * @param {String} studentId - _id của sinh viên.
 * @param {String} subjectId - _id của môn học (subject).
 * @returns Thông tin môn học vừa đăng ký.
 * @throws Error nếu đã đăng ký môn học này.
 */
exports.registerCourse = async (studentId, subjectId) => {
    // Kiểm tra nếu đăng ký đã tồn tại
    const existingRegistration = await CourseRegistration.findOne({
        student: studentId,
        subject: subjectId,
    });
    if (existingRegistration) {
        throw new Error("Bạn đã đăng ký môn học này");
    }
    // Tạo mới một đăng ký môn học
    const newRegistration = new CourseRegistration({
        student: studentId,
        subject: subjectId,
    });
    await newRegistration.save();

    // Lấy thông tin môn học vừa đăng ký để trả về (có thể populate nếu cần)
    const registeredSubject = await Subject.findById(subjectId);
    return registeredSubject;
};
/**
 * Hủy đăng ký một môn học cho sinh viên.
 * @param {String} studentId - _id của sinh viên.
 * @param {String} subjectId - _id của Subject.
 * @returns Đối tượng đăng ký đã bị xóa.
 * @throws Error nếu không tìm thấy đăng ký.
 */
exports.cancelRegistration = async (studentId, subjectId) => {
    const deletedRegistration = await CourseRegistration.findOneAndDelete({
        student: studentId,
        subject: subjectId,
    });
    if (!deletedRegistration) {
        throw new Error("Không tìm thấy đăng ký của môn học này");
    }
    return deletedRegistration;
};
