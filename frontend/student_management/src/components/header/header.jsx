import React, { useContext } from "react";
import "./header.scss";
import logo from "../../assets/pka-logo.jpg";
import { UserContext } from "../../context/userContext";
import { Dropdown, Menu, message } from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    DownOutlined,
} from "@ant-design/icons"; // Import Ant Design icons
import { callLogout } from "../../services/api";
import { useNavigate } from "react-router-dom";

// Hàm xử lý đăng xuất
const handleLogout = async (logout, navigate) => {
    try {
        const res = await callLogout();
        if (res.success) {
            logout();
            message.success("Đăng xuất thành công");
            localStorage.removeItem("access_token");
            navigate("/login");
        } else {
            message.error(res.message || "Đăng xuất thất bại");
        }
    } catch {
        message.error("Có lỗi xảy ra khi đăng xuất");
    }
};

// Hàm xử lý chuyển trang đổi mật khẩu
const handleChangePassword = (navigate) => {
    navigate("/change-password");
};

const Header = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    // Tạo menu dropdown cho người dùng
    const userMenu = (
        <Menu>
            <Menu.Item
                key="changePassword"
                onClick={() => handleChangePassword(navigate)}
                icon={<SettingOutlined />}
            >
                <UserOutlined style={{ marginRight: 8 }} /> Đổi mật khẩu
            </Menu.Item>
            <Menu.Item
                key="logout"
                onClick={() => handleLogout(logout, navigate)}
                icon={<LogoutOutlined />}
            >
                <LogoutOutlined style={{ marginRight: 8 }} /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="user-login">
                    {user ? (
                        <Dropdown overlay={userMenu} trigger={["click"]}>
                            <div
                                style={{
                                    cursor: "pointer",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <UserOutlined style={{ marginRight: 8 }} />
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "#4db8ff",
                                        fontSize: "14px",
                                    }}
                                >
                                    {user.name}
                                </span>
                                <DownOutlined style={{ marginLeft: 5 }} />
                            </div>
                        </Dropdown>
                    ) : (
                        <div style={{ color: "#fff" }}>Chưa đăng nhập</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Header);
