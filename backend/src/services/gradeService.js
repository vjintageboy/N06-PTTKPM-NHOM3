const Grade = require("../models/Grade");

class GradeService {
    async addGrade(data) {
        const grade = new Grade(data);
        return await grade.save(); // Tự động tính toán averageScore trước khi lưu
    }

    async updateGrade(gradeId, data) {
        const grade = await Grade.findById(gradeId);
        if (!grade) throw new Error("Grade not found");

        // Cập nhật thông tin điểm
        grade.attendanceScore = data.attendanceScore ?? grade.attendanceScore;
        grade.midtermScore = data.midtermScore ?? grade.midtermScore;
        grade.finalScore = data.finalScore ?? grade.finalScore;

        // averageScore sẽ tự động tính toán trong middleware
        return await grade.save();
    }

    async getGradesByStudent(studentId) {
        return await Grade.find({ student: studentId }).populate("subject");
    }
    // async getGradesByStudent(studentId) {
    //     return await Grade.find({ student: studentId })
    //         .populate("subject", "name code") // Lấy tên và mã môn học từ Subject
    //         .select("attendanceScore midtermScore finalScore averageScore"); // Lấy các trường cần thiết
    // }

    async deleteGrade(gradeId) {
        return await Grade.findByIdAndDelete(gradeId);
    }
}

module.exports = new GradeService();
