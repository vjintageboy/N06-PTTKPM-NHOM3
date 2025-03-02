import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/api";

const ChangePassword = () => {
    const { user, logout } = useContext(UserContext);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            message.warning("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (newPassword !== confirmPassword) {
            message.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        setLoading(true);

        const res = await changePassword(
            user._id,
            currentPassword,
            newPassword
        );
        if (res && res.data) {
            message.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
            logout(); // Đăng xuất sau khi đổi mật khẩu
            navigate("/login");
        } else {
            message.error(res.message || "Lỗi khi đổi mật khẩu!");
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
            <h2>Đổi Mật Khẩu</h2>
            <Input.Password
                placeholder="Mật khẩu hiện tại"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Input.Password
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Input.Password
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Button
                type="primary"
                onClick={handleChangePassword}
                loading={loading}
                block
            >
                Đổi Mật Khẩu
            </Button>
        </div>
    );
};

export default ChangePassword;
