const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 8080;
const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res) => {
    res.send("Hello World! abcd");
});

connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
