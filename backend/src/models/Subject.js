const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
