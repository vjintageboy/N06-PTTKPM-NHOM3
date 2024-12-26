const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        studentID: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        grades: [
            {
                subject: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Subject",
                },
                score: { type: Number },
            },
        ],
        enrollmentYear: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "graduated", "dropped out"],
            default: "active",
        },
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

module.exports = mongoose.model("Student", studentSchema);
