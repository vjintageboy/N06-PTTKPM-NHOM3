const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    dateRecorded: {
        type: Date,
        default: Date.now,
    },
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
