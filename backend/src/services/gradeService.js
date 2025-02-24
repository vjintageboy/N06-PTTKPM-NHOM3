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
    async calculateStatistics(studentId) {
        const grades = await Grade.find({ student: studentId }).populate(
            "subject"
        );

        if (!grades.length) {
            return null;
        }

        let totalCredits = 0; // Tổng số tín chỉ
        let totalAccumulatedCredits = 0; // Tổng số tín chỉ tích lũy
        let totalScore10 = 0; // Tổng điểm hệ 10
        let totalScore4 = 0; // Tổng điểm hệ 4
        let accumulatedScore10 = 0; // Tổng điểm tích lũy hệ 10
        let accumulatedScore4 = 0; // Tổng điểm tích lũy hệ 4
        let countSubjects = 0; // Số môn đã học

        grades.forEach((grade) => {
            const credits = grade.subject?.credits || 3; // Giả định mỗi môn có 3 tín chỉ nếu không có
            totalCredits += credits;
            totalScore10 += grade.averageScore * credits;
            totalScore4 += grade.grade4 * credits;
            countSubjects++;

            // Nếu môn học không phải là "Retake" thì cộng vào tích lũy
            if (grade.status === "Passed") {
                totalAccumulatedCredits += credits;
                accumulatedScore10 += grade.averageScore * credits;
                accumulatedScore4 += grade.grade4 * credits;
            }
        });

        const avgScore10 = countSubjects ? totalScore10 / totalCredits : 0;
        const avgScore4 = countSubjects ? totalScore4 / totalCredits : 0;
        const accumulatedAvgScore10 = totalAccumulatedCredits
            ? accumulatedScore10 / totalAccumulatedCredits
            : 0;
        const accumulatedAvgScore4 = totalAccumulatedCredits
            ? accumulatedScore4 / totalAccumulatedCredits
            : 0;

        return {
            totalCredits,
            totalAccumulatedCredits,
            avgScore10: avgScore10.toFixed(2),
            avgScore4: avgScore4.toFixed(2),
            accumulatedAvgScore10: accumulatedAvgScore10.toFixed(2),
            accumulatedAvgScore4: accumulatedAvgScore4.toFixed(2),
        };
    }
}

module.exports = new GradeService();
