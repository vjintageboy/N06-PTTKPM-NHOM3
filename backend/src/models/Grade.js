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
    next();
});

module.exports = mongoose.model("Grade", gradeSchema);
