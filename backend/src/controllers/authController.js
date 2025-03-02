const authService = require("../services/authService");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra đầu vào
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email và mật khẩu là bắt buộc" });
        }

        // Gọi service xử lý logic đăng nhập
        const result = await authService.login(email, password);

        if (!result.success) {
            return res.status(result.status).json({ message: result.message });
        }

        // Trả về token khi đăng nhập thành công
        return res.status(200).json({
            message: "Đăng nhập thành công",

            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};
const getCurrentUser = async (req, res) => {
    try {
        // Lấy thông tin user từ `req.user` (gắn bởi middleware xác thực)

        const userId = req.user.id; // `req.user` chứa thông tin giải mã từ token
        const user = await authService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Xóa token phía client, backend chỉ gửi phản hồi
        res.status(200).json({
            success: true,
            message: "Đăng xuất thành công",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi đăng xuất",
        });
    }
};
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const response = await authService.changePassword(
            userId,
            currentPassword,
            newPassword
        );
        res.json({ data: response });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    loginController,
    getCurrentUser,
    logoutUser,
    changePassword,
};
