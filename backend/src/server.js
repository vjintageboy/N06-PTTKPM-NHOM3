const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 8080;
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
app.get("/", (req, res) => {
    res.send("Hello World! abcd");
});

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/students/", studentRoutes);
app.use("/api/subjects/", subjectRoutes);
app.use("/api/grades/", gradeRoutes);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
