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
            token: result.token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
    }
};
module.exports = loginController;
