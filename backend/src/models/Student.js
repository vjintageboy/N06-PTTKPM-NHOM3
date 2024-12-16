const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, unique: true, required: true },
    department: { type: String, required: true }, // Khoa
    scores: [
        {
            subject: { type: String, required: true },
            score: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model("Student", studentSchema);
