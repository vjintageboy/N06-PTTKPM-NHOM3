// models/CourseRegistration.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseRegistrationSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        registrationDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CourseRegistration", courseRegistrationSchema);
