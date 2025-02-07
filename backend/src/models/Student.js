const mongoose = require("mongoose");
const moment = require("moment-timezone");

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
            set: (value) => {
                // Chuyển đổi về múi giờ Việt Nam khi lưu
                return moment.tz(value, "Asia/Ho_Chi_Minh").toDate();
            },
            get: (value) => {
                // Format khi lấy dữ liệu
                return moment(value)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("YYYY-MM-DD");
            },
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

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
        toJSON: { getters: true }, // Quan trọng để get() hoạt động khi JSON.stringify()
        toObject: { getters: true }, // Quan trọng khi dùng toObject()
    }
);

// Sau khi lưu (tạo mới hoặc cập nhật) một document Student,
// cập nhật lại trường email cho tất cả User có liên kết với Student này.
studentSchema.post("save", async function (doc, next) {
    try {
        // Sử dụng require bên trong hook để tránh circular dependency
        const User = require("./User");
        await User.updateMany({ student: doc._id }, { email: doc.email });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Student", studentSchema);
