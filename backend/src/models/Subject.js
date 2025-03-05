const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // Mã môn học
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    credits: { type: Number, required: true }, // Số tín chỉ
});
subjectSchema.pre("findOneAndDelete", async function (next) {
    const subjectId = this.getQuery()._id; // Lấy ID của môn học sắp bị xóa

    try {
        await mongoose.model("Grade").deleteMany({ subject: subjectId }); // Xóa điểm liên quan
        await mongoose
            .model("CourseRegistration")
            .deleteMany({ subject: subjectId }); // Xóa đăng ký liên quan
        console.log(
            `Xóa thành công dữ liệu liên quan đến môn học: ${subjectId}`
        );
        next();
    } catch (error) {
        next(error);
    }
});
module.exports =
    mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
