const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        attendanceScore: { type: Number, required: true, min: 0, max: 10 }, // Điểm chuyên cần
        midtermScore: { type: Number, required: true, min: 0, max: 10 }, // Điểm giữa kỳ
        finalScore: { type: Number, required: true, min: 0, max: 10 }, // Điểm cuối kỳ
        averageScore: { type: Number }, // Điểm trung bình (tính tự động)
        grade4: { type: Number }, // Điểm hệ 4 (tính tự động)
        status: { type: String, enum: ["Passed", "Retake"], default: "Passed" }, // Trạng thái tự động
    },
    {
        timestamps: true, // Thêm thời gian tạo và cập nhật
    }
);

// Middleware để tính toán averageScore trước khi lưu
gradeSchema.pre("save", function (next) {
    this.averageScore =
        this.attendanceScore * 0.1 +
        this.midtermScore * 0.3 +
        this.finalScore * 0.6;
    // Chuyển đổi điểm qua hệ 4
    if (this.averageScore >= 9) this.grade4 = 4.0;
    else if (this.averageScore >= 8.5) this.grade4 = 3.7;
    else if (this.averageScore >= 8.0) this.grade4 = 3.5;
    else if (this.averageScore >= 7.0) this.grade4 = 3.0;
    else if (this.averageScore >= 6.5) this.grade4 = 2.5;
    else if (this.averageScore >= 5.5) this.grade4 = 2.0;
    else if (this.averageScore >= 4.0) this.grade4 = 1.0;
    else this.grade4 = 0.0;
    // Xác định trạng thái
    this.status = this.averageScore >= 4.0 ? "Passed" : "Retake";
    next();
});

module.exports = mongoose.model("Grade", gradeSchema);
