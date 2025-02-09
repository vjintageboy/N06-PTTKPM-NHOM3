import "./header.scss";
import logo from "../../assets/pka-logo.jpg";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Dropdown, Menu, message } from "antd";
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { callLogout } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { user, logout } = useContext(UserContext);

    const navigate = useNavigate();
    // Xử lý đăng xuất: gọi hàm logout từ context và chuyển hướng về trang đăng nhập
    const handleLogout = async () => {
        const res = await callLogout();
        if (res) {
            logout();
            message.success("Đăng xuất thành công");
            localStorage.removeItem("access_token");
            navigate("/login");
        } else {
            message.error(res.message);
        }
    };

    // Xử lý đổi mật khẩu: chuyển hướng sang trang đổi mật khẩu (hoặc mở modal đổi mật khẩu)
    const handleChangePassword = () => {
        navigate("/change-password");
    };
    // Menu cho dropdown khi click vào tên người dùng
    const userMenu = (
        <Menu>
            <Menu.Item
                key="changePassword"
                onClick={handleChangePassword}
                icon={<SettingOutlined />}
            >
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item
                key="logout"
                onClick={handleLogout}
                icon={<LogoutOutlined />}
            >
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-logo">
                    <img src={logo} alt="" />
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
                                {user.name}
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

export default Header;
