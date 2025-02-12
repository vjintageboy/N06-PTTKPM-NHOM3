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

module.exports =
    mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
